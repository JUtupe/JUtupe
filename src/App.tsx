import './App.css'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls, OrbitControls, useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three';
import { EffectComposer, Noise, Pixelation, Vignette } from '@react-three/postprocessing'
import { Leva, useControls } from 'leva'
import { useEffect, useRef } from "react";
import { Physics, RigidBody, RapierRigidBody, type RigidBodyProps } from '@react-three/rapier'
import { TruckModel } from "./objects/Truck.tsx";

const CONTROLS = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  brake: 'brake',
}

export const CONTROLS_MAP = [
  { name: CONTROLS.forward, keys: ['ArrowUp', 'w', 'W'] },
  { name: CONTROLS.back, keys: ['ArrowDown', 's', 'S'] },
  { name: CONTROLS.left, keys: ['ArrowLeft', 'a', 'A'] },
  { name: CONTROLS.right, keys: ['ArrowRight', 'd', 'D'] },
  { name: CONTROLS.brake, keys: ['Space'] },
]


function Room(props: RigidBodyProps) {
  const group = useRef(null)
  const { scene, animations } = useGLTF('/models/room.gltf')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions['chairanimation']?.play()
  }, [actions])

  return (
    <RigidBody
      {...props}
      ref={group}
      type="fixed"
    >
      <primitive object={scene} />
    </RigidBody>
  )
}

function Trailer(props: RigidBodyProps) {
  const { scene } = useGLTF('/models/trailer.gltf')
  const rigid = useRef<RapierRigidBody>(null)

  return (
    <RigidBody
      {...props}
      ref={rigid}
      linearDamping={0.8}
      angularDamping={0.95}
      friction={1}
      restitution={0.1}
    >
      <primitive object={scene} />
    </RigidBody>
  )
}

function App() {
  const { grain, vignette, pixelation } = useControls('Effects', {
    grain: { value: false, label: 'Grain' },
    vignette: { value: false, label: 'Vignette' },
    pixelation: { value: false, label: 'Pixelation' }
  })

  const { debug } = useControls('Physics', {
    debug: { value: true, label: 'Debug Rigidbody' }
  })

  return (
    <div className={'h-screen w-screen'} style={{ position: 'relative' }}>
      <Leva />
      <Canvas
        camera={{ position: [-2, 2.5, 2], fov: 50 }}
        shadows
        style={{ background: 'lightblue' }}
      >
        <Physics debug={debug}>

          <ambientLight intensity={0.3} />
          <directionalLight position={[1, 1, 1]} color={'white'} />

          <RigidBody>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color={"lightgreen"} side={THREE.DoubleSide} />
            </mesh>
          </RigidBody>

          <KeyboardControls map={CONTROLS_MAP}>

            {/* <Room /> */}
              
            <TruckModel position={[1, 1.14, 0]} scale={0.3

            } />
            <Trailer position={[1.3, 1.14, 0]} scale={0.05} rotation={[0, Math.PI / 2, 0]} />
          </KeyboardControls>
        </Physics>

        <OrbitControls
          makeDefault
          // maxDistance={9}
          minAzimuthAngle={-Infinity}
          maxAzimuthAngle={Infinity}
          minPolarAngle={-Math.PI / 2}
          maxPolarAngle={Math.PI / 2 - 0.1}
          target={[1, 1.14, 0]}
        />
        <EffectComposer>
          <>
            {vignette && <Vignette />}
            {pixelation && <Pixelation />}
            {grain && <Noise opacity={0.02} />}
          </>
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default App

