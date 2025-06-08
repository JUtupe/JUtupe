import type {Vector3Tuple} from 'three'
import * as THREE from 'three'
import React, {createRef, type RefObject, useMemo, useRef} from 'react'
import {useGLTF} from '@react-three/drei'
import type {GLTF} from 'three-stdlib'
import {CylinderCollider, RapierRigidBody, RigidBody} from '@react-three/rapier'
import {AxleJoint, SteeredJoint} from '../util/joints'

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

export function Truck({position}: { position: Vector3Tuple }) {
  const {nodes} = useGLTF('/models/truck.gltf') as unknown as GLTFResult

  const wheels: WheelInfo[] = useMemo(() => {
    return ([
      {
        axlePosition: [-1.15, axleY, 0.7],
        wheelPosition: [-1.2, wheelY, 1],
        isSteered: true,
        side: 'left',
        isDriven: false,
      },
      {
        axlePosition: [-1.15, axleY, -0.7],
        wheelPosition: [-1.2, wheelY, -1],
        isSteered: true,
        side: 'right',
        isDriven: false,
      },
      {
        axlePosition: [0.9, axleY, 0.7],
        wheelPosition: [1.2, wheelY, 1],
        isSteered: false,
        side: 'left',
        isDriven: true,
      },
      {
        axlePosition: [0.9, axleY, -0.7],
        wheelPosition: [1.2, wheelY, -1],
        isSteered: false,
        side: 'right',
        isDriven: true,
      },
    ])
  }, [])

  const chassisRef = useRef<RapierRigidBody>(null!)
  const wheelRefs = useRef(wheels.map(() => createRef())) as RefObject<RefObject<RapierRigidBody>[]>

  return (
    <group>
      {/* chassis */}
      <RigidBody ref={chassisRef} colliders="trimesh" type={'dynamic'} position={position} mass={5}>
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
            <CylinderCollider mass={0.5} friction={1.5} args={[0.125, 0.32]} rotation={[-Math.PI / 2, 0, 0]}/>
          </RigidBody>

          {wheel.isSteered ? (
            <SteeredJoint
              body={chassisRef}
              wheel={wheelRefs.current[i]}
              bodyAnchor={wheel.axlePosition}
              wheelAnchor={[0, 0, 0]}
              rotationAxis={[0, 1, 0]}
            />
          ) : (
            <AxleJoint
              body={chassisRef}
              wheel={wheelRefs.current[i]}
              bodyAnchor={wheel.axlePosition}
              wheelAnchor={[0, 0, 0]}
              rotationAxis={[0, 0, 1]}
              isDriven={wheel.isDriven}
            />
          )}
        </React.Fragment>
      ))}
    </group>
  )
}

const vec3 = {
  add: (a: Vector3Tuple, b: Vector3Tuple) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]] as Vector3Tuple,
}

useGLTF.preload('/truck.gltf')
