import './App.css'
import {Canvas} from '@react-three/fiber'
import {OrbitControls, useAnimations, useGLTF} from '@react-three/drei'
import * as THREE from 'three';
import {EffectComposer, Noise, Pixelation, Vignette} from '@react-three/postprocessing'
import {Leva, useControls} from 'leva'
import {useEffect, useRef} from "react";

function Room() {
  const group = useRef(null)
  const {scene, animations} = useGLTF('/models/room.gltf')
  const { actions } = useAnimations(animations, group)


  useEffect(() => {
    actions['chairanimation']?.play()
  }, [actions])

  return <group ref={group}>
    <primitive object={scene} />
  </group>
}

function App() {
  const {grain, vignette, pixelation} = useControls('Efekty', {
    grain: { value: false, label: 'Grain' },
    vignette: { value: false, label: 'Vignette' },
    pixelation: { value: false, label: 'Pixelation' }
  })

  return (
    <div className={'h-screen w-screen'} style={{position: 'relative'}}>
      <Leva collapsed />
      <Canvas
        camera={{position: [0, 5, -10], fov: 50}}
        onCreated={({camera}) => camera.lookAt(0, 6, 0)}
        shadows
        style={{background: 'lightblue'}}
      >
        <ambientLight intensity={0.3}/>
        <directionalLight position={[1, 1, 1]} color={'white'}/>

        {/*<mesh>*/}
        {/*  <sphereGeometry args={[10, 24, 24]}/>*/}
        {/*  <meshStandardMaterial color={"lightblue"} side={THREE.DoubleSide}/>*/}
        {/*</mesh>*/}

        <mesh rotateY={45} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[20, 20]}/>
          <meshStandardMaterial color={"lightgreen"} side={THREE.DoubleSide}/>
        </mesh>

        <Room/>

        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={2.5}
          maxDistance={9}
          minAzimuthAngle={-Infinity}
          maxAzimuthAngle={Infinity}
          minPolarAngle={-Math.PI / 2}
          maxPolarAngle={Math.PI / 2 - 0.1}
          target={[0, 0.9, 0]}
        />
        <EffectComposer>
          {vignette && <Vignette/>}
          {pixelation && <Pixelation/>}
          {grain && <Noise opacity={0.02}/>}
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default App
