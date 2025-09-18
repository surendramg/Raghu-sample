import React, { createContext, useContext } from "react"
import { useUser, useAuth as useClerkAuth } from "@clerk/clerk-react"
import { AuthLoading } from "../components/auth-loading"

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type Role = "admin" | "employer" | "candidate" | "client"

interface User {
  id: string
  email?: string | null
  role: Role
  name?: string | null
  publicMetadata: {
    role: Role
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded: clerkLoaded, user: clerkUser } = useUser();
  const { isSignedIn } = useClerkAuth();

  // Early return with loading state if Clerk is not initialized
  if (!clerkLoaded) {
    return <AuthLoading />;
  }

  // Map Clerk user to our User type
  const user = clerkUser ? {
    id: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress,
    name: clerkUser.fullName,
    role: (clerkUser.publicMetadata.role as Role) || 'candidate',
    publicMetadata: {
      role: (clerkUser.publicMetadata.role as Role) || 'candidate'
    }
  } : null;

  const value: AuthContextType = {
    user,
    loading: !clerkLoaded,
    isAuthenticated: !!isSignedIn
  };

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
