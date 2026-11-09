import {useEffect, useMemo, useRef} from "react";
import * as THREE from "three";
import {useAnimations, useGLTF} from "@react-three/drei";
import {RigidBody, type RigidBodyProps} from "@react-three/rapier";
import type {GLTF} from "three-stdlib";
import {BB_UNIT, roomLayout, roomModelUrl, type RoomObjectDef} from "../lib/roomLayout.ts";

const DEG = Math.PI / 180

/**
 * Blockbench exports every material with alphaMode MASK, which renders semi-transparent pixels as opaque.
 * Meshes named `glass*` or `sheer*` are switched to real alpha blending. Face sidedness is kept from the
 * export (texture "Render Sides" in Blockbench: front = visible from one side only).
 */
const TRANSLUCENT_MESH = /^(glass|sheer)/

function applyTranslucency(root: THREE.Object3D) {
  root.traverse(obj => {
    if (!(obj instanceof THREE.Mesh) || !TRANSLUCENT_MESH.test(obj.name)) return
    const material = (obj.material as THREE.MeshStandardMaterial).clone()
    material.transparent = true
    material.alphaTest = 0
    material.depthWrite = false
    obj.material = material
    obj.renderOrder = 1
  })
}

function RoomObject({def, gltf}: { def: RoomObjectDef, gltf: GLTF }) {
  const group = useRef<THREE.Group>(null)
  const {actions} = useAnimations(gltf.animations, group)

  useMemo(() => applyTranslucency(gltf.scene), [gltf.scene])

  useEffect(() => {
    if (def.animation) actions[def.animation]?.play()
  }, [actions, def.animation])

  const [x, y, z] = def.position
  const [rx, ry, rz] = def.rotation ?? [0, 0, 0]

  return (
    <group
      ref={group}
      name={def.id}
      position={[x * BB_UNIT, y * BB_UNIT, z * BB_UNIT]}
      rotation={[rx * DEG, ry * DEG, rz * DEG]}
    >
      <primitive object={gltf.scene}/>
    </group>
  )
}

const urls = roomLayout.map(def => roomModelUrl(def.id))

export function Room(props: RigidBodyProps) {
  // Load everything up-front so the RigidBody mounts once with all meshes (colliders are generated on mount).
  const gltfs = useGLTF(urls)

  return (
    <RigidBody {...props} type="fixed">
      {roomLayout.map((def, i) => (
        <RoomObject key={def.id} def={def} gltf={gltfs[i]}/>
      ))}
    </RigidBody>
  )
}

// Same cache key as useGLTF(urls) above, so each model is fetched once.
useGLTF.preload(urls)
