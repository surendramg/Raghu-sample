export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  description: string
  requirements?: string[]
  skills: string[]
  status: "active" | "paused" | "closed"
  posted_at: string
  featured: boolean
  applicants?: number
  views?: number
  company_logo?: string
}

export interface SkillDemand {
  skill: string
  totalJobs: number
  activeJobs: number
  pausedJobs: number
  closedJobs: number
  averageSalary: string
  topCompanies: string[]
}

export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  location: string
  experience: string
  skills: string[]
  avatar: string
  resume_url?: string
  portfolio_url?: string
  linkedin_url?: string
  current_role?: string
  expected_salary?: string
  notice_period?: string
  availability: "immediate" | "2-weeks" | "1-month" | "2-months"
  job_preferences: {
    locations: string[]
    job_types: string[]
    salary_range: string
  }
  created_at: string
  last_active: string
  profile_completion: number
}

export interface JobApplication {
  id: string
  job_id: string
  candidate_id: string
  candidate_name: string
  candidate_email: string
  candidate_phone: string
  status: "applied" | "shortlisted" | "interviewed" | "offered" | "hired" | "rejected"
  applied_at: string
  resume_url?: string
  cover_letter?: string
  skill_match_percentage: number
  notes?: string
  interview_date?: string
  interview_feedback?: string
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "TechCorp India",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹15,00,000 - ₹25,00,000",
    description:
      "We are looking for a Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining high-quality software solutions.",
    requirements: ["5+ years experience", "Strong problem-solving skills", "Team leadership"],
    skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "Docker"],
    status: "active",
    posted_at: "2024-01-15",
    featured: true,
    applicants: 45,
    views: 234,
    company_logo: "/placeholder.svg?height=40&width=40&text=TC",
  },
  {
    id: "2",
    title: "Marketing Manager",
    company: "GrowthLabs",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    salary: "₹12,00,000 - ₹18,00,000",
    description:
      "Lead our marketing initiatives and drive brand awareness. Perfect opportunity for a creative marketing professional.",
    requirements: ["3+ years marketing experience", "Digital marketing expertise", "Analytics skills"],
    skills: ["Digital Marketing", "SEO", "Google Analytics", "Content Strategy", "Social Media", "PPC"],
    status: "active",
    posted_at: "2024-01-10",
    featured: false,
    applicants: 28,
    views: 156,
    company_logo: "/placeholder.svg?height=40&width=40&text=GL",
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "Pune, Maharashtra",
    type: "Full-time",
    salary: "₹8,00,000 - ₹14,00,000",
    description:
      "Create beautiful and intuitive user experiences. Join our creative team and shape the future of digital design.",
    requirements: ["Portfolio required", "3+ years experience", "Design thinking"],
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Wireframing", "Design Systems"],
    status: "paused",
    posted_at: "2024-01-08",
    featured: true,
    applicants: 67,
    views: 289,
    company_logo: "/placeholder.svg?height=40&width=40&text=DS",
  },
  {
    id: "4",
    title: "Data Analyst",
    company: "DataInsights",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    salary: "₹6,00,000 - ₹10,00,000",
    description: "Analyze complex datasets and provide actionable insights. Great opportunity for data enthusiasts.",
    requirements: ["SQL expertise", "Statistical analysis", "Data visualization"],
    skills: ["Python", "SQL", "Tableau", "Power BI", "Excel", "Statistics", "Machine Learning"],
    status: "active",
    posted_at: "2024-01-12",
    featured: false,
    applicants: 34,
    views: 178,
    company_logo: "/placeholder.svg?height=40&width=40&text=DI",
  },
  {
    id: "5",
    title: "Customer Support Specialist",
    company: "SupportPro",
    location: "Chennai, Tamil Nadu",
    type: "Full-time",
    salary: "₹3,50,000 - ₹5,50,000",
    description: "Provide excellent customer service and support. Help customers resolve their queries efficiently.",
    requirements: ["Excellent communication", "Problem-solving", "Customer focus"],
    skills: ["Customer Service", "Communication", "CRM Software", "Problem Solving", "Zendesk", "Salesforce"],
    status: "closed",
    posted_at: "2024-01-05",
    featured: false,
    applicants: 89,
    views: 445,
    company_logo: "/placeholder.svg?height=40&width=40&text=SP",
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹18,00,000 - ₹28,00,000",
    description: "Manage cloud infrastructure and deployment pipelines. Work with cutting-edge DevOps technologies.",
    requirements: ["Cloud experience", "CI/CD knowledge", "Infrastructure as Code"],
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux", "Python"],
    status: "active",
    posted_at: "2024-01-14",
    featured: true,
    applicants: 23,
    views: 167,
    company_logo: "/placeholder.svg?height=40&width=40&text=CT",
  },
  {
    id: "7",
    title: "Frontend Developer",
    company: "WebCraft India",
    location: "Delhi, NCR",
    type: "Full-time",
    salary: "₹8,00,000 - ₹15,00,000",
    description: "Build responsive and interactive web applications. Join our frontend development team.",
    requirements: ["Modern JavaScript", "React expertise", "Responsive design"],
    skills: ["React", "JavaScript", "HTML", "CSS", "TypeScript", "Next.js", "Tailwind CSS"],
    status: "active",
    posted_at: "2024-01-11",
    featured: false,
    applicants: 56,
    views: 234,
    company_logo: "/placeholder.svg?height=40&width=40&text=WC",
  },
  {
    id: "8",
    title: "Product Manager",
    company: "InnovateTech",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    salary: "₹20,00,000 - ₹35,00,000",
    description: "Lead product strategy and development. Drive innovation and user-centric product decisions.",
    requirements: ["Product strategy", "Stakeholder management", "Agile methodology"],
    skills: [
      "Product Strategy",
      "Agile",
      "Jira",
      "Analytics",
      "User Research",
      "Roadmapping",
      "Stakeholder Management",
    ],
    status: "paused",
    posted_at: "2024-01-09",
    featured: true,
    applicants: 41,
    views: 198,
    company_logo: "/placeholder.svg?height=40&width=40&text=IT",
  },
  {
    id: "9",
    title: "Backend Developer",
    company: "ServerSide Solutions",
    location: "Pune, Maharashtra",
    type: "Full-time",
    salary: "₹10,00,000 - ₹18,00,000",
    description: "Develop robust backend systems and APIs. Work with modern backend technologies.",
    requirements: ["API development", "Database design", "System architecture"],
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "Microservices"],
    status: "active",
    posted_at: "2024-01-13",
    featured: false,
    applicants: 38,
    views: 189,
    company_logo: "/placeholder.svg?height=40&width=40&text=SS",
  },
  {
    id: "10",
    title: "Mobile App Developer",
    company: "MobileFirst Tech",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹12,00,000 - ₹20,00,000",
    description: "Create amazing mobile experiences. Develop native and cross-platform mobile applications.",
    requirements: ["Mobile development", "App store deployment", "UI/UX understanding"],
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase", "Mobile UI/UX", "App Store Optimization"],
    status: "closed",
    posted_at: "2024-01-06",
    featured: false,
    applicants: 72,
    views: 356,
    company_logo: "/placeholder.svg?height=40&width=40&text=MF",
  },
]

