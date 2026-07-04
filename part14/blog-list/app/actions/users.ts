"use server"

import bcrypt from "bcryptjs"
import { createNewUser } from "@/app/services/users"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const registerUser = async (formData: FormData) => {
  const name = formData.get("name") as string
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  const passwordHash = await bcrypt.hash(password, 10)

  await createNewUser(username, name, passwordHash)

  revalidatePath("/users")
  redirect("/login")
}
