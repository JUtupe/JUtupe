import {Scene} from "./objects/Scene.tsx";
import * as React from "react";
import {cn} from "./lib/utils.ts";

function App() {
  return (
    <div className={"md:h-screen w-screen bg-gray-900 flex flex-col md:grid md:grid-cols-4 md:grid-rows-7 text-white"}>
      <ContentBox className={"bg-amber-300 text-gray-900"} contentClassName={"flex flex-row justify-between p-0"}>
        <div className={"h-full flex flex-col justify-between"}>
          <div className={"opacity-50"}>Fullstack developer</div>

          <div className={'font-bold text-xl'}>Wiktor<br/>Petryszyn</div>
        </div>
        <div className={"bg-gray-900 aspect-3/4"}>
          Avatar z kropek
        </div>
      </ContentBox>

      <ContentBox
        className={"col-span-3 row-span-6 [background-size:20px_20px] [background-image:radial-gradient(#364153_1px,transparent_1px)]"}
      contentClassName={"p-0"}>
        <Scene/>
      </ContentBox>
      <ContentBox title={"Kontakt"} className={"corner-cut-15"} contentClassName={"flex flex-col"}>
        <a href={"mailto:kontakt@petryszyn.dev"} className={"text-amber-300 hover:underline"}>
          kontakt@petryszyn.dev
        </a>

        <a href={"https://github.com/jutupe"} target={'_blank'} className={"text-amber-300 hover:underline"}>
          GitHub
        </a>
      </ContentBox>
      <ContentBox title={"Projekty CD-01"} className={"corner-cut-15"}>
        <div>newbies.pl</div>
        <div>retromachina</div>
        <div>jeteo</div>
      </ContentBox>
      <ContentBox title={"Doświadczenie CD-02"} className={"corner-cut-15"}>
        RST Software  2021 - obecnie
      </ContentBox>
      <ContentBox title={"Technologie CD-03"} className={"row-span-2 corner-cut-15"}>
        React Native * * * * .<br/>
        Nextjs * * * * .<br/>
        React * * * . . <br/>
        Docker * * * . . <br/>
        Spring * * * * .<br/>
        AMQP * * * . .<br/>
      </ContentBox>
      <ContentBox className={"col-span-3"}>content 5</ContentBox>
      <ContentBox className={"bg-[url('/images/warning.svg')] bg-repeat bg-size-[50px] max-md:min-h-40"}/>
    </div>
  )
}

const ContentBox: React.FC<{
  title?: string,
  children?: React.ReactNode,
  className?: string
  contentClassName?: string
}> = ({title, children, className, contentClassName}) => {
  return (
    <div className={cn("bg-gray-900 m-2 border-amber-300 border-3 font-audiowide overflow-hidden", className)}>
      {title !== undefined && title.length > 0 && (
        <div className={"bg-amber-300 text-gray-900 w-full"}>
          {title}
        </div>
      )}

      <div className={cn("p-2 size-full", contentClassName)}>
        {children}
      </div>
    </div>
  )
}

export default App

