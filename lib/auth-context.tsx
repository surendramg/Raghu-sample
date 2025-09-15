"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type Role = "admin" | "employer" | "candidate" | "client"

interface User {
  id: string
  email: string
  role: Role
  name?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  /* canonical auth API */
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, role: Role, name?: string) => Promise<void>
  signOut: () => void
  /* convenience aliases – do NOT rely on these in new code */
  login?: (email: string, password: string) => Promise<void>
  logout?: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/* -------------------------------------------------------------------------- */
/* Demo Users                                                                 */
/* -------------------------------------------------------------------------- */

const mockUsers: User[] = [
  { id: "1", email: "admin@demo.com", role: "admin", name: "Admin User" },
  { id: "2", email: "employer@demo.com", role: "employer", name: "Employer User" },
  { id: "3", email: "candidate@demo.com", role: "candidate", name: "Candidate User" },
  { id: "4", email: "client@demo.com", role: "client", name: "Client User" },
]

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  /* hydrate session from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem("auth-user")
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem("auth-user")
      }
    }
    setLoading(false)
  }, [])

  /* ---------------------------------------------------------------------- */
  /* Auth helpers                                                           */
  /* ---------------------------------------------------------------------- */

  const signIn = async (email: string, _password: string) => {
    setLoading(true)

    // Simulate network latency
    await new Promise((r) => setTimeout(r, 1000))

    const found = mockUsers.find((u) => u.email === email)

    // Allow any email for demo; default to candidate role
    const authUser: User =
      found ??
      ({
        id: Date.now().toString(),
        email,
        role: "candidate",
        name: email.split("@")[0],
      } as User)

    setUser(authUser)
    localStorage.setItem("auth-user", JSON.stringify(authUser))

    toast({ title: "Welcome back!", description: `Signed in as ${authUser.role}` })
    router.push("/dashboard")
    setLoading(false)
  }

  const signUp = async (email: string, _password: string, role: Role, name?: string) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      email,
      role,
      name: name ?? email.split("@")[0],
    }

    setUser(newUser)
    localStorage.setItem("auth-user", JSON.stringify(newUser))
    toast({ title: "Account created!", description: "Welcome to RecruitPro" })
    router.push("/dashboard")
    setLoading(false)
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("auth-user")
    router.push("/")
    toast({ title: "Signed out", description: "Come back soon!" })
  }

  /* expose everything */
  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    // legacy aliases
    login: signIn,
    logout: signOut,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
