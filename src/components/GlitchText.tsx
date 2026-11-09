import * as React from "react";
import {cn} from "../lib/utils.ts";

const GlitchText: React.FC<{
  text: string,
  mode?: 'idle' | 'hover',
  className?: string
}> = ({text, mode = 'hover', className}) => {
  return (
    <span
      data-text={text}
      className={cn("glitch whitespace-pre-line", mode === 'idle' ? 'glitch-idle' : 'glitch-hover', className)}>
      {text}
    </span>
  )
}

export default GlitchText;
