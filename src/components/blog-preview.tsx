"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { mockBlogPosts } from "@/lib/mock-data"

export default function BlogPreview() {
  const recentPosts = mockBlogPosts.slice(0, 3)

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recentPosts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`} className="group">
          <Card className="overflow-hidden h-full transition-all hover:shadow-md">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={post.image_url || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <p className="text-xs text-muted-foreground">
                {new Date(post.published_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                • {post.author}
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
