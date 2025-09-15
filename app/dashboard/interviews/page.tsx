"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  User,
  Building,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Users,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Extended mock interviews data for employers (June 30, 2025 to August 31, 2025)
const mockEmployerInterviews = [
  // June 2025
  {
    id: "emp1",
    jobTitle: "Senior Software Engineer",
    company: "TechCorp Solutions",
    candidate: "Rahul Sharma",
    candidateEmail: "rahul.sharma@email.com",
    interviewType: "Video Call",
    date: "2025-06-30",
    time: "10:00 AM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Priya Patel",
    interviewerRole: "Engineering Manager",
    meetingLink: "https://meet.google.com/tech-interview-1",
    location: null,
    round: "Technical Round 1",
    notes: "React, Node.js, and system design focus",
    clientId: "client1",
  },
  {
    id: "emp2",
    jobTitle: "Product Manager",
    company: "InnovateLabs Inc",
    candidate: "Sneha Reddy",
    candidateEmail: "sneha.reddy@email.com",
    interviewType: "In-person",
    date: "2025-07-01",
    time: "2:00 PM",
    duration: "45 minutes",
    status: "Scheduled",
    interviewer: "Vikram Singh",
    interviewerRole: "VP Product",
    meetingLink: null,
    location: "Koramangala, Bangalore",
    round: "Product Strategy Round",
    notes: "Product roadmap and user research discussion",
    clientId: "client2",
  },
  {
    id: "emp3",
    jobTitle: "DevOps Engineer",
    company: "TechCorp Solutions",
    candidate: "Arjun Patel",
    candidateEmail: "arjun.patel@email.com",
    interviewType: "Video Call",
    date: "2025-07-02",
    time: "11:30 AM",
    duration: "75 minutes",
    status: "Scheduled",
    interviewer: "Amit Kumar",
    interviewerRole: "DevOps Lead",
    meetingLink: "https://zoom.us/j/devops-interview",
    location: null,
    round: "Technical Assessment",
    notes: "AWS, Docker, Kubernetes, and CI/CD pipelines",
    clientId: "client1",
  },
  {
    id: "emp4",
    jobTitle: "UX Designer",
    company: "StartupXYZ",
    candidate: "Kavya Nair",
    candidateEmail: "kavya.nair@email.com",
    interviewType: "Video Call",
    date: "2025-07-03",
    time: "3:30 PM",
    duration: "90 minutes",
    status: "Scheduled",
    interviewer: "Deepak Mehta",
    interviewerRole: "Design Director",
    meetingLink: "https://teams.microsoft.com/ux-design",
    location: null,
    round: "Portfolio Review",
    notes: "Design thinking and user experience portfolio",
    clientId: "client3",
  },
  {
    id: "emp5",
    jobTitle: "Data Scientist",
    company: "InnovateLabs Inc",
    candidate: "Rohit Agarwal",
    candidateEmail: "rohit.agarwal@email.com",
    interviewType: "Phone Call",
    date: "2025-07-04",
    time: "10:30 AM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Anita Joshi",
    interviewerRole: "Data Science Manager",
    meetingLink: null,
    location: null,
    round: "Technical Round 1",
    notes: "Python, ML algorithms, and statistical analysis",
    clientId: "client2",
  },
  {
    id: "emp6",
    jobTitle: "Frontend Developer",
    company: "TechCorp Solutions",
    candidate: "Priya Gupta",
    candidateEmail: "priya.gupta@email.com",
    interviewType: "Video Call",
    date: "2025-07-07",
    time: "9:00 AM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Karthik Nair",
    interviewerRole: "Frontend Lead",
    meetingLink: "https://meet.google.com/frontend-dev",
    location: null,
    round: "Coding Challenge",
    notes: "React, TypeScript, and responsive design",
    clientId: "client1",
  },
  {
    id: "emp7",
    jobTitle: "Marketing Manager",
    company: "StartupXYZ",
    candidate: "Vikram Singh",
    candidateEmail: "vikram.singh@email.com",
    interviewType: "In-person",
    date: "2025-07-08",
    time: "1:00 PM",
    duration: "45 minutes",
    status: "Scheduled",
    interviewer: "Lisa Anderson",
    interviewerRole: "Marketing Director",
    meetingLink: null,
    location: "Indiranagar, Bangalore",
    round: "Strategy Round",
    notes: "Digital marketing and growth strategies",
    clientId: "client3",
  },
  {
    id: "emp8",
    jobTitle: "Backend Developer",
    company: "InnovateLabs Inc",
    candidate: "Sneha Reddy",
    candidateEmail: "sneha.reddy@email.com",
    interviewType: "Video Call",
    date: "2025-07-09",
    time: "4:00 PM",
    duration: "75 minutes",
    status: "Scheduled",
    interviewer: "Rajesh Kumar",
    interviewerRole: "Backend Architect",
    meetingLink: "https://zoom.us/j/backend-interview",
    location: null,
    round: "System Design",
    notes: "Microservices, databases, and API design",
    clientId: "client2",
  },
  {
    id: "emp9",
    jobTitle: "QA Engineer",
    company: "TechCorp Solutions",
    candidate: "Amit Patel",
    candidateEmail: "amit.patel@email.com",
    interviewType: "Video Call",
    date: "2025-07-10",
    time: "11:00 AM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Priya Sharma",
    interviewerRole: "QA Manager",
    meetingLink: "https://meet.google.com/qa-testing",
    location: null,
    round: "Technical Assessment",
    notes: "Test automation and quality processes",
    clientId: "client1",
  },
  {
    id: "emp10",
    jobTitle: "Sales Manager",
    company: "StartupXYZ",
    candidate: "Deepak Mehta",
    candidateEmail: "deepak.mehta@email.com",
    interviewType: "Phone Call",
    date: "2025-07-11",
    time: "2:30 PM",
    duration: "45 minutes",
    status: "Scheduled",
    interviewer: "Jennifer Brown",
    interviewerRole: "Sales Director",
    meetingLink: null,
    location: null,
    round: "Sales Strategy",
    notes: "B2B sales and pipeline management",
    clientId: "client3",
  },
  // Mid July 2025
  {
    id: "emp11",
    jobTitle: "Full Stack Developer",
    company: "InnovateLabs Inc",
    candidate: "Kavya Nair",
    candidateEmail: "kavya.nair@email.com",
    interviewType: "Video Call",
    date: "2025-07-14",
    time: "10:00 AM",
    duration: "90 minutes",
    status: "Scheduled",
    interviewer: "Rohit Agarwal",
    interviewerRole: "Tech Lead",
    meetingLink: "https://teams.microsoft.com/fullstack",
    location: null,
    round: "Final Technical Round",
    notes: "End-to-end development and deployment",
    clientId: "client2",
  },
  {
    id: "emp12",
    jobTitle: "Product Designer",
    company: "TechCorp Solutions",
    candidate: "Anita Joshi",
    candidateEmail: "anita.joshi@email.com",
    interviewType: "In-person",
    date: "2025-07-15",
    time: "3:00 PM",
    duration: "75 minutes",
    status: "Scheduled",
    interviewer: "Vikram Singh",
    interviewerRole: "Design Manager",
    meetingLink: null,
    location: "HSR Layout, Bangalore",
    round: "Design Challenge",
    notes: "Live design exercise and user research",
    clientId: "client1",
  },
  {
    id: "emp13",
    jobTitle: "Business Analyst",
    company: "StartupXYZ",
    candidate: "Karthik Nair",
    candidateEmail: "karthik.nair@email.com",
    interviewType: "Video Call",
    date: "2025-07-16",
    time: "11:30 AM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Maria Garcia",
    interviewerRole: "BA Manager",
    meetingLink: "https://zoom.us/j/business-analyst",
    location: null,
    round: "Case Study",
    notes: "Requirements analysis and stakeholder management",
    clientId: "client3",
  },
  {
    id: "emp14",
    jobTitle: "Mobile Developer",
    company: "InnovateLabs Inc",
    candidate: "Priya Gupta",
    candidateEmail: "priya.gupta@email.com",
    interviewType: "Video Call",
    date: "2025-07-17",
    time: "2:00 PM",
    duration: "75 minutes",
    status: "Scheduled",
    interviewer: "David Kim",
    interviewerRole: "Mobile Lead",
    meetingLink: "https://meet.google.com/mobile-dev",
    location: null,
    round: "Technical Round 2",
    notes: "React Native and Flutter development",
    clientId: "client2",
  },
  {
    id: "emp15",
    jobTitle: "Security Engineer",
    company: "TechCorp Solutions",
    candidate: "Rajesh Kumar",
    candidateEmail: "rajesh.kumar@email.com",
    interviewType: "Video Call",
    date: "2025-07-18",
    time: "4:30 PM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Daniel Wilson",
    interviewerRole: "Security Architect",
    meetingLink: "https://zoom.us/j/security-interview",
    location: null,
    round: "Security Assessment",
    notes: "Cybersecurity frameworks and threat analysis",
    clientId: "client1",
  },
  // Late July 2025
  {
    id: "emp16",
    jobTitle: "Content Writer",
    company: "StartupXYZ",
    candidate: "Emma Thompson",
    candidateEmail: "emma.thompson@email.com",
    interviewType: "Phone Call",
    date: "2025-07-21",
    time: "10:00 AM",
    duration: "45 minutes",
    status: "Scheduled",
    interviewer: "Oliver Davis",
    interviewerRole: "Content Manager",
    meetingLink: null,
    location: null,
    round: "Writing Assessment",
    notes: "Content strategy and writing samples",
    clientId: "client3",
  },
  {
    id: "emp17",
    jobTitle: "AI/ML Engineer",
    company: "InnovateLabs Inc",
    candidate: "Thomas Anderson",
    candidateEmail: "thomas.anderson@email.com",
    interviewType: "Video Call",
    date: "2025-07-22",
    time: "1:30 PM",
    duration: "90 minutes",
    status: "Scheduled",
    interviewer: "Dr. Sophia Chen",
    interviewerRole: "AI Research Lead",
    meetingLink: "https://teams.microsoft.com/ai-ml",
    location: null,
    round: "Technical Deep Dive",
    notes: "Machine learning algorithms and model deployment",
    clientId: "client2",
  },
  {
    id: "emp18",
    jobTitle: "HR Manager",
    company: "TechCorp Solutions",
    candidate: "Isabella Martinez",
    candidateEmail: "isabella.martinez@email.com",
    interviewType: "In-person",
    date: "2025-07-23",
    time: "11:00 AM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Christopher Lee",
    interviewerRole: "HR Director",
    meetingLink: null,
    location: "Electronic City, Bangalore",
    round: "HR Strategy Round",
    notes: "Talent acquisition and employee engagement",
    clientId: "client1",
  },
  {
    id: "emp19",
    jobTitle: "Operations Manager",
    company: "StartupXYZ",
    candidate: "Rachel Green",
    candidateEmail: "rachel.green@email.com",
    interviewType: "Video Call",
    date: "2025-07-24",
    time: "3:00 PM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Kevin Johnson",
    interviewerRole: "Operations Director",
    meetingLink: "https://zoom.us/j/operations-mgmt",
    location: null,
    round: "Operations Strategy",
    notes: "Process optimization and team management",
    clientId: "client3",
  },
  {
    id: "emp20",
    jobTitle: "Cloud Architect",
    company: "InnovateLabs Inc",
    candidate: "Daniel Wilson",
    candidateEmail: "daniel.wilson@email.com",
    interviewType: "Video Call",
    date: "2025-07-25",
    time: "9:30 AM",
    duration: "75 minutes",
    status: "Scheduled",
    interviewer: "Amanda White",
    interviewerRole: "Cloud Solutions Lead",
    meetingLink: "https://meet.google.com/cloud-arch",
    location: null,
    round: "Architecture Review",
    notes: "Cloud infrastructure design and scalability",
    clientId: "client2",
  },
  // Early August 2025
  {
    id: "emp21",
    jobTitle: "Technical Writer",
    company: "TechCorp Solutions",
    candidate: "Oliver Davis",
    candidateEmail: "oliver.davis@email.com",
    interviewType: "Video Call",
    date: "2025-08-01",
    time: "2:00 PM",
    duration: "45 minutes",
    status: "Scheduled",
    interviewer: "Emma Thompson",
    interviewerRole: "Documentation Lead",
    meetingLink: "https://teams.microsoft.com/tech-writer",
    location: null,
    round: "Writing Assessment",
    notes: "Technical documentation and communication skills",
    clientId: "client1",
  },
  {
    id: "emp22",
    jobTitle: "Customer Success Manager",
    company: "StartupXYZ",
    candidate: "Sophia Chen",
    candidateEmail: "sophia.chen@email.com",
    interviewType: "Phone Call",
    date: "2025-08-04",
    time: "11:00 AM",
    duration: "45 minutes",
    status: "Scheduled",
    interviewer: "Thomas Anderson",
    interviewerRole: "Customer Success Director",
    meetingLink: null,
    location: null,
    round: "Customer Strategy",
    notes: "Customer retention and success metrics",
    clientId: "client3",
  },
  {
    id: "emp23",
    jobTitle: "Database Administrator",
    company: "InnovateLabs Inc",
    candidate: "Christopher Lee",
    candidateEmail: "christopher.lee@email.com",
    interviewType: "Video Call",
    date: "2025-08-05",
    time: "10:30 AM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Isabella Martinez",
    interviewerRole: "Database Lead",
    meetingLink: "https://zoom.us/j/database-admin",
    location: null,
    round: "Technical Assessment",
    notes: "Database optimization and performance tuning",
    clientId: "client2",
  },
  {
    id: "emp24",
    jobTitle: "Network Engineer",
    company: "TechCorp Solutions",
    candidate: "Rachel Green",
    candidateEmail: "rachel.green@email.com",
    interviewType: "In-person",
    date: "2025-08-06",
    time: "1:30 PM",
    duration: "75 minutes",
    status: "Scheduled",
    interviewer: "Kevin Johnson",
    interviewerRole: "Network Architect",
    meetingLink: null,
    location: "Whitefield, Bangalore",
    round: "Network Design",
    notes: "Network infrastructure and security protocols",
    clientId: "client1",
  },
  {
    id: "emp25",
    jobTitle: "Scrum Master",
    company: "StartupXYZ",
    candidate: "Amanda White",
    candidateEmail: "amanda.white@email.com",
    interviewType: "Video Call",
    date: "2025-08-07",
    time: "3:30 PM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Daniel Wilson",
    interviewerRole: "Agile Coach",
    meetingLink: "https://meet.google.com/scrum-master",
    location: null,
    round: "Agile Methodology",
    notes: "Scrum processes and team facilitation",
    clientId: "client3",
  },
  // Mid August 2025
  {
    id: "emp26",
    jobTitle: "Solutions Architect",
    company: "InnovateLabs Inc",
    candidate: "Oliver Davis",
    candidateEmail: "oliver.davis@email.com",
    interviewType: "Video Call",
    date: "2025-08-11",
    time: "9:00 AM",
    duration: "90 minutes",
    status: "Scheduled",
    interviewer: "Sophia Chen",
    interviewerRole: "Enterprise Architect",
    meetingLink: "https://teams.microsoft.com/solutions-arch",
    location: null,
    round: "Solution Design",
    notes: "Enterprise architecture and system integration",
    clientId: "client2",
  },
  {
    id: "emp27",
    jobTitle: "Digital Marketing Specialist",
    company: "TechCorp Solutions",
    candidate: "Thomas Anderson",
    candidateEmail: "thomas.anderson@email.com",
    interviewType: "Video Call",
    date: "2025-08-12",
    time: "2:30 PM",
    duration: "45 minutes",
    status: "Scheduled",
    interviewer: "Isabella Martinez",
    interviewerRole: "Marketing Manager",
    meetingLink: "https://zoom.us/j/digital-marketing",
    location: null,
    round: "Campaign Strategy",
    notes: "Digital campaigns and performance marketing",
    clientId: "client1",
  },
  {
    id: "emp28",
    jobTitle: "Finance Manager",
    company: "StartupXYZ",
    candidate: "Christopher Lee",
    candidateEmail: "christopher.lee@email.com",
    interviewType: "In-person",
    date: "2025-08-13",
    time: "11:30 AM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Rachel Green",
    interviewerRole: "Finance Director",
    meetingLink: null,
    location: "Koramangala, Bangalore",
    round: "Financial Analysis",
    notes: "Financial planning and budget management",
    clientId: "client3",
  },
  {
    id: "emp29",
    jobTitle: "Site Reliability Engineer",
    company: "InnovateLabs Inc",
    candidate: "Kevin Johnson",
    candidateEmail: "kevin.johnson@email.com",
    interviewType: "Video Call",
    date: "2025-08-14",
    time: "4:00 PM",
    duration: "75 minutes",
    status: "Scheduled",
    interviewer: "Amanda White",
    interviewerRole: "SRE Lead",
    meetingLink: "https://meet.google.com/sre-interview",
    location: null,
    round: "Reliability Engineering",
    notes: "System reliability and monitoring",
    clientId: "client2",
  },
  {
    id: "emp30",
    jobTitle: "Legal Counsel",
    company: "TechCorp Solutions",
    candidate: "Daniel Wilson",
    candidateEmail: "daniel.wilson@email.com",
    interviewType: "Phone Call",
    date: "2025-08-15",
    time: "10:00 AM",
    duration: "45 minutes",
    status: "Scheduled",
    interviewer: "Emma Thompson",
    interviewerRole: "Legal Director",
    meetingLink: null,
    location: null,
    round: "Legal Assessment",
    notes: "Corporate law and compliance",
    clientId: "client1",
  },
  // Late August 2025
  {
    id: "emp31",
    jobTitle: "Research Scientist",
    company: "StartupXYZ",
    candidate: "Sophia Chen",
    candidateEmail: "sophia.chen@email.com",
    interviewType: "Video Call",
    date: "2025-08-18",
    time: "1:00 PM",
    duration: "90 minutes",
    status: "Scheduled",
    interviewer: "Oliver Davis",
    interviewerRole: "Research Director",
    meetingLink: "https://teams.microsoft.com/research",
    location: null,
    round: "Research Presentation",
    notes: "Research methodology and innovation",
    clientId: "client3",
  },
  {
    id: "emp32",
    jobTitle: "Platform Engineer",
    company: "InnovateLabs Inc",
    candidate: "Thomas Anderson",
    candidateEmail: "thomas.anderson@email.com",
    interviewType: "Video Call",
    date: "2025-08-19",
    time: "11:00 AM",
    duration: "75 minutes",
    status: "Scheduled",
    interviewer: "Isabella Martinez",
    interviewerRole: "Platform Lead",
    meetingLink: "https://zoom.us/j/platform-eng",
    location: null,
    round: "Platform Architecture",
    notes: "Platform design and developer experience",
    clientId: "client2",
  },
  {
    id: "emp33",
    jobTitle: "Supply Chain Manager",
    company: "TechCorp Solutions",
    candidate: "Christopher Lee",
    candidateEmail: "christopher.lee@email.com",
    interviewType: "In-person",
    date: "2025-08-20",
    time: "2:00 PM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Rachel Green",
    interviewerRole: "Operations VP",
    meetingLink: null,
    location: "Electronic City, Bangalore",
    round: "Supply Chain Strategy",
    notes: "Logistics and supply chain optimization",
    clientId: "client1",
  },
  {
    id: "emp34",
    jobTitle: "Brand Manager",
    company: "StartupXYZ",
    candidate: "Kevin Johnson",
    candidateEmail: "kevin.johnson@email.com",
    interviewType: "Video Call",
    date: "2025-08-21",
    time: "3:30 PM",
    duration: "45 minutes",
    status: "Scheduled",
    interviewer: "Amanda White",
    interviewerRole: "Brand Director",
    meetingLink: "https://meet.google.com/brand-mgmt",
    location: null,
    round: "Brand Strategy",
    notes: "Brand positioning and marketing campaigns",
    clientId: "client3",
  },
  {
    id: "emp35",
    jobTitle: "Integration Specialist",
    company: "InnovateLabs Inc",
    candidate: "Daniel Wilson",
    candidateEmail: "daniel.wilson@email.com",
    interviewType: "Video Call",
    date: "2025-08-22",
    time: "10:30 AM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Emma Thompson",
    interviewerRole: "Integration Lead",
    meetingLink: "https://teams.microsoft.com/integration",
    location: null,
    round: "Integration Design",
    notes: "API integration and data synchronization",
    clientId: "client2",
  },
  // Final entries for August 2025
  {
    id: "emp36",
    jobTitle: "Training Manager",
    company: "TechCorp Solutions",
    candidate: "Sophia Chen",
    candidateEmail: "sophia.chen@email.com",
    interviewType: "Video Call",
    date: "2025-08-25",
    time: "9:30 AM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Oliver Davis",
    interviewerRole: "L&D Director",
    meetingLink: "https://zoom.us/j/training-mgmt",
    location: null,
    round: "Training Strategy",
    notes: "Employee development and training programs",
    clientId: "client1",
  },
  {
    id: "emp37",
    jobTitle: "Compliance Officer",
    company: "StartupXYZ",
    candidate: "Thomas Anderson",
    candidateEmail: "thomas.anderson@email.com",
    interviewType: "Phone Call",
    date: "2025-08-26",
    time: "1:30 PM",
    duration: "45 minutes",
    status: "Scheduled",
    interviewer: "Isabella Martinez",
    interviewerRole: "Compliance Director",
    meetingLink: null,
    location: null,
    round: "Compliance Assessment",
    notes: "Regulatory compliance and risk management",
    clientId: "client3",
  },
  {
    id: "emp38",
    jobTitle: "Performance Engineer",
    company: "InnovateLabs Inc",
    candidate: "Christopher Lee",
    candidateEmail: "christopher.lee@email.com",
    interviewType: "Video Call",
    date: "2025-08-27",
    time: "4:00 PM",
    duration: "75 minutes",
    status: "Scheduled",
    interviewer: "Rachel Green",
    interviewerRole: "Performance Lead",
    meetingLink: "https://meet.google.com/performance-eng",
    location: null,
    round: "Performance Optimization",
    notes: "Application performance and load testing",
    clientId: "client2",
  },
  {
    id: "emp39",
    jobTitle: "Partnership Manager",
    company: "TechCorp Solutions",
    candidate: "Kevin Johnson",
    candidateEmail: "kevin.johnson@email.com",
    interviewType: "In-person",
    date: "2025-08-28",
    time: "11:00 AM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Amanda White",
    interviewerRole: "Partnerships VP",
    meetingLink: null,
    location: "HSR Layout, Bangalore",
    round: "Partnership Strategy",
    notes: "Strategic partnerships and business development",
    clientId: "client1",
  },
  {
    id: "emp40",
    jobTitle: "Innovation Manager",
    company: "StartupXYZ",
    candidate: "Daniel Wilson",
    candidateEmail: "daniel.wilson@email.com",
    interviewType: "Video Call",
    date: "2025-08-29",
    time: "2:30 PM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Emma Thompson",
    interviewerRole: "Innovation Director",
    meetingLink: "https://teams.microsoft.com/innovation",
    location: null,
    round: "Innovation Strategy",
    notes: "Innovation processes and emerging technologies",
    clientId: "client3",
  },
]

