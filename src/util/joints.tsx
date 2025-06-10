import {useKeyboardControls} from "@react-three/drei"
import {RapierRigidBody, useFixedJoint, useRevoluteJoint} from "@react-three/rapier"
import {type RefObject, useEffect} from "react"
import type {Vector3Tuple, Vector4Tuple} from "three"
import {MotorModel} from '@dimforge/rapier3d-compat'

const AXLE_TO_CHASSIS_JOINT_STIFFNESS = 1000
const AXLE_TO_CHASSIS_JOINT_DAMPING = 100

const DRIVEN_WHEEL_TARGET_VELOCITY = 80
const DRIVEN_WHEEL_FACTOR = 70

const TURN_ANGLE = 0.25

type FixedJointProps = {
    body: RefObject<RapierRigidBody>
    wheel: RefObject<RapierRigidBody>
    body1Anchor: Vector3Tuple
    body1LocalFrame: Vector4Tuple
    body2Anchor: Vector3Tuple
    body2LocalFrame: Vector4Tuple
}

export const FixedJoint = ({ body, wheel, body1Anchor, body1LocalFrame, body2Anchor, body2LocalFrame }: FixedJointProps) => {
    useFixedJoint(body, wheel, [body1Anchor, body1LocalFrame, body2Anchor, body2LocalFrame])

    return null
}

type AxleJointProps = {
    body: RefObject<RapierRigidBody>
    wheel: RefObject<RapierRigidBody>
    bodyAnchor: Vector3Tuple
    wheelAnchor: Vector3Tuple
    rotationAxis: Vector3Tuple
    isDriven: boolean
}

export const AxleJoint = ({ body, wheel, bodyAnchor, wheelAnchor, rotationAxis, isDriven }: AxleJointProps) => {
    const joint = useRevoluteJoint(body, wheel, [bodyAnchor, wheelAnchor, rotationAxis])

    const forwardPressed = useKeyboardControls((state) => state.forward)
    const backwardPressed = useKeyboardControls((state) => state.back)

    useEffect(() => {
        if (!isDriven) return

        let forward = 0
        if (forwardPressed) forward += 1
        if (backwardPressed) forward -= 1

        forward *= DRIVEN_WHEEL_TARGET_VELOCITY

        if (forward !== 0) {
            wheel.current?.wakeUp()
        }

        joint.current?.configureMotorModel(MotorModel.AccelerationBased)
        joint.current?.configureMotorVelocity(forward, DRIVEN_WHEEL_FACTOR)
    }, [forwardPressed, backwardPressed])

    return null
}

type SteeredJointProps = {
    body: RefObject<RapierRigidBody>
    wheel: RefObject<RapierRigidBody>
    bodyAnchor: Vector3Tuple
    wheelAnchor: Vector3Tuple
    rotationAxis: Vector3Tuple
}

export const SteeredJoint = ({ body, wheel, bodyAnchor, wheelAnchor, rotationAxis }: SteeredJointProps) => {
    const joint = useRevoluteJoint(body, wheel, [bodyAnchor, wheelAnchor, rotationAxis])

    const left = useKeyboardControls((state) => state.left)
    const right = useKeyboardControls((state) => state.right)
    let targetPos = 0
    if (left) targetPos += TURN_ANGLE
    if (right) targetPos -= TURN_ANGLE

    useEffect(() => {
        joint.current?.configureMotorModel(MotorModel.ForceBased)
        joint.current?.configureMotorPosition(targetPos, AXLE_TO_CHASSIS_JOINT_STIFFNESS, AXLE_TO_CHASSIS_JOINT_DAMPING)
    }, [left, right])

    return null
}
