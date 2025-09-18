export class WhatsAppService {
  private accessToken: string
  private phoneNumberId: string
  private baseUrl: string

  constructor() {
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || ""
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || ""
    this.baseUrl = `https://graph.facebook.com/v18.0/${this.phoneNumberId}`
  }

  async sendMessage(to: string, message: any) {
    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          ...message,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error("WhatsApp API error:", error)
        throw new Error(`WhatsApp API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error sending WhatsApp message:", error)
      throw error
    }
  }

  async sendTextMessage(to: string, text: string) {
    return this.sendMessage(to, {
      type: "text",
      text: { body: text },
    })
  }

  async sendTemplateMessage(to: string, templateName: string, languageCode = "en", components?: any[]) {
    return this.sendMessage(to, {
      type: "template",
      template: {
        name: templateName,
        language: { code: languageCode },
        components: components || [],
      },
    })
  }

  async sendInteractiveMessage(to: string, interactive: any) {
    return this.sendMessage(to, {
      type: "interactive",
      interactive,
    })
  }

  async markAsRead(messageId: string) {
    try {
      await fetch(`${this.baseUrl}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          status: "read",
          message_id: messageId,
        }),
      })
    } catch (error) {
      console.error("Error marking message as read:", error)
    }
  }
}
