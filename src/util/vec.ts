import type {Vector3Tuple} from "three";

export const vec3 = {
  add: (a: Vector3Tuple, b: Vector3Tuple) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]] as Vector3Tuple,
}
