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
    <div>
      <h2>Add a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Content
            <input
              type="text"
              name="title"
              defaultValue={state.values?.title}
              required
            />
          </label>
        </div>
        {state.errors.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
        <div>
          <label>
            Url
            <input
              type="text"
              name="url"
              defaultValue={state.values?.url}
              required
            />
          </label>
        </div>
        {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
        <div>
          <label>
            Author
            <input
              type="text"
              name="author"
              defaultValue={state.values?.author}
              required />
          </label>
        </div>
        {state.errors.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog
