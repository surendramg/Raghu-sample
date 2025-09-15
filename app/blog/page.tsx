"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, Search, TrendingUp, BookOpen, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const blogPosts = [
  {
    id: 1,
    title: "Top 10 In-Demand Skills for Software Engineers in 2024",
    excerpt:
      "Discover the most sought-after technical skills that can boost your career prospects in the competitive tech industry.",
    author: "Priya Sharma",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Technology",
    tags: ["Skills", "Software Engineering", "Career Growth"],
    featured: true,
  },
  {
    id: 2,
    title: "How to Ace Your Remote Job Interview",
    excerpt:
      "Essential tips and strategies for succeeding in virtual interviews and landing your dream remote position.",
    author: "Rajesh Kumar",
    date: "2024-01-12",
    readTime: "7 min read",
    category: "Interview Tips",
    tags: ["Remote Work", "Interview", "Career Advice"],
    featured: false,
  },
  {
    id: 3,
    title: "Salary Negotiation Strategies That Actually Work",
    excerpt: "Learn proven techniques to negotiate better compensation packages and maximize your earning potential.",
    author: "Anita Patel",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Career Advice",
    tags: ["Salary", "Negotiation", "Career Growth"],
    featured: true,
  },
  {
    id: 4,
    title: "Building a Strong Professional Network in India",
    excerpt:
      "Practical strategies for expanding your professional network and leveraging connections for career advancement.",
    author: "Vikram Singh",
    date: "2024-01-08",
    readTime: "8 min read",
    category: "Networking",
    tags: ["Networking", "Professional Growth", "Career Development"],
    featured: false,
  },
  {
    id: 5,
    title: "The Future of Work: Trends Shaping Indian Job Market",
    excerpt: "Explore emerging trends and technologies that are transforming the employment landscape in India.",
    author: "Meera Gupta",
    date: "2024-01-05",
    readTime: "10 min read",
    category: "Industry Trends",
    tags: ["Future of Work", "Trends", "Job Market"],
    featured: true,
  },
  {
    id: 6,
    title: "Resume Writing Tips for Indian Job Seekers",
    excerpt: "Create a compelling resume that stands out to Indian employers and passes through ATS systems.",
    author: "Arjun Reddy",
    date: "2024-01-03",
    readTime: "6 min read",
    category: "Resume Tips",
    tags: ["Resume", "Job Search", "Career Advice"],
    featured: false,
  },
]

const categories = [
  { name: "All", count: blogPosts.length },
  { name: "Technology", count: blogPosts.filter((post) => post.category === "Technology").length },
  { name: "Career Advice", count: blogPosts.filter((post) => post.category === "Career Advice").length },
  { name: "Interview Tips", count: blogPosts.filter((post) => post.category === "Interview Tips").length },
  { name: "Industry Trends", count: blogPosts.filter((post) => post.category === "Industry Trends").length },
]

const blogStats = [
  { label: "Articles Published", value: "150+", icon: BookOpen },
  { label: "Expert Authors", value: "25+", icon: Users },
  { label: "Monthly Readers", value: "50K+", icon: TrendingUp },
]

function BlogContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Career Insights & Tips</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Expert advice, industry insights, and practical tips to accelerate your career growth
        </p>
      </div>

      {/* Blog Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search articles, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Featured Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <Badge variant="outline">Featured</Badge>
                  </div>
                  <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild size="sm" className="w-full">
                    <Link href={`/blog/${post.id}`}>Read Article</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Articles */}
      {regularPosts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                    <Link href={`/blog/${post.id}`}>Read Article</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search terms or browse different categories</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function BlogPage() {
  const { user } = useAuth()

  if (user) {
    return (
      <DashboardShell>
        <BlogContent />
      </DashboardShell>
    )
  }

  return <BlogContent />
}
