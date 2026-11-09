import * as React from "react";
import {Leva, useControls} from "leva";
import {Canvas} from "@react-three/fiber";
import {Physics} from "@react-three/rapier";
import {OrbitControls} from "@react-three/drei";
import {Bloom, ChromaticAberration, EffectComposer, Noise, Pixelation, Vignette} from "@react-three/postprocessing";
import {Vector2} from "three";
import {Room} from "./Room.tsx";
import {useMultiKeyPress} from "../hooks/useMultiKeyPress.ts";

export const Scene: React.FC = () => {
  const {grain, vignette, pixelation, bloom, aberration} = useControls('Effects', {
    grain: {value: true, label: 'Grain'},
    vignette: {value: true, label: 'Vignette'},
    pixelation: {value: false, label: 'Pixelation'},
    bloom: {value: true, label: 'Bloom'},
    aberration: {value: true, label: 'Chromatic aberration'},
  })

  const aberrationOffset = React.useMemo(() => new Vector2(0.0008, 0.0006), [])

  const {debug} = useControls('Physics', {
    debug: {value: false, label: 'Debug Rigidbody'}
  })

  const [isLoaded, setIsLoaded] = React.useState(false);
  const debugEnabled = useMultiKeyPress('Shift', 3);

  return (
    <div className={'w-full h-full relative select-none'}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative h-16 w-16 flex items-center justify-center">
            <div className="absolute animate-spin-reverse rounded-full h-20 w-20 border-4 border-amber-300 border-b-transparent neon-glow-amber" style={{animationDuration: '1.2s'}} />
            <div className="absolute animate-spin rounded-full h-16 w-16 border-4 border-amber-300 border-t-transparent" style={{animationDuration: '1.2s'}} />
            <div className="absolute animate-spin-reverse rounded-full h-10 w-10 border-12 border-amber-300 border-b-transparent" style={{animationDuration: '1.2s'}} />
          </div>
        </div>
      )}

      <Leva hidden={!debugEnabled}/>

      <Canvas
        camera={{position: [-2, 2.5, 2], fov: 50}}
        onCreated={({camera}) => {camera.lookAt(0, 6, 0); setIsLoaded(true);}}
        shadows
      >
        <Physics gravity={[0, -9.81, 0]} debug={debug}>
          <ambientLight intensity={0.6}/>
          <directionalLight position={[1, 1, 1]} color={'white'} intensity={1.5}/>
          <Room/>
        </Physics>
        <OrbitControls
          makeDefault
          maxDistance={9}
          minAzimuthAngle={-Infinity}
          maxAzimuthAngle={Infinity}
          minPolarAngle={-Math.PI / 2}
          maxPolarAngle={Math.PI / 2 - 0.1}
          target={[0, 0.9, 0]}
        />
        <EffectComposer>
          <>
            {bloom && <Bloom luminanceThreshold={0.75} luminanceSmoothing={0.2} intensity={0.6} mipmapBlur/>}
            {aberration && <ChromaticAberration offset={aberrationOffset} radialModulation={false} modulationOffset={0}/>}
            {vignette && <Vignette offset={0.3} darkness={0.5}/>}
            {pixelation && <Pixelation/>}
            {grain && <Noise opacity={0.035}/>}
          </>
        </EffectComposer>
      </Canvas>
    </div>
  )
}
