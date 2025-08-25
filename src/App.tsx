import {Scene} from "./objects/Scene";
import {BriefcaseIcon, GithubIcon, GraduationCapIcon, LinkedinIcon, MailIcon} from "lucide-react";
import ContentBox from "./components/ContentBox";
import ProjectCard from "./components/ProjectCard.tsx";
import SkillRow from "./components/SkillRow";
import ExperienceRow from "./components/ExperienceRow";
import ContactRow from "./components/ContactRow";
import {projects} from "./lib/projects";
import {useEffect, useRef, useState} from "react";
import {AnimatePresence} from "motion/react";
import ProjectModal from "./components/ProjectModal";
import RedDots from "./components/RedDots";
import useMediaQuery from "./hooks/useMediaQuery";
import {type GlitchPartialOptions, PowerGlitch} from 'powerglitch';
import {skills} from "./lib/skills.ts";

const SEE_MORE_ENABLED = false;
const GLITCH_SETTINGS: GlitchPartialOptions = {
  playMode: 'manual',
  createContainers: true,
  hideOverflow: true,
  timing: {duration: 450, iterations: 1},
  glitchTimeSpan: {start: 0, end: 1},
  slice: {count: 8, velocity: 10, minHeight: 0.02, maxHeight: 0.15, hueRotate: false},
  pulse: false
}

function App() {
  const [modalProjectId, setModalProjectId] = useState<string | null>(null);

  const knowledgeRef = useRef<HTMLDivElement>(null!);
  const photoRef = useRef<HTMLDivElement>(null!);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const rowStagger = isDesktop ? 0.08 : 0;

  useEffect(() => {
    if (!photoRef.current) return;
    const controller = PowerGlitch.glitch(photoRef.current, GLITCH_SETTINGS);
    const el = photoRef.current;
    const trigger = () => controller.startGlitch()

    el.addEventListener('mouseenter', trigger);
    el.addEventListener('click', trigger);

    return () => {
      el.removeEventListener('mouseenter', trigger);
      el.removeEventListener('click', trigger);
      controller.stopGlitch()
    };
  }, []);

  useEffect(() => {
    if (!photoRef.current) return;

    const randomInterval = () => Math.random() * (10000 - 5000) + 5000;
    const controller = PowerGlitch.glitch(photoRef.current, GLITCH_SETTINGS);

    const interval = setInterval(() => {
      controller.startGlitch()
    }, randomInterval());

    return () => {
      clearInterval(interval);
      controller.stopGlitch()
    }
  }, []);

  return (
    <div className={"md:h-screen w-screen flex flex-col md:flex-row text-white font-audiowide"}>
      <div className={"flex flex-col min-w-[348px] md:w-1/4"}>
        <div
          className={"flex flex-row justify-between border-amber-300 border-2 m-2 bg-amber-300 text-gray-900 min-h-45 max-h-56"}>
          <div className={"flex flex-col"}>
            <span className={"opacity-50"}>Fullstack<br/>developer</span>
            <span className={'font-bold text-xl mt-auto'}>Wiktor<br/>Petryszyn</span>
          </div>
          <div ref={photoRef} className={"bg-gray-900 aspect-3/4 h-44"}>
            <div className={"bg-[url('/images/wiktor.svg')] bg-cover bg-center size-full"}/>
          </div>
        </div>
        <div className={"shrink-0 space-y-2 p-2"}>
          <ContactRow
            icon={<GithubIcon color={"var(--color-rose-500)"} size={24}/>}
            title={"GitHub"}
            href={"https://github.com/jutupe"}
            target={'_blank'}/>
          <ContactRow
            icon={<LinkedinIcon color={"var(--color-rose-500)"} size={24}/>}
            title={"LinkedIn"}
            href={"https://www.linkedin.com/in/wpetryszyn/"}
            target={'_blank'}/>
          <ContactRow
            icon={<MailIcon color={"var(--color-rose-500)"} size={24}/>}
            title={"Mail"}
            href={"mailto:contact@petryszyn.dev"}
            target={'_blank'}/>
        </div>
        <ContentBox
          title={"Projects"}
          extra={"CD-01"}
          className={"grow shrink-0 corner-cut-tr-15"}
          contentClassName={"grid grid-cols-2 gap-2"}>
          {projects.map((project) => (
            <ProjectCard
              id={project.id}
              key={project.id}
              onClick={() => {
                setModalProjectId(project.id)
              }}/>
          ))}
        </ContentBox>
        <ContentBox
          title={"Skills"}
          extra={"CD-02"}
          className={"corner-cut-tr-15 grow"}
          contentClassName={"overflow-y-auto pt-0"}
          contentRef={knowledgeRef}
        >
          <table className={"table-auto border-spacing-y-2 border-separate w-full pb-4"}>
            <tbody>
            {skills.map((skill, i) => (
              <SkillRow
                technology={skill.name}
                level={skill.level}
                viewportRoot={knowledgeRef}
                order={i}
                stagger={rowStagger}/>
            ))}
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
            <RedDots/>
          </div>
        </ContentBox>
        <ContentBox className={"col-span-2"} contentClassName={"space-y-2"}>
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
          {SEE_MORE_ENABLED && (
            <div className={"bg-gray-900 p-2"}>
              <div className={"relative group bg-rose-500/20 cursor-pointer border-b-4 border-rose-500"}>
                <div className={"absolute h-full w-0 group-hover:w-full bg-rose-500/30 transition-all"}/>
                <div className={"p-2 lg:p-4 lg:text-2xl text-rose-500"}>
                  See more
                </div>
              </div>
            </div>
          )}
        </ContentBox>
      </div>

      <AnimatePresence>
        {modalProjectId && (
          <ProjectModal projectId={modalProjectId} onDismiss={() => {
            setModalProjectId(null)
          }}/>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
