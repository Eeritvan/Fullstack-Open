"use server"

import { redirect } from "next/navigation"
import { addBlog } from "@/app/services/blogs"
import { revalidatePath } from "next/cache"

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string
  const url = formData.get("url") as string
  const author = formData.get("author") as string
  addBlog(title, url, author)

  revalidatePath("/blogs")
  redirect("/blogs")
}
