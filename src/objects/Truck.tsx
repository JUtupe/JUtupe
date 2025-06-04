import * as THREE from 'three'
import React, { createRef, useMemo, useRef, type RefObject } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { Vector3Tuple } from 'three'
import { CylinderCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { AxleJoint, FixedJoint, SteeredJoint } from '../util/joints'

type GLTFResult = GLTF & {
  nodes: {
    left_mirror: THREE.Mesh
    right_mirror: THREE.Mesh
    cuboid: THREE.Mesh
    front_left_wheel: THREE.Mesh
    back_right_wheel: THREE.Mesh
    back_left_wheel: THREE.Mesh
    front_right_wheel: THREE.Mesh
  }
  materials: object
}

type WheelInfo = {
  axlePosition: Vector3Tuple
  wheelPosition: Vector3Tuple
  isSteered: boolean
  side: 'left' | 'right'
  isDriven: boolean
}
const axleY = -0.1
const wheelY = -0.1

export function TruckModel({ position, scale }: { position: Vector3Tuple, scale: number }) {
  const { nodes } = useGLTF('/models/truck.gltf') as unknown as GLTFResult

  const wheels: WheelInfo[] = useMemo(() => {
    return ([
      {
        axlePosition: vec3.scale([-1.15, axleY, 0.7], scale),
        wheelPosition: vec3.scale([-1.2, wheelY, 1], scale),
        isSteered: true,
        side: 'left',
        isDriven: false,
      },
      {
        axlePosition: vec3.scale([-1.15, axleY, -0.7], scale),
        wheelPosition: vec3.scale([-1.2, wheelY, -1], scale),
        isSteered: true,
        side: 'right',
        isDriven: false,
      },
      {
        axlePosition: vec3.scale([0.9, axleY, 0.7], scale),
        wheelPosition: vec3.scale([1.2, wheelY, 1], scale),
        isSteered: false,
        side: 'left',
        isDriven: true,
      },
      {
        axlePosition: vec3.scale([0.9, axleY, -0.7], scale),
        wheelPosition: vec3.scale([1.2, wheelY, -1], scale),
        isSteered: false,
        side: 'right',
        isDriven: true,
      },
    ])
  }, [])

  const chassisRef = useRef<RapierRigidBody>(null!)
  const wheelRefs = useRef(wheels.map(() => createRef())) as RefObject<RefObject<RapierRigidBody>[]>
  const axleRefs = useRef(wheels.map(() => createRef())) as RefObject<RefObject<RapierRigidBody>[]>

  return (
    <group>
      {/* chassis */}
      <RigidBody ref={chassisRef} colliders="trimesh" type='fixed' scale={scale} position={position} mass={5} collisionGroups={0x0002_0001}>
        <group rotation={[0, Math.PI / 2, 0]}>
          <mesh
            name="left_mirror"
            castShadow
            receiveShadow
            geometry={nodes.left_mirror.geometry}
            material={nodes.left_mirror.material}
            position={[-0.625, 1.75, -1.813]}
            rotation={[0, 0.262, 0]}
          />
          <mesh
            name="right_mirror"
            castShadow
            receiveShadow
            geometry={nodes.right_mirror.geometry}
            material={nodes.right_mirror.material}
            position={[0.625, 1.75, -1.813]}
            rotation={[0, -0.262, 0]}
          />
          <mesh
            name="cuboid"
            castShadow
            receiveShadow
            geometry={nodes.cuboid.geometry}
            material={nodes.cuboid.material}
          />
        </group>
      </RigidBody>

      {wheels.map((wheel, i) => (
        <React.Fragment key={i}>
          {/* axle */}
          <RigidBody
            ref={axleRefs.current[i]}
            position={vec3.add(wheel.axlePosition, position)}
            colliders="cuboid"
            mass={0.2}
            collisionGroups={0x0004_0000}
            scale={scale}
          >
            <mesh rotation={[Math.PI / 2, 0, 0]} >
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
          </RigidBody>

          {/* wheel */}
          <RigidBody
            ref={wheelRefs.current[i]}
            position={vec3.add(wheel.wheelPosition, position)}
            colliders={false}
            mass={0.2}
            restitution={0}
            scale={scale}
            collisionGroups={0x0003_0001}
          >
            <mesh
              castShadow
              receiveShadow
              rotation-x={-Math.PI / 2}
              geometry={nodes.front_right_wheel.geometry}
              material={nodes.front_right_wheel.material}
            />
            <CylinderCollider mass={0.5} friction={1.5} args={[0.125, 0.32]} rotation={[-Math.PI / 2, 0, 0]} collisionGroups={0x0003_0001} />
          </RigidBody>

          {/* axle to chassis joint */}
          {!wheel.isSteered ? (
            <FixedJoint
              body={chassisRef}
              wheel={axleRefs.current[i]}
              body1Anchor={wheel.axlePosition}
              body1LocalFrame={[0, 0, 0, 1]}
              body2Anchor={[0, 0, 0]}
              body2LocalFrame={[0, 0, 0, 1]}
            />
          ) : (
            <SteeredJoint
              body={chassisRef}
              wheel={axleRefs.current[i]}
              bodyAnchor={wheel.axlePosition}
              wheelAnchor={[0, 0, 0]}
              rotationAxis={[0, 1, 0]}
            />
          )}

          {/* wheel to axle joint */}
          <AxleJoint
            body={axleRefs.current[i]}
            wheel={wheelRefs.current[i]}
            bodyAnchor={[0, 0, 0]}
            wheelAnchor={[0, 0, 0]}
            rotationAxis={[0, 0, 1]}
            isDriven={wheel.isDriven}
          />
        </React.Fragment>
      ))}
    </group>
  )
}

const vec3 = {
  add: (a: Vector3Tuple, b: Vector3Tuple) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]] as Vector3Tuple,
  scale: (a: Vector3Tuple, b: number) => [a[0] * b, a[1] * b, a[2] * b] as Vector3Tuple,
}

useGLTF.preload('/truck.gltf')
