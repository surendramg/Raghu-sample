import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import { useAuth } from "../../lib/auth-context"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { ScrollArea } from "../ui/scroll-area"
import { Badge } from "../ui/badge"
import {
  Home,
  Users,
  Briefcase,
  FileText,
  Calendar,
  Settings,
  BarChart3,
  UserCheck,
  Building2,
  MessageSquare,
  User,
  Send,
} from "lucide-react"

const adminRoutes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Users",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    label: "Jobs",
    icon: Briefcase,
    href: "/dashboard/jobs",
  },
  {
    label: "Candidates",
    icon: UserCheck,
    href: "/dashboard/candidates",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    label: "WhatsApp",
    icon: MessageSquare,
    href: "/dashboard/whatsapp",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

const employerRoutes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Jobs",
    icon: Briefcase,
    href: "/dashboard/jobs",
  },
  {
    label: "Candidates",
    icon: UserCheck,
    href: "/dashboard/candidates",
  },
  {
    label: "Clients",
    icon: Building2,
    href: "/dashboard/clients",
  },
  {
    label: "Interviews",
    icon: Calendar,
    href: "/dashboard/interviews",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    label: "WhatsApp",
    icon: MessageSquare,
    href: "/dashboard/whatsapp",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

const candidateRoutes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Jobs",
    icon: Briefcase,
    href: "/dashboard/jobs",
  },
  {
    label: "Applications",
    icon: FileText,
    href: "/dashboard/applications",
  },
  {
    label: "Saved Jobs",
    icon: Briefcase,
    href: "/dashboard/saved-jobs",
  },
  {
    label: "Profile",
    icon: User,
    href: "/dashboard/profile",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

const clientRoutes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Job Requests",
    icon: Send,
    href: "/dashboard/requests",
  },
  {
    label: "Candidates",
    icon: UserCheck,
    href: "/dashboard/candidates",
  },
  {
    label: "Interviews",
    icon: Calendar,
    href: "/dashboard/interviews",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    label: "Profile",
    icon: User,
    href: "/dashboard/profile",
  },
]

export function DashboardNav() {
  const location = useLocation()
  const { user } = useAuth()

  if (!user) return null

  const getRoutes = () => {
    switch (user.role) {
      case "admin":
        return adminRoutes
      case "employer":
        return employerRoutes
      case "candidate":
        return candidateRoutes
      case "client":
        return clientRoutes
      default:
        return candidateRoutes
    }
  }

  const routes = getRoutes()

  const getRoleEmoji = (role: string) => {
    switch (role) {
      case "admin":
        return "👑"
      case "employer":
        return "🏢"
      case "candidate":
        return "👤"
      case "client":
        return "🤝"
      default:
        return "👤"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "employer":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "candidate":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "client":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* User Info Section */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">{getRoleEmoji(user.role)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-none">{user.name || user.email?.split("@")[0] || "User"}</p>
            <Badge variant="secondary" className={cn("mt-1 text-xs capitalize", getRoleColor(user.role))}>
              {user.role}
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                location.pathname === route.href
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
