"use server"

import { redirect } from "next/navigation"
import { addBlogToReadingList, markBlogAsRead } from "../services/readingList"
import { revalidatePath } from "next/cache"

export const addToReadingList = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"))
  await addBlogToReadingList(blogId)

  redirect(`/blogs/${blogId}`)
}

export const markAsRead = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"))

  await markBlogAsRead(blogId)

  revalidatePath("/me")
  redirect(`/me`)
}
