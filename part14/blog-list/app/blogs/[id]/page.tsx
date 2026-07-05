import { likeBlog } from "@/app/actions/blog"
import { getBlogById } from "@/app/services/blogs"
import { notFound } from "next/navigation"

const SingleBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="mx-auto w-3xl m-6">
      <h2 className="text-3xl font-bold mt-4 underline">
        <a href={blog.url}>
          {blog.title}
        </a>
      </h2>
      <div>
        by {blog.author}
      </div>
      <div className="mt-4">
        {blog.likes} likes
        <form action={likeBlog}>
          <input type="hidden" name="blogId" value={blog.id} />
          <button type="submit" className="rounded-md bg-green-500 p-2">
            like
          </button>
        </form>
      </div>
    </div>
  )
}

export default SingleBlog
