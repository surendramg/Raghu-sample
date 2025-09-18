"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { Shield, Building, UserCheck, Building2 } from "lucide-react"
import Link from "next/link"

export function UserNav() {
  const { user, signOut } = useAuth()

  if (!user) return null

  const initials = (user.name || user.email)
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  // Role-specific avatar images and fallbacks
  const getRoleAvatarSrc = (role: string) => {
    switch (role) {
      case "admin":
        return "/placeholder.svg?height=32&width=32&text=👨‍💼&bg=ef4444&color=white"
      case "employer":
        return "/placeholder.svg?height=32&width=32&text=🏢&bg=3b82f6&color=white"
      case "candidate":
        return "/placeholder.svg?height=32&width=32&text=👩‍💻&bg=10b981&color=white"
      case "client":
        return "/placeholder.svg?height=32&width=32&text=🏛️&bg=8b5cf6&color=white"
      default:
        return "/placeholder.svg?height=32&width=32&text=👤&bg=6b7280&color=white"
    }
  }

  const getRoleFallback = (role: string) => {
    switch (role) {
      case "admin":
        return {
          bg: "bg-red-500",
          text: "text-white",
          icon: Shield,
        }
      case "employer":
        return {
          bg: "bg-blue-500",
          text: "text-white",
          icon: Building,
        }
      case "candidate":
        return {
          bg: "bg-green-500",
          text: "text-white",
          icon: UserCheck,
        }
      case "client":
        return {
          bg: "bg-purple-500",
          text: "text-white",
          icon: Building2,
        }
      default:
        return {
          bg: "bg-gray-500",
          text: "text-white",
          icon: UserCheck,
        }
    }
  }

  const roleAvatarSrc = getRoleAvatarSrc(user.role)
  const roleFallback = getRoleFallback(user.role)
  const RoleIcon = roleFallback.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || roleAvatarSrc} alt={user.name || user.email} />
            <AvatarFallback className={`${roleFallback.bg} ${roleFallback.text}`}>
              {user.avatar ? initials : <RoleIcon className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name || user.email}</p>
            <div className="flex items-center gap-2">
              <RoleIcon className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs leading-none text-muted-foreground">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">Profile</Link>
          </DropdownMenuItem>
          {user.role === "candidate" && (
            <DropdownMenuItem asChild>
              <Link href="/dashboard/applications">Applications</Link>
            </DropdownMenuItem>
          )}
          {user.role === "employer" && (
            <DropdownMenuItem asChild>
              <Link href="/dashboard/jobs">My Jobs</Link>
            </DropdownMenuItem>
          )}
          {user.role === "client" && (
            <DropdownMenuItem asChild>
              <Link href="/dashboard/requests">Job Requests</Link>
            </DropdownMenuItem>
          )}
          {user.role === "admin" && (
            <DropdownMenuItem asChild>
              <Link href="/dashboard/users">Admin Panel</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
