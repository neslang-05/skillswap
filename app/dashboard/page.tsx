'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MessageSquare, Users, Book, User } from 'lucide-react'
import Link from 'next/link'

// Mock data for the dashboard
const upcomingExchanges = [
  { id: 1, skill: "JavaScript", with: "Emily R.", date: "2024-03-15", time: "14:00" },
  { id: 2, skill: "Graphic Design", with: "Michael S.", date: "2024-03-18", time: "10:00" },
]

const recentMessages = [
  { id: 1, from: "Sarah J.", message: "Thanks for the great Python session!", time: "2 hours ago" },
  { id: 2, from: "Alex M.", message: "Are you available for a React tutorial next week?", time: "1 day ago" },
]

const recommendedSkills = [
  "Machine Learning", "UX Design", "Digital Marketing", "Data Visualization", "Mobile App Development"
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Your Skill Exchanges</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                  {upcomingExchanges.map(exchange => (
                    <div key={exchange.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                      <div>
                        <p className="font-semibold">{exchange.skill} with {exchange.with}</p>
                        <p className="text-sm text-muted-foreground">{exchange.date} at {exchange.time}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="past">
                  <p>No past exchanges to display.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              {recentMessages.map(message => (
                <div key={message.id} className="flex items-start space-x-4 py-4 border-b last:border-b-0">
                  <Avatar>
                    <AvatarFallback>{message.from[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="font-semibold">{message.from}</p>
                    <p className="text-sm text-muted-foreground">{message.message}</p>
                    <p className="text-xs text-muted-foreground">{message.time}</p>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-4">
                <MessageSquare className="mr-2 h-4 w-4" />
                View All Messages
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Skills to Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {recommendedSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
              <Button className="w-full mt-4">
                <Book className="mr-2 h-4 w-4" />
               <Link href="/explore">
                 Explore More Skills
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Keep your profile up to date to get the best matches for skill exchanges.</p>
              <Button asChild>
                <Link href="/profile/[id]">
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
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

