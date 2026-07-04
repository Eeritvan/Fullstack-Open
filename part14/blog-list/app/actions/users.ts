"use server"

import bcrypt from "bcryptjs"
import { createNewUser } from "@/app/services/users"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export interface RegisterUserState {
  values: {
    name: string
    username: string
  }
  errors: {
    username?: string
    name?: string
    passwordDidNotMatch?: string
    usernameExists?: string
  }
}

export const registerUser = async (
  prevState: RegisterUserState,
  formData: FormData
) => {
  const errors: RegisterUserState["errors"] = {};

  const name = formData.get("name") as string
  if (!name || name.length < 4) {
    errors.name = "Name must be at least 4 characters long"
  }

  const username = formData.get("username") as string
  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }

  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string
  if (password !== passwordConfirm) {
    errors.passwordDidNotMatch = "Passwords did not match"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { name, username } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  // not the best error handling but good enough for this task
  try {
    await createNewUser(username, name, passwordHash)
  } catch {
    errors.usernameExists = "User with this username already exists"
    return { errors, values: { name, username } }
  }

  revalidatePath("/users")
  redirect("/login")
}
