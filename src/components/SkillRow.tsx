import * as React from "react";
import {motion} from "motion/react";

const SkillRow: React.FC<{
  technology: string,
  level: number,
  viewportRoot?: React.RefObject<HTMLDivElement>,
  order?: number,
  stagger?: number
}> = ({technology, level, viewportRoot, order = 0, stagger = 0.12}) => {
  const rowVariants = {
    hidden: {},
    show: {}
  } as const;

  const barVariants = {
    hidden: {width: '0%'},
    show: (target: string) => ({width: target})
  };

  const delay = Math.max(0, order) * Math.max(0, stagger);

  return (
    <motion.tr
      className={"group"}
      variants={rowVariants}
      initial="hidden"
      whileInView="show"
      viewport={{
        root: viewportRoot ?? undefined,
        amount: 0.6,
        once: true
      }}
    >
      <td className={"text-xs pr-2"}>{technology}</td>
      <td className={"border-1 border-rose-500 p-1 w-full"}>
        <motion.div
          className={"h-5 bg-rose-500 opacity-50 group-hover:opacity-100 transition-opacity duration-150"}
          variants={barVariants}
          custom={`${level * 20}%`}
          transition={{duration: 0.6, ease: 'easeOut', delay}}
        />
      </td>
    </motion.tr>
  )
}

export default SkillRow;
