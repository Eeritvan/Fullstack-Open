"use server"

import { redirect } from "next/navigation"
import { addBlog, addLikeToBlog } from "@/app/services/blogs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export const createBlog = async (
  prevState: { error: string },
  formData: FormData
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  if (!title || title.length < 5) {
    return { error: "Title must be at least 5 characters long" }
  }
  const url = formData.get("url") as string
  if (!url || url.length < 5) {
    return { error: "Url must be at least 5 characters long" }
  }
  const author = formData.get("author") as string
  if (!author || author.length < 5) {
    return { error: "Author must be at least 5 characters long" }
  }
  await addBlog(title, url, author)

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const likeBlog = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"))
  await addLikeToBlog(blogId)

  redirect(`/blogs/${blogId}`)
}

export const searchBlogs = async (formData: FormData) => {
  const query = formData.get("q")

  redirect(`/blogs?q=${query}`)
}
