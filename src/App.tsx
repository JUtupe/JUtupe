import {Scene} from "./objects/Scene.tsx";
import * as React from "react";
import {cn} from "./lib/utils.ts";
import {motion} from "motion/react";

function App() {
  return (
    <div
      className={"md:h-screen w-screen flex flex-col md:grid md:grid-cols-[minmax(300px,1fr)_repeat(3,minmax(0,1fr))] md:grid-rows-5 text-white"}>
      <ContentBox className={"bg-amber-300 text-gray-900"} contentClassName={"flex flex-row justify-between p-0"}>
        <div className={"flex flex-col justify-between"}>
          <span className={"opacity-50"}>Fullstack developer</span>
          <span className={'font-bold text-xl'}>Wiktor<br/>Petryszyn</span>
        </div>
        <div className={"bg-gray-900 aspect-3/4 text-amber-300"}>
          Avatar
        </div>
      </ContentBox>

      <ContentBox
        className={"col-span-3 row-span-4 corner-cut-bl-15 [background-size:20px_20px] [background-image:radial-gradient(#364153_1px,transparent_1px)]"}
        contentClassName={"p-0 max-md:h-[calc(50vh)] relative"}>
        <Scene/>

        <div
          className={"text-xs bg-amber-300 corner-cut-bl-28 absolute top-0 right-0 p-1 pb-[7px] pl-5 text-gray-900/50"}>
          THE ROOM
        </div>
        <div
          className={"text-xs bg-amber-300 corner-cut-tr-28 absolute bottom-0 left-0 p-1 pt-[7px] px-5 text-gray-900/50"}>
          where the cool stuff is being made
        </div>

        <div className={"absolute bottom-0 right-0 p-2"}>
          <div className={"flex flex-row gap-1"}>
            <div className={"size-10 rounded-l-full animate-pulse bg-rose-500/50"}/>
            <div className={"size-10 rounded-b-full animate-pulse bg-rose-500/50"}/>
            <div className={"size-10 rounded-r-full animate-pulse bg-rose-500/50"}/>
            <div className={"size-10 rounded-full bg-rose-500/50"}/>
          </div>
        </div>
      </ContentBox>

      <ContentBox
        title={"Kontakt"}
        extra={"CD-01"}
        className={"corner-cut-tr-15"}
        contentClassName={"flex flex-col gap-8"}>
        <ContactBox title={"kontakt@petryszyn.dev"} href={"mailto:kontakt@petryszyn.dev"} target={'_blank'}/>
        <ContactBox title={"GitHub"} href={"https://github.com/jutupe"} target={'_blank'}/>
      </ContentBox>
      <ContentBox contentClassName={"grid grid-cols-2 gap-2"}>
        <Project title={"Newbies.pl"}/>
        <Project title={"Retromachina"}/>
        <Project title={"Jeteo"}/>
        <Project title={"Szkolenia AI"}/>
      </ContentBox>
      <ContentBox
        title={"Technologie"}
        extra={"CD-02"}
        className={"row-span-2 corner-cut-tr-15"}
        contentClassName={"overflow-y-auto"}>
        <table className={"table-auto border-spacing-y-2 border-separate w-full"}>
          <tbody>
          <SkillRow technology={"React Native"} level={5}/>
          <SkillRow technology={"Nextjs"} level={4}/>
          <SkillRow technology={"React"} level={4}/>
          <SkillRow technology={"Docker"} level={3}/>
          <SkillRow technology={"Spring"} level={4}/>
          <SkillRow technology={"AMQP"} level={2.5}/>
          </tbody>
        </table>
      </ContentBox>

      <ContentBox className={"col-span-2"}>
        <div>
          <div>Uniwersytet Merito</div>
          <div>inżynier aplikacji mobilnych</div>
        </div>
        <div>
          <div>RST Software</div>
          <div>React native Developer - Technical Team Leader</div>
        </div>
      </ContentBox>
      <ContentBox
        className={"bg-[url('/images/warning.svg')] bg-repeat bg-size-[50px]"}
        contentClassName={"flex max-md:min-h-40 h-full items-center justify-center"}>
        <div className={"bg-gray-900 p-2"}>
          <div className={"relative group bg-rose-500/20 cursor-pointer border-b-4 border-rose-500"}>
            <div className={"absolute h-full w-0 group-hover:w-full bg-rose-500/30 transition-all"}/>
            <div className={"p-2 lg:p-4 lg:text-2xl text-rose-500"}>
              See more
            </div>
          </div>
        </div>
      </ContentBox>
    </div>
  )
}

const ContactBox: React.FC<{
  title: string,
  href: string,
  target?: string
}> = ({title, href, target}) => {
  return (
    <a href={href} target={target} className={"font-bold border-b-4 border-rose-500"}>
      <div className={"relative group"}>
        <div className={"absolute -z-10 h-full w-0 group-hover:w-full bg-rose-500/30 transition-all"}/>
        <span>{title}</span>
      </div>
    </a>
  )
}

const ContentBox: React.FC<{
  title?: string,
  extra?: string,
  children?: React.ReactNode,
  className?: string
  contentClassName?: string
}> = ({title, extra, children, className, contentClassName}) => {
  return (
    <div className={cn("bg-gray-900 m-2 border-amber-300 border-1 font-audiowide overflow-hidden", className)}>
      {title !== undefined && (
        <div className={"flex justify-between pr-4 bg-amber-300 text-gray-900"}>
          <span>
            {title}
          </span>

          {extra !== undefined && (
            <span className={"opacity-50"}>{extra}</span>
          )}
        </div>
      )}

      <div className={cn("p-2 size-full", contentClassName)}>
        {children}
      </div>
    </div>
  )
}

const Project: React.FC<{
  title: string,
}> = ({title}) => {
  return (
    <div
      className={"group relative flex flex-col gap-2 bg-rose-500/20 min-h-10 h-full w-full text-xs border-l-4 border-rose-500 corner-cut-br-15 cursor-pointer"}>
      <div className={"absolute h-full w-0 group-hover:w-full bg-rose-500/30 transition-all"}/>
      <span className={"z-10 p-1 text-rose-500 font-bold break-all "}>{title}</span>
    </div>
  )
}

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

export default App

