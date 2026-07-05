import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserAndBlogsByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  })
}

export const createNewUser = async (username: string, name: string, passwordHash: string) => {
  await db.insert(users).values({ username, name, passwordHash })
}

export const addNewToken = async (userId: number, token: string) => {
  await db.update(users).set({ token }).where(eq(users.id, userId))
}
