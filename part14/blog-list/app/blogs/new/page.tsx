"use client"
import { createBlog } from "@/app/actions/blog"
import { useActionState } from "react"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { error: "" })

  return (
    <div>
      <h2>Add a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Content
            <input type="text" name="title" required />
          </label>
        </div>
        <div>
          <label>
            Url
            <input type="text" name="url" required />
          </label>
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" required />
          </label>
        </div>
        <button type="submit">Create</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  )
}

export default NewBlog
