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
        layoutId={`project-card-${project.id}`}
        transition={{duration: 0.1, ease: 'linear'}}
        className={"w-full md:w-2/3 min-h-10 fixed md:relative bottom-0 bg-gray-900 corner-cut-tr-15"}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className={"bg-rose-500/20 space-y-2"}>
          <motion.div
            className={"group relative flex flex-col gap-2 min-h-10 w-full text-xs border-l-4 border-rose-500"}
          >
            <div className={"-z-10 absolute h-full w-0 group-hover:w-full bg-rose-500/30 transition-all"}/>
            <span className={"p-1 text-rose-500 font-bold break-all"}>{project.title}</span>

            {project.description && (
              <div className={"p-1"}>
                {project.description}
              </div>
            )}

          </motion.div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={"p-1 text-rose-500 hover:underline"}
            >
              Visit project
            </a>
          )}

          {project.images && project.images.length > 0 && (
            <div>
              <span className={"p-1 text-xs"}>Gallery:</span>
              <div className={"flex flex-row gap-2 p-1 overflow-x-scroll"}>
                {project.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} image ${index + 1}`}
                    className={"h-40 rounded-md"}
                  />
                ))}
              </div>
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className={"p-1"}>
              <span className={"text-xs"}>Technologies used:</span>
              <ul className={"list-disc pl-5 text-xs"}>
                {project.technologies.map((tech, index) => (
                  <li key={index} className={"text-rose-500"}>{tech}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </Backdrop>
  )
}

export default ProjectModal
