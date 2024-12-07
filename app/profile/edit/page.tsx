'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface UserProfile {
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
  skills: string[]
  interests: string[]
  location: string
  skillsOffered: string[]
  skillsWanted: string[]
}

export default function EditProfile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    avatar: '',
    bio: '',
    university: '',
    year: '',
    website: '',
    twitter: '',
    linkedin: '',
    github: '',
    skills: [],
    interests: [],
    location: '',
    skillsOffered: [],
    skillsWanted: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      if (!res.ok) throw new Error('Failed to fetch profile')
      const data = await res.json()
      setProfile(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      })

      if (!res.ok) {
        throw new Error('Failed to update profile')
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
      router.push('/profile')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input
                id="skills"
                value={profile.skills.join(', ')}
                onChange={(e) => setProfile({ ...profile, skills: e.target.value.split(',').map(s => s.trim()) })}
              />
            </div>

            <div>
              <Label htmlFor="interests">Interests (comma-separated)</Label>
              <Input
                id="interests"
                value={profile.interests.join(', ')}
                onChange={(e) => setProfile({ ...profile, interests: e.target.value.split(',').map(s => s.trim()) })}
              />
            </div>

            <div>
              <Label htmlFor="university">University</Label>
              <Input
                id="university"
                value={profile.university}
                onChange={(e) => setProfile({ ...profile, university: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                value={profile.year}
                onChange={(e) => setProfile({ ...profile, year: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={profile.twitter}
                onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={profile.github}
                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="skillsOffered">Skills Offered (comma-separated)</Label>
              <Input
                id="skillsOffered"
                value={profile.skillsOffered?.join(', ') || ''}
                onChange={(e) => setProfile({ ...profile, skillsOffered: e.target.value.split(',').map(s => s.trim()) })}
              />
            </div>

            <div>
              <Label htmlFor="skillsWanted">Skills Wanted (comma-separated)</Label>
              <Input
                id="skillsWanted"
                value={profile.skillsWanted?.join(', ') || ''}
                onChange={(e) => setProfile({ ...profile, skillsWanted: e.target.value.split(',').map(s => s.trim()) })}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 