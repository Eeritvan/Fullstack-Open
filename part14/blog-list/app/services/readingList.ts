import { db } from "@/db"
import { readingList } from "@/db/schema"
import { getCurrentUser } from "@/app/services/session"
import { and, eq } from "drizzle-orm"

export const addBlogToReadingList = async (blogId: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  await db
    .insert(readingList)
    .values({ userId: user.id, blogId })
    .onConflictDoNothing()
}

export const markBlogAsRead = async (blogId: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(
        eq(readingList.userId, user.id),
        eq(readingList.blogId, blogId)
      )
    )
}
