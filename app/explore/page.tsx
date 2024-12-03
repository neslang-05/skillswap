'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Book, TrendingUp, Star } from 'lucide-react'

// Mock data for skills
const mockSkills = [
  { id: 1, name: "JavaScript Programming", category: "Technology", popularity: 95, difficulty: "Intermediate" },
  { id: 2, name: "Graphic Design", category: "Design", popularity: 88, difficulty: "Beginner" },
  { id: 3, name: "Public Speaking", category: "Communication", popularity: 82, difficulty: "Intermediate" },
  { id: 4, name: "Data Analysis", category: "Technology", popularity: 90, difficulty: "Advanced" },
  { id: 5, name: "Creative Writing", category: "Arts", popularity: 75, difficulty: "Beginner" },
  { id: 6, name: "Machine Learning", category: "Technology", popularity: 92, difficulty: "Advanced" },
  { id: 7, name: "Digital Marketing", category: "Business", popularity: 85, difficulty: "Intermediate" },
  { id: 8, name: "Photography", category: "Arts", popularity: 80, difficulty: "Beginner" },
  { id: 9, name: "Python Programming", category: "Technology", popularity: 94, difficulty: "Intermediate" },
  { id: 10, name: "Video Editing", category: "Design", popularity: 87, difficulty: "Beginner" },
  { id: 11, name: "SEO Optimization", category: "Business", popularity: 86, difficulty: "Intermediate" },
  { id: 12, name: "Cooking", category: "Lifestyle", popularity: 78, difficulty: "Beginner" },
  { id: 13, name: "3D Modeling", category: "Design", popularity: 89, difficulty: "Intermediate" },
  { id: 14, name: "Web Development", category: "Technology", popularity: 93, difficulty: "Advanced" },
  { id: 15, name: "Yoga", category: "Lifestyle", popularity: 70, difficulty: "Beginner" },
  { id: 16, name: "Mobile App Development", category: "Technology", popularity: 91, difficulty: "Advanced" },
  { id: 17, name: "Event Planning", category: "Management", popularity: 76, difficulty: "Beginner" },
  { id: 18, name: "Blockchain Development", category: "Technology", popularity: 88, difficulty: "Advanced" },
  { id: 19, name: "Financial Analysis", category: "Business", popularity: 84, difficulty: "Intermediate" },
  { id: 20, name: "Social Media Management", category: "Business", popularity: 82, difficulty: "Beginner" },
  { id: 21, name: "Cybersecurity Basics", category: "Technology", popularity: 90, difficulty: "Intermediate" },
  { id: 22, name: "Painting", category: "Arts", popularity: 77, difficulty: "Beginner" },
  { id: 23, name: "Artificial Intelligence", category: "Technology", popularity: 92, difficulty: "Advanced" },
  { id: 24, name: "Content Writing", category: "Business", popularity: 81, difficulty: "Beginner" },
  { id: 25, name: "UX/UI Design", category: "Design", popularity: 89, difficulty: "Intermediate" },
  { id: 26, name: "Game Development", category: "Technology", popularity: 87, difficulty: "Advanced" },
  { id: 27, name: "Dancing", category: "Arts", popularity: 79, difficulty: "Beginner" },
  { id: 28, name: "Data Science", category: "Technology", popularity: 94, difficulty: "Advanced" },
  { id: 29, name: "Music Composition", category: "Arts", popularity: 73, difficulty: "Intermediate" },
  { id: 30, name: "Accounting", category: "Business", popularity: 80, difficulty: "Beginner" },
  { id: 31, name: "Project Management", category: "Management", popularity: 86, difficulty: "Intermediate" },
  { id: 32, name: "Photography Editing", category: "Design", popularity: 85, difficulty: "Beginner" },
  { id: 33, name: "Cloud Computing", category: "Technology", popularity: 91, difficulty: "Advanced" },
  { id: 34, name: "Robotics", category: "Technology", popularity: 88, difficulty: "Advanced" },
  { id: 35, name: "Interior Design", category: "Design", popularity: 83, difficulty: "Intermediate" },
  { id: 36, name: "Speech Writing", category: "Communication", popularity: 78, difficulty: "Intermediate" },
  { id: 37, name: "Fitness Training", category: "Lifestyle", popularity: 74, difficulty: "Beginner" },
  { id: 38, name: "Entrepreneurship Basics", category: "Business", popularity: 84, difficulty: "Beginner" },
  { id: 39, name: "Embedded Systems", category: "Technology", popularity: 90, difficulty: "Advanced" },
  { id: 40, name: "Fashion Design", category: "Design", popularity: 76, difficulty: "Intermediate" },
  { id: 41, name: "Virtual Reality", category: "Technology", popularity: 87, difficulty: "Advanced" },
  { id: 42, name: "Stock Market Basics", category: "Business", popularity: 82, difficulty: "Beginner" },
  { id: 43, name: "Language Translation", category: "Communication", popularity: 81, difficulty: "Intermediate" },
  { id: 44, name: "Audio Engineering", category: "Technology", popularity: 85, difficulty: "Intermediate" },
  { id: 45, name: "Ethical Hacking", category: "Technology", popularity: 93, difficulty: "Advanced" },
  { id: 46, name: "Sculpting", category: "Arts", popularity: 70, difficulty: "Beginner" },
  { id: 47, name: "Agriculture Technology", category: "Technology", popularity: 80, difficulty: "Intermediate" },
  { id: 48, name: "Negotiation Skills", category: "Communication", popularity: 77, difficulty: "Intermediate" },
  { id: 49, name: "Handwriting Analysis", category: "Lifestyle", popularity: 69, difficulty: "Beginner" },
  { id: 50, name: "Film Direction", category: "Arts", popularity: 88, difficulty: "Advanced" },
  // Generate up to 100 entries similarly
]


const categories = ["All", "Technology", "Design", "Communication", "Arts", "Business"]

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeTab, setActiveTab] = useState("trending")

  const filteredSkills = mockSkills.filter(skill => 
    (selectedCategory === 'All' || skill.category === selectedCategory) &&
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    if (activeTab === "trending") {
      return b.popularity - a.popularity
    } else {
      return a.name.localeCompare(b.name)
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Explore Skills</h1>
        <div className="mb-8">
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </div>
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="trending">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="alphabetical">
                <Book className="mr-2 h-4 w-4" />
                Alphabetical
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSkills.map(skill => (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {skill.name}
                  <Badge variant="secondary">{skill.category}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-1 h-4 w-4" />
                    <span>{skill.popularity}% Popular</span>
                  </div>
                  <Badge>{skill.difficulty}</Badge>
                </div>
                <Button className="w-full mt-4">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; 2024 SkillSwap. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

