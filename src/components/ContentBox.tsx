import {cn} from "../lib/utils.ts";
import * as React from "react";
import GlitchText from "./GlitchText.tsx";

const ContentBox: React.FC<{
  title?: string,
  extra?: string,
  children?: React.ReactNode,
  className?: string
  contentClassName?: string,
  contentRef?: React.Ref<HTMLDivElement>
}> = ({title, extra, children, className, contentClassName, contentRef}) => {
  return (
    <div className={cn("flex flex-col bg-gray-900 m-2 border-amber-300 border-2 font-audiowide overflow-hidden neon-inset-amber", className)}>
      {title !== undefined && (
        <div className={"group flex justify-between items-center pr-4 bg-amber-300 text-gray-900"}>
          <span className={"flex items-center gap-1"}>
            <span className={"opacity-40"}>//</span>
            <GlitchText text={title}/>
          </span>

          {extra !== undefined && (
            <span className={"flex items-center gap-2 opacity-50"}>
              <span className={"size-1.5 bg-gray-900 animate-blink"}/>
              {extra}
            </span>
          )}
        </div>
      )}

      <div ref={contentRef} className={cn("p-2 size-full", contentClassName)}>
        {children}
      </div>
    </div>
  )
}

export default ContentBox;
