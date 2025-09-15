import { type NextRequest, NextResponse } from "next/server"
import { WhatsAppService } from "@/lib/whatsapp/service"
import { JobService } from "@/lib/services/job-service"
import { UserService } from "@/lib/services/user-service"

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "your_verify_token"
const whatsappService = new WhatsAppService()
const jobService = new JobService()
const userService = new UserService()

// Webhook verification (GET request)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WhatsApp webhook verified")
    return new NextResponse(challenge)
  }

  return new NextResponse("Forbidden", { status: 403 })
}

// Handle incoming messages (POST request)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Process webhook data
    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === "messages") {
            const { messages, contacts } = change.value

            if (messages) {
              for (const message of messages) {
                await handleIncomingMessage(message, contacts[0])
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ status: "success" })
  } catch (error) {
    console.error("WhatsApp webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleIncomingMessage(message: any, contact: any) {
  const phoneNumber = message.from
  const messageText = message.text?.body?.toLowerCase() || ""
  const messageType = message.type

  try {
    // Get or create user session
    const userSession = await userService.getOrCreateWhatsAppUser(phoneNumber, contact.profile?.name)

    // Handle different message types
    switch (messageType) {
      case "text":
        await handleTextMessage(phoneNumber, messageText, userSession)
        break
      case "interactive":
        await handleInteractiveMessage(phoneNumber, message.interactive, userSession)
        break
      case "button":
        await handleButtonMessage(phoneNumber, message.button, userSession)
        break
      default:
        await whatsappService.sendMessage(phoneNumber, {
          type: "text",
          text: { body: "Sorry, I can only process text messages at the moment." },
        })
    }
  } catch (error) {
    console.error("Error handling message:", error)
    await whatsappService.sendMessage(phoneNumber, {
      type: "text",
      text: { body: "Sorry, something went wrong. Please try again later." },
    })
  }
}

async function handleTextMessage(phoneNumber: string, messageText: string, userSession: any) {
  // Command routing
  if (messageText.startsWith("/")) {
    await handleCommand(phoneNumber, messageText, userSession)
    return
  }

  // Context-based responses
  switch (userSession.context) {
    case "job_search":
      await handleJobSearch(phoneNumber, messageText, userSession)
      break
    case "profile_update":
      await handleProfileUpdate(phoneNumber, messageText, userSession)
      break
    case "application_status":
      await handleApplicationStatus(phoneNumber, messageText, userSession)
      break
    default:
      await handleGeneralQuery(phoneNumber, messageText, userSession)
  }
}

async function handleCommand(phoneNumber: string, command: string, userSession: any) {
  const cmd = command.split(" ")[0].toLowerCase()

  switch (cmd) {
    case "/start":
    case "/help":
      await sendWelcomeMessage(phoneNumber)
      break
    case "/jobs":
      await sendJobSearchMenu(phoneNumber)
      break
    case "/profile":
      await sendProfileMenu(phoneNumber)
      break
    case "/applications":
      await sendApplicationsMenu(phoneNumber)
      break
    case "/contact":
      await sendContactInfo(phoneNumber)
      break
    default:
      await whatsappService.sendMessage(phoneNumber, {
        type: "text",
        text: { body: "Unknown command. Type /help to see available commands." },
      })
  }
}

async function sendWelcomeMessage(phoneNumber: string) {
  const message = {
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: "🚀 Welcome to RecruitPro!",
      },
      body: {
        text: "I'm your AI recruitment assistant. I can help you:\n\n• Find job opportunities\n• Check application status\n• Update your profile\n• Get career advice\n\nHow can I assist you today?",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "search_jobs",
              title: "🔍 Search Jobs",
            },
          },
          {
            type: "reply",
            reply: {
              id: "my_applications",
              title: "📋 My Applications",
            },
          },
          {
            type: "reply",
            reply: {
              id: "help_menu",
              title: "❓ Help",
            },
          },
        ],
      },
    },
  }

  await whatsappService.sendMessage(phoneNumber, message)
}

async function sendJobSearchMenu(phoneNumber: string) {
  const message = {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "🔍 Job Search",
      },
      body: {
        text: "Choose how you'd like to search for jobs:",
      },
      action: {
        button: "Search Options",
        sections: [
          {
            title: "Search Methods",
            rows: [
              {
                id: "search_by_title",
                title: "By Job Title",
                description: "Search for specific roles",
              },
              {
                id: "search_by_location",
                title: "By Location",
                description: "Find jobs in your city",
              },
              {
                id: "search_by_company",
                title: "By Company",
                description: "Explore company openings",
              },
              {
                id: "featured_jobs",
                title: "Featured Jobs",
                description: "Top recommended positions",
              },
            ],
          },
        ],
      },
    },
  }

  await whatsappService.sendMessage(phoneNumber, message)
}

async function handleJobSearch(phoneNumber: string, query: string, userSession: any) {
  try {
    const jobs = await jobService.searchJobs(query, { limit: 5 })

    if (jobs.length === 0) {
      await whatsappService.sendMessage(phoneNumber, {
        type: "text",
        text: {
          body: `No jobs found for "${query}". Try searching with different keywords or check our website for more opportunities.`,
        },
      })
      return
    }

    // Send job results
    let jobsText = `🎯 Found ${jobs.length} jobs for "${query}":\n\n`

    jobs.forEach((job, index) => {
      jobsText += `${index + 1}. *${job.title}*\n`
      jobsText += `🏢 ${job.company}\n`
      jobsText += `📍 ${job.location}\n`
      jobsText += `💰 ${job.salary}\n`
      jobsText += `🔗 View: ${process.env.NEXT_PUBLIC_APP_URL}/jobs/${job.id}\n\n`
    })

    jobsText += 'Reply with a job number for more details or type "more jobs" to see additional results.'

    await whatsappService.sendMessage(phoneNumber, {
      type: "text",
      text: { body: jobsText },
    })

    // Update user context
    await userService.updateWhatsAppUserContext(phoneNumber, "job_results", { jobs, query })
  } catch (error) {
    console.error("Job search error:", error)
    await whatsappService.sendMessage(phoneNumber, {
      type: "text",
      text: { body: "Sorry, there was an error searching for jobs. Please try again later." },
    })
  }
}

async function handleInteractiveMessage(phoneNumber: string, interactive: any, userSession: any) {
  const { type } = interactive

  if (type === "button_reply") {
    const buttonId = interactive.button_reply.id
    await handleButtonReply(phoneNumber, buttonId, userSession)
  } else if (type === "list_reply") {
    const listId = interactive.list_reply.id
    await handleListReply(phoneNumber, listId, userSession)
  }
}

async function handleButtonReply(phoneNumber: string, buttonId: string, userSession: any) {
  switch (buttonId) {
    case "search_jobs":
      await userService.updateWhatsAppUserContext(phoneNumber, "job_search")
      await whatsappService.sendMessage(phoneNumber, {
        type: "text",
        text: {
          body: '🔍 Great! What type of job are you looking for? You can search by:\n\n• Job title (e.g., "Software Engineer")\n• Skills (e.g., "React Developer")\n• Company name\n\nJust type your search term!',
        },
      })
      break
    case "my_applications":
      await sendApplicationStatus(phoneNumber, userSession)
      break
    case "help_menu":
      await sendHelpMenu(phoneNumber)
      break
  }
}

async function handleListReply(phoneNumber: string, listId: string, userSession: any) {
  switch (listId) {
    case "search_by_title":
      await userService.updateWhatsAppUserContext(phoneNumber, "job_search")
      await whatsappService.sendMessage(phoneNumber, {
        type: "text",
        text: { body: '💼 Enter the job title you\'re looking for (e.g., "Software Engineer", "Marketing Manager"):' },
      })
      break
    case "search_by_location":
      await sendLocationOptions(phoneNumber)
      break
    case "featured_jobs":
      await sendFeaturedJobs(phoneNumber)
      break
  }
}

async function sendFeaturedJobs(phoneNumber: string) {
  try {
    const featuredJobs = await jobService.getFeaturedJobs(3)

    let message = "⭐ *Featured Jobs*\n\n"

    featuredJobs.forEach((job, index) => {
      message += `${index + 1}. *${job.title}*\n`
      message += `🏢 ${job.company}\n`
      message += `📍 ${job.location}\n`
      message += `💰 ${job.salary}\n`
      message += `🔗 Apply: ${process.env.NEXT_PUBLIC_APP_URL}/jobs/${job.id}\n\n`
    })

    message += "Type the job number for more details or visit our website for the complete list!"

    await whatsappService.sendMessage(phoneNumber, {
      type: "text",
      text: { body: message },
    })
  } catch (error) {
    console.error("Featured jobs error:", error)
    await whatsappService.sendMessage(phoneNumber, {
      type: "text",
      text: { body: "Sorry, unable to fetch featured jobs right now. Please visit our website." },
    })
  }
}

