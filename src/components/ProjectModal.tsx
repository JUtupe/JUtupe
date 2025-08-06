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
        className={"w-full md:w-2/3 bg-gray-900 h-10 fixed md:relative bottom-0"}
      >
        <motion.div className={"w-1 bg-amber-300 bottom-0 absolute"} initial={{height: '0%'}} animate={{height: '100%'}}/>
        <div>
          {project?.title}
        </div>
      </motion.div>
    </Backdrop>
  )
}

export default ProjectModal
