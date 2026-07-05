"use client"

import { createBlog, CreateBlogState } from "@/app/actions/blog"
import { useNotification } from "@/app/context/NotificationContext"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"

const initialState: CreateBlogState = {
  values: {
    title: "",
    author: "",
    url: ""
  },
  errors: {},
  success: false
}

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog added")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="mx-auto w-3xl m-6">
      <h2 className="text-3xl font-bold my-4">Add a new blog</h2>
      <form action={formAction}>
        <label className="flex flex-col">
          Content
          <input
            type="text"
            name="title"
            defaultValue={state.values?.title}
            required
            className="rounded-md border p-2"
          />
        </label>
        {state.errors.title && <p className="text-red-600">{state.errors.title}</p>}
        <label className="flex flex-col">
          Url
          <input
            type="text"
            name="url"
            defaultValue={state.values?.url}
            required
            className="rounded-md border p-2"
          />
        </label>
        {state.errors.url && <p className="text-red-600">{state.errors.url}</p>}
        <label className="flex flex-col">
          Author
          <input
            type="text"
            name="author"
            defaultValue={state.values?.author}
            required
            className="rounded-md border p-2"
          />
        </label>
        {state.errors.author && <p className="text-red-600">{state.errors.author}</p>}
        <button type="submit" className="w-20 rounded-md bg-green-500 mt-2 p-2">
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlog
