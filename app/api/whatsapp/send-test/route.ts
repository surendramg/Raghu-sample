import { type NextRequest, NextResponse } from "next/server"
import { WhatsAppService } from "@/lib/whatsapp/service"

export async function POST(request: NextRequest) {
  try {
    const { to, message } = await request.json()

    if (!to || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const whatsappService = new WhatsAppService()
    const result = await whatsappService.sendTextMessage(to, message)

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error("Test message error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
