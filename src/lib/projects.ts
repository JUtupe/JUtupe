type Project = {
  id: string;
  title: string;
  description?: string;
  about?: string;
  link?: string;
  images: string[];
  technologies?: string[];
}

export const projects: Project[] = [
  {
    id: 'retromachine',
    title: 'Retromachina',
    link: 'https://retromachine.eu',
    about: "Retromachina solves the problem of unstructured retrospectives in agile teams. It provides a structured approach to retrospectives, allowing teams to reflect on their work, identify areas for improvement, and plan actionable steps for future sprints. The tool offers features like voting, and action item tracking.",
    images: [
      './images/retromachine/retro_main.webp',
      './images/retromachine/retro_backlog.webp',
      './images/retromachine/retro_reflection.webp',
    ],
    technologies: ['nestjs', 'React', 'Tailwind'],
  },
  {
    id: 'newbies',
    title: 'Newbies.pl',
    link: 'https://newbies.pl',
    description: 'Community of junior developers and tech enthusiasts that helps each other grow.',
    about: "Hackathons, lectures and code reviews are our main activities. We organize events both online and offline. Our goal is to create a supportive environment where beginners can learn, share knowledge, and build connections in the tech industry.",
    images: [
      './images/newbies/newbies.webp',
    ],
  },
  {
    id: 'jeteo',
    title: "Jeteo",
    link: 'https://jeteo.newbies.pl',
    description: "The jeteo portal was created to address the need to create RST CodeMeetings events and collect feedback.",
    about: "The project was created using Next.js with Tailwind CSS for the frontend, and Prisma with PostgreSQL for the backend. It features user authentication, event management, and feedback collection functionalities.",
    images: [
      './images/jeteo/jeteo_event.webp',
      './images/jeteo/jeteo_main.webp',
      './images/jeteo/jeteo_rate.webp',
      './images/jeteo/jeteo_summary.webp',
    ],
    technologies: ['Next.js', 'Tailwind', 'Prisma', 'PostgreSQL']
  },
  {
    id: 'rental',
    title: "Wypożyczajka",
    description: 'React native app for managing car rentals.',
    about: "The app allows users to view available cars, make reservations, and manage their rentals. It features a user-friendly interface and integrates with a backend API for data management. Wypożyczajka offers functionalities such as tracking car availability, creating rental agreements, signatures, and generating invoices.",
    technologies: ['React Native', 'Expo', 'TypeScript'],
    images: [
      './images/wypozyczajka/wypozyczajka_main.webp',
      './images/wypozyczajka/wypozyczajka_form.webp',
    ]
  },
  {
    id: 'webdrive',
    title: 'Webdrive',
    link: 'https://webdrive.petryszyn.dev',
    description: 'Multiplayer road trip through a procedural wasteland, right in the browser.',
    about: "The Web Drive is a cozy co-op survival game for up to 8 players. You start in a workshop, assemble an old car from scattered parts, pack a fuel canister and set off with your crew across an endless procedurally generated desert. Players share an invite code, customise their character and keep an eye on health, hunger and thirst while the road goes on.",
    images: [
      './images/webdrive/webdrive_lobby.webp',
      './images/webdrive/webdrive_workshop.webp',
      './images/webdrive/webdrive_desert.webp',
    ],
    technologies: ['React', 'Three.js', 'Rapier', 'Colyseus'],
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    link: 'https://play.google.com/store/search?q=pub%3Apetryszyn.dev&c=apps',
    description: 'Casual puzzle games for Android published on Google Play.',
    about: "A family of relaxing offline puzzle games released under petryszyn.dev. Water Sort: pour and sort colours between tubes with undo, extra tube and chapters of levels. Sudoku: Train your BRAIN: classic Sudoku with notes, hints and lives. Both share one polished UI, progression with three-star ratings, a daily challenge with streaks and play without a time limit or internet connection.",
    images: [
      './images/mobile/mobile_watersort.webp',
      './images/mobile/mobile_sudoku.webp',
    ],
  }
]
