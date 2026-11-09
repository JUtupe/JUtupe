# AGENTS.md

## Context & Architecture
- **Project**: personal portfolio of Wiktor Petryszyn — a cyberpunk-styled single page (React + Vite) with an interactive 3D pixel-art model of the author's real room in the centre panel.
- **Core stack**:
  - **Frontend**: React 19, TypeScript (strict), Vite.
  - **3D**: `@react-three/fiber`, `@react-three/drei`, `three`, `@react-three/postprocessing`.
  - **Physics**: `@react-three/rapier` (only a fixed collider for the room today; kept for future dynamic objects).
  - **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`), custom neon/CRT utilities in `src/index.css`.
  - **Animation/FX**: `motion/react`, `powerglitch`.
  - **Modelling**: Blockbench, driven by Claude through the Blockbench MCP plugin.

## Layout
```
src/App.tsx                 page grid: profile, contacts, projects, skills, 3D scene, experience
src/components/             UI pieces (ContentBox, ProjectCard/ProjectModal, SkillRow, ExperienceRow, GlitchText, …)
src/lib/                    data: projects.ts, skills.ts, roomLayout.ts (3D room composition), utils.ts
src/hooks/                  useMediaQuery, useMultiKeyPress (Shift ×3 → Leva), useScrollBlock
src/objects/Scene.tsx       Canvas, lights, post-processing (Leva toggles), OrbitControls, Physics
src/objects/Room.tsx        loads every model from roomLayout, translucency rules, one fixed RigidBody
models-src/                 Blockbench sources: room/<id>.bbmodel, textures/*.png, legacy/room.bbmodel (reference)
public/models/room/<id>.glb exported room models (generated)
scripts/                    bb-mcp.mjs (fallback Blockbench MCP client), pngio.py (PNG read/write for textures)
.claude/skills/blockbench-scene/SKILL.md   the full modelling workflow
.mcp.json                   Blockbench MCP server (http://localhost:3333/bb-mcp)
```

## Developer Commands
- `npm run dev` — Vite dev server (the `dev` preview config in `.claude/launch.json` runs it on port 5173).
- `npm run build` — `tsc -b` + `vite build`.
- `npm run lint` — ESLint.
- `npm run preview` — preview the production build.

## 3D Scene
- The room is **one Blockbench model per object** (`room_shell`, `window`, `desk`, `chair`, `container`, `printer_3d`, …) placed in code by `src/lib/roomLayout.ts`: `{id, position, rotation?, animation?}` with position in Blockbench px (16 px = 1 three.js unit) and rotation in degrees. A model's local origin is the point it stands on.
- `Room.tsx` loads all `.glb` files with one `useGLTF(urls)` call (same cache key as the preload, so each file is fetched once), plays the optional animation clip, and switches meshes named `glass*` / `sheer*` to alpha blending (Blockbench exports alpha as MASK).
- Scene lighting is neutral (ambient + directional); the cyberpunk look comes from post-processing (bloom, chromatic aberration, vignette, grain — toggles in Leva).
- Controls: camera only (`OrbitControls`). Leva is hidden until Shift is pressed 3 times; it also has the physics debug view.

## Scene Workflow (Blockbench MCP)
**Any change to room models, textures, room size or object placement follows the `blockbench-scene` skill** (`.claude/skills/blockbench-scene/SKILL.md`). In short:
1. Blockbench runs with the MCP plugin on port 3333 (if the `mcp__blockbench__*` tools aren't loaded, use `node scripts/bb-mcp.mjs`).
2. Take real-world dimensions (product page, user's description/photo) and convert at ≈4.6 cm per px; check the target spot against the reference measurements in the skill.
3. Generate a pixel-art texture with `scripts/pngio.py`, matching colours sampled from existing textures.
4. Build or edit the model through MCP tools, check it in an offscreen Blockbench view.
5. Export **both** `models-src/room/<id>.bbmodel` and `public/models/room/<id>.glb`, then add/update the entry in `roomLayout.ts` (and the object table in the skill).
6. Verify with lint, build and the dev preview (from inside and outside the room for windows/glass).

Rules:
- Never hand-edit `public/models/room/*.glb` — change the `.bbmodel` and re-export.
- `models-src/legacy/room.bbmodel` is the original monolithic room, kept only as reference.
- Don't stretch UVs; add texture area instead. Don't point UVs at transparent areas.

## Conventions
- **Type safety**: strict TypeScript (`tsconfig.app.json`).
- **Styling**: Tailwind classes; custom corner cuts (`corner-cut-tr-15`, …) and neon utilities (`neon-glow-*`, `neon-text-*`) from `index.css`.
- **Content**: projects/skills/experience data live in `src/lib/*` and `App.tsx`.
- **Verification**: run `npm run lint` and `npm run build` after changes; for anything visible in the scene, also check the dev preview.
- **Git**: work on feature branches (`feat/…`), conventional commit messages (`feat:`, `fix:`, `chore:`). Commit only when asked; don't push unless asked.
