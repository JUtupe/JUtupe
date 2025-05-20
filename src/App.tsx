import './App.css'
import {Canvas, useFrame} from '@react-three/fiber'
import {OrbitControls, useAnimations, useGLTF} from '@react-three/drei'
import * as THREE from 'three';
import {EffectComposer, Noise, Pixelation, Vignette} from '@react-three/postprocessing'
import {Leva, useControls} from 'leva'
import {useEffect, useRef} from "react";
import {Physics, RigidBody, RapierRigidBody, type RigidBodyProps} from '@react-three/rapier'
import {TruckModel} from "./objects/Truck.tsx";
import {useKeyboardControls} from "./hooks/useKeyboardControls.ts";
import {Vector3} from "three";

function Room(props: RigidBodyProps) {
  const group = useRef(null)
  const {scene, animations} = useGLTF('/models/room.gltf')
  const {actions} = useAnimations(animations, group)

  useEffect(() => {
    actions['chairanimation']?.play()
  }, [actions])

  return (
    <RigidBody
      {...props}
      ref={group}
      type="fixed"
    >
      <primitive object={scene}/>
    </RigidBody>
  )
}

const FORCE_MULTIPLIER = 0.0001

function Truck(props: RigidBodyProps) {
  const {scene} = useGLTF('/models/truck.gltf')
  const ref = useRef<THREE.Group>(null)
  const rigid = useRef<RapierRigidBody>(null)

  const controls = useKeyboardControls()

  useEffect(() => {
    if (rigid.current && controls.space) {
      rigid.current.setLinvel({x: 0, y: 0, z: 0}, true)
      rigid.current.resetForces(true)
      rigid.current.resetTorques(true)
      rigid.current.setRotation(new THREE.Quaternion(0, 0, 0, 1), true)
      rigid.current.setTranslation(new THREE.Vector3(1, 1.14, 0), true)
    }
  }, [controls.space])

  useEffect(() => {
    if (rigid.current) {
      rigid.current.setAdditionalMassProperties(rigid.current.mass(), new Vector3(0, -0.01, 0), new Vector3(0, 0, 0), {x: 0, y: 0, z: 0, w: 0}, true)
    }
  }, [rigid.current]);

  const {maxSpeed} = useControls('Drive', {
    maxSpeed: { value: 1, min: 0.1, max: 2, step: 0.1, label: 'Mak speed' },
  })

  const wheels = useRef<Record<string, THREE.Object3D>>({})
  const wheelHolders = useRef<Record<string, THREE.Object3D>>({})
  const steerAngleRef = useRef(0)

  useEffect(() => {
    const wheelsRoot = ref.current?.getObjectByName('wheels')
    if (wheelsRoot) {
      for (const holderName of [
        'front_left_wheel_holder',
        'front_right_wheel_holder'
      ]) {
        const holder = wheelsRoot.getObjectByName(holderName)
        if (holder) {
          wheelHolders.current[holderName] = holder
        }
      }
      for (const name of [
        'front_left_wheel',
        'front_right_wheel',
        'back_left_wheel',
        'back_right_wheel'
      ]) {
        const obj = wheelsRoot.getObjectByName(name)
        if (obj) {
          wheels.current[name] = obj
        }
      }
    }
  }, [scene])

  const wheelRotation = useRef(0)

  useFrame(() => {
    if (!rigid.current) return

    const impulse = maxSpeed
    let forward = 0
    if (controls.w) forward += 1 * FORCE_MULTIPLIER
    if (controls.s) forward -= 1 * FORCE_MULTIPLIER

    const body = rigid.current
    const quat = body.rotation()
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(new THREE.Quaternion(quat.x, quat.y, quat.z, quat.w))

    let steerInput = 0
    if (controls.a) steerInput += 1
    if (controls.d) steerInput -= 1

    const maxSteer = Math.PI / 7
    const steerTarget = steerInput * maxSteer
    steerAngleRef.current += (steerTarget - steerAngleRef.current) * 0.15

    if (forward !== 0 && Math.abs(steerAngleRef.current) > 0.001) {
      const turnRadius = 2.5 / Math.tan(steerAngleRef.current)
      const angularVelocity = (forward * impulse) / turnRadius
      const currentQuat = new THREE.Quaternion(quat.x, quat.y, quat.z, quat.w)
      const euler = new THREE.Euler().setFromQuaternion(currentQuat)
      euler.y += angularVelocity
      const newQuat = new THREE.Quaternion().setFromEuler(euler)
      body.setRotation({x: newQuat.x, y: newQuat.y, z: newQuat.z, w: newQuat.w}, false)
    }

    if (forward !== 0) {
      const force = dir.clone().multiplyScalar(impulse * forward)
      body.applyImpulse({x: force.x, y: 0, z: force.z}, true)
    }

    const frontSteer = steerAngleRef.current
    const holders = [
      {holder: 'front_left_wheel_holder', wheel: 'front_left_wheel'},
      {holder: 'front_right_wheel_holder', wheel: 'front_right_wheel'}
    ]
    for (const {holder} of holders) {
      const h = wheelHolders.current[holder]
      if (h) {
        h.rotation.y = frontSteer
      }
    }

    const linvel = body.linvel()
    const velocity = new THREE.Vector3(linvel.x, 0, linvel.z)
    const truckForward = dir.clone().setY(0).normalize()
    const speed = -velocity.dot(truckForward)
    const wheelCircumference = 1
    const rotationDelta = (speed / wheelCircumference) * 2 * Math.PI
    wheelRotation.current += rotationDelta

    for (const name of [
      'front_left_wheel',
      'front_right_wheel',
      'back_left_wheel',
      'back_right_wheel'
    ]) {
      const wheel = wheels.current[name]
      if (wheel) {
        wheel.rotation.x = wheelRotation.current
      }
    }
  })

  return (
    <RigidBody
      {...props}
      ref={rigid}
      friction={0.7}
      restitution={0.5}
      colliders={'trimesh'}
    >
      <TruckModel ref={ref}/>
    </RigidBody>
  )
}

function Trailer(props: RigidBodyProps) {
  const {scene} = useGLTF('/models/trailer.gltf')
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
      <primitive object={scene}/>
    </RigidBody>
  )
}

function App() {
  const {grain, vignette, pixelation} = useControls('Effects', {
    grain: {value: false, label: 'Grain'},
    vignette: {value: false, label: 'Vignette'},
    pixelation: {value: false, label: 'Pixelation'}
  })

  const {debug} = useControls('Physics', {
    debug: {value: true, label: 'Debug Rigidbody'}
  })

  return (
    <div className={'h-screen w-screen'} style={{position: 'relative'}}>
      <Leva collapsed/>
      <Canvas
        camera={{position: [-2, 2.5, 2], fov: 50}}
        onCreated={({camera}) => camera.lookAt(0, 6, 0)}
        shadows
        style={{background: 'lightblue'}}
      >
        <Physics gravity={[0, -9.81, 0]} debug={debug}>
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

