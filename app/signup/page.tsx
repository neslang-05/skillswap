'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Header } from '@/components/header'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { setIsAuthenticated, setUserId } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure your passwords match.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      console.log('Sending signup request...')
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await res.json()
      console.log('Signup response:', data)

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setIsAuthenticated(true)
      setUserId(data.userId)

      toast({
        title: "Account created successfully",
        description: "Let's set up your profile!",
      })

      router.push('/profile/edit')

    } catch (error) {
      console.error('Signup error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create your SkillSwap account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <Link href="/signin" className="text-sm text-muted-foreground hover:text-primary">
              Already have an account? Sign in
            </Link>
          </CardFooter>
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

