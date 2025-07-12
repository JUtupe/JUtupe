import {useEffect, useState} from "react";

export const useKeyboardControls = () => {
  const [controls, setControls] = useState({w: false, a: false, s: false, d: false, space: false})

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return
      if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === ' ') {
        setControls(c => ({...c, [e.key === ' ' ? 'space' : e.key]: true}))
      }
    }
    const up = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === ' ') {
        setControls(c => ({...c, [e.key === ' ' ? 'space' : e.key]: false}))
      }
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
