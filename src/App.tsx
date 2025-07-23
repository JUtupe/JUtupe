import {Scene} from "./objects/Scene.tsx";
import * as React from "react";
import {cn} from "./lib/utils.ts";
import {motion} from "motion/react";
import {BriefcaseIcon, GithubIcon, GraduationCapIcon, LinkedinIcon, MailIcon} from "lucide-react";
import {SiDiscord} from '@icons-pack/react-simple-icons';

function App() {
  return (
    <div className={"md:h-screen w-screen flex flex-col md:flex-row text-white"}>
      <div className={"flex flex-col min-w-[348px] md:w-1/4"}>
        <div
          className={"flex flex-row justify-between font-audiowide border-amber-300 border-2 m-2 bg-amber-300 text-gray-900 min-h-45 max-h-56"}>
          <div className={"flex flex-col"}>
            <span className={"opacity-50"}>Fullstack<br/>developer</span>
            <span className={'font-bold text-xl mt-auto'}>Wiktor<br/>Petryszyn</span>
          </div>
          <div className={"bg-gray-900 aspect-3/4 h-44"}>
            <div className={"bg-[url('/images/wiktor.svg')] bg-cover bg-center size-full"}/>
          </div>
        </div>
        <ContentBox
          title={"Contact"}
          extra={"CD-01"}
          className={"corner-cut-tr-15 shrink-0"}
          contentClassName={"space-y-2"}>
          <ContactRow
            icon={<MailIcon color={"var(--color-rose-500)"} size={24}/>}
            title={"Mail"}
            href={"mailto:contact@petryszyn.dev"}
            target={'_blank'}/>
          <ContactRow
            icon={<LinkedinIcon color={"var(--color-rose-500)"} size={24}/>}
            title={"LinkedIn"}
            href={"https://www.linkedin.com/in/wpetryszyn/"}
            target={'_blank'}/>
          <ContactRow
            icon={<GithubIcon color={"var(--color-rose-500)"} size={24}/>}
            title={"GitHub"}
            href={"https://github.com/jutupe"}
            target={'_blank'}/>
          <ContactRow
            icon={<SiDiscord color={"var(--color-rose-500)"} size={24}/>}
            title={"Discord"}
            href={"https://discord.com/users/314113513205268480"}
            target={'_blank'}/>
        </ContentBox>
        <ContentBox className={"grow h-30 shrink-0"} contentClassName={"grid grid-cols-2 gap-2"}>
          <Project title={"Newbies.pl"}/>
          <Project title={"Retromachina"}/>
          <Project title={"Jeteo"}/>
          <Project title={"AI training"}/>
        </ContentBox>
        <ContentBox
          title={"Knowledge"}
          extra={"CD-02"}
          className={"corner-cut-tr-15 grow"}
          contentClassName={"overflow-y-auto pt-0"}>
          <table className={"table-auto border-spacing-y-2 border-separate w-full pb-4"}>
            <tbody>
            <SkillRow technology={"React Native"} level={5}/>
            <SkillRow technology={"Nextjs"} level={4}/>
            <SkillRow technology={"React"} level={4}/>
            <SkillRow technology={"Docker"} level={3}/>
            <SkillRow technology={"Kotlin"} level={5}/>
            <SkillRow technology={"Spring"} level={4}/>
            <SkillRow technology={"Nestjs"} level={3.5}/>
            <SkillRow technology={"Figma"} level={3}/>
            <SkillRow technology={"Rabbit"} level={3}/>
            <SkillRow technology={"DevOps"} level={2.5}/>
            <SkillRow technology={"PostgreSQL"} level={4}/>
            </tbody>
          </table>
        </ContentBox>
      </div>
      <div className={"flex flex-col md:w-3/4 md:grid grid-rows-[minmax(0,1fr)_minmax(200px,1fr)] grid-cols-3"}>
        <ContentBox
          className={"col-span-3 row-span-4 corner-cut-bl-15 [background-size:20px_20px] [background-image:radial-gradient(#364153_1px,transparent_1px)]"}
          contentClassName={"p-0 max-md:h-[calc(50vh)] relative"}>
          <Scene/>

          <div className={"absolute top-0 left-0 h-full flex flex-row gap-1"}>
            <div className={"bg-[url('/images/warning.svg')] bg-repeat bg-size-[20px] w-3 h-full"}/>
            <div className={"w-1 h-1/2 bg-amber-300 corner-cut-br-4"}/>
            <div className={"mt-1 space-y-1"}>
              <div className={"size-2 rounded-full border-1 border-amber-300"}/>
              <div className={"size-2 rounded-full border-1 border-amber-300"}/>
              <div className={"size-2 rounded-full border-1 border-amber-300"}/>
              <div className={"size-2 rounded-full border-1 border-amber-300"}/>
              <div className={"size-2 rounded-full border-1 border-amber-300"}/>
              <div className={"size-2 rounded-full border-1 border-amber-300"}/>
            </div>
          </div>

          <div
            className={"text-xs bg-amber-300 corner-cut-bl-32 absolute top-0 right-0 p-1 pb-[7px] pl-5 text-gray-900/50"}>
            THE ROOM
          </div>
          <div
            className={"text-xs bg-amber-300 corner-cut-tr-32 absolute bottom-0 left-0 p-1 pt-[7px] pl-4 pr-5 text-gray-900/50"}>
            where the cool stuff is being built
          </div>

          <div className={"absolute bottom-0 right-0 p-2 hidden sm:block"}>
            <div className={"flex flex-row gap-1"}>
              <div className={"size-10 rounded-l-full animate-pulse bg-rose-500/50"}/>
              <div className={"size-10 rounded-b-full animate-pulse bg-rose-500/50"}/>
              <div className={"size-10 rounded-r-full animate-pulse bg-rose-500/50"}/>
              <div className={"size-10 rounded-full bg-rose-500/50"}/>
            </div>
          </div>
        </ContentBox>
        <ContentBox className={"col-span-2"}>
          <ExperienceRow
            icon={<BriefcaseIcon color={"var(--color-rose-500)"} size={24}/>}
            title={"RST Software"}
            subtitle={"React Native Developer - Technical Team Leader"}/>
          <ExperienceRow
            icon={<GraduationCapIcon color={"var(--color-rose-500)"} size={24}/>}
            title={"Merito University"}
            subtitle={"Mobile applications engineer"}/>
        </ContentBox>
        <ContentBox
          className={"bg-[url('/images/warning.svg')] bg-repeat bg-size-[50px]"}
          contentClassName={"flex max-md:min-h-40 h-full items-center justify-center"}>
          {/*<div className={"bg-gray-900 p-2"}>*/}
          {/*  <div className={"relative group bg-rose-500/20 cursor-pointer border-b-4 border-rose-500"}>*/}
          {/*    <div className={"absolute h-full w-0 group-hover:w-full bg-rose-500/30 transition-all"}/>*/}
          {/*    <div className={"p-2 lg:p-4 lg:text-2xl text-rose-500"}>*/}
          {/*      See more*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </ContentBox>
      </div>
    </div>
  )
}

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

      <div className={"relative border-b-4 border-rose-500 w-full"}>
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
    <div className={cn("bg-gray-900 m-2 border-amber-300 border-2 font-audiowide overflow-hidden", className)}>
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

const ExperienceRow: React.FC<{
  icon: React.ReactNode,
  title: string,
  subtitle: string,
}> = ({icon, title, subtitle}) => {
  return (
    <div className={"group flex flex-row items-center gap-2"}>
      <div
        className={"relative flex items-center justify-center h-8 w-12 min-w-12 corner-cut-bl-16 bg-rose-500/30 border-r-4 border-rose-500"}>
        <div className={"absolute right-0 -z-10 h-full w-0 group-hover:w-full bg-rose-500/30 transition-all"}/>

        {icon}
      </div>

      <div>
        <div>{title}</div>
        <div className={"opacity-50 text-sm"}>{subtitle}</div>
      </div>
    </div>
  )
}

export default App

