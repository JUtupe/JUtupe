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
    id: 'retromachina',
    title: 'Retromachina',
    link: 'https://retro.newbies.pl',
    about: "Retromachina solves the problem of unstructured retrospectives in agile teams. It provides a structured approach to retrospectives, allowing teams to reflect on their work, identify areas for improvement, and plan actionable steps for future sprints. The tool offers features like voting, and action item tracking.",
    images: [
      './images/retromachine/retro_main.webp',
      './images/retromachine/retro_backlog.webp',
      './images/retromachine/retro_reflection.webp',
    ],
    technologies: ['nestjs', 'React', 'Tailwind'],
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
  }
]
