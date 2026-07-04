"use client"

import { createBlog, CreateBlogState } from "@/app/actions/blog"
import { useActionState } from "react"

const initialState: CreateBlogState = {
  values: {
    title: "",
    author: "",
    url: ""
  },
  errors: {}
}

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)

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
              defaultValue={state.values.title}
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
              defaultValue={state.values.url}
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
              defaultValue={state.values.author}
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
