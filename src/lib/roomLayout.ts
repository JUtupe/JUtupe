/**
 * Room composition. Each entry is one Blockbench model built from `models-src/room/<id>.bbmodel`
 * and exported to `public/models/room/<id>.glb`.
 *
 * Positions/rotations are in Blockbench units (16 px = 1 three.js unit) and degrees, so values can be
 * copied straight from Blockbench. A model's local origin (0,0,0) is the point that sits on `position`.
 */
export type RoomObjectDef = {
  id: string
  /** Position in Blockbench pixels. */
  position: [number, number, number]
  /** Rotation in degrees (XYZ). */
  rotation?: [number, number, number]
  /** Animation clip played on loop, if any. */
  animation?: string
}

export const BB_UNIT = 1 / 16

export const roomLayout: RoomObjectDef[] = [
  {id: 'room_shell', position: [0, 0, 0]},
  {id: 'desk', position: [-4, 0, 3]},
  // Herman Miller Aeron Classic B in front of the long wing, facing the monitor (+x); arms clear the desk top.
  {id: 'aeron', position: [-2, 0, 9], rotation: [0, 90, 0]},
  // Wall-mounted: the arm's plate touches the back wall (x 25).
  {id: 'monitor', position: [23, 18, 9]},
  // Three square picture frames on the back wall above the monitor, facing the room.
  {id: 'wall_frames', position: [25, 38, 9], rotation: [0, -90, 0]},
  // DeepCool CH170 Digital in the desk corner behind the laptop, display base facing the printer (-x).
  {id: 'pc_tower', position: [21, 18, -18.25], rotation: [0, -90, 0]},
  {id: 'keyboard', position: [13, 18, 9]},
  {id: 'mouse', position: [13, 18, 22]},
  {id: 'pc', position: [13, 18, -8]},
  {id: 'accessory', position: [-7, 18, -17]},
  {id: 'printer', position: [-25, 13, -15]},
  // Next to the printer stand, on the window-wall side (x -43…-31, z -19…-4), door facing the room.
  {id: 'container', position: [-37, 0, -11.5]},
  // Bambu Lab P1S + AMS standing on the container top (y 13).
  {id: 'printer_3d', position: [-37, 13, -11.5]},
  {id: 'suitcase', position: [-11, 0, -12]},
  {id: 'papers', position: [-7, 18, -9]},
  // Black classical guitar on a floor stand, right of the monitor past the desk's long wing, facing the chair.
  {id: 'guitar', position: [18, 0, 32], rotation: [0, -100, 0]},
  // Bottom-centre of the window opening, on the inner face of the side wall.
  {id: 'window', position: [-4, 25, -25]},
]

export const roomModelUrl = (id: string) => `/models/room/${id}.glb`
