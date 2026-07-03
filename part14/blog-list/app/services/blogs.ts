import { db } from "@/db"
import { blogs } from "@/db/schema"
import { eq, sql } from "drizzle-orm"

export const getBlogs = async () => {
  return db.query.blogs.findMany({
    orderBy: (blogs, { desc }) => [
      desc(blogs.likes)
    ]
  })
}

export const addBlog = async (title: string, url: string, author: string) => {
  await db
    .insert(blogs)
    .values({ title, url, author })
}

export const addLikeToBlog = async (blogId: number) => {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1`, })
    .where(eq(blogs.id, blogId))
}

export const getBlogById = async (blogId: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, blogId)
  })
}
