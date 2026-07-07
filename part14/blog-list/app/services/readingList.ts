import { db } from "@/db"
import { readingList } from "@/db/schema"
import { getCurrentUser } from "./session"

export const addBlogToReadingList = async (blogId: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  await db
    .insert(readingList)
    .values({ userId: user.id, blogId })
}