export const mockCandidates: Candidate[] = [
  // Applied + Good Match Examples for Senior Software Engineer (Job ID: 1)
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    experience: "5 years",
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "MongoDB", "Express.js", "HTML", "CSS", "AWS"],
    avatar: "/placeholder.svg?height=40&width=40&text=RS",
    resume_url: "/placeholder.pdf",
    portfolio_url: "https://rahulsharma.dev",
    linkedin_url: "https://linkedin.com/in/rahulsharma",
    current_role: "Senior Software Engineer",
    expected_salary: "₹18,00,000 - ₹25,00,000",
    notice_period: "2-months",
    availability: "2-months",
    job_preferences: {
      locations: ["Mumbai", "Bangalore", "Pune"],
      job_types: ["Full-time", "Contract"],
      salary_range: "₹15,00,000 - ₹25,00,000",
    },
    created_at: "2024-01-01",
    last_active: "2024-01-15",
    profile_completion: 95,
  },
  {
    id: "2",
    name: "Arjun Patel",
    email: "arjun.patel@email.com",
    phone: "+91 87654 32109",
    location: "Bangalore, Karnataka",
    experience: "6 years",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "Kubernetes", "MongoDB", "GraphQL"],
    avatar: "/placeholder.svg?height=40&width=40&text=AP",
    resume_url: "/placeholder.pdf",
    portfolio_url: "https://arjunpatel.dev",
    linkedin_url: "https://linkedin.com/in/arjunpatel",
    current_role: "Full Stack Developer",
    expected_salary: "₹20,00,000 - ₹28,00,000",
    notice_period: "1-month",
    availability: "1-month",
    job_preferences: {
      locations: ["Bangalore", "Mumbai", "Hyderabad"],
      job_types: ["Full-time"],
      salary_range: "₹18,00,000 - ₹30,00,000",
    },
    created_at: "2024-01-02",
    last_active: "2024-01-14",
    profile_completion: 92,
  },
  {
    id: "3",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 76543 21098",
    location: "Hyderabad, Telangana",
    experience: "4 years",
    skills: ["React", "TypeScript", "Node.js", "AWS", "MongoDB", "Redux", "Jest", "Docker"],
    avatar: "/placeholder.svg?height=40&width=40&text=SR",
    resume_url: "/placeholder.pdf",
    portfolio_url: "https://snehareddy.dev",
    linkedin_url: "https://linkedin.com/in/snehareddy",
    current_role: "Software Engineer",
    expected_salary: "₹16,00,000 - ₹22,00,000",
    notice_period: "2-weeks",
    availability: "2-weeks",
    job_preferences: {
      locations: ["Hyderabad", "Bangalore", "Chennai"],
      job_types: ["Full-time", "Remote"],
      salary_range: "₹14,00,000 - ₹22,00,000",
    },
    created_at: "2024-01-03",
    last_active: "2024-01-13",
    profile_completion: 88,
  },

  // Potential Candidates (Good Match, Not Applied) for Senior Software Engineer
  {
    id: "4",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 65432 10987",
    location: "Pune, Maharashtra",
    experience: "7 years",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "Kubernetes", "MongoDB", "Microservices", "Jenkins"],
    avatar: "/placeholder.svg?height=40&width=40&text=VS",
    resume_url: "/placeholder.pdf",
    portfolio_url: "https://vikramsingh.dev",
    linkedin_url: "https://linkedin.com/in/vikramsingh",
    current_role: "Senior Full Stack Developer",
    expected_salary: "₹22,00,000 - ₹30,00,000",
    notice_period: "2-months",
    availability: "2-months",
    job_preferences: {
      locations: ["Pune", "Mumbai", "Bangalore"],
      job_types: ["Full-time"],
      salary_range: "₹20,00,000 - ₹35,00,000",
    },
    created_at: "2024-01-04",
    last_active: "2024-01-12",
    profile_completion: 94,
  },
  {
    id: "5",
    name: "Priya Gupta",
    email: "priya.gupta@email.com",
    phone: "+91 54321 09876",
    location: "Bangalore, Karnataka",
    experience: "5 years",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS", "Redux", "Express.js", "PostgreSQL"],
    avatar: "/placeholder.svg?height=40&width=40&text=PG",
    resume_url: "/placeholder.pdf",
    portfolio_url: "https://priyagupta.dev",
    linkedin_url: "https://linkedin.com/in/priyagupta",
    current_role: "Lead Frontend Developer",
    expected_salary: "₹19,00,000 - ₹26,00,000",
    notice_period: "1-month",
    availability: "1-month",
    job_preferences: {
      locations: ["Bangalore", "Mumbai", "Delhi"],
      job_types: ["Full-time", "Remote"],
      salary_range: "₹18,00,000 - ₹28,00,000",
    },
    created_at: "2024-01-05",
    last_active: "2024-01-11",
    profile_completion: 91,
  },
  {
    id: "6",
    name: "Karthik Nair",
    email: "karthik.nair@email.com",
    phone: "+91 43210 98765",
    location: "Chennai, Tamil Nadu",
    experience: "6 years",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "MongoDB", "GraphQL", "Redis"],
    avatar: "/placeholder.svg?height=40&width=40&text=KN",
    resume_url: "/placeholder.pdf",
    portfolio_url: "https://kartiknair.dev",
    linkedin_url: "https://linkedin.com/in/kartiknair",
    current_role: "Senior Software Engineer",
    expected_salary: "₹21,00,000 - ₹28,00,000",
    notice_period: "2-months",
    availability: "2-months",
    job_preferences: {
      locations: ["Chennai", "Bangalore", "Hyderabad"],
      job_types: ["Full-time"],
      salary_range: "₹20,00,000 - ₹30,00,000",
    },
    created_at: "2024-01-06",
    last_active: "2024-01-10",
    profile_completion: 89,
  },

  // Applied + Poor Match Examples for Senior Software Engineer
  {
    id: "7",
    name: "Amit Kumar",
    email: "amit.kumar@email.com",
    phone: "+91 32109 87654",
    location: "Delhi, NCR",
    experience: "4 years",
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Wireframing", "Sketch", "InVision"],
    avatar: "/placeholder.svg?height=40&width=40&text=AK",
    resume_url: "/placeholder.pdf",
    portfolio_url: "https://amitkumar.design",
    linkedin_url: "https://linkedin.com/in/amitkumar",
    current_role: "UX Designer",
    expected_salary: "₹12,00,000 - ₹18,00,000",
    notice_period: "1-month",
    availability: "1-month",
    job_preferences: {
      locations: ["Delhi", "Gurgaon", "Noida"],
      job_types: ["Full-time", "Remote"],
      salary_range: "₹10,00,000 - ₹18,00,000",
    },
    created_at: "2024-01-07",
    last_active: "2024-01-09",
    profile_completion: 85,
  },
  {
    id: "8",
    name: "Ravi Joshi",
    email: "ravi.joshi@email.com",
    phone: "+91 21098 76543",
    location: "Mumbai, Maharashtra",
    experience: "3 years",
    skills: ["Digital Marketing", "SEO", "Google Analytics", "Content Strategy", "Social Media", "Email Marketing"],
    avatar: "/placeholder.svg?height=40&width=40&text=RJ",
    resume_url: "/placeholder.pdf",
    linkedin_url: "https://linkedin.com/in/ravijoshi",
    current_role: "Digital Marketing Specialist",
    expected_salary: "₹8,00,000 - ₹12,00,000",
    notice_period: "1-month",
    availability: "1-month",
    job_preferences: {
      locations: ["Mumbai", "Pune", "Bangalore"],
      job_types: ["Full-time", "Remote"],
      salary_range: "₹6,00,000 - ₹12,00,000",
    },
    created_at: "2024-01-08",
    last_active: "2024-01-08",
    profile_completion: 78,
  },

  // Additional candidates for other job roles
  {
    id: "9",
    name: "Anita Joshi",
    email: "anita.joshi@email.com",
    phone: "+91 10987 65432",
    location: "Chennai, Tamil Nadu",
    experience: "4 years",
    skills: [
      "Digital Marketing",
      "SEO",
      "Google Analytics",
      "Content Strategy",
      "Social Media",
      "PPC",
      "Email Marketing",
    ],
    avatar: "/placeholder.svg?height=40&width=40&text=AJ",
    resume_url: "/placeholder.pdf",
    linkedin_url: "https://linkedin.com/in/anitajoshi",
    current_role: "Marketing Manager",
    expected_salary: "₹12,00,000 - ₹16,00,000",
    notice_period: "1-month",
    availability: "1-month",
    job_preferences: {
      locations: ["Chennai", "Bangalore", "Mumbai"],
      job_types: ["Full-time", "Remote"],
      salary_range: "₹10,00,000 - ₹16,00,000",
    },
    created_at: "2024-01-09",
    last_active: "2024-01-07",
    profile_completion: 87,
  },
  {
    id: "10",
    name: "Deepak Mehta",
    email: "deepak.mehta@email.com",
    phone: "+91 09876 54321",
    location: "Hyderabad, Telangana",
    experience: "5 years",
    skills: ["Python", "SQL", "Tableau", "Power BI", "Machine Learning", "Statistics", "R", "Excel", "Pandas"],
    avatar: "/placeholder.svg?height=40&width=40&text=DM",
    resume_url: "/placeholder.pdf",
    linkedin_url: "https://linkedin.com/in/deepakmehta",
    current_role: "Senior Data Analyst",
    expected_salary: "₹15,00,000 - ₹22,00,000",
    notice_period: "2-weeks",
    availability: "2-weeks",
    job_preferences: {
      locations: ["Hyderabad", "Bangalore", "Chennai"],
      job_types: ["Full-time", "Remote"],
      salary_range: "₹12,00,000 - ₹22,00,000",
    },
    created_at: "2024-01-10",
    last_active: "2024-01-06",
    profile_completion: 93,
  },
  {
    id: "11",
    name: "Kavya Nair",
    email: "kavya.nair@email.com",
    phone: "+91 98765 01234",
    location: "Kochi, Kerala",
    experience: "5 years",
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "Docker", "Microservices"],
    avatar: "/placeholder.svg?height=40&width=40&text=KN",
    resume_url: "/placeholder.pdf",
    linkedin_url: "https://linkedin.com/in/kavyanair",
    current_role: "Backend Developer",
    expected_salary: "₹16,00,000 - ₹24,00,000",
    notice_period: "2-weeks",
    availability: "2-weeks",
    job_preferences: {
      locations: ["Kochi", "Bangalore", "Chennai"],
      job_types: ["Full-time", "Remote"],
      salary_range: "₹14,00,000 - ₹24,00,000",
    },
    created_at: "2024-01-11",
    last_active: "2024-01-05",
    profile_completion: 91,
  },
  {
    id: "12",
    name: "Rohit Agarwal",
    email: "rohit.agarwal@email.com",
    phone: "+91 87654 01234",
    location: "Bangalore, Karnataka",
    experience: "6 years",
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase", "JavaScript", "Swift", "Kotlin", "React"],
    avatar: "/placeholder.svg?height=40&width=40&text=RA",
    resume_url: "/placeholder.pdf",
    portfolio_url: "https://rohitagarwal.dev",
    linkedin_url: "https://linkedin.com/in/rohitagarwal",
    current_role: "Senior Mobile Developer",
    expected_salary: "₹18,00,000 - ₹25,00,000",
    notice_period: "1-month",
    availability: "1-month",
    job_preferences: {
      locations: ["Bangalore", "Mumbai", "Pune"],
      job_types: ["Full-time", "Contract"],
      salary_range: "₹16,00,000 - ₹25,00,000",
    },
    created_at: "2024-01-12",
    last_active: "2024-01-04",
    profile_completion: 89,
  },
]

