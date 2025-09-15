"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockJobs } from "@/lib/mock-data"

export default function FeaturedJobs() {
  const featuredJobs = mockJobs.filter((job) => job.featured).slice(0, 3)

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredJobs.map((job) => (
        <Card key={job.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="line-clamp-1">{job.title}</CardTitle>
            <div className="text-sm text-muted-foreground">{job.company}</div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center text-sm">
              <span className="font-medium">Location:</span>
              <span className="ml-1">{job.location}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="font-medium">Salary:</span>
              <span className="ml-1">{job.salary}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{job.type}</Badge>
              <Badge variant="secondary">
                {new Date(job.posted_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/jobs/${job.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
