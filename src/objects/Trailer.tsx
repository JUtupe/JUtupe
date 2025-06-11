import {AxleJoint} from '../util/joints';
import {CylinderCollider, RapierRigidBody, RigidBody, type RigidBodyProps} from '@react-three/rapier';
import {createRef, type RefObject, useRef} from 'react'
import {useGLTF} from '@react-three/drei'
import type {GLTF} from "three-stdlib";
import * as THREE from 'three'

type GLTFResult = GLTF & {
  nodes: {
    cuboid: THREE.Mesh
    cuboid_1: THREE.Mesh
    cuboid_2: THREE.Mesh
    cuboid_3: THREE.Mesh
    cuboid_4: THREE.Mesh
    front_left_wheel: THREE.Mesh
    back_left_wheel: THREE.Mesh
    back_right_wheel: THREE.Mesh
    front_right_wheel: THREE.Mesh
    cuboid_5: THREE.Mesh
    cuboid_6: THREE.Mesh
    cuboid_7: THREE.Mesh
    cuboid_8: THREE.Mesh
    cuboid_9: THREE.Mesh
    cuboid_10: THREE.Mesh
    cuboid_11: THREE.Mesh
    cuboid_12: THREE.Mesh
    cuboid_13: THREE.Mesh
    cuboid_14: THREE.Mesh
    cuboid_15: THREE.Mesh
    cuboid_16: THREE.Mesh
    cuboid_17: THREE.Mesh
    cuboid_18: THREE.Mesh
    cuboid_19: THREE.Mesh
  }
  materials: object
}