export const mockApplications: JobApplication[] = [
  // Applied + Good Match Examples for Senior Software Engineer (Job ID: 1)
  {
    id: "1",
    job_id: "1",
    candidate_id: "1",
    candidate_name: "Rahul Sharma",
    candidate_email: "rahul.sharma@email.com",
    candidate_phone: "+91 98765 43210",
    status: "applied",
    applied_at: "2024-01-14",
    resume_url: "/placeholder.pdf",
    cover_letter:
      "I am excited to apply for the Senior Software Engineer position. With 5 years of experience in React, Node.js, and TypeScript, I believe I would be a great fit for your team. I have extensive experience with AWS and MongoDB, and I'm passionate about building scalable applications.",
    skill_match_percentage: 85,
    notes: "Strong React and Node.js background, excellent AWS experience, good cultural fit",
  },
  {
    id: "2",
    job_id: "1",
    candidate_id: "2",
    candidate_name: "Arjun Patel",
    candidate_email: "arjun.patel@email.com",
    candidate_phone: "+91 87654 32109",
    status: "shortlisted",
    applied_at: "2024-01-13",
    resume_url: "/placeholder.pdf",
    cover_letter:
      "I'm thrilled to apply for the Senior Software Engineer role. My 6 years of experience with React, Node.js, TypeScript, and AWS, combined with my expertise in Docker and Kubernetes, makes me well-suited for this position. I've led multiple full-stack projects and am excited about the opportunity to contribute to your team.",
    skill_match_percentage: 92,
    notes: "Excellent technical skills, strong leadership experience, perfect skill match",
  },
  {
    id: "3",
    job_id: "1",
    candidate_id: "3",
    candidate_name: "Sneha Reddy",
    candidate_email: "sneha.reddy@email.com",
    candidate_phone: "+91 76543 21098",
    status: "interviewed",
    applied_at: "2024-01-12",
    resume_url: "/placeholder.pdf",
    cover_letter:
      "I am writing to express my interest in the Senior Software Engineer position. With 4 years of hands-on experience in React, TypeScript, Node.js, and AWS, I have developed a strong foundation in full-stack development. My experience with MongoDB and Docker aligns well with your requirements.",
    skill_match_percentage: 88,
    notes: "Strong technical interview performance, good problem-solving skills",
    interview_date: "2024-01-16",
    interview_feedback: "Excellent technical skills, clear communication, shows great potential",
  },

  // Applied + Poor Match Examples for Senior Software Engineer (Job ID: 1)
  {
    id: "4",
    job_id: "1",
    candidate_id: "7",
    candidate_name: "Amit Kumar",
    candidate_email: "amit.kumar@email.com",
    candidate_phone: "+91 32109 87654",
    status: "applied",
    applied_at: "2024-01-11",
    resume_url: "/placeholder.pdf",
    cover_letter:
      "I am interested in the Senior Software Engineer position. While my background is primarily in UX design with Figma and Adobe Creative Suite, I am eager to transition into software development and believe my design thinking approach would bring value to your engineering team.",
    skill_match_percentage: 15,
    notes: "Design background, limited development experience, career transition candidate",
  },
  {
    id: "5",
    job_id: "1",
    candidate_id: "8",
    candidate_name: "Ravi Joshi",
    candidate_email: "ravi.joshi@email.com",
    candidate_phone: "+91 21098 76543",
    status: "applied",
    applied_at: "2024-01-10",
    resume_url: "/placeholder.pdf",
    cover_letter:
      "I would like to apply for the Senior Software Engineer role. My experience in digital marketing has given me strong analytical skills and experience with various tools. I'm looking to transition into software engineering and am willing to learn the required technologies.",
    skill_match_percentage: 8,
    notes: "Marketing background, no relevant technical skills, career change candidate",
  },

  // Applications for other jobs
  {
    id: "6",
    job_id: "2",
    candidate_id: "9",
    candidate_name: "Anita Joshi",
    candidate_email: "anita.joshi@email.com",
    candidate_phone: "+91 10987 65432",
    status: "shortlisted",
    applied_at: "2024-01-09",
    resume_url: "/placeholder.pdf",
    cover_letter:
      "I am excited to apply for the Marketing Manager position. With 4 years of experience in digital marketing, SEO, and Google Analytics, I have successfully managed multiple campaigns and driven significant growth for my current company. My expertise in content strategy and social media aligns perfectly with your requirements.",
    skill_match_percentage: 95,
    notes: "Perfect marketing background, excellent campaign management experience",
  },
  {
    id: "7",
    job_id: "4",
    candidate_id: "10",
    candidate_name: "Deepak Mehta",
    candidate_email: "deepak.mehta@email.com",
    candidate_phone: "+91 09876 54321",
    status: "offered",
    applied_at: "2024-01-08",
    resume_url: "/placeholder.pdf",
    cover_letter:
      "I am writing to apply for the Data Analyst position. With 5 years of experience in Python, SQL, Tableau, and machine learning, I have successfully delivered insights that drove business decisions. My statistical background and expertise with Power BI make me well-suited for this role.",
    skill_match_percentage: 94,
    notes: "Outstanding data analysis skills, strong statistical background",
    interview_date: "2024-01-15",
    interview_feedback: "Exceptional analytical skills, clear communication of complex concepts",
  },
  {
    id: "8",
    job_id: "9",
    candidate_id: "11",
    candidate_name: "Kavya Nair",
    candidate_email: "kavya.nair@email.com",
    candidate_phone: "+91 98765 01234",
    status: "interviewed",
    applied_at: "2024-01-07",
    resume_url: "/placeholder.pdf",
    cover_letter:
      "I am interested in the Backend Developer position. My 5 years of experience with Node.js, Python, PostgreSQL, and MongoDB, combined with my expertise in microservices and Docker, aligns well with your requirements. I have successfully built and maintained scalable backend systems.",
    skill_match_percentage: 89,
    notes: "Strong backend development skills, microservices experience",
    interview_date: "2024-01-14",
    interview_feedback: "Solid technical knowledge, good system design thinking",
  },
]