async function sendApplicationStatus(phoneNumber: string, userSession: any) {
  try {
    // In a real app, you'd fetch user applications from database
    const applications = await userService.getUserApplications(userSession.userId)

    if (applications.length === 0) {
      await whatsappService.sendMessage(phoneNumber, {
        type: "text",
        text: {
          body: "📋 You haven't applied to any jobs yet.\n\nStart your job search by typing /jobs or visit our website to explore opportunities!",
        },
      })
      return
    }

    let message = "📋 *Your Applications*\n\n"

    applications.forEach((app, index) => {
      const statusEmoji =
        app.status === "pending" ? "⏳" : app.status === "interview" ? "📞" : app.status === "accepted" ? "✅" : "❌"
      message += `${index + 1}. *${app.jobTitle}*\n`
      message += `🏢 ${app.company}\n`
      message += `${statusEmoji} Status: ${app.status}\n`
      message += `📅 Applied: ${new Date(app.appliedAt).toLocaleDateString()}\n\n`
    })

    await whatsappService.sendMessage(phoneNumber, {
      type: "text",
      text: { body: message },
    })
  } catch (error) {
    console.error("Application status error:", error)
    await whatsappService.sendMessage(phoneNumber, {
      type: "text",
      text: { body: "Sorry, unable to fetch your applications right now. Please check your dashboard on our website." },
    })
  }
}

async function sendHelpMenu(phoneNumber: string) {
  const helpText = `🤖 *RecruitPro Bot Commands*

*Job Search:*
/jobs - Search for job opportunities
/featured - View featured jobs

*Profile & Applications:*
/profile - Manage your profile
/applications - Check application status

*General:*
/help - Show this help menu
/contact - Get support contact info

*Quick Tips:*
• Just type what you're looking for (e.g., "software engineer jobs")
• Use buttons and menus for easier navigation
• Visit ${process.env.NEXT_PUBLIC_APP_URL} for the full experience

Need human assistance? Type "speak to agent" anytime!`

  await whatsappService.sendMessage(phoneNumber, {
    type: "text",
    text: { body: helpText },
  })
}

async function handleGeneralQuery(phoneNumber: string, messageText: string, userSession: any) {
  // Simple keyword matching for common queries
  const lowerText = messageText.toLowerCase()

  if (lowerText.includes("job") || lowerText.includes("work") || lowerText.includes("career")) {
    await sendJobSearchMenu(phoneNumber)
  } else if (lowerText.includes("application") || lowerText.includes("status")) {
    await sendApplicationStatus(phoneNumber, userSession)
  } else if (lowerText.includes("help") || lowerText.includes("support")) {
    await sendHelpMenu(phoneNumber)
  } else if (lowerText.includes("agent") || lowerText.includes("human") || lowerText.includes("speak")) {
    await whatsappService.sendMessage(phoneNumber, {
      type: "text",
      text: {
        body: "👨‍💼 I'll connect you with our support team.\n\n📧 Email: support@recruitpro.com\n📞 Phone: +91-80-1234-5678\n\nOr visit our website chat for immediate assistance!",
      },
    })
  } else {
    // Default response with suggestions
    await whatsappService.sendMessage(phoneNumber, {
      type: "text",
      text: {
        body: "I'm not sure how to help with that. Here are some things I can do:\n\n🔍 Search for jobs\n📋 Check application status\n👤 Help with your profile\n❓ Answer common questions\n\nType /help for more options or describe what you're looking for!",
      },
    })
  }
}

async function handleButtonMessage(phoneNumber: string, button: any, userSession: any) {
  // Handle button message logic here
  console.log(`Button message received: ${button.text} from ${phoneNumber}`)
  await whatsappService.sendMessage(phoneNumber, {
    type: "text",
    text: { body: `You clicked button: ${button.text}` },
  })
}

async function handleProfileUpdate(phoneNumber: string, messageText: string, userSession: any) {
  // Handle profile update logic here
  console.log(`Profile update requested by: ${phoneNumber} with message: ${messageText}`)
  await whatsappService.sendMessage(phoneNumber, {
    type: "text",
    text: { body: `Profile update feature is under development.  Please check back later.` },
  })
}

async function sendProfileMenu(phoneNumber: string) {
  // Send profile menu options
  await whatsappService.sendMessage(phoneNumber, {
    type: "text",
    text: { body: `Profile menu is under development. Please check back later.` },
  })
}

async function sendApplicationsMenu(phoneNumber: string) {
  // Send applications menu options
  await whatsappService.sendMessage(phoneNumber, {
    type: "text",
    text: { body: `Applications menu is under development. Please check back later.` },
  })
}

async function sendContactInfo(phoneNumber: string) {
  // Send contact information
  await whatsappService.sendMessage(phoneNumber, {
    type: "text",
    text: { body: `Contact information:\nEmail: support@example.com\nPhone: +1-555-123-4567` },
  })
}

async function sendLocationOptions(phoneNumber: string) {
  // Send location options
  await whatsappService.sendMessage(phoneNumber, {
    type: "text",
    text: { body: `Location search is under development. Please check back later.` },
  })
}
