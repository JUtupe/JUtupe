import * as React from "react";

const ContactRow: React.FC<{
  icon: React.ReactNode,
  title: string,
  href: string,
  target?: string
}> = ({icon, title, href, target}) => {
  return (
    <a href={href} target={target} className={"group font-bold flex flex-row space-x-1"}>
      <div className={"border-rose-500 border-4 size-8 min-w-8 p-1 flex items-center justify-center"}>
        {icon}
      </div>

      <div className={"relative border-b-4 border-rose-500 w-full corner-cut-tr-8"}>
        <span>{title}</span>
        <div className={"absolute -z-10 top-0 bottom-0 w-0 group-hover:w-full bg-rose-500/30 transition-all"}/>
      </div>
    </a>
  )
}

export default ContactRow;
