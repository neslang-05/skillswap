export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/placeholder.svg?height=100&width=100',
  bio: 'Computer Science student passionate about web development and machine learning.',
  university: 'State University',
  year: 'Junior',
  website: 'https://example.com',
  twitter: 'https://twitter.com/johndoe',
  linkedin: 'https://linkedin.com/in/johndoe',
  github: 'https://github.com/johndoe',
  skillsOffered: ['JavaScript', 'React', 'Node.js'],
  skillsWanted: ['Python', 'Data Science', 'UI/UX Design'],
  ratings: [
    { id: '1', rating: 5, comment: 'Great teacher, very patient!', from: 'Emily R.' },
    { id: '2', rating: 4, comment: 'Knowledgeable and helpful.', from: 'Michael S.' },
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

