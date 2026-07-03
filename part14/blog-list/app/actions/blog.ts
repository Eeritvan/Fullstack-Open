"use server"

import { redirect } from "next/navigation"
import { addBlog, addLikeToBlog } from "@/app/services/blogs"
import { revalidatePath } from "next/cache"

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string
  const url = formData.get("url") as string
  const author = formData.get("author") as string
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
