"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { user, loading } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const routes = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/jobs", label: "Jobs", active: pathname.startsWith("/jobs") },
    { href: "/blog", label: "Blog", active: pathname.startsWith("/blog") },
    { href: "/about", label: "About", active: pathname === "/about" },
    { href: "/contact", label: "Contact", active: pathname === "/contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              N
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              NiyaraWFS
            </span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {routes.map((route) => (
                <NavigationMenuItem key={route.href}>
                  <Link href={route.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} ${
                        route.active ? "bg-accent text-accent-foreground" : ""
                      }`}
                    >
                      {route.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          {mounted && <ThemeToggle />}
          {!loading && (
            <>
              {user ? (
                <UserNav />
              ) : (
                <>
                  <Button asChild variant="ghost">
                    <Link href="/auth/login">Log in</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  >
                    <Link href="/auth/register">Sign up</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-background">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                N
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                NiyaraWFS
              </span>
            </Link>
            <div className="mt-8 flex flex-col gap-4">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  asChild
                  variant={route.active ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={route.href}>{route.label}</Link>
                </Button>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium">Theme</span>
                  {mounted && <ThemeToggle />}
                </div>
                {!loading && (
                  <>
                    {!user ? (
                      <>
                        <Button asChild variant="outline" onClick={() => setIsOpen(false)}>
                          <Link href="/auth/login">Log in</Link>
                        </Button>
                        <Button asChild onClick={() => setIsOpen(false)}>
                          <Link href="/auth/register">Sign up</Link>
                        </Button>
                      </>
                    ) : (
                      <Button asChild variant="outline" onClick={() => setIsOpen(false)}>
                        <Link href="/dashboard">Dashboard</Link>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
