#!/usr/bin/env node
/**
 * Validate Nozi-Corp mission overlays before seeding Mission Control.
 *
 * Usage:
 *   node scripts/validate-seed.mjs
 */

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const MISSION_DIR = join(REPO_ROOT, 'missions/fsp-practitioner');
const AGENTS_DIR = join(REPO_ROOT, 'agents');
const SKILLS_DIR = join(REPO_ROOT, 'skills');

const IMPORTANCE = new Set(['important', 'not-important']);
const URGENCY = new Set(['urgent', 'not-urgent']);
const KANBAN = new Set(['not-started', 'in-progress', 'done']);

let errors = 0;
let warnings = 0;

function fail(msg) {
  console.error(`ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`WARN:  ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`OK:    ${msg}`);
}

async function readJson(path) {
  const raw = await readFile(path, 'utf8');
  return JSON.parse(raw);
}

async function loadAgentsFromDir() {
  const files = (await readdir(AGENTS_DIR)).filter((f) => f.endsWith('.json'));
  const agents = [];
  for (const file of files) {
    agents.push(await readJson(join(AGENTS_DIR, file)));
  }
  return agents;
}

async function main() {
  console.log('Validating Nozi-Corp seed overlays...\n');

  const project = await readJson(join(MISSION_DIR, 'project.json'));
  const tasks = await readJson(join(MISSION_DIR, 'tasks.json'));
  const agentManifest = await readJson(join(MISSION_DIR, 'agents.overlay.json'));
  const skills = await readJson(join(MISSION_DIR, 'skills.overlay.json'));
  const mission = await readJson(join(MISSION_DIR, 'mission.json'));
  const agents = await loadAgentsFromDir();

  const agentIds = new Set(agents.map((a) => a.id));
  const skillIds = new Set(skills.skills.map((s) => s.id));
  const taskIds = new Set(tasks.tasks.map((t) => t.id));
  const projectId = project.project.id;
  const manifestIds = new Set(agentManifest.agentIds ?? []);

  // Manifest matches agents/*.json
  for (const id of manifestIds) {
    if (!agentIds.has(id)) fail(`Manifest agent missing JSON: agents/${id}.json`);
  }
  for (const agent of agents) {
    if (!manifestIds.has(agent.id)) warn(`agents/${agent.id}.json not in mission manifest`);
  }

  for (const agent of agents) {
    const mdPath = join(AGENTS_DIR, `${agent.id}.md`);
    const jsonPath = join(AGENTS_DIR, `${agent.id}.json`);
    if (!existsSync(mdPath)) fail(`Missing agent markdown: agents/${agent.id}.md`);
    else {
      const md = await readFile(mdPath, 'utf8');
      if (!md.startsWith('---\n')) fail(`agents/${agent.id}.md missing YAML frontmatter`);
      else ok(`agents/${agent.id}.md (frontmatter)`);
    }
    if (!existsSync(jsonPath)) fail(`Missing agent JSON: agents/${agent.id}.json`);

    for (const sid of agent.skillIds ?? []) {
      if (!skillIds.has(sid)) fail(`Agent ${agent.id} references unknown skillId: ${sid}`);
    }
  }

  for (const skill of skills.skills) {
    const contentPath = join(SKILLS_DIR, skill.contentFile);
    if (!existsSync(contentPath)) fail(`Missing skill content: skills/${skill.contentFile}`);
    else ok(`skills/${skill.contentFile}`);

    for (const aid of skill.agentIds ?? []) {
      if (!agentIds.has(aid)) fail(`Skill ${skill.id} references unknown agentId: ${aid}`);
    }
  }

  for (const member of project.project.teamMembers ?? []) {
    if (member !== 'me' && !agentIds.has(member)) {
      fail(`Project team member not in agents/: ${member}`);
    }
  }
  ok(`project ${projectId} (${agents.length} agents)`);

  const expectedChain = [
    'task_fsp_research',
    'task_fsp_intake',
    'task_fsp_needs_analysis',
    'task_fsp_compliance_gate',
    'task_fsp_inbox_report',
  ];

  for (const task of tasks.tasks) {
    if (!IMPORTANCE.has(task.importance)) fail(`Task ${task.id}: invalid importance`);
    if (!URGENCY.has(task.urgency)) fail(`Task ${task.id}: invalid urgency`);
    if (!KANBAN.has(task.kanban)) fail(`Task ${task.id}: invalid kanban`);
    if (task.projectId !== projectId) fail(`Task ${task.id}: projectId mismatch`);
    if (task.assignedTo && !agentIds.has(task.assignedTo) && task.assignedTo !== 'me') {
      fail(`Task ${task.id}: unknown assignedTo ${task.assignedTo}`);
    }
    for (const c of task.collaborators ?? []) {
      if (!agentIds.has(c)) fail(`Task ${task.id}: unknown collaborator ${c}`);
    }
    for (const b of task.blockedBy ?? []) {
      if (!taskIds.has(b)) fail(`Task ${task.id}: blockedBy unknown task ${b}`);
    }
  }

  for (let i = 1; i < expectedChain.length; i++) {
    const task = tasks.tasks.find((t) => t.id === expectedChain[i]);
    const prev = expectedChain[i - 1];
    if (!task.blockedBy?.includes(prev)) {
      fail(`Chain break: ${task.id} should be blockedBy ${prev}`);
    }
  }
  ok(`task chain: ${expectedChain.join(' → ')}`);

  if (mission.mission.projectId !== projectId) {
    fail('mission.projectId does not match project.id');
  }
  for (const tid of mission.mission.taskIds ?? []) {
    if (!taskIds.has(tid)) fail(`Mission references unknown task: ${tid}`);
  }
  ok(`mission ${mission.mission.id}`);

  console.log(`\nValidation complete: ${errors} error(s), ${warnings} warning(s)`);
  if (errors > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
