import {Scene} from "./objects/Scene.tsx";
import * as React from "react";
import {cn} from "./lib/utils.ts";

function App() {
  return (
    <div className={"md:h-screen w-screen bg-gray-900 flex flex-col md:grid md:grid-cols-4 md:grid-rows-5 text-white"}>
      <ContentBox className={"bg-amber-300 text-gray-900"} contentClassName={"flex flex-row justify-between p-0"}>
        <div className={"flex flex-col justify-between"}>
          <span className={"opacity-50"}>Fullstack developer</span>
          <span className={'font-bold text-xl'}>Wiktor<br/>Petryszyn</span>
        </div>
        <div className={"bg-gray-900 aspect-3/4 text-amber-300"}>
          Avatar z kropek
        </div>
      </ContentBox>

      <ContentBox
        className={"col-span-3 row-span-4 corner-cut-bl-15 [background-size:20px_20px] [background-image:radial-gradient(#364153_1px,transparent_1px)]"}
        contentClassName={"p-0 max-md:h-[calc(50vh)] relative"}>
        <Scene/>

        <div
          className={"text-xs bg-amber-300 corner-cut-bl-25 absolute top-0 right-0 p-1 pb-[7px] pl-5 text-gray-900/50"}>
          THE ROOM
        </div>

        <div
          className={"text-xs bg-amber-300 corner-cut-tr-25 absolute bottom-0 left-0 p-1 pt-[7px] px-5 text-gray-900/50"}>
          where the cool stuff is being done
        </div>
      </ContentBox>
      <ContentBox title={"Kontakt"} extra={"CD-01"} className={"corner-cut-tr-15"} contentClassName={"flex flex-col"}>
        <a href={"mailto:kontakt@petryszyn.dev"} className={"underline hover:bg-amber-300/20"}>
          kontakt@petryszyn.dev
        </a>
        <a href={"https://github.com/jutupe"} target={'_blank'} className={"underline hover:bg-amber-300/20"}>
          GitHub
        </a>
      </ContentBox>
      <ContentBox contentClassName={"flex flex-row gap-2 overflow-x-auto"}>
        <Project title={"Retromachina"} />
        <Project title={"Newbies.pl"} />
        <Project title={"Jeteo"} />
      </ContentBox>
      <ContentBox title={"Technologie"} extra={"CD-03"} className={"row-span-2 corner-cut-tr-15"} contentClassName={"overflow-y-auto"}>
        <table className={"table-auto border-spacing-2 border-separate w-full"}>
          <tbody>
            <TechnologyRow technology={"React Native"} level={4}/>
            <TechnologyRow technology={"Nextjs"} level={4}/>
            <TechnologyRow technology={"React"} level={3}/>
            <TechnologyRow technology={"Docker"} level={3}/>
            <TechnologyRow technology={"Spring"} level={4}/>
            <TechnologyRow technology={"AMQP"} level={3}/>
          </tbody>
        </table>
      </ContentBox>
      <ContentBox className={"col-span-2"}>
        RST Software (2021-teraz)
      </ContentBox>
      <ContentBox className={"bg-[url('/images/warning.svg')] bg-repeat bg-size-[50px] max-md:min-h-40"}/>
    </div>
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
    <div className={cn("bg-gray-900 m-2 border-amber-300 border-3 font-audiowide overflow-hidden", className)}>
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
    <div className={"flex flex-col gap-2 bg-amber-300/20 h-28 w-28 text-xs"}>
      <span className={"text-amber-300 font-bold"}>{title}</span>
    </div>
  )
}

const TechnologyRow: React.FC<{
  technology: string,
  level: number
}> = ({technology, level}) => {
  return (
    <tr>
      <td className={"text-xs"}>{technology}</td>
      <td className={"border-2 text-amber-300 p-1 w-full"}>
        <div className={"h-5 bg-amber-300"} style={{width: `${level * 20}%`}}/>
      </td>
    </tr>
  )
}

export default App

