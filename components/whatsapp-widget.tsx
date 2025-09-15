"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, X } from "lucide-react"

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<{ type: "user" | "bot"; message: string }[]>([
    { type: "bot", message: "👋 Hi there! I'm your recruitment assistant. How can I help you today?" },
    { type: "bot", message: "You can ask me about job openings, application status, or general career advice." },
  ])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    // Add user message to chat
    setChatHistory([...chatHistory, { type: "user", message }])

    // Simulate bot response (in a real app, this would call your WhatsApp API)
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          message: `Thanks for your message! A recruitment specialist will get back to you soon. In the meantime, you can browse our latest job openings at /jobs.`,
        },
      ])
    }, 1000)

    setMessage("")
  }

  return (
    <>
      {isOpen ? (
        <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg">
          <CardHeader className="bg-primary text-primary-foreground p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">NiyaraWFS Assistant</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-auto w-auto p-0 text-primary-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription className="text-primary-foreground/80 text-xs">
              We typically reply within a few minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 h-80 overflow-y-auto flex flex-col gap-3">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    chat.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {chat.message}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex w-full gap-2"
            >
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </>
  )
}
