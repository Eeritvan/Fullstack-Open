"use server"

import { redirect } from "next/navigation"
import { addBlogToReadingList } from "../services/readingList"

export const addToReadingList = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"))
  await addBlogToReadingList(blogId)

  redirect(`/blogs/${blogId}`)
}
