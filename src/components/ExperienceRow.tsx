import * as React from "react";

const ExperienceRow: React.FC<{
  icon: React.ReactNode,
  title: string,
  subtitle: string,
}> = ({icon, title, subtitle}) => {
  return (
    <div className={"group flex flex-row items-center gap-2"}>
      <div
        className={"relative flex items-center justify-center h-8 w-12 min-w-12 corner-cut-bl-16 bg-rose-500/30 border-r-4 border-rose-500 pl-1"}>
        <div className={"absolute right-0 -z-10 h-full w-0 group-hover:w-full bg-rose-500/30 transition-all"}/>
        {icon}
      </div>
      <div>
        <div>{title}</div>
        <div className={"opacity-50 text-sm"}>{subtitle}</div>
      </div>
    </div>
  )
}

export default ExperienceRow;

