import { CylinderCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'
import React, {type RefObject, createRef, useRef } from 'react'
import { type Vector3Tuple } from 'three'
import { AxleJoint, FixedJoint, SteeredJoint } from '../util/joints'

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

type WheelInfo = {
    axlePosition: Vector3Tuple
    wheelPosition: Vector3Tuple
    isSteered: boolean
    side: 'left' | 'right'
    isDriven: boolean
}

const axleY = -0.6
const wheelY = -0.6
const wheels: WheelInfo[] = [
    {
        axlePosition: [-1.2, axleY, 0.7],
        wheelPosition: [-1.2, wheelY, 1],
        isSteered: true,
        side: 'left',
        isDriven: false,
    },
    {
        axlePosition: [-1.2, axleY, -0.7],
        wheelPosition: [-1.2, wheelY, -1],
        isSteered: true,
        side: 'right',
        isDriven: false,
    },
    {
        axlePosition: [1.2, axleY, 0.7],
        wheelPosition: [1.2, wheelY, 1],
        isSteered: false,
        side: 'left',
        isDriven: true,
    },
    {
        axlePosition: [1.2, axleY, -0.7],
        wheelPosition: [1.2, wheelY, -1],
        isSteered: false,
        side: 'right',
        isDriven: true,
    },
]

const vec3 = {
    add: (a: Vector3Tuple, b: Vector3Tuple) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]] as Vector3Tuple,
}

type RevoluteJointVehicleProps = {
    position: Vector3Tuple
}

export const RevoluteJointVehicle = ({ position }: RevoluteJointVehicleProps) => {
    const chassisRef = useRef<RapierRigidBody>(null!)

    const wheelRefs = useRef(wheels.map(() => createRef())) as RefObject<RefObject<RapierRigidBody>[]>
    const axleRefs = useRef(wheels.map(() => createRef())) as RefObject<RefObject<RapierRigidBody>[]>


    return (
        <>

            <group>
                {/* chassis */}
                <RigidBody ref={chassisRef} position={position} colliders="cuboid" mass={5}>
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[3.5, 0.5, 1.5]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                </RigidBody>

                {/* wheels */}
                {wheels.map((wheel, i) => (
                    <React.Fragment key={i}>
                        {/* axle */}
                        <RigidBody
                            ref={axleRefs.current[i]}
                            position={vec3.add(wheel.axlePosition, position)}
                            colliders="cuboid"
                            mass={0.2}
                        >
                            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                                <boxGeometry args={[0.3, 0.3, 0.3]} />
                                <meshStandardMaterial color="#999" />
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
                            <mesh rotation-x={-Math.PI / 2} castShadow receiveShadow>
                                <cylinderGeometry args={[0.25, 0.25, 0.24, 32]} />
                                <meshStandardMaterial color="#666" />
                            </mesh>

                            <mesh rotation-x={-Math.PI / 2}>
                                <cylinderGeometry args={[0.251, 0.251, 0.241, 16]} />
                                <meshStandardMaterial color="#000" wireframe />
                            </mesh>

                            <CylinderCollider mass={0.5} friction={1.5} args={[0.125, 0.25]} rotation={[-Math.PI / 2, 0, 0]} />
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
                            bodyAnchor={[0, 0, wheel.side === 'left' ? 0.35 : -0.35]}
                            wheelAnchor={[0, 0, 0]}
                            rotationAxis={[0, 0, 1]}
                            isDriven={wheel.isDriven}
                        />
                    </React.Fragment>
                ))}
            </group>
        </>
    )
}