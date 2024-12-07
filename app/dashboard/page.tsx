'use client'

import { useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast";
import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MessageSquare, Book, User, Edit } from 'lucide-react'
import Link from 'next/link'

interface Exchange {
  id: string
  skillOffered: string
  skillRequested: string
  status: 'pending' | 'accepted' | 'completed'
  partnerName: string
}

interface UserProfile {
  name: string
  skills: string[]
  exchanges: Exchange[]
}

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/dashboard')
      if (!res.ok) throw new Error('Failed to fetch dashboard data')
      const data = await res.json()
      setProfile(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (!profile) return <div>Failed to load dashboard</div>

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, {profile.name}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Your Skill Exchanges</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                  {profile.exchanges.length > 0 ? (
                    profile.exchanges.map(exchange => (
                      <div key={exchange.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                        <div>
                          <p className="font-semibold">{exchange.skillOffered} with {exchange.partnerName}</p>
                          <p className="text-sm text-muted-foreground">Status: {exchange.status}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Add to Calendar
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p>No upcoming exchanges to display.</p>
                  )}
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
              <p>No recent messages to display.</p>
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
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
              <Button className="w-full mt-4" asChild>
                <Link href="/explore">
                  <Book className="mr-2 h-4 w-4" />
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
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/profile/edit">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
              </div>
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