// Original candidate interviews data
const mockCandidateInterviews = [
  // Current Week - January 2024
  {
    id: "1",
    jobTitle: "Senior Software Engineer",
    company: "TechCorp India",
    candidate: "Sarah Johnson",
    interviewType: "Video Call",
    date: "2025-07-08",
    time: "10:00 AM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Rajesh Kumar",
    interviewerRole: "Engineering Manager",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    location: null,
    round: "Technical Round 1",
    notes: "Focus on React, Node.js, and system design. Prepare coding examples.",
  },
  {
    id: "2",
    jobTitle: "Frontend Developer",
    company: "StartupXYZ",
    candidate: "Michael Chen",
    interviewType: "In-person",
    date: "2025-07-09",
    time: "2:00 PM",
    duration: "45 minutes",
    status: "Scheduled",
    interviewer: "Priya Sharma",
    interviewerRole: "Lead Developer",
    meetingLink: null,
    location: "Koramangala, Bangalore",
    round: "Final Round",
    notes: "Portfolio review and cultural fit discussion.",
  },
  {
    id: "3",
    jobTitle: "DevOps Engineer",
    company: "CloudScale Inc",
    candidate: "Emily Davis",
    interviewType: "Video Call",
    date: "2025-07-10",
    time: "11:30 AM",
    duration: "30 minutes",
    status: "Scheduled",
    interviewer: "Amit Patel",
    interviewerRole: "DevOps Lead",
    meetingLink: "https://zoom.us/j/987654321",
    location: null,
    round: "HR Screening",
    notes: "Initial screening and role discussion.",
  },
  {
    id: "4",
    jobTitle: "Product Manager",
    company: "InnovateTech",
    candidate: "Alex Rodriguez",
    interviewType: "Phone Call",
    date: "2025-07-04",
    time: "3:30 PM",
    duration: "45 minutes",
    status: "Scheduled",
    interviewer: "Sneha Reddy",
    interviewerRole: "VP Product",
    meetingLink: null,
    location: null,
    round: "Product Strategy Round",
    notes: "Product roadmap and strategy discussion.",
  },
  {
    id: "5",
    jobTitle: "UX Designer",
    company: "DesignStudio",
    candidate: "Lisa Anderson",
    interviewType: "Video Call",
    date: "2025-07-04",
    time: "4:00 PM",
    duration: "60 minutes",
    status: "Scheduled",
    interviewer: "Vikram Singh",
    interviewerRole: "Design Director",
    meetingLink: "https://teams.microsoft.com/xyz",
    location: null,
    round: "Portfolio Review",
    notes: "Design portfolio presentation and critique.",
  },
]

