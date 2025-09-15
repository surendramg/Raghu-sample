"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Clock, MessageSquare, HelpCircle, Users, Briefcase, Send } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    value: "hello@niyarawfs.com",
    action: "mailto:hello@niyarawfs.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our team",
    value: "+91 98765 43210",
    action: "tel:+919876543210",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our office location",
    value: "Bangalore, Karnataka, India",
    action: null,
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "Monday to Friday",
    value: "9:00 AM - 6:00 PM IST",
    action: null,
  },
]

const supportCategories = [
  {
    icon: HelpCircle,
    title: "General Support",
    description: "Questions about using NiyaraWFS",
  },
  {
    icon: Users,
    title: "Job Seeker Help",
    description: "Assistance with job search and applications",
  },
  {
    icon: Briefcase,
    title: "Employer Support",
    description: "Help with posting jobs and finding candidates",
  },
  {
    icon: MessageSquare,
    title: "Technical Issues",
    description: "Report bugs or technical problems",
  },
]

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Click on 'Sign Up' in the top navigation, choose your account type (Job Seeker or Employer), and fill in your details.",
  },
  {
    question: "Is NiyaraWFS free to use?",
    answer: "Yes, job seekers can use NiyaraWFS completely free. Employers have both free and premium posting options.",
  },
  {
    question: "How does the job matching work?",
    answer:
      "Our AI algorithm analyzes your profile, skills, and preferences to recommend the most relevant job opportunities.",
  },
  {
    question: "Can I edit my profile after creating it?",
    answer: "You can update your profile, resume, and preferences anytime from your dashboard.",
  },
  {
    question: "How do I apply for jobs?",
    answer:
      "Simply click 'Apply Now' on any job listing. You can apply with your NiyaraWFS profile or upload a custom resume.",
  },
]

function ContactContent() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    })

    // Reset form
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      subject: "",
      category: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary">Contact Us</Badge>
        <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions or need help? We're here to assist you with anything related to your job search or hiring
          needs.
        </p>
      </div>

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">{info.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
              {info.action ? (
                <Button variant="outline" size="sm" asChild>
                  <a href={info.action}>{info.value}</a>
                </Button>
              ) : (
                <p className="font-medium">{info.value}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="general">General Support</option>
                  <option value="job-seeker">Job Seeker Help</option>
                  <option value="employer">Employer Support</option>
                  <option value="technical">Technical Issues</option>
                  <option value="feedback">Feedback & Suggestions</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Support Categories & FAQ */}
        <div className="space-y-6">
          {/* Support Categories */}
          <Card>
            <CardHeader>
              <CardTitle>How can we help?</CardTitle>
              <CardDescription>Choose the category that best describes your inquiry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {supportCategories.map((category, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <category.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{category.title}</h4>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.slice(0, 3).map((faq, index) => (
                <div key={index}>
                  <h4 className="font-medium mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  {index < 2 && <Separator className="mt-4" />}
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All FAQs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  const { user } = useAuth()

  if (user) {
    return (
      <DashboardShell>
        <ContactContent />
      </DashboardShell>
    )
  }

  return <ContactContent />
}
