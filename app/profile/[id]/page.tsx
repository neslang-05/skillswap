import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Edit, School, Calendar, Globe, Twitter, Linkedin, Github } from 'lucide-react'
import { mockUser } from '@/lib/mock-data'

export default function UserProfile({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the user data based on the id
  const user = mockUser;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{user.name}</CardTitle>
              <div className="flex items-center justify-center mt-2">
                <School className="w-4 h-4 mr-2" />
                <span className="text-sm text-muted-foreground">{user.university}</span>
              </div>
              <div className="flex items-center justify-center mt-1">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm text-muted-foreground">{user.year} Year</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">{user.bio}</p>
              <div className="flex justify-center space-x-4 mb-4">
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  <Globe className="w-5 h-5" />
                  <span className="sr-only">Website</span>
                </a>
                <a href={user.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  <Twitter className="w-5 h-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="w-5 h-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  <Github className="w-5 h-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
              <Link href={`/profile/${user.id}/edit`}>
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
                  {user.skillsOffered.map((skill, index) => (
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
                  {user.skillsWanted.map((skill, index) => (
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
                {user.ratings.map((rating) => (
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
                ))}
              </CardContent>
            </Card>
          </div>
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

