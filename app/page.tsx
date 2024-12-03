import '../app/globals.css'
import { Header } from '@/components/header'
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Zap, Star, Shield, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-foreground dark:from-primary-foreground dark:to-primary text-primary-foreground dark:text-primary py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-5xl font-bold mb-6">Swap Skills, Grow Together</h1>
              <p className="text-xl mb-8">Connect with fellow students, exchange skills, and expand your knowledge.</p>
              <Link href="/signup">
                <Button size="lg" className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Students exchanging skills"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background text-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How SkillSwap Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<BookOpen className="h-12 w-12 text-primary" />}
                title="Discover Skills"
                description="Browse through a wide range of skills offered by students from various disciplines."
              />
              <FeatureCard
                icon={<Users className="h-12 w-12 text-primary" />}
                title="Connect with Peers"
                description="Match with students who have the skills you want to learn and can benefit from your expertise."
              />
              <FeatureCard
                icon={<Zap className="h-12 w-12 text-primary" />}
                title="Exchange Knowledge"
                description="Set up skill exchange sessions and grow together through collaborative learning."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="SkillSwap has been a game-changer for my college experience. I've learned so much from my peers!"
                author="Sarah J., Computer Science Major"
              />
              <TestimonialCard
                quote="I love how easy it is to find students with complementary skills. It's like a marketplace for knowledge!"
                author="Mike T., Business Administration Student"
              />
              <TestimonialCard
                quote="The platform's user-friendly interface makes skill exchanges smooth and enjoyable."
                author="Emily R., Graphic Design Enthusiast"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-background text-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard
                number={1}
                title="Create Your Profile"
                description="Sign up and list the skills you can offer and the ones you want to learn."
              />
              <StepCard
                number={2}
                title="Find Your Match"
                description="Browse through student profiles or use our smart matching algorithm."
              />
              <StepCard
                number={3}
                title="Start Learning"
                description="Connect with your match, schedule sessions, and begin your skill exchange journey."
              />
            </div>
          </div>
        </section>

        {/* Popular Skills Section */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Skills on SkillSwap</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {["Programming", "Graphic Design", "Language Exchange", "Music Production", "Data Analysis", "Public Speaking", "Photography", "Digital Marketing", "3D Modeling", "Creative Writing"].map((skill, index) => (
                <span key={index} className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Trust and Safety Section */}
        <section className="py-20 bg-background text-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Your Trust and Safety is Our Priority</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TrustCard
                icon={<Shield className="h-12 w-12 text-primary" />}
                title="Verified Profiles"
                description="All users go through a verification process to ensure a safe community."
              />
              <TrustCard
                icon={<Star className="h-12 w-12 text-primary" />}
                title="Rating System"
                description="Leave feedback after each session to maintain high-quality exchanges."
              />
              <TrustCard
                icon={<Sparkles className="h-12 w-12 text-primary" />}
                title="Secure Platform"
                description="Your data and communications are protected with state-of-the-art security measures."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Swapping Skills?</h2>
            <p className="text-xl mb-8">Join our community of learners and start expanding your skillset today.</p>
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground">
              &copy; 2024 SkillSwap. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <a 
                href="https://github.com/neslang-05/skillswap_v2" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-muted-foreground hover:text-primary"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md flex flex-col items-center text-center">
      {icon}
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md">
      <p className="italic mb-4">"{quote}"</p>
      <p className="font-semibold">- {author}</p>
    </div>
  )
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md flex flex-col items-center text-center">
      <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function TrustCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md flex flex-col items-center text-center">
      {icon}
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

