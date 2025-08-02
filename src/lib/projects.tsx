interface Project {
  id: string;
  title: string;
  description?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: 'newbies',
    title: 'Newbies.pl'
  },
  {
    id: 'retromachina',
    title: 'Retromachina'
  },
  {
    id: 'jeteo',
    title: "Jeteo"
  },
  {
    id: 'ai-training',
    title: "AI training"
  }
]
