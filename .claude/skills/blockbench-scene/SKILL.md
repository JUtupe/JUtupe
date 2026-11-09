---
name: blockbench-scene
description: Build, edit or add objects to the 3D room scene (furniture, walls, props, room size) by modelling them in Blockbench through the Blockbench MCP plugin, exporting .glb and placing them in src/lib/roomLayout.ts. Use for any change to room models, textures or their placement.
---

# Room scene workflow (Blockbench MCP)

The room is composed in code from **one Blockbench model per object**. Claude owns modelling, texturing, export and placement; the user describes what they have in their real room (often with a photo or a product link).

```
models-src/room/<id>.bbmodel   source of truth for each object (edit these)
models-src/textures/*.png      textures (pixel art, 1 texel per Blockbench px)
models-src/legacy/room.bbmodel original monolithic room — reference only, never export
public/models/room/<id>.glb    exported runtime models (generated — never hand-edit)
src/lib/roomLayout.ts          which objects are in the room, where, which animation plays
src/objects/Room.tsx           loads roomLayout, translucency rules, one fixed RigidBody
scripts/bb-mcp.mjs             fallback MCP client (when mcp__blockbench__* tools aren't loaded)
scripts/pngio.py               dependency-free PNG read/write for generating textures
```

## Objects in the room
| id | what it is |
|---|---|
| `room_shell` | floor, back wall (x≈25), window wall (z≈-25) with opening + sill, skirting, radiator |
| `window` | glass pane + frame (26×23 px) in the opening, curtain rod, two opaque orange drapes 10 px wide hanging from the rod to the sill (inside-only) |
| `desk` | L-shaped desk (oak top, black legs) + open wooden printer stand ("cabinet") under its short wing |
| `aeron` | Herman Miller Aeron Classic B (graphite mesh), static; seat 9.5–10 px, arm pads top 14.2 px so it slides under the desk; `back` group tilted −10° |
| `monitor` | wall-mounted monitor (arm + plate on the back wall, x 25) above the long wing |
| `keyboard`, `mouse`, `pc` (laptop), `papers` | desk items |
| `accessory` | 3-tier desk organizer with `supplies` group: pens, highlighter, scissors, sticky notes |
| `pc_tower` | DeepCool CH170 Digital (38×25×20 cm) in the desk corner behind the laptop, rotated -90° so the display faces the printer (-x) |
| `wall_frames` | three 12×12 px black frames above the monitor (y 38…50, z -11…29); `picture_1…3` are the (white for now) contents |
| `printer` | paper printer on the printer stand |
| `suitcase` | leaning inside the printer stand |
| `container` | under-desk container (Deerhorn, 55×70×60 cm) next to the printer stand |
| `printer_3d` | Bambu Lab P1S + AMS on the container |
| `guitar` | black classical guitar (≈100 cm) on an A-frame floor stand, right of the monitor past the desk's long wing; `instrument` and `stand/post` groups tilted −15° around the cradle |

## Scale and reference measurements
- 16 Blockbench px = 1 three.js unit (`BB_UNIT`). Real-world scale is **≈4.6 cm per px** (60 cm container = 13 px, desk top at 18 px ≈ 83 cm). Convert real product dimensions with this and round to whole or half px.
- World coordinates (BB px): floor y=0; desk top y=18 (short wing x -19…6, z -21…-3; long wing x 6…24, z -21…27); printer stand x -31…-7, z -20…-4, top y=13; container x -43…-31, z -19…-4, top y=13; window opening x -17…9, y 24.6…48 in the wall z -29…-25 (inner face z=-25), sill x -18…10, top y=25; curtain rod y 49.5…50.5, x -25…17 with finials, drapes x -23…-13 and 5…15; radiator x -15…7, y 5…21, z -25…-22; room floor x -44…29, z -29…37.
- To read exact bounds of any exported model, load it in the dev preview with three's `GLTFLoader` via `javascript_tool` and compute `Box3` (×16 for px).

## Connection
- Blockbench must be running with `blockbench-mcp-plugin` on port **3333** (`.mcp.json`, endpoint `/bb-mcp`; port 3000 is taken by another app on this machine).
- Prefer the `mcp__blockbench__*` tools. If the session didn't load them, call the same tools via `node scripts/bb-mcp.mjs <tool> '<json>'` (`--list` lists tools; most tools only appear once a project is open). For many calls (dozens of UV edits), write a throwaway Node script in the scratchpad that opens **one** MCP session (copy the handshake from `scripts/bb-mcp.mjs`) — one process per call is slow.
- Paths passed to Blockbench use forward slashes. The first file read/write shows a permission dialog in Blockbench; if a call hangs, ask the user to allow file access.
- Before closing projects with `risky_eval` (`ModelProject.all…close(true)` discards unsaved changes), make sure nothing the user is working on is open.

