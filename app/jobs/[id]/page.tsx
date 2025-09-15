"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, DollarSign, Clock, Building } from "lucide-react"
import { mockJobs } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"

export default function JobDetailPage() {
  const params = useParams()
  const { user } = useAuth()
  const jobId = params.id as string

  const job = mockJobs.find((j) => j.id === jobId)

  if (!job) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/jobs">Browse All Jobs</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                  <CardDescription className="text-lg">{job.company}</CardDescription>
                </div>
                {job.featured && <Badge variant="secondary">Featured</Badge>}
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  {job.type}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4" />
                  Posted {new Date(job.posted_at).toLocaleDateString()}
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>{job.description}</p>

              <h3 className="text-lg font-semibold mt-6 mb-3">What we're looking for:</h3>
              <ul className="space-y-2">
                <li>Experience building scalable web applications</li>
                <li>Strong problem-solving and analytical skills</li>
                <li>Excellent communication and teamwork abilities</li>
                <li>Passion for learning new technologies</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">What we offer:</h3>
              <ul className="space-y-2">
                <li>Competitive salary and equity package</li>
                <li>Comprehensive health, dental, and vision insurance</li>
                <li>Flexible work arrangements and remote options</li>
                <li>Professional development opportunities</li>
                <li>Modern office space and equipment</li>
              </ul>
            </CardContent>
          </Card>

          {job.requirements && (
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, index) => (
                    <Badge key={index} variant="outline">
                      {req}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Apply for this position</CardTitle>
              <CardDescription>Join our team and make an impact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {user ? (
                <>
                  <Button asChild className="w-full" size="lg">
                    <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    Save Job
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">Sign in to apply for this position</p>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/auth/login">Sign In to Apply</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/auth/register">Create Account</Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">{job.company}</h4>
                  <p className="text-sm text-muted-foreground">
                    A leading technology company focused on innovation and growth.
                  </p>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industry:</span>
                    <span>Technology</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company Size:</span>
                    <span>100-500 employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Founded:</span>
                    <span>2015</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockJobs
                  .filter((j) => j.id !== job.id && j.type === job.type)
                  .slice(0, 3)
                  .map((similarJob) => (
                    <Link
                      key={similarJob.id}
                      href={`/jobs/${similarJob.id}`}
                      className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <h4 className="font-medium text-sm">{similarJob.title}</h4>
                      <p className="text-xs text-muted-foreground">{similarJob.company}</p>
                      <p className="text-xs text-muted-foreground">{similarJob.location}</p>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
