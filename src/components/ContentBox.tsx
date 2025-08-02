import {cn} from "../lib/utils.ts";

const ContentBox: React.FC<{
  title?: string,
  extra?: string,
  children?: React.ReactNode,
  className?: string
  contentClassName?: string
}> = ({title, extra, children, className, contentClassName}) => {
  return (
    <div className={cn("bg-gray-900 m-2 border-amber-300 border-2 font-audiowide overflow-hidden", className)}>
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

      <div className={cn("p-2 size-full", contentClassName)}>
        {children}
      </div>
    </div>
  )
}

export default ContentBox;