// Calculate skill demand from job data
export const calculateSkillDemand = (): SkillDemand[] => {
  const skillMap = new Map<
    string,
    {
      totalJobs: number
      activeJobs: number
      pausedJobs: number
      closedJobs: number
      salaries: number[]
      companies: Set<string>
    }
  >()

  mockJobs.forEach((job) => {
    job.skills.forEach((skill) => {
      if (!skillMap.has(skill)) {
        skillMap.set(skill, {
          totalJobs: 0,
          activeJobs: 0,
          pausedJobs: 0,
          closedJobs: 0,
          salaries: [],
          companies: new Set(),
        })
      }

      const skillData = skillMap.get(skill)!
      skillData.totalJobs++
      skillData.companies.add(job.company)

      // Extract salary for average calculation
      const salaryMatch = job.salary.match(/₹([\d,]+,\d+)/g)
      if (salaryMatch && salaryMatch.length >= 2) {
        const minSalary = Number.parseInt(salaryMatch[0].replace(/₹|,/g, ""))
        const maxSalary = Number.parseInt(salaryMatch[1].replace(/₹|,/g, ""))
        skillData.salaries.push((minSalary + maxSalary) / 2)
      }

      switch (job.status) {
        case "active":
          skillData.activeJobs++
          break
        case "paused":
          skillData.pausedJobs++
          break
        case "closed":
          skillData.closedJobs++
          break
      }
    })
  })

  return Array.from(skillMap.entries())
    .map(([skill, data]) => {
      const avgSalary = data.salaries.length > 0 ? data.salaries.reduce((a, b) => a + b, 0) / data.salaries.length : 0

      return {
        skill,
        totalJobs: data.totalJobs,
        activeJobs: data.activeJobs,
        pausedJobs: data.pausedJobs,
        closedJobs: data.closedJobs,
        averageSalary: avgSalary > 0 ? `₹${(avgSalary / 100000).toFixed(1)}L` : "N/A",
        topCompanies: Array.from(data.companies).slice(0, 3),
      }
    })
    .sort((a, b) => b.totalJobs - a.totalJobs)
}

