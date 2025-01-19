'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Book } from 'lucide-react'

// Mock data for skills
const mockSkills = [
  { id: 1, name: "JavaScript Programming", category: "Technology", user: "Alice Johnson" },
  { id: 2, name: "Graphic Design", category: "Design", user: "Bob Smith" },
  { id: 3, name: "Public Speaking", category: "Communication", user: "Charlie Brown" },
  { id: 4, name: "Data Analysis", category: "Technology", user: "Diana Ross" },
  { id: 5, name: "Creative Writing", category: "Arts", user: "Eva Green" },
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [skills, setSkills] = useState(mockSkills)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would fetch results from an API here
    const filteredSkills = mockSkills.filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSkills(filteredSkills)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Search Skills</h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for skills or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map(skill => (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle>{skill.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="mb-2">{skill.category}</Badge>
                <p className="flex items-center text-sm text-muted-foreground">
                  <Book className="mr-2 h-4 w-4" />
                  Offered by {skill.user}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; 2025 SkillSwap. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

