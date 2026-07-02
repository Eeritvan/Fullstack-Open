import { likeBlog } from "@/app/actions/blog"
import { getBlogById } from "@/app/services/blogs"
import { notFound } from "next/navigation"

const SingleBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <a href={blog.url}>{blog.title}</a> by {blog.author} ({blog.likes} likes)
      <form action={likeBlog}>
        <input type="hidden" name="blogId" value={blog.id} />
        <button type="submit">
          like
        </button>
      </form>
    </div>
  )
}

export default SingleBlog
