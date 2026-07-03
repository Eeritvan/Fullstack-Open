import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserById = async (userId: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, userId)
  })
}
