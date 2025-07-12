import type {Vector3Tuple} from 'three'
import * as THREE from 'three'
import React, {createRef, type RefObject, useRef} from 'react'
import {useGLTF} from '@react-three/drei'
import type {GLTF} from 'three-stdlib'
import {CylinderCollider, RapierRigidBody, RigidBody} from '@react-three/rapier'
import {AxleJoint, FixedJoint, SteeredJoint} from '../util/joints'
import {vec3} from "../util/vec.ts";

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

const axleY = 0
const wheelY = 0
const wheels: WheelInfo[] = [
  {
    axlePosition: [-1.13, axleY, 0.7],
    wheelPosition: [-1.2, wheelY, 1],
    isSteered: true,
    side: 'left',
    isDriven: false,
  },
  {
    axlePosition: [-1.13, axleY, -0.7],
    wheelPosition: [-1.2, wheelY, -1],
    isSteered: true,
    side: 'right',
    isDriven: false,
  },
  {
    axlePosition: [0.935, axleY, 0.7],
    wheelPosition: [1.1, wheelY, 1],
    isSteered: false,
    side: 'left',
    isDriven: true,
  },
  {
    axlePosition: [0.935, axleY, -0.7],
    wheelPosition: [1.1, wheelY, -1],
    isSteered: false,
    side: 'right',
    isDriven: true,
  },
]
export function Truck({position, scale, trailerJointRef}: { position: Vector3Tuple, scale?: number, trailerJointRef?: React.RefObject<RapierRigidBody> }) {
  const {nodes} = useGLTF('/models/truck.gltf') as unknown as GLTFResult

  const chassisRef = useRef<RapierRigidBody>(null!)
  const wheelRefs = useRef(wheels.map(() => createRef())) as RefObject<RefObject<RapierRigidBody>[]>
  const axleRefs = useRef(wheels.map(() => createRef())) as RefObject<RefObject<RapierRigidBody>[]>

  return (
    <group>
      {/* chassis */}
      <RigidBody ref={chassisRef} colliders="trimesh" position={position} mass={5}>
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

      <RigidBody ref={trailerJointRef} position={vec3.add([0.5, 0.505, 0], position)} colliders="cuboid">
        <mesh>
          <boxGeometry args={[1, 0.01, 1]}/>
          <meshStandardMaterial color="#FFFFFF" visible={false}/>
        </mesh>
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
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.4, 0.3, 0.4]} />
              <meshStandardMaterial color="#FFFFFF" visible={false}/>
            </mesh>
          </RigidBody>

          {/* wheel */}
          <RigidBody
            ref={wheelRefs.current[i]}
            position={vec3.add(wheel.wheelPosition, position)}
            colliders={false}
            mass={0.2}
            restitution={0}
          >
            <mesh
              castShadow
              receiveShadow
              rotation-x={wheel.side === "right" ? -Math.PI / 2 : Math.PI / 2}
              geometry={nodes.front_right_wheel.geometry}
              material={nodes.front_right_wheel.material}
            />
            <CylinderCollider mass={0.5} friction={5} args={[0.125, 0.32]} rotation={[-Math.PI / 2, 0, 0]}/>
          </RigidBody>

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

useGLTF.preload('/truck.gltf')
