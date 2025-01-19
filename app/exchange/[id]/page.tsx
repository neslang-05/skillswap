'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MessageSquare, Clock, Star } from 'lucide-react'

// Mock data for the skill exchange
const exchangeData = {
  id: '1',
  skill: 'JavaScript Programming',
  description: 'Learn the fundamentals of JavaScript, including variables, functions, and DOM manipulation.',
  teacher: {
    id: '2',
    name: 'Emily Rodriguez',
    avatar: '/placeholder.svg?height=50&width=50',
    bio: 'Frontend developer with 5 years of experience. Passionate about teaching web technologies.',
    rating: 4.8,
  },
  student: {
    id: '1',
    name: 'Alex Johnson',
    avatar: '/placeholder.svg?height=50&width=50',
  },
}

export default function SkillExchangePage() {
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    console.log('Sending message:', message)
    setMessage('')
    // Here you would typically send the message to your backend
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Skill Exchange: {exchangeData.skill}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Exchange Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{exchangeData.description}</p>
              <div className="flex items-center space-x-4 mb-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Schedule a session</span>
                <Button variant="outline">Choose Date & Time</Button>
              </div>
              <div className="flex items-center space-x-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>Estimated duration: 1 hour</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Teacher Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={exchangeData.teacher.avatar} alt={exchangeData.teacher.name} />
                  <AvatarFallback>{exchangeData.teacher.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{exchangeData.teacher.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{exchangeData.teacher.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{exchangeData.teacher.bio}</p>
              <Badge>JavaScript</Badge>
              <Badge className="ml-2">React</Badge>
              <Badge className="ml-2">Web Development</Badge>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={exchangeData.student.avatar} alt={exchangeData.student.name} />
                  <AvatarFallback>{exchangeData.student.name[0]}</AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-semibold">{exchangeData.student.name}</p>
                  <p>It&apos;s a great day to learn!</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={exchangeData.teacher.avatar} alt={exchangeData.teacher.name} />
                  <AvatarFallback>{exchangeData.teacher.name[0]}</AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-semibold">{exchangeData.teacher.name}</p>
                  <p>Hello! I&apos;m glad you&apos;re excited. How about we schedule our first session for next week?</p>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <Textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button onClick={handleSendMessage}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; 2025 SkillSwap. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

