"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, Heart, Briefcase, TrendingUp, Globe, Shield } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Active Job Seekers", value: "100K+", icon: Users },
  { label: "Partner Companies", value: "2,500+", icon: Briefcase },
  { label: "Successful Placements", value: "50K+", icon: Award },
  { label: "Cities Covered", value: "50+", icon: Globe },
]

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We're committed to connecting talented individuals with opportunities that align with their career goals and aspirations.",
  },
  {
    icon: Heart,
    title: "People-First",
    description:
      "Every decision we make prioritizes the success and satisfaction of both job seekers and employers on our platform.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "We maintain the highest standards of integrity, ensuring honest and transparent interactions for all users.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Innovation",
    description:
      "We constantly evolve our platform with cutting-edge technology to provide the best job search experience.",
  },
]

const team = [
  {
    name: "Rajesh Sharma",
    role: "Founder & CEO",
    bio: "Former tech executive with 15+ years in talent acquisition and HR technology.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Priya Patel",
    role: "CTO",
    bio: "AI and machine learning expert focused on building intelligent job matching systems.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Vikram Kumar",
    role: "Head of Operations",
    bio: "Operations specialist ensuring seamless experiences for all platform users.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Anita Singh",
    role: "Head of Marketing",
    bio: "Brand strategist passionate about connecting people with their dream careers.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description: "NiyaraWFS was established with a vision to revolutionize job searching in India.",
  },
  {
    year: "2021",
    title: "First 10K Users",
    description: "Reached our first major milestone of 10,000 registered job seekers.",
  },
  {
    year: "2022",
    title: "AI Integration",
    description: "Launched our AI-powered job matching system for personalized recommendations.",
  },
  {
    year: "2023",
    title: "50K Placements",
    description: "Celebrated 50,000 successful job placements across various industries.",
  },
  {
    year: "2024",
    title: "100K+ Users",
    description: "Crossed 100,000 active users and expanded to 50+ cities across India.",
  },
]

function AboutContent() {
  const { user } = useAuth()

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <Badge variant="secondary" className="mb-4">
          About NiyaraWFS
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Connecting Talent with Opportunity</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're on a mission to transform the job search experience in India by leveraging technology to create
          meaningful connections between talented professionals and forward-thinking companies.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Our Story */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Our Story</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            NiyaraWFS was born from a simple observation: the traditional job search process was broken. Job seekers
            were spending countless hours applying to positions that weren't the right fit, while employers struggled to
            find qualified candidates despite having thousands of applications.
          </p>
          <p className="text-lg leading-relaxed">
            Founded in 2020 by a team of HR professionals and technology experts, we set out to create a platform that
            would use artificial intelligence and data science to make job matching more intelligent, efficient, and
            effective for everyone involved.
          </p>
          <p className="text-lg leading-relaxed">
            Today, NiyaraWFS serves over 100,000 job seekers and 2,500+ companies across India, facilitating meaningful
            career connections every day. Our AI-powered platform has successfully placed over 50,000 professionals in
            roles that align with their skills, interests, and career goals.
          </p>
        </CardContent>
      </Card>

      {/* Our Values */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{value.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Leadership Team */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Leadership Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Company Milestones */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {milestone.year}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who have found their perfect job match through NiyaraWFS. Whether you're
            looking for your next opportunity or seeking top talent, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Button size="lg" asChild>
                  <Link href="/auth/register">Get Started Today</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/jobs">Browse Jobs</Link>
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/jobs">Browse Jobs</Link>
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AboutPage() {
  const { user } = useAuth()

  if (user) {
    return (
      <DashboardShell>
        <AboutContent />
      </DashboardShell>
    )
  }

  return <AboutContent />
}
