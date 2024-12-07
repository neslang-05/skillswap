export const mockUser = {
  id: '1',
  name: 'Nilambar Elangbam',
  email: 'neslang.in@gmail.com',
  avatar: '/placeholder.svg?height=100&width=100',
  bio: 'Computer Science student passionate about web development and machine learning.',
  university: 'Manipur Technical University',
  year: 'Junior',
  website: 'https://my-portfolio-neslang.vercel.app/',
  twitter: 'https://x.com/Nilaelang',
  linkedin: 'www.linkedin.com/in/nilambar-elangbam-524617247',
  github: 'https://github.com/neslang-05',
  skillsOffered: ['JavaScript', 'React', 'Node.js', 'Next.js', 'Tailwind CSS','MongoDB'],
  skillsWanted: ['Python', 'Data Science', 'UI/UX Design', 'C++'],
  ratings: [
    { id: '1', rating: 5, comment: 'Great teacher, very patient!', from: 'Joymangol Ch' },
    { id: '2', rating: 4, comment: 'Knowledgeable and helpful.', from: 'N Jashwant Singh' },
  ]
}

export type User = typeof mockUser

// You might also want to add a type for the ratings
export type Rating = {
  id: string
  rating: number
  comment: string
  from: string
}