export const mockSkillDemand = calculateSkillDemand()

// Skill matching utility function
export const calculateSkillMatch = (candidateSkills: string[], jobSkills: string[]): number => {
  if (jobSkills.length === 0) return 0

  const matchedSkills = candidateSkills.filter((skill) =>
    jobSkills.some(
      (jobSkill) =>
        skill.toLowerCase().includes(jobSkill.toLowerCase()) || jobSkill.toLowerCase().includes(skill.toLowerCase()),
    ),
  )

  return Math.round((matchedSkills.length / jobSkills.length) * 100)
}

// Get candidates with skill matching for a specific job
export const getCandidatesWithSkillMatch = (jobId: string) => {
  const job = mockJobs.find((j) => j.id === jobId)
  if (!job) return { appliedGoodMatch: [], notAppliedGoodMatch: [], appliedPoorMatch: [] }

  const appliedCandidateIds = mockApplications.filter((app) => app.job_id === jobId).map((app) => app.candidate_id)

  const appliedGoodMatch: Array<Candidate & { application: JobApplication; skillMatch: number }> = []
  const appliedPoorMatch: Array<Candidate & { application: JobApplication; skillMatch: number }> = []
  const notAppliedGoodMatch: Array<Candidate & { skillMatch: number }> = []

  mockCandidates.forEach((candidate) => {
    const skillMatch = calculateSkillMatch(candidate.skills, job.skills)
    const application = mockApplications.find((app) => app.job_id === jobId && app.candidate_id === candidate.id)

    if (appliedCandidateIds.includes(candidate.id)) {
      // Candidate has applied
      if (skillMatch >= 75) {
        appliedGoodMatch.push({ ...candidate, application: application!, skillMatch })
      } else {
        appliedPoorMatch.push({ ...candidate, application: application!, skillMatch })
      }
    } else {
      // Candidate hasn't applied
      if (skillMatch >= 75) {
        notAppliedGoodMatch.push({ ...candidate, skillMatch })
      }
    }
  })

  return {
    appliedGoodMatch: appliedGoodMatch.sort((a, b) => b.skillMatch - a.skillMatch),
    notAppliedGoodMatch: notAppliedGoodMatch.sort((a, b) => b.skillMatch - a.skillMatch),
    appliedPoorMatch: appliedPoorMatch.sort((a, b) => b.skillMatch - a.skillMatch),
  }
}

