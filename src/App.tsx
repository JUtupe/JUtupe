import './App.css'
import {Canvas, useFrame} from '@react-three/fiber'
import {OrbitControls, useAnimations, useGLTF} from '@react-three/drei'
import * as THREE from 'three';
import {EffectComposer, Noise, Pixelation, Vignette} from '@react-three/postprocessing'
import {Leva, useControls} from 'leva'
import {useEffect, useRef, useState} from "react";
import { Physics, RigidBody } from '@react-three/rapier'

function useTruckControls() {
  const [controls, setControls] = useState({forward: false, backward: false, left: false, right: false})

  useEffect(() => {
    const down = (e) => {
      if (e.repeat) return
      setControls(c => ({
        ...c,
        forward: e.key === 'w' ? true : c.forward,
        backward: e.key === 's' ? true : c.backward,
        left: e.key === 'a' ? true : c.left,
        right: e.key === 'd' ? true : c.right,
      }))
    }
    const up = (e) => {
      setControls(c => ({
        ...c,
        forward: e.key === 'w' ? false : c.forward,
        backward: e.key === 's' ? false : c.backward,
        left: e.key === 'a' ? false : c.left,
        right: e.key === 'd' ? false : c.right,
      }))
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)

    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  return controls
}

function Room(props) {
  const group = useRef(null)
  const {scene, animations} = useGLTF('/models/room.gltf')
  const {actions} = useAnimations(animations, group)

  useEffect(() => {
    actions['chairanimation']?.play()
  }, [actions])

  return (
    <group ref={group} {...props}>
        <RigidBody
          type="fixed"
        >
          <primitive object={scene}/>
        </RigidBody>
    </group>
  )
}

function Truck(props) {
  const {scene} = useGLTF('/models/truck.gltf')
  const ref = useRef<THREE.Group>(null)
  const controls = useTruckControls()
  const rigid = useRef<any>(null)
  const [state, setState] = useState({
    position: new THREE.Vector3(0, 1.2, 0),
    rotation: 0,
    velocity: 0
  })

  useFrame((_, delta) => {
    if (!rigid.current) return

    const rb = rigid.current
    const pos = rb.translation()
    const rot = rb.rotation()
    let velocity = state.velocity

    const ACC = 1
    const MAX_SPEED = 2
    const ROT_SPEED = 1.5
    const FRICTION = 4

    // Poprawka: przechowuj yaw osobno, nie wyliczaj z rotacji fizyki
    let yaw = state.rotation

    // Skręcanie tylko podczas jazdy
    let turning = 0
    if ((controls.forward || controls.backward) && controls.left)
      turning = 1
    if ((controls.forward || controls.backward) && controls.right)
      turning = -1

    // Zmieniaj yaw tylko gdy się porusza
    if (turning !== 0 && velocity !== 0) {
      // Skręcanie zależne od kierunku jazdy
      yaw += ROT_SPEED * delta * turning * Math.sign(velocity)
    }

    // Przyspieszanie/hamowanie
    if (controls.forward) velocity += ACC * delta
    if (controls.backward) velocity -= ACC * delta
    velocity = Math.max(Math.min(velocity, MAX_SPEED), -MAX_SPEED / 2)

    // Kierunek jazdy zgodny z yaw
    const direction = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw))
    rb.setLinvel({
      x: direction.x * velocity,
      y: rb.linvel().y,
      z: direction.z * velocity
    }, true)
    rb.setAngvel({x: 0, y: 0, z: 0}, true)
    rb.setRotation({x: 0, y: yaw + Math.PI, z: 0, w: 1}, true)

    // Friction
    if (!controls.forward && !controls.backward) {
      if (Math.abs(velocity) < 0.1) velocity = 0
      else velocity -= FRICTION * delta * Math.sign(velocity)
    }

    setState({
      position: new THREE.Vector3(pos.x, pos.y, pos.z),
      rotation: yaw,
      velocity
    })

    // Koła
    if (ref.current) {
      const wheelsGroup = ref.current.getObjectByName('wheels')
      if (wheelsGroup) {
        const wheelNames = [
          'front_left_wheel',
          'front_right_wheel',
          'back_left_wheel',
          'back_right_wheel'
        ]
        const steerAngle = ((controls.left ? 1 : 0) - (controls.right ? 1 : 0)) * 0.5 * ((controls.forward || controls.backward) ? 1 : 0)
        wheelNames.forEach(name => {
          const wheel = wheelsGroup.getObjectByName(name)
          if (wheel) {
            if (name.startsWith('front')) {
              wheel.rotation.y = steerAngle
            } else {
              wheel.rotation.y = 0
            }
          }
        })
      }
    }
  })

  return (
    <RigidBody
      {...props}
      ref={rigid}
      linearDamping={0.8}
      angularDamping={0.95}
      friction={1}
      restitution={0.1}
    >
      <primitive ref={ref} object={scene}  />
    </RigidBody>
  )
}

function Trailer(props) {
  const {scene} = useGLTF('/models/trailer.gltf')
  const ref = useRef<THREE.Group>(null)
  const rigid = useRef<any>(null)

  return (
    <RigidBody
      {...props}
      ref={rigid}
      linearDamping={0.8}
      angularDamping={0.95}
      friction={1}
      restitution={0.1}
    >
      <primitive ref={ref} object={scene} />
    </RigidBody>
  )
}

function App() {
  const {grain, vignette, pixelation} = useControls('Effects', {
    grain: {value: false, label: 'Grain'},
    vignette: {value: false, label: 'Vignette'},
    pixelation: {value: false, label: 'Pixelation'}
  })

  return (
    <div className={'h-screen w-screen'} style={{position: 'relative'}}>
      <Leva collapsed/>
      <Canvas
        camera={{position: [0, 5, -10], fov: 50}}
        onCreated={({camera}) => camera.lookAt(0, 6, 0)}
        shadows
        style={{background: 'lightblue'}}
      >
        <Physics gravity={[0, -9.81, 0]}>
          <ambientLight intensity={0.3}/>
          <directionalLight position={[1, 1, 1]} color={'white'}/>

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[20, 20]}/>
            <meshStandardMaterial color={"lightgreen"} side={THREE.DoubleSide}/>
          </mesh>

          <Room/>
          <Truck position={[1, 1.14, 0]} scale={0.05}/>
          <Trailer position={[1.3, 1.14, 0]} scale={0.05} rotation={[0, Math.PI / 2, 0]}/>
        </Physics>

        <OrbitControls
          makeDefault
          // enablePan={false}
          // minDistance={2.5}
          maxDistance={9}
          minAzimuthAngle={-Infinity}
          maxAzimuthAngle={Infinity}
          minPolarAngle={-Math.PI / 2}
          maxPolarAngle={Math.PI / 2 - 0.1}
          target={[0, 0.9, 0]}
        />
        <EffectComposer>
          <>
            {vignette && <Vignette/>}
            {pixelation && <Pixelation/>}
            {grain && <Noise opacity={0.02}/>}
          </>
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default App

