import * as React from "react";
import {motion} from "motion/react";

const SkillRow: React.FC<{
  technology: string,
  level: number
}> = ({technology, level}) => {
  return (
    <tr className={"group"}>
      <td className={"text-xs pr-2"}>{technology}</td>
      <td className={"border-1 border-rose-500 p-1 w-full"}>
        <motion.div
          className={"h-5 bg-rose-500 opacity-50 group-hover:opacity-100 transition-opacity duration-150"}
          initial={{width: '0%'}}
          whileInView={{width: `${level * 20}%`}}
          viewport={{once: true}}/>
      </td>
    </tr>
  )
}

export default SkillRow;

