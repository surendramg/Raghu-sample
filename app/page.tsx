"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Briefcase, Users, TrendingUp, Star } from "lucide-react"
import Link from "next/link"
import FeaturedJobs from "@/components/featured-jobs"
import BlogPreview from "@/components/blog-preview"

const stats = [
  { label: "Active Jobs", value: "2,500+", icon: Briefcase },
  { label: "Companies", value: "500+", icon: Users },
  { label: "Success Rate", value: "95%", icon: TrendingUp },
  { label: "User Rating", value: "4.9/5", icon: Star },
]

const features = [
  {
    title: "Smart Job Matching",
    description:
      "AI-powered algorithm matches you with the perfect opportunities based on your skills and preferences.",
    icon: "🎯",
  },
  {
    title: "Real-time Notifications",
    description: "Get instant alerts when new jobs matching your criteria are posted.",
    icon: "🔔",
  },
  {
    title: "Company Insights",
    description: "Access detailed company profiles, culture insights, and employee reviews.",
    icon: "🏢",
  },
  {
    title: "Interview Preparation",
    description: "Comprehensive interview guides and practice sessions to help you succeed.",
    icon: "📚",
  },
]

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    company: "Tech Innovators",
    content:
      "NiyaraWFS helped me find my dream job in just 2 weeks. The platform is intuitive and the job matches were perfect!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "Marketing Manager",
    company: "Digital Solutions",
    content: "Amazing platform! The company insights feature helped me choose the right workplace culture fit.",
    rating: 5,
  },
  {
    name: "Anita Patel",
    role: "Data Scientist",
    company: "Analytics Pro",
    content:
      "The interview preparation resources were invaluable. I felt confident and well-prepared for every interview.",
    rating: 5,
  },
]

function HomeContent() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-primary/10 via-purple-50 to-blue-50 dark:from-primary/5 dark:via-purple-950/20 dark:to-blue-950/20">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            <Badge variant="secondary" className="mb-4">
              🚀 India's #1 Job Portal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with top employers across India and discover opportunities that match your skills and career
              goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  >
                    <Link href="/auth/register">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/jobs">Browse Jobs</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  >
                    <Link href="/dashboard">
                      Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/jobs">Browse Jobs</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose NiyaraWFS?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to accelerate your career and find the perfect job match.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Opportunities</h2>
            <p className="text-xl text-muted-foreground">Discover hand-picked job opportunities from top companies</p>
          </div>
          <FeaturedJobs />
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/jobs">
                View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              Hear from professionals who found their dream jobs through NiyaraWFS
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>
                    {testimonial.role} at {testimonial.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Career Insights</h2>
            <p className="text-xl text-muted-foreground">
              Stay updated with the latest career tips and industry trends
            </p>
          </div>
          <BlogPreview />
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">
                Read More Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20 px-4 bg-gradient-to-r from-primary to-purple-600 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who have found their perfect job match
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth/register">Create Free Account</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                asChild
              >
                <Link href="/jobs">Explore Jobs</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default function HomePage() {
  const { user } = useAuth()

  if (user) {
    return (
      <DashboardShell>
        <HomeContent />
      </DashboardShell>
    )
  }

  return <HomeContent />
}
