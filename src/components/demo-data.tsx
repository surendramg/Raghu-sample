"use client"

import { useState } from "react"

// Mock data for when Supabase is not configured
export const useDemoJobs = () => {
  const [jobs] = useState([
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp",
      location: "Bangalore, Karnataka",
      salary: "₹15,00,000 - ₹25,00,000",
      type: "Full-time",
      description:
        "We are looking for a Senior Software Engineer to join our team and help build scalable web applications.",
      posted_at: new Date().toISOString(),
      featured: true,
    },
    {
      id: "2",
      title: "Marketing Manager",
      company: "BrandGrowth",
      location: "Mumbai, Maharashtra",
      salary: "₹12,00,000 - ₹18,00,000",
      type: "Full-time",
      description: "Join our marketing team to lead campaigns and drive growth for our expanding business.",
      posted_at: new Date().toISOString(),
      featured: true,
    },
    {
      id: "3",
      title: "UX/UI Designer",
      company: "DesignHub",
      location: "Pune, Maharashtra",
      salary: "₹8,00,000 - ₹14,00,000",
      type: "Full-time",
      description: "Create beautiful and intuitive user experiences for our products and services.",
      posted_at: new Date().toISOString(),
      featured: true,
    },
  ])

  return { jobs, loading: false }
}

export const useDemoBlogPosts = () => {
  const [posts] = useState([
    {
      id: "1",
      title: "10 Tips for a Successful Job Interview",
      excerpt:
        "Prepare for your next job interview with these expert tips that will help you stand out from the competition.",
      author: "Jane Smith",
      published_at: new Date().toISOString(),
      image_url: "/placeholder.svg?height=300&width=500&text=Interview+Tips",
      slug: "interview-tips",
    },
    {
      id: "2",
      title: "How to Build a Resume That Gets Noticed",
      excerpt: "Learn the key elements of a standout resume that will catch the attention of hiring managers.",
      author: "John Doe",
      published_at: new Date().toISOString(),
      image_url: "/placeholder.svg?height=300&width=500&text=Resume+Tips",
      slug: "resume-tips",
    },
    {
      id: "3",
      title: "Navigating Career Changes in 2024",
      excerpt: "Considering a career change? Here's what you need to know about transitioning to a new industry.",
      author: "Alex Johnson",
      published_at: new Date().toISOString(),
      image_url: "/placeholder.svg?height=300&width=500&text=Career+Change",
      slug: "career-change",
    },
  ])

  return { posts, loading: false }
}
