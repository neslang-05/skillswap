'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
  location: string
  skillsOffered: string[]
  skillsWanted: string[]
}

interface ProfileErrors {
  name?: string
  email?: string
  university?: string
  year?: string
  skillsOffered?: string
  skillsWanted?: string
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
    location: '',
    skillsOffered: [],
    skillsWanted: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const [errors, setErrors] = useState<ProfileErrors>({})

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch('/api/profile')
      if (!res.ok) throw new Error('Failed to fetch profile')
      const data = await res.json()
      setProfile(data)
    } catch (err) {
      console.error(err)
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

  const validateForm = () => {
    const newErrors: ProfileErrors = {}
    
    if (!profile.name) newErrors.name = "Name is required"
    if (!profile.email) newErrors.email = "Email is required"
    if (!profile.university) newErrors.university = "University is required"
    if (!profile.year) newErrors.year = "Year is required"
    if (!profile.skillsOffered?.length) newErrors.skillsOffered = "At least one skill must be offered"
    if (!profile.skillsWanted?.length) newErrors.skillsWanted = "At least one skill must be wanted"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
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
    } catch (err) {
      console.error(err)
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
    <>
      <Header />
      <div className="container mx-auto py-8 px-4 md:px-[30%]">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <TooltipProvider>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Required Information</h3>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          placeholder="Your full name"
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter your full name as you'd like it to appear</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your primary contact email</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Label htmlFor="university">University *</Label>
                        <Input
                          id="university"
                          value={profile.university}
                          onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                          placeholder="Your university name"
                          className={errors.university ? "border-red-500" : ""}
                        />
                        {errors.university && <span className="text-red-500 text-sm">{errors.university}</span>}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Current or most recent university attended</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Label htmlFor="year">Year *</Label>
                        <Input
                          id="year"
                          value={profile.year}
                          onChange={(e) => setProfile({ ...profile, year: e.target.value })}
                          placeholder="Current year of study"
                          className={errors.year ? "border-red-500" : ""}
                        />
                        {errors.year && <span className="text-red-500 text-sm">{errors.year}</span>}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your current year of study</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Label htmlFor="skillsOffered">Skills Offered (comma-separated) *</Label>
                        <Input
                          id="skillsOffered"
                          value={profile.skillsOffered?.join(', ') || ''}
                          onChange={(e) => setProfile({ ...profile, skillsOffered: e.target.value.split(',').map(s => s.trim()) })}
                          placeholder="Python, JavaScript, React..."
                          className={errors.skillsOffered ? "border-red-500" : ""}
                        />
                        {errors.skillsOffered && <span className="text-red-500 text-sm">{errors.skillsOffered}</span>}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Skills you can teach others (separate with commas)</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Label htmlFor="skillsWanted">Skills Wanted (comma-separated) *</Label>
                        <Input
                          id="skillsWanted"
                          value={profile.skillsWanted?.join(', ') || ''}
                          onChange={(e) => setProfile({ ...profile, skillsWanted: e.target.value.split(',').map(s => s.trim()) })}
                          placeholder="Machine Learning, UI Design..."
                          className={errors.skillsWanted ? "border-red-500" : ""}
                        />
                        {errors.skillsWanted && <span className="text-red-500 text-sm">{errors.skillsWanted}</span>}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Skills you want to learn (separate with commas)</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profile.website}
                          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your personal or professional website</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input
                          id="twitter"
                          value={profile.twitter}
                          onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                          placeholder="@yourtwitterhandle"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your Twitter handle</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={profile.linkedin}
                          onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your LinkedIn profile URL</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          value={profile.github}
                          onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                          placeholder="https://github.com/yourusername"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your GitHub profile URL</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </TooltipProvider>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  )
} 