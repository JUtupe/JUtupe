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
    description: 'A platform for new developers to find their first job in IT.',
    images: [],
    technologies: ['Next.js']
  },
  {
    id: 'retromachina',
    title: 'Retromachina',
    link: 'https://retro.newbies.pl',
    images: [],
    technologies: ['nestjs', 'React', 'Tailwind'],
  },
  {
    id: 'jeteo',
    title: "Jeteo",
    link: 'https://jeteo.newbies.pl',
    description: "The jeteo portal was created to address the need to create RST CodeMeetings events and collect feedback. A personalized survey replaced the previously used Google Spreadsheets.",
    images: [
      './images/jeteo/jeteo_event.webp',
      './images/jeteo/jeteo_main.webp',
      './images/jeteo/jeteo_rate.webp',
      './images/jeteo/jeteo_summary.webp',
    ],
    technologies: ['Next.js', 'Tailwind', 'Prisma', 'PostgreSQL']
  },
  {
    id: 'ai-training',
    title: "AI training",
    images: []
  }
]
