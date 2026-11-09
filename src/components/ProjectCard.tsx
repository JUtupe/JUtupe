import * as React from "react";
import {motion} from "motion/react";
import {projects} from "../lib/projects.ts";
import GlitchText from "./GlitchText.tsx";

const ProjectCard: React.FC<{
  id: string,
  onClick?: () => void,
}> = ({id, onClick}) => {
  const project = projects.find((project) => project.id === id);

  if (!project) {
    return null;
  }

  return (
    <motion.div
      className={"group relative flex flex-col gap-2 bg-rose-500/20 min-h-12 h-full w-full text-sm lg:text-base border-l-4 border-rose-500 corner-cut-br-15 cursor-pointer neon-inset-rose"}
      onClick={onClick}
      layoutId={`project-card-${id}`}
      transition={{duration: 0.1, ease: 'linear'}}
    >
      <div className={"absolute h-full w-0 group-hover:w-full bg-rose-500/30 transition-all"}/>
      <span className={"z-10 p-1 text-rose-500 font-bold break-all neon-text-rose"}>
        <GlitchText text={project.title}/>
      </span>
    </motion.div>
  )
}

export default ProjectCard;