export const mockUsers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    role: "candidate" as const,
    phone: "+91 98765 43210",
    location: "Bangalore, Karnataka",
    avatar: "/placeholder.svg?height=32&width=32&text=RK",
    created_at: "2024-01-01",
    last_active: "2024-01-15",
    status: "active" as const,
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@techcorp.com",
    role: "employer" as const,
    phone: "+91 87654 32109",
    location: "Mumbai, Maharashtra",
    avatar: "/placeholder.svg?height=32&width=32&text=PS",
    created_at: "2024-01-02",
    last_active: "2024-01-14",
    status: "active" as const,
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@platform.com",
    role: "admin" as const,
    phone: "+91 76543 21098",
    location: "Delhi, NCR",
    avatar: "/placeholder.svg?height=32&width=32&text=AU",
    created_at: "2024-01-01",
    last_active: "2024-01-15",
    status: "active" as const,
  },
]

export const mockBlogPosts = [
  {
    id: "1",
    title: "Top 10 Tech Skills in Demand for 2024",
    excerpt:
      "Discover the most sought-after technical skills that employers are looking for in the current job market.",
    content:
      "The tech industry continues to evolve rapidly, and staying updated with the latest skills is crucial for career growth...",
    author: "Career Team",
    published_at: "2024-01-10",
    category: "Career Tips",
    image: "/placeholder.svg?height=200&width=400&text=Tech+Skills+2024",
    tags: ["technology", "skills", "career"],
  },
  {
    id: "2",
    title: "How to Ace Your Next Job Interview",
    excerpt: "Essential tips and strategies to help you prepare for and succeed in your job interviews.",
    content:
      "Job interviews can be nerve-wracking, but with proper preparation and the right mindset, you can increase your chances of success...",
    author: "HR Experts",
    published_at: "2024-01-08",
    category: "Interview Tips",
    image: "/placeholder.svg?height=200&width=400&text=Interview+Success",
    tags: ["interview", "preparation", "career"],
  },
  {
    id: "3",
    title: "Remote Work: Best Practices for Success",
    excerpt: "Learn how to thrive in a remote work environment with these proven strategies and tips.",
    content:
      "Remote work has become increasingly common, and mastering the art of working from home is essential for modern professionals...",
    author: "Productivity Team",
    published_at: "2024-01-05",
    category: "Remote Work",
    image: "/placeholder.svg?height=200&width=400&text=Remote+Work+Tips",
    tags: ["remote", "productivity", "work-life-balance"],
  },
]
