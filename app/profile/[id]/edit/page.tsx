'use client'
// import '../app/globals.css'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockUser } from '@/lib/mock-data'
import { useToast } from "@/hooks/use-toast"
import { Toast } from "@/components/ui/toast"

export default function EditProfile() {
  const router = useRouter()
  const [user, setUser] = useState(mockUser)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'offered' | 'wanted') => {
    const { value } = e.target
    const skills = value.split(',').map(skill => skill.trim())
    setUser(prevUser => ({
      ...prevUser,
      [type === 'offered' ? 'skillsOffered' : 'skillsWanted']: skills
    }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUser(prevUser => ({ ...prevUser, avatar: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log('Updated user data:', user)
    // Simulate an API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
      router.push(`/profile/${user.id}`)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                  Change Avatar
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={user.name} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" value={user.bio} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input id="university" name="university" value={user.university} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" name="year" value={user.year} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" value={user.website} onChange={handleChange} placeholder="https://example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" name="twitter" value={user.twitter} onChange={handleChange} placeholder="https://twitter.com/username" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" name="linkedin" value={user.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" name="github" value={user.github} onChange={handleChange} placeholder="https://github.com/username" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillsOffered">Skills Offered (comma-separated)</Label>
                <Input 
                  id="skillsOffered" 
                  name="skillsOffered" 
                  value={user.skillsOffered.join(', ')} 
                  onChange={(e) => handleSkillChange(e, 'offered')} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillsWanted">Skills Wanted (comma-separated)</Label>
                <Input 
                  id="skillsWanted" 
                  name="skillsWanted" 
                  value={user.skillsWanted.join(', ')} 
                  onChange={(e) => handleSkillChange(e, 'wanted')} 
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; 2024 SkillSwap. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