// Calendar component for employer view
function EmployerInterviewCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)) // July 2025
  const [view, setView] = useState<"month" | "week">("month")

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)

    const weekDays = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      weekDays.push(day)
    }
    return weekDays
  }

  const getInterviewsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return mockEmployerInterviews.filter((interview) => interview.date === dateStr)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setDate(newDate.getDate() + 7)
    }
    setCurrentDate(newDate)
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getClientColor = (clientId: string) => {
    const colors = {
      client1: "bg-blue-100 text-blue-800 border-blue-200",
      client2: "bg-green-100 text-green-800 border-green-200",
      client3: "bg-purple-100 text-purple-800 border-purple-200",
    }
    return colors[clientId as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getClientName = (clientId: string) => {
    const names = {
      client1: "TechCorp Solutions",
      client2: "InnovateLabs Inc",
      client3: "StartupXYZ",
    }
    return names[clientId as keyof typeof names] || "Unknown Client"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle>Interview Calendar - All Clients</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => (view === "month" ? navigateMonth("prev") : navigateWeek("prev"))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium min-w-[200px] text-center">
                {view === "month"
                  ? `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                  : `Week of ${currentDate.toLocaleDateString()}`}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => (view === "month" ? navigateMonth("next") : navigateWeek("next"))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant={view === "month" ? "default" : "outline"} size="sm" onClick={() => setView("month")}>
              Month
            </Button>
            <Button variant={view === "week" ? "default" : "outline"} size="sm" onClick={() => setView("week")}>
              Week
            </Button>
          </div>
        </div>
        {/* Client Legend */}
        <div className="flex items-center gap-4 text-sm">
          <span className="font-medium">Clients:</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-blue-500"></div>
            <span>TechCorp Solutions</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500"></div>
            <span>InnovateLabs Inc</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-purple-500"></div>
            <span>StartupXYZ</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {view === "month" ? (
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center font-medium text-sm text-muted-foreground">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentDate).map((day, index) => (
              <div key={index} className="min-h-[120px] p-1 border border-gray-100">
                {day && (
                  <>
                    <div className="text-sm font-medium mb-1">{day.getDate()}</div>
                    <div className="space-y-1">
                      {getInterviewsForDate(day).map((interview) => (
                        <div
                          key={interview.id}
                          className={`text-xs p-1 rounded truncate border ${getClientColor(interview.clientId)}`}
                          title={`${interview.time} - ${interview.candidate} (${interview.jobTitle}) - ${getClientName(interview.clientId)}`}
                        >
                          <div className="font-medium">{interview.time}</div>
                          <div className="truncate">{interview.candidate}</div>
                          <div className="truncate text-xs opacity-75">{interview.jobTitle}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {getWeekDays(currentDate).map((day) => (
              <div key={day.toISOString()} className="border rounded-lg p-4">
                <div className="font-medium mb-2">
                  {day.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                </div>
                <div className="space-y-2">
                  {getInterviewsForDate(day).length > 0 ? (
                    getInterviewsForDate(day).map((interview) => (
                      <div
                        key={interview.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${getClientColor(interview.clientId)}`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-medium text-sm">{interview.time}</div>
                            <Badge variant="outline" className="text-xs">
                              {getClientName(interview.clientId)}
                            </Badge>
                          </div>
                          <div className="text-sm font-medium">{interview.candidate}</div>
                          <div className="text-xs text-muted-foreground">{interview.jobTitle}</div>
                          <div className="text-xs text-muted-foreground">
                            {interview.interviewer} • {interview.round}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {interview.interviewType}
                          </Badge>
                          <Badge variant="default" className="text-xs">
                            {interview.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground italic">No interviews scheduled</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Calendar component for client view
function ClientInterviewCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week">("month")

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)

    const weekDays = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      weekDays.push(day)
    }
    return weekDays
  }

  const getInterviewsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return mockCandidateInterviews.filter((interview) => interview.date === dateStr)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setDate(newDate.getDate() + 7)
    }
    setCurrentDate(newDate)
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle>Interview Calendar</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => (view === "month" ? navigateMonth("prev") : navigateWeek("prev"))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium min-w-[200px] text-center">
                {view === "month"
                  ? `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                  : `Week of ${currentDate.toLocaleDateString()}`}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => (view === "month" ? navigateMonth("next") : navigateWeek("next"))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant={view === "month" ? "default" : "outline"} size="sm" onClick={() => setView("month")}>
              Month
            </Button>
            <Button variant={view === "week" ? "default" : "outline"} size="sm" onClick={() => setView("week")}>
              Week
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {view === "month" ? (
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center font-medium text-sm text-muted-foreground">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentDate).map((day, index) => (
              <div key={index} className="min-h-[100px] p-1 border border-gray-100">
                {day && (
                  <>
                    <div className="text-sm font-medium mb-1">{day.getDate()}</div>
                    <div className="space-y-1">
                      {getInterviewsForDate(day).map((interview) => (
                        <div
                          key={interview.id}
                          className={`text-xs p-1 rounded truncate ${
                            interview.status === "Scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                          title={`${interview.time} - ${interview.candidate} (${interview.jobTitle})`}
                        >
                          {interview.time} - {interview.candidate}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {getWeekDays(currentDate).map((day) => (
              <div key={day.toISOString()} className="border rounded-lg p-4">
                <div className="font-medium mb-2">
                  {day.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                </div>
                <div className="space-y-2">
                  {getInterviewsForDate(day).length > 0 ? (
                    getInterviewsForDate(day).map((interview) => (
                      <div key={interview.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{interview.time}</div>
                          <div className="text-sm text-muted-foreground">{interview.candidate}</div>
                          <div className="text-xs text-muted-foreground">{interview.jobTitle}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{interview.interviewType}</Badge>
                          <Badge variant={interview.status === "Scheduled" ? "default" : "secondary"}>
                            {interview.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground italic">No interviews scheduled</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function InterviewsPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Please log in to access interviews.</p>
        </div>
      </DashboardShell>
    )
  }

  // Allow candidates, clients, and employers to access interviews
  if (user.role !== "candidate" && user.role !== "client" && user.role !== "employer") {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">
            Access denied. This page is for candidates, clients, and employers only.
          </p>
        </div>
      </DashboardShell>
    )
  }

  // Employer view with comprehensive calendar
  if (user.role === "employer") {
    const allInterviews = mockEmployerInterviews
    const upcomingInterviews = allInterviews.filter((interview) => interview.status === "Scheduled")
    const completedInterviews = allInterviews.filter((interview) => interview.status === "Completed")

    const stats = {
      totalInterviews: allInterviews.length,
      upcoming: upcomingInterviews.length,
      completed: completedInterviews.length,
      totalClients: 3,
      thisWeek: upcomingInterviews.filter((interview) => {
        const interviewDate = new Date(interview.date)
        const today = new Date()
        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
        return interviewDate >= today && interviewDate <= weekFromNow
      }).length,
    }

    return (
      <DashboardShell>
        <DashboardHeader
          heading="Interview Management"
          text="Manage interviews across all clients and track hiring progress."
          userRole="employer"
        />

        {/* Stats Cards for Employer */}
        <div className="grid gap-4 md:grid-cols-5 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInterviews}</div>
              <p className="text-xs text-muted-foreground">All clients</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisWeek}</div>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcoming}</div>
              <p className="text-xs text-muted-foreground">Scheduled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">Total completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClients}</div>
              <p className="text-xs text-muted-foreground">With interviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Component */}
        <EmployerInterviewCalendar />

        {/* Recent Interviews Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Interview Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.slice(0, 5).map((interview) => {
                const getClientColor = (clientId: string) => {
                  const colors = {
                    client1: "border-l-blue-500",
                    client2: "border-l-green-500",
                    client3: "border-l-purple-500",
                  }
                  return colors[clientId as keyof typeof colors] || "border-l-gray-500"
                }

                const getClientName = (clientId: string) => {
                  const names = {
                    client1: "TechCorp Solutions",
                    client2: "InnovateLabs Inc",
                    client3: "StartupXYZ",
                  }
                  return names[clientId as keyof typeof names] || "Unknown Client"
                }

                return (
                  <div key={interview.id} className={`border-l-4 ${getClientColor(interview.clientId)} pl-4 py-2`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{interview.candidate}</div>
                        <div className="text-sm text-muted-foreground">
                          {interview.jobTitle} • {getClientName(interview.clientId)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(interview.date).toLocaleDateString()} at {interview.time} • {interview.interviewer}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {interview.interviewType}
                        </Badge>
                        <Badge variant="default" className="text-xs">
                          {interview.round}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </DashboardShell>
    )
  }

  // Client view with calendar
  if (user.role === "client") {
    const upcomingInterviews = mockCandidateInterviews.filter((interview) => interview.status === "Scheduled")
    const completedInterviews = mockCandidateInterviews.filter((interview) => interview.status === "Completed")

    const stats = {
      totalInterviews: mockCandidateInterviews.length,
      upcoming: upcomingInterviews.length,
      completed: completedInterviews.length,
      passRate:
        Math.round(
          (completedInterviews.filter((i) => i.result === "Passed").length / completedInterviews.length) * 100,
        ) || 0,
    }

    return (
      <DashboardShell>
        <DashboardHeader
          heading="Interview Calendar"
          text="Manage and track interviews for your job positions."
          userRole="client"
        />

        {/* Stats Cards for Client */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInterviews}</div>
              <p className="text-xs text-muted-foreground">All positions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcoming}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">Total completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.passRate}%</div>
              <p className="text-xs text-muted-foreground">Hire rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Component */}
        <ClientInterviewCalendar />
      </DashboardShell>
    )
  }

  // Original candidate view
  const upcomingInterviews = mockCandidateInterviews.filter((interview) => interview.status === "Scheduled")
  const completedInterviews = mockCandidateInterviews.filter((interview) => interview.status === "Completed")

  const stats = {
    totalInterviews: mockCandidateInterviews.length,
    upcoming: upcomingInterviews.length,
    completed: completedInterviews.length,
    passRate:
      Math.round(
        (completedInterviews.filter((i) => i.result === "Passed").length / completedInterviews.length) * 100,
      ) || 0,
  }

  const getInterviewIcon = (type: string) => {
    switch (type) {
      case "Video Call":
        return Video
      case "Phone Call":
        return Phone
      case "In-person":
        return MapPin
      default:
        return Calendar
    }
  }

  const getStatusBadge = (status: string, result?: string) => {
    if (status === "Scheduled") {
      return <Badge variant="default">Scheduled</Badge>
    }
    if (status === "Completed") {
      if (result === "Passed") {
        return (
          <Badge variant="default" className="bg-green-600">
            Passed
          </Badge>
        )
      } else if (result === "Failed") {
        return <Badge variant="destructive">Not Selected</Badge>
      }
      return <Badge variant="secondary">Completed</Badge>
    }
    return <Badge variant="secondary">{status}</Badge>
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Interviews"
        text="Manage your interview schedule and track your progress."
        userRole="candidate"
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInterviews}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcoming}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Total completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.passRate}%</div>
            <p className="text-xs text-muted-foreground">Pass rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Interviews Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming ({upcomingInterviews.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedInterviews.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingInterviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No upcoming interviews</p>
                <Button asChild>
                  <Link href="/jobs">Apply to More Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            upcomingInterviews.map((interview) => {
              const InterviewIcon = getInterviewIcon(interview.interviewType)
              return (
                <Card key={interview.id} className="hover:shadow-md transition-shadow border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{interview.jobTitle}</h3>
                            <p className="text-muted-foreground font-medium">{interview.company}</p>
                          </div>
                          {getStatusBadge(interview.status, interview.result)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(interview.date).toLocaleDateString()} at {interview.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{interview.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <InterviewIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{interview.interviewType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {interview.interviewer} ({interview.interviewerRole})
                            </span>
                          </div>
                        </div>

                        {interview.location && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{interview.location}</span>
                          </div>
                        )}

                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-900 mb-1">{interview.round}</p>
                          <p className="text-sm text-blue-700">{interview.notes}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:w-40">
                        {interview.meetingLink && (
                          <Button size="sm" asChild>
                            <Link href={interview.meetingLink} target="_blank">
                              <Video className="h-4 w-4 mr-2" />
                              Join Meeting
                            </Link>
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Add to Calendar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedInterviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No completed interviews yet</p>
              </CardContent>
            </Card>
          ) : (
            completedInterviews.map((interview) => {
              const InterviewIcon = getInterviewIcon(interview.interviewType)
              return (
                <Card key={interview.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{interview.jobTitle}</h3>
                            <p className="text-muted-foreground font-medium">{interview.company}</p>
                          </div>
                          {getStatusBadge(interview.status, interview.result)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(interview.date).toLocaleDateString()} at {interview.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <InterviewIcon className="h-4 w-4" />
                            <span>{interview.interviewType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{interview.interviewer}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            <span>{interview.round}</span>
                          </div>
                        </div>

                        <div
                          className={`p-3 rounded-lg ${interview.result === "Passed" ? "bg-green-50" : "bg-red-50"}`}
                        >
                          <p
                            className={`text-sm font-medium mb-1 ${interview.result === "Passed" ? "text-green-900" : "text-red-900"}`}
                          >
                            {interview.result === "Passed" ? "✅ Interview Passed" : "❌ Not Selected"}
                          </p>
                          <p className={`text-sm ${interview.result === "Passed" ? "text-green-700" : "text-red-700"}`}>
                            {interview.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
