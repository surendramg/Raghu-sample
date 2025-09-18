import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
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

// ... keep all the routes arrays as they are ...

export function DashboardNav() {
  const location = useLocation()
  const { user } = useAuth()

  if (!user) return null

  // ... keep all the helper functions (getRoutes, getRoleEmoji, getRoleColor) as they are ...

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