export function Trailer(props: RigidBodyProps) {
  const {nodes} = useGLTF('./models/trailer.gltf') as unknown as GLTFResult
  const rigid = useRef<RapierRigidBody>(null!);
  // Wheel positions and rotation info
  const wheelData = [
    {
      name: 'front_left_wheel',
      position: [-0.656, 0.125, 4.75],
      rotation: [0, 0, Math.PI / 2],
      axleOffset: [-0.656, 0.125, 4.75],
    },
    {
      name: 'back_left_wheel',
      position: [-0.656, 0.125, 5.5],
      rotation: [0, 0, Math.PI / 2],
      axleOffset: [-0.656, 0.125, 5.5],
    },
    {
      name: 'back_right_wheel',
      position: [0.656, 0.125, 5.5],
      rotation: [0, 0, -Math.PI / 2],
      axleOffset: [0.656, 0.125, 5.5],
    },
    {
      name: 'front_right_wheel',
      position: [0.656, 0.125, 4.75],
      rotation: [0, 0, -Math.PI / 2],
      axleOffset: [0.656, 0.125, 4.75],
    },
  ];
  const wheelRefs = useRef(wheelData.map(() => createRef())) as RefObject<RefObject<RapierRigidBody>[]>

  return (
    <RigidBody
      {...props}
      linearDamping={0.8}
      angularDamping={0.95}
      friction={1}
      restitution={0.1}
      colliders={false}
    >
      <RigidBody colliders={'trimesh'} ref={rigid}>
        <group name="trailer" position={[0, 0, 0.125]}>
          <group name="trailer_body" position={[0, 0, -0.125]}>
            <mesh
              name="cuboid"
              geometry={nodes.cuboid.geometry}
              material={nodes.cuboid.material}
              position={[0, 0.688, 0.563]}
            />
            <group name="doors">
              <mesh
                name="cuboid_1"
                geometry={nodes.cuboid_1.geometry}
                material={nodes.cuboid_1.material}
                position={[-0.188, 0.713, 6.188]}
              />
              <mesh
                name="cuboid_2"
                geometry={nodes.cuboid_2.geometry}
                material={nodes.cuboid_2.material}
                position={[-0.438, 0.713, 6.188]}
              />
              <mesh
                name="cuboid_3"
                geometry={nodes.cuboid_3.geometry}
                material={nodes.cuboid_3.material}
                position={[0.188, 0.713, 6.188]}
              />
              <mesh
                name="cuboid_4"
                geometry={nodes.cuboid_4.geometry}
                material={nodes.cuboid_4.material}
                position={[0.438, 0.713, 6.188]}
              />
            </group>
          </group>
          <group name="leg" position={[0, 0.625, 1.563]} rotation={[0, 0, 0]}>
            <mesh
              name="cuboid_5"
              geometry={nodes.cuboid_5.geometry}
              material={nodes.cuboid_5.material}
              position={[0, -0.25, 0]}
            />
            <mesh
              name="cuboid_6"
              geometry={nodes.cuboid_6.geometry}
              material={nodes.cuboid_6.material}
              position={[-0.438, -0.375, 0]}
            />
            <mesh
              name="cuboid_7"
              geometry={nodes.cuboid_7.geometry}
              material={nodes.cuboid_7.material}
              position={[0.438, -0.375, 0]}
            />
          </group>
          <group name="fence" position={[0, 0, -0.125]}>
            <mesh
              name="cuboid_8"
              geometry={nodes.cuboid_8.geometry}
              material={nodes.cuboid_8.material}
              position={[-1.063, 0.188, 2.813]}
            />
            <mesh
              name="cuboid_9"
              geometry={nodes.cuboid_9.geometry}
              material={nodes.cuboid_9.material}
              position={[-1.125, 0.25, 3.313]}
            />
            <mesh
              name="cuboid_10"
              geometry={nodes.cuboid_10.geometry}
              material={nodes.cuboid_10.material}
              position={[-1.125, 0, 3.313]}
            />
            <mesh
              name="cuboid_11"
              geometry={nodes.cuboid_11.geometry}
              material={nodes.cuboid_11.material}
              position={[-1.063, 0.188, 3.875]}
            />
            <mesh
              name="cuboid_12"
              geometry={nodes.cuboid_12.geometry}
              material={nodes.cuboid_12.material}
              position={[1.063, 0.188, 3.875]}
            />
            <mesh
              name="cuboid_13"
              geometry={nodes.cuboid_13.geometry}
              material={nodes.cuboid_13.material}
              position={[1.125, 0, 3.313]}
            />
            <mesh
              name="cuboid_14"
              geometry={nodes.cuboid_14.geometry}
              material={nodes.cuboid_14.material}
              position={[1.063, 0.188, 2.813]}
            />
            <mesh
              name="cuboid_15"
              geometry={nodes.cuboid_15.geometry}
              material={nodes.cuboid_15.material}
              position={[1.125, 0.25, 3.313]}
            />
          </group>
          <group name="structure" position={[0, 0, -0.125]}>
            <mesh
              name="cuboid_16"
              geometry={nodes.cuboid_16.geometry}
              material={nodes.cuboid_16.material}
              position={[0, 0.625, 0.563]}
            />
            <mesh
              name="cuboid_17"
              geometry={nodes.cuboid_17.geometry}
              material={nodes.cuboid_17.material}
              position={[0, 0.625, 0.563]}
            />
            <mesh
              name="cuboid_18"
              geometry={nodes.cuboid_18.geometry}
              material={nodes.cuboid_18.material}
              position={[0, 0.625, 0.563]}
            />
            <mesh
              name="cuboid_19"
              geometry={nodes.cuboid_19.geometry}
              material={nodes.cuboid_19.material}
              position={[0, 0.625, 0.563]}
            />
          </group>
        </group>
      </RigidBody>
      <group name="trailer_wheels" position={[0, 0, 0.125]}>
        {wheelData.map((wheel, i) => (
          <RigidBody
            key={wheel.name}
            ref={wheelRefs.current[i]}
            position={wheel.position as [number, number, number]}
            colliders={false}
            mass={0.2}
            restitution={0}
          >
            <mesh
              name={wheel.name}
              geometry={nodes[wheel.name as keyof typeof nodes].geometry}
              material={nodes[wheel.name as keyof typeof nodes].material}
              rotation={wheel.rotation as [number, number, number]}
            />
            <CylinderCollider mass={0.5} friction={1.5} args={[0.125, 0.32]} rotation={[0, 0, -Math.PI / 2]}/>
          </RigidBody>
        ))}
        {/* Axle joints */}
        {wheelData.map((wheel, i) => (
          <AxleJoint
            key={wheel.name + '-joint'}
            body={rigid}
            wheel={wheelRefs.current[i]}
            bodyAnchor={wheel.axleOffset as [number, number, number]}
            wheelAnchor={[0, 0, 0]}
            rotationAxis={[1, 0, 0]}
            isDriven={false}
          />
        ))}
      </group>
    </RigidBody>
  )
}

useGLTF.preload('/trailer.gltf')
