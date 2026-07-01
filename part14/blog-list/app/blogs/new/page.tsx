import { createBlog } from "@/app/actions/blog"

const NewBlog = () => {
  return (
    <div>
      <h2>Add a new blog</h2>
      <form action={createBlog}>
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
      </form>
    </div>
  )
}

export default NewBlog
