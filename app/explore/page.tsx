'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Book, TrendingUp, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import skillsData from '@/lib/mock-skills.json'
import type { Category } from '@/lib/types'

const categories: Category[] = ["All", "Technology", "Design", "Communication", "Arts", "Business"]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
}

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [activeTab, setActiveTab] = useState("trending")

  const filteredSkills = skillsData.skills.filter(skill => 
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
        <motion.h1 
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Explore Skills
        </motion.h1>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
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
        </motion.div>

        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
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
        </motion.div>

        <motion.div 
          className="mb-8 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
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
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {sortedSkills.map(skill => (
            <motion.div key={skill.id} variants={itemVariants}>
              <Card className="h-full">
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
            </motion.div>
          ))}
        </motion.div>
      </main>

      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; 2024 SkillSwap. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

