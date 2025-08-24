import {motion} from "motion/react";
import * as React from "react";
import {projects} from "../lib/projects";
import {useScrollBlock} from "../hooks/useScrollBlock";
import {LinkIcon} from "lucide-react";

interface ProjectModalProps {
  projectId: string;
  onDismiss?: () => void;
}

const Backdrop = ({children, onDismiss}: { children: React.ReactNode, onDismiss?: () => void }) => {
  return (
    <motion.div
      className={"fixed inset-0 bg-black/50 flex items-center justify-center"}
      onClick={onDismiss}
      exit={{opacity: 0}}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.1}}>
      {children}
    </motion.div>
  )
}

const ProjectModal: React.FC<ProjectModalProps> = ({projectId, onDismiss}) => {
  const project = projects.find((project) => project.id === projectId);

  useScrollBlock()

  if (!project) {
    return null;
  }

  return (
    <Backdrop onDismiss={onDismiss}>
      <motion.div
        className={"w-full md:w-2/3 min-h-10 fixed md:relative bottom-0 bg-gray-900 corner-cut-tr-25"}
        onClick={(e) => {
          e.stopPropagation()
        }}
        layout
        layoutRoot
      >
        <motion.div
          layoutId={`project-card-${project.id}`}
          transition={{duration: 0.1, ease: 'linear'}}
          className={"group relative flex flex-col gap-2 min-h-10 w-full text-xs border-l-4 border-rose-500 bg-rose-500/20"}
        >
          <div className={"-z-10 absolute h-full w-0 group-hover:w-full bg-rose-500/30 transition-all"}/>
          <span className={"p-1 text-rose-500 font-bold break-all"}>{project.title}</span>

          {project.description && (
            <div className={"p-1"}>
              {project.description}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{opacity: 0, height: 0}}
          animate={{opacity: 1, height: 'auto'}}
          transition={{duration: 0.1, ease: 'linear', delay: 0.2}}
          className={"border-x-2 border-b-2 border-amber-300"}>

          <div className={"w-full h-2 bg-[url('/images/warning.svg')] bg-repeat bg-size-[20px] mb-2"}/>

          {project.link && (
            <a href={project.link} target={"_blank"} className={"group font-bold flex flex-row space-x-1 px-2"}>
              <div className={"border-amber-300 border-4 size-8 min-w-8 p-1 flex items-center justify-center"}>
                <LinkIcon color={"var(--color-amber-300)"} size={24}/>
              </div>

              <div className={"relative border-b-4 border-amber-300 w-full z-10 corner-cut-tr-8"}>
                <span>Visit project</span>
                <div className={"absolute -z-10 top-0 bottom-0 w-0 group-hover:w-full bg-amber-300/20 transition-all"}/>
              </div>
            </a>
          )}

          {project.images && project.images.length > 0 && (
            <div className={"mt-4"}>
              <span className={"bg-amber-300 text-black p-2 pr-5 corner-cut-br-16"}>Gallery</span>

              <div className={"flex flex-row gap-2 p-2 mt-2 overflow-x-scroll"}>
                {project.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} image ${index + 1}`}
                    className={"h-40 inline-block border-1 border-amber-300 p-1"}
                  />
                ))}
              </div>
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className={"mt-4"}>
              <span className={"bg-amber-300 text-black p-2 pr-5 corner-cut-br-16"}>Technologies</span>

              <div className={"flex flex-row gap-2 flex-wrap p-2 mt-2"}>
                {project.technologies.map((technology, index) => (
                  <span
                    key={index}
                    className={"text-amber-300 border-amber-300 hover:bg-amber-300/20 border p-2 text-sm"}>
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </Backdrop>
  )
}

export default ProjectModal