## Modelling conventions
- Format `free`. One top-level group named exactly `<id>`; sub-parts that animate or may animate get their own group with the pivot at the joint (`guitar/instrument`, `container/door` hinged on its edge).
- **Local origin = where the object stands**: bottom-centre of its footprint (on the floor, desk top or container top). The world position goes into `roomLayout.ts`, never into the model.
- Front of furniture faces the room (+z for things along the window wall).
- Minimalist low-poly: cubes for boxy parts, `place_mesh` for custom shapes (e.g. wavy curtain strips), `create_cylinder` for round parts (spools, guitar soundhole-style details). Keep sizes in whole/half px.
- Name meshes meaningfully; names drive behaviour in code (see translucency).

## Textures
- Pixel art, **1 texel per px**, small atlases (16–64 px, legacy ones 256). Create PNGs with a short Python script using `scripts/pngio.py` (run with `python -I`; no Pillow here), then load with `create_texture {data:<absolute path>, width, height, uv_width, uv_height}`.
- Match the existing style by sampling colours from existing textures (e.g. desk black `(26,26,27)` with edge `(38,50,56)`, oak wood copied straight from `desk_texture`). Add subtle ±2 noise, edge highlights on panels.
- Map each cube face to a region of exactly the face size (`set_cube_uv`, `[u1,v1,u2,v2]`). **Never point a UV at an empty (transparent) area** — with alpha MASK the face disappears.
- Never stretch UVs to cover a larger face (pixels/planks become uneven): add texture area instead (e.g. the floor `up` face uses a 73×66 region at v 132…198 of `floor_texture`, tiled from the original 66×66).
- Single-colour parts on meshes/cylinders: set every face UV to one swatch pixel via `risky_eval` (`f.uv[v]=[u,v]` then `m.preview_controller.updateUV(m)`).
- **Translucency**: Blockbench exports alpha as `MASK` (semi-transparent pixels become opaque). Name translucent parts `glass*` (or `sheer*` for thin fabric); `Room.tsx` switches them to alpha blending. Put the alpha in the texture. Blockbench's own viewport shows these nearly opaque — judge them in the browser.
- **Sidedness**: textures export double-sided by default. Parts meant to be seen only from inside the room (window glass, frame, curtains) use `render_sides: 'front'` on the texture and `texture: null` on faces pointing outside — the camera orbits around the room and sees through openings.

## Flow: add a new object
1. Gather real dimensions (product page / user's description), convert to px, pick the spot from the reference measurements and check it doesn't collide with existing objects. If the room is too small, extend it first (below).
2. Generate the texture PNG into `models-src/textures/<id>_texture.png`.
3. `create_project {name:<id>, format:'free'}` → `create_texture` → `add_group` (`<id>`, sub-groups) → `place_cube` / `place_mesh` / `create_cylinder` → `set_cube_uv` / `set_mesh_uv`.
4. Check it in Blockbench: `create_offscreen_view` + `set_camera_angle` (returns an image; doesn't move the user's camera).
5. Save the source: `export_model {codec_id:'project', path:'…/models-src/room/<id>.bbmodel', overwrite:true, max_content_length:0}`.
6. Export runtime: `export_model {codec_id:'gltf', options:{encoding:'binary', embed_textures:true, animations:<bool>, scale:16}, path:'…/public/models/room/<id>.glb', overwrite:true, max_content_length:0}`.
7. Add an entry to `src/lib/roomLayout.ts` (position in BB px, optional rotation in degrees, optional `animation`) with a short comment saying where it stands, and add it to the table above.
8. Verify (below).

## Flow: edit an existing object
1. Open it: `risky_eval` → `Blockbench.read(['<abs path>/models-src/room/<id>.bbmodel'], {}, f => loadModelFile(f[0]))`.
2. Edit in place where possible (`modify_cube`, `move_mesh_vertices` — offsets are in the mesh's local space, `set_cube_uv`, `rename_element`) or rebuild the object from a script when proportions change a lot (e.g. a 25% wider container: regenerate texture + rebuild).
3. If a texture PNG changed on disk, reload it in the open project: `Texture.all.find(t=>t.name==='<name>').fromPath('<abs path>')`.
4. Export **both** `.bbmodel` and `.glb` (steps 5–6 above); update `roomLayout.ts` if the footprint/position changed.

## Flow: change the room size
`room_shell` holds the floor cube, the window-wall mesh (inside group `wall2`, rotated 90° — its local z maps to world x; the end at x=-44 is local z=-40), the skirting cubes and the back wall. Move the wall-end vertices with `move_mesh_vertices`, change floor/skirting `from`/`to` with `modify_cube`, extend the floor texture region and remap the `up` face, then update the measurements in this file.

## Verify
- `npm run lint`, `npm run build`.
- Dev preview (`preview_start` name `dev`): reload, check console/network for model load errors (each `.glb` should load once), screenshot the scene. Orbit with drag and zoom out with wheel to frame the object; the user may be moving the camera at the same time — take screenshot + zoom in one `browser_batch`.
- For parts with sidedness/translucency, look from inside **and** from outside the room.
- Leva (Shift ×3) → Physics → Debug Rigidbody shows colliders.

Always commit the `.bbmodel`, the `.glb` and any texture together so they never drift apart.
