import * as React from "react";

const Project: React.FC<{
  title: string,
  onClick?: () => void,
}> = ({title, onClick}) => {
  return (
    <div
      className={"group relative flex flex-col gap-2 bg-rose-500/20 min-h-10 h-full w-full text-xs border-l-4 border-rose-500 corner-cut-br-15 cursor-pointer"}
      onClick={onClick}
    >
      <div className={"absolute h-full w-0 group-hover:w-full bg-rose-500/30 transition-all"}/>
      <span className={"z-10 p-1 text-rose-500 font-bold break-all "}>{title}</span>
    </div>
  )
}

export default Project;
