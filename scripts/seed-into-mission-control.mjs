#!/usr/bin/env node
/**
 * Seed Nozi-Corp content into a sibling Mission Control data directory.
 *
 * Usage:
 *   node scripts/seed-into-mission-control.mjs [--dry-run] [--target <path>]
 *
 * Default target: ../mission-control/mission-control/data/
 */

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const DEFAULT_TARGET = resolve(REPO_ROOT, '../mission-control/mission-control/data');
const MISSION_DIR = join(REPO_ROOT, 'missions/fsp-practitioner');
const AGENTS_DIR = join(REPO_ROOT, 'agents');
const SKILLS_DIR = join(REPO_ROOT, 'skills');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const targetIdx = args.indexOf('--target');
const targetDir = targetIdx >= 0 ? resolve(args[targetIdx + 1]) : DEFAULT_TARGET;

function now() {
  return new Date().toISOString();
}

async function readJson(path) {
  const raw = await readFile(path, 'utf8');
  return JSON.parse(raw);
}

async function readMcData(filename) {
  const path = join(targetDir, filename);
  if (!existsSync(path)) {
    return null;
  }
  return readJson(path);
}

function mergeById(existing, incoming, idKey = 'id') {
  const map = new Map((existing ?? []).map((item) => [item[idKey], item]));
  for (const item of incoming) {
    const prev = map.get(item[idKey]) ?? {};
    map.set(item[idKey], {
      ...prev,
      ...item,
      createdAt: prev.createdAt ?? item.createdAt ?? now(),
      updatedAt: now(),
    });
  }
  return [...map.values()];
}

async function loadSkillContent(contentFile) {
  const path = join(SKILLS_DIR, contentFile);
  return readFile(path, 'utf8');
}

async function buildSkillsOverlay() {
  const overlay = await readJson(join(MISSION_DIR, 'skills.overlay.json'));
  const skills = [];
  for (const skill of overlay.skills) {
    const { contentFile, ...rest } = skill;
    const content = await loadSkillContent(contentFile);
    skills.push({ ...rest, content });
  }
  return skills;
}

async function loadAgentOverlays() {
  const files = (await readdir(AGENTS_DIR)).filter((f) => f.endsWith('.json'));
  const agents = [];
  for (const file of files) {
    const agent = await readJson(join(AGENTS_DIR, file));
    agents.push(agent);
  }
  return agents.sort((a, b) => a.id.localeCompare(b.id));
}

async function planSeed() {
  const projectOverlay = await readJson(join(MISSION_DIR, 'project.json'));
  const tasksOverlay = await readJson(join(MISSION_DIR, 'tasks.json'));
  const agentOverlays = await loadAgentOverlays();
  const missionOverlay = await readJson(join(MISSION_DIR, 'mission.json'));
  const skills = await buildSkillsOverlay();

  const existingProjects = (await readMcData('projects.json')) ?? { projects: [] };
  const existingTasks = (await readMcData('tasks.json')) ?? { tasks: [] };
  const existingAgents = (await readMcData('agents.json')) ?? { agents: [] };
  const existingSkills = (await readMcData('skills-library.json')) ?? { skills: [] };
  const existingMissions = (await readMcData('missions.json')) ?? { missions: [] };

  const merged = {
    'projects.json': {
      projects: mergeById(existingProjects.projects, [projectOverlay.project]),
    },
    'tasks.json': {
      tasks: mergeById(existingTasks.tasks, tasksOverlay.tasks),
    },
    'agents.json': {
      agents: mergeById(existingAgents.agents, agentOverlays),
    },
    'skills-library.json': {
      skills: mergeById(existingSkills.skills, skills),
    },
    'missions.json': {
      missions: mergeById(existingMissions.missions, [missionOverlay.mission]),
    },
  };

  return { merged, summary: {
    project: projectOverlay.project.id,
    tasks: tasksOverlay.tasks.map((t) => t.id),
    agents: agentOverlays.map((a) => a.id),
    skills: skills.map((s) => s.id),
    mission: missionOverlay.mission.id,
  }};
}

async function writeMcData(filename, data) {
  const path = join(targetDir, filename);
  const content = JSON.stringify(data, null, 2) + '\n';
  if (dryRun) {
    console.log(`[dry-run] Would write ${path} (${content.length} bytes)`);
    return;
  }
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, 'utf8');
  console.log(`Wrote ${path}`);
}

async function main() {
  console.log(`Nozi-Corp → Mission Control seed`);
  console.log(`  Target: ${targetDir}`);
  console.log(`  Mode:   ${dryRun ? 'DRY RUN' : 'WRITE'}`);

  if (!dryRun && !existsSync(targetDir)) {
    console.error(`\nError: Mission Control data directory not found:\n  ${targetDir}\n`);
    console.error('Clone Mission Control as a sibling repo first:');
    console.error('  git clone https://github.com/MeisnerDan/mission-control.git ../mission-control');
    process.exit(1);
  }

  const { merged, summary } = await planSeed();

  console.log('\nSeed plan:');
  console.log(`  Project:  ${summary.project}`);
  console.log(`  Mission:  ${summary.mission}`);
  console.log(`  Tasks:    ${summary.tasks.join(' → ')}`);
  console.log(`  Agents:   ${summary.agents.join(', ')}`);
  console.log(`  Skills:   ${summary.skills.join(', ')}`);

  for (const [file, data] of Object.entries(merged)) {
    await writeMcData(file, data);
  }

  if (dryRun) {
    console.log('\n[dry-run] No files written. Run without --dry-run after cloning Mission Control.');
  } else {
    console.log('\nDone. Regenerate MC context:');
    console.log('  cd ../mission-control/mission-control && pnpm gen:context');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
