import {Scene} from "./objects/Scene.tsx";
import * as React from "react";
import {cn} from "./lib/utils.ts";

function App() {
  return (
    <div className={"md:h-screen w-screen bg-gray-900 flex flex-col md:grid md:grid-cols-4 md:grid-rows-6 text-white"}>
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
        className={"col-span-3 row-span-5 [background-size:20px_20px] [background-image:radial-gradient(#364153_1px,transparent_1px)]"}
        contentClassName={"p-0 max-md:h-[calc(50vh)] relative"}>
        <Scene/>

        <div className={"text-xs bg-amber-300 corner-cut-bl-25 absolute top-0 right-0 p-1 pl-5 text-gray-900/50"}>
          THE ROOM
        </div>

        <div className={"text-xs bg-amber-300 corner-cut-tr-25 absolute bottom-0 left-0 p-1 pr-5 text-gray-900/50"}>
          where the cool stuff is being done
        </div>
      </ContentBox>
      <ContentBox title={"Kontakt"} extra={"CD-00"} className={"corner-cut-tr-15"} contentClassName={"flex flex-col"}>
        <a href={"mailto:kontakt@petryszyn.dev"} className={"text-amber-300 hover:underline"}>
          kontakt@petryszyn.dev
        </a>

        <a href={"https://github.com/jutupe"} target={'_blank'} className={"text-amber-300 hover:underline"}>
          GitHub
        </a>
      </ContentBox>
      <ContentBox title={"Projekty"} extra={"CD-01"} className={"corner-cut-tr-15"}>
        <div>newbies.pl</div>
        <div>retromachina</div>
        <div>jeteo</div>
      </ContentBox>
      <ContentBox title={"Doświadczenie"} extra={"CD-02"} className={"corner-cut-tr-15"}>
        RST Software 2021 - obecnie
      </ContentBox>
      <ContentBox title={"Technologie"} extra={"CD-03"} className={"row-span-2 corner-cut-tr-15"}>
        React Native * * * * .<br/>
        Nextjs * * * * .<br/>
        React * * * . . <br/>
        Docker * * * . . <br/>
        Spring * * * * .<br/>
        AMQP * * * . .<br/>
      </ContentBox>
      <ContentBox className={"col-span-2"}>content 5</ContentBox>
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

export default App

