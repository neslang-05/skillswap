"use client";
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import { useTheme } from "next-themes"
import { Moon, Sun, User, Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => setMounted(true), [])

  // This would be replaced with actual authentication logic
  useEffect(() => {
    // Simulating an authentication check
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true')
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          SkillSwap
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/search" className="text-muted-foreground hover:text-primary">
            Search Skills
          </Link>
          <Link href="/explore" className="text-muted-foreground hover:text-primary">
            Explore
          </Link>
          {!isAuthenticated ? (
            <>
              <Link href="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => router.push('/profile/1')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => {
                  localStorage.setItem('isAuthenticated', 'false')
                  setIsAuthenticated(false)
                  router.push('/')
                }}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="bg-background text-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && (theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            ))}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col space-y-4">
              <Link href="/search" className="text-muted-foreground hover:text-primary">
                Search Skills
              </Link>
              <Link href="/explore" className="text-muted-foreground hover:text-primary">
                Explore
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link href="/signin">
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/profile/1">
                    <Button variant="ghost" className="w-full justify-start">Profile</Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      localStorage.setItem('isAuthenticated', 'false')
                      setIsAuthenticated(false)
                      router.push('/')
                    }}
                  >
                    Log out
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                className="bg-background text-foreground"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {mounted && (theme === "dark" ? (
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                ))}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

