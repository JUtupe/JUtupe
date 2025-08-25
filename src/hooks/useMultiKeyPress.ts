import {useEffect, useRef, useState} from "react";

export function useMultiKeyPress(targetKey: string, times: number = 3) {
  const [triggered, setTriggered] = useState(false);
  const pressCount = useRef(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        if (timer.current) clearTimeout(timer.current);
        pressCount.current += 1;
        timer.current = setTimeout(() => {
          pressCount.current = 0;
        }, 1000);
        if (pressCount.current >= times) {
          setTriggered(true);
          pressCount.current = 0;
          if (timer.current) clearTimeout(timer.current);
        }
      } else {
        pressCount.current = 0;
        if (timer.current) clearTimeout(timer.current);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [targetKey, times]);

  return triggered;
}
