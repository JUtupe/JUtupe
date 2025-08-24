import {cn} from "../lib/utils.ts";
import * as React from "react";

const ContentBox: React.FC<{
  title?: string,
  extra?: string,
  children?: React.ReactNode,
  className?: string
  contentClassName?: string,
  contentRef?: React.Ref<HTMLDivElement>
}> = ({title, extra, children, className, contentClassName, contentRef}) => {
  return (
    <div className={cn("flex flex-col bg-gray-900 m-2 border-amber-300 border-2 font-audiowide overflow-hidden", className)}>
      {title !== undefined && (
        <div className={"flex justify-between pr-4 bg-amber-300 text-gray-900"}>
          <span>
            {title}
          </span>

          {extra !== undefined && (
            <span className={"opacity-50"}>{extra}</span>
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
