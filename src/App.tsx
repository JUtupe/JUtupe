import { Canvas } from '@react-three/fiber'
import { KeyboardControls, OrbitControls, useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three';
import { EffectComposer, Noise, Pixelation, Vignette } from '@react-three/postprocessing'
import { Leva, useControls } from 'leva'
import { useEffect, useRef } from "react";
import { Physics, RigidBody, type RigidBodyProps } from '@react-three/rapier'
import { Truck } from "./objects/Truck.tsx";
import { Trailer } from "./objects/Trailer.tsx";
import {CONTROLS_MAP} from "./util/controls.ts";

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
        camera={{ position: [-2, 4, 2], fov: 50 }}
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
            <Room scale={20}/>

            <Truck position={[17, 23, 0]} />
            <Trailer position={[17, 23, 0]} rotation={[0, Math.PI / 2, 0]} />
          </KeyboardControls>
        </Physics>

        <OrbitControls
          makeDefault
          // maxDistance={9}
          minAzimuthAngle={-Infinity}
          maxAzimuthAngle={Infinity}
          minPolarAngle={-Math.PI / 2}
          maxPolarAngle={Math.PI / 2 - 0.1}
          target={[16, 24, 0]}
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
