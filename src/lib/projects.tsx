interface Project {
  id: string;
  title: string;
  description?: string;
  link?: string;
  images: string[];
}

export const projects: Project[] = [
  {
    id: 'newbies',
    title: 'Newbies.pl',
    description: 'A platform for new developers to find their first job in IT.',
    images: []
  },
  {
    id: 'retromachina',
    title: 'Retromachina',
    images: []
  },
  {
    id: 'jeteo',
    title: "Jeteo",
    description: "Portal jeteo powstał jako odpowiedź na potrzebę tworzenia wydarzeń RST CodeMeetings oraz zbierania feedbacku. Spersonalizowana ankieta zastąpiła dotychczasowo używane arkusze Google.",
    images: [
      './images/jeteo/jeteo_event.png',
      './images/jeteo/jeteo_main.png',
      './images/jeteo/jeteo_rate.png',
      './images/jeteo/jeteo_summary.png',
    ]
  },
  {
    id: 'ai-training',
    title: "AI training",
    images: []
  }
]
