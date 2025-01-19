'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Edit, School, Calendar, Globe, Twitter, Linkedin, Github } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface Rating {
  id: string
  rating: number
  from: string
  comment: string
}

interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  bio: string
  university: string
  year: string
  website: string
  twitter: string
  linkedin: string
  github: string
  skillsOffered: string[]
  skillsWanted: string[]
  ratings?: Rating[]
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch('/api/profile')
      if (!res.ok) throw new Error('Failed to fetch profile')
      const data = await res.json()
      setProfile(data)
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  if (isLoading) return <div>Loading...</div>
  if (!profile) return <div>Failed to load profile</div>

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{profile.name}</CardTitle>
              {profile.university && (
                <div className="flex items-center justify-center mt-2">
                  <School className="w-4 h-4 mr-2" />
                  <span className="text-sm text-muted-foreground">{profile.university}</span>
                </div>
              )}
              {profile.year && (
                <div className="flex items-center justify-center mt-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm text-muted-foreground">{profile.year} Year</span>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">{profile.bio}</p>
              <div className="flex justify-center space-x-4 mb-4">
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Globe className="w-5 h-5" />
                    <span className="sr-only">Website</span>
                  </a>
                )}
                {profile.twitter && (
                  <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Twitter className="w-5 h-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Linkedin className="w-5 h-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                )}
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Github className="w-5 h-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                )}
              </div>
              <Link href="/profile/edit">
                <Button className="w-full">
                  <Edit className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Skills and Ratings */}
          <div className="md:col-span-2 space-y-6">
            {/* Skills Offered */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skillsOffered?.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills Wanted */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Wanted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skillsWanted?.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ratings and Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Ratings & Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {profile.ratings?.length ? (
                  profile.ratings.map((rating) => (
                    <div key={rating.id} className="mb-4 last:mb-0">
                      <div className="flex items-center mb-1">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < rating.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="font-semibold">{rating.from}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{rating.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No ratings yet</p>
                )}
              </CardContent>
            </Card>
          </div>
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
