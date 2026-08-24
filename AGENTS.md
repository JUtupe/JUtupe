# AGENTS.md

## Context & Architecture
- **Project Type**: A 3D web portfolio/experience built with React, Three.js, and Vite.
- **Core Stack**:
  - **Frontend**: React, TypeScript, Vite.
  - **3D Engine**: `@react-three/fiber`, `@react-three/drei`, `three`.
  - **Physics**: `@react-three/rapier` (RigidBody system).
  - **Styling**: Tailwind CSS (v4 via `@tailwindcss/vite`).
  - **Animations**: `motion/react` (Framer Motion), `powerglitch`.
- **Key Components**:
  - `src/objects/Scene.tsx`: Main 3D environment (Room, Truck, Trailer).
  - `src/components/`: UI elements (ProjectCard, SkillRow, etc.).
  - `src/lib/`: Data and logic (projects, skills, utils).

## Developer Commands
- **Development**: `npm run dev` (Starts Vite dev server)
- **Build**: `npm run build` (Runs `tsc -b` and `vite build`)
- **Lint**: `npm run lint` (Runs `eslint .`)
- **Preview**: `npm run preview` (Preview production build)

## Key Implementation Details
- **Physics**: Uses `RapierRigidBody`. Note that `Truck` and `Trailer` have specific mass properties and friction/restitution.
- **Controls**: Custom keyboard controls via `src/hooks/useKeyboardControls.ts`.
- **3D Assets**: Models are loaded from `/models/` (e.g., `room.gltf`, `truck.gltf`).
- **UI/3D Integration**: `Leva` is used for real-time parameter tuning in the 3D scene (visible via `Shift` + 3 keys).
- **Glitch Effects**: `powerglitch` is used for specific visual effects on images/elements in `App.tsx`.

## Workflow Conventions
- **Type Safety**: Strict TypeScript is enforced. Use `tsconfig.app.json` for app-specific rules.
- **Styling**: Use Tailwind CSS classes. Custom corner-cuts (e.g., `corner-cut-tr-15`) are used for specific UI elements.
- **Verification**: Run `npm run lint` and `npm run build` frequently to catch type and build errors.
