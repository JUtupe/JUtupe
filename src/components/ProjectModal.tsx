import {motion} from "motion/react";
import * as React from "react";
import {projects} from "../lib/projects.tsx";

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

  if (!project) {
    return null;
  }

  return (
    <Backdrop onDismiss={onDismiss}>
      <motion.div
        className={"w-full md:w-2/3 min-h-10 fixed md:relative bottom-0 bg-gray-900"}
        onClick={(e) => {e.stopPropagation()}}
      >
        <motion.div
          layoutId={`project-card-${project.id}`}
          transition={{duration: 0.1, ease: 'linear'}}
          className={"group relative flex flex-col gap-2 bg-rose-500/20 min-h-10 w-full text-xs border-l-4 border-rose-500 corner-cut-br-15"}
        >
          <div className={"absolute h-full w-0 group-hover:w-full bg-rose-500/30 transition-all"}/>
          <div className={"z-10"}>
            <span className={"p-1 text-rose-500 font-bold break-all"}>{project.title}</span>

            {project.description && (
              <div className={"p-1 py-2"}>
                {project.description}
              </div>
            )}

            {project.images && project.images.length > 0 && (
              <div className={"flex flex-row gap-2 p-1"}>
                {project.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} image ${index + 1}`}
                    className={"w-full h-auto rounded-md"}
                  />
                ))}
              </div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </Backdrop>
  )
}

export default ProjectModal
