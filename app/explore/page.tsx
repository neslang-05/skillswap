'use client'
import { useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"
import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
  userId: string
  name: string
  avatar: string
  university: string
  skillsOffered: string[]
  skillsWanted: string[]
}

function Avatar({ name }: { name: string }) {
  const firstLetter = name?.charAt(0).toUpperCase(); // Ensure safety with optional chaining
  return (
    <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold">
      {firstLetter}
    </div>
  );
}

export default function ExplorePage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUniversity, setSelectedUniversity] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const res = await fetch('/api/explore')
        if (!res.ok) throw new Error('Failed to fetch users')
        
        const data = await res.json()
        if (data.users) {
          setUsers(data.users)
        } else {
          setUsers([])
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load users'
        setError(errorMessage)
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [toast])

  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedUniversity === '' || user.university === selectedUniversity)
    )
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading users...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="text-center p-6">
            <h2 className="text-xl font-semibold mb-4">Error Loading Users</h2>
            <p className="text-muted-foreground">{error}</p>
            <Button 
              className="mt-4" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Explore Skills</h1>
        <div className="mb-6 flex space-x-4">
          <Input 
            placeholder="Search by name" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="block w-full px-4 py-2 text-left leading-tight bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline text-gray-700 dark:text-gray-300">
              {selectedUniversity || "Filter by university"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by University</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedUniversity('')}>All Universities</DropdownMenuItem>
              {Array.from(new Set(users.map(user => user.university))).map((university, index) => (
                <DropdownMenuItem key={index} onClick={() => setSelectedUniversity(university)}>
                  {university}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.userId}>
              <CardHeader className="flex flex-row items-center space-x-4">
                <Avatar name={user.name} />
                <div>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{user.university}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Skills Offered:</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.skillsOffered.map((skill, index) => (
                        <Badge key={`${skill}-${index}`} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Skills Wanted:</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.skillsWanted.map((skill, index) => (
                        <Badge key={`${skill}-${index}`} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Connect</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
