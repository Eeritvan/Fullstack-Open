"use server"

import { redirect } from "next/navigation"
import { addBlog, addLikeToBlog } from "@/app/services/blogs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export interface CreateBlogState {
  values?: {
    title: string
    author: string
    url: string
  }
  errors: {
    title?: string
    author?: string
    url?: string
  }
  success?: boolean
}

export const createBlog = async (
  prevState: CreateBlogState,
  formData: FormData
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const errors: CreateBlogState["errors"] = {};

  const title = formData.get("title") as string
  if (!title || title.length < 5) {
    errors.title = "Blog title must be at least 5 characters long"
  }

  const url = formData.get("url") as string
  if (!url || url.length < 5) {
    errors.url = "Url must be at least 5 characters long"
  }

  const author = formData.get("author") as string
  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url } }
  }

  await addBlog(title, url, author)

  revalidatePath("/blogs")
  return { errors, success: true }
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
