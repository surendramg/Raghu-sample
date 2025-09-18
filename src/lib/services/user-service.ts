import { mockApplications } from "@/lib/mock-data"

interface WhatsAppUser {
  id: string
  phoneNumber: string
  name?: string
  context?: string
  contextData?: any
  createdAt: Date
  lastActive: Date
}

// In-memory storage for demo - use database in production
const whatsappUsers = new Map<string, WhatsAppUser>()
const userSessions = new Map<string, any>()

export class UserService {
  async getOrCreateWhatsAppUser(phoneNumber: string, name?: string): Promise<WhatsAppUser> {
    let user = whatsappUsers.get(phoneNumber)

    if (!user) {
      user = {
        id: `wa_${Date.now()}`,
        phoneNumber,
        name,
        createdAt: new Date(),
        lastActive: new Date(),
      }
      whatsappUsers.set(phoneNumber, user)
    } else {
      user.lastActive = new Date()
      if (name && !user.name) {
        user.name = name
      }
    }

    return user
  }

  async updateWhatsAppUserContext(phoneNumber: string, context?: string, contextData?: any) {
    const user = whatsappUsers.get(phoneNumber)
    if (user) {
      user.context = context
      user.contextData = contextData
      user.lastActive = new Date()
    }
  }

  async getUserApplications(userId: string) {
    // In a real app, query database by userId
    // For demo, return mock applications
    return mockApplications
  }

  async createJobApplication(userId: string, jobId: string, applicationData: any) {
    // In a real app, save to database
    console.log("Creating application:", { userId, jobId, applicationData })
    return { id: `app_${Date.now()}`, status: "pending" }
  }

  async getUserProfile(userId: string) {
    // In a real app, fetch from database
    return {
      id: userId,
      name: "Demo User",
      email: "demo@example.com",
      phone: "+91-9876543210",
      skills: ["JavaScript", "React", "Node.js"],
      experience: "3 years",
    }
  }
}
