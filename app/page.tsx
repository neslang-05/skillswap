'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Zap, Star, Shield, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import Typewriter from 'typewriter-effect'

// Animation variants
const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 60
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const cardVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.3
    }
  }
}

const skillTagVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.3
    }
  }),
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2
    }
  }
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <Header />
      <main className="flex-grow">
        {/* Hero Section - Now full screen */}
        <motion.section 
          className="h-[calc(100vh-4rem)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600 via-orange-500 to-green-500 dark:from-purple-900 dark:via-orange-900 dark:to-green-900 text-white dark:text-white flex items-center justify-center"
          variants={fadeInUp}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <Typewriter
                  options={{
                    strings: ['Swap Skills, Grow Together'],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                    delay: 50,
                  }}
                />
              </h1>
              <p className="text-xl mb-8">Connect with fellow students, exchange skills, and expand your knowledge.</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/signup">
                  <Button size="lg" className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="py-20 bg-background text-foreground"
          variants={fadeInUp}
        >
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              variants={fadeInUp}
            >
              How SkillSwap Works
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {[
                {
                  icon: <BookOpen className="h-12 w-12 text-primary" />,
                  title: "Discover Skills",
                  description: "Browse through a wide range of skills offered by students from various disciplines."
                },
                {
                  icon: <Users className="h-12 w-12 text-primary" />,
                  title: "Connect with Peers",
                  description: "Match with students who have the skills you want to learn and can benefit from your expertise."
                },
                {
                  icon: <Zap className="h-12 w-12 text-primary" />,
                  title: "Exchange Knowledge",
                  description: "Set up skill exchange sessions and grow together through collaborative learning."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <FeatureCard {...feature} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section 
          className="bg-muted py-20"
          variants={fadeInUp}
        >
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              variants={fadeInUp}
            >
              What Our Users Say
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {[
                {
                  quote: "SkillSwap has been a game-changer for my college experience. I've learned so much from my peers!",
                  author: "Sarah J., Computer Science Major"
                },
                {
                  quote: "I love how easy it is to find students with complementary skills. It's like a marketplace for knowledge!",
                  author: "Mike T., Business Administration Student"
                },
                {
                  quote: "The platform's user-friendly interface makes skill exchanges smooth and enjoyable.",
                  author: "Emily R., Graphic Design Enthusiast"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <TestimonialCard {...testimonial} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Popular Skills Section */}
        <motion.section 
          className="bg-background text-foreground py-20"
          variants={fadeInUp}
        >
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              variants={fadeInUp}
            >
              Popular Skills on SkillSwap
            </motion.h2>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              variants={staggerContainer}
            >
              {[
                "Programming",
                "Graphic Design",
                "Language Exchange",
                "Music Production",
                "Data Analysis",
                "Public Speaking",
                "Photography",
                "Digital Marketing",
                "3D Modeling",
                "Creative Writing"
              ].map((skill, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={skillTagVariants}
                  whileHover="hover"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Trust and Safety Section */}
        <motion.section 
          className="py-20 bg-muted text-foreground"
          variants={fadeInUp}
        >
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              variants={fadeInUp}
            >
              Your Trust and Safety is Our Priority
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {[
                {
                  icon: <Shield className="h-12 w-12 text-primary" />,
                  title: "Verified Profiles",
                  description: "All users go through a verification process to ensure a safe community."
                },
                {
                  icon: <Star className="h-12 w-12 text-primary" />,
                  title: "Rating System",
                  description: "Leave feedback after each session to maintain high-quality exchanges."
                },
                {
                  icon: <Sparkles className="h-12 w-12 text-primary" />,
                  title: "Secure Platform",
                  description: "Your data and communications are protected with state-of-the-art security measures."
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <TrustCard {...card} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="bg-primary text-primary-foreground py-20"
          variants={fadeInUp}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={fadeInUp}>
              <motion.h2 
                className="text-3xl font-bold mb-6"
                variants={fadeInUp}
              >
                Ready to Start Swapping Skills?
              </motion.h2>
              <motion.p 
                className="text-xl mb-8"
                variants={fadeInUp}
              >
                Join our community of learners and start expanding your skillset today.
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/signup">
                  <Button size="lg" variant="secondary">
                    Sign Up Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Rest of the sections remain the same but wrapped with motion.div for animations */}
      </main>
      <motion.footer 
        className="bg-background border-t py-6"
        variants={fadeInUp}
      >
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
                href="https://github.com/your-username/skillswap" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-muted-foreground hover:text-primary"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md flex flex-col items-center text-center h-full">
      {icon}
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md h-full">
      <p className="italic mb-4">{quote}</p>
      <p className="font-semibold">- {author}</p>
    </div>
  )
}

function TrustCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md flex flex-col items-center text-center h-full">
      {icon}
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

