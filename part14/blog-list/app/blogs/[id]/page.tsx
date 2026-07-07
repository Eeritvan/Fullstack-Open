import { likeBlog } from "@/app/actions/blog"
import { addToReadingList } from "@/app/actions/readingList"
import { getBlogById } from "@/app/services/blogs"
import { getCurrentUser } from "@/app/services/session"
import { notFound } from "next/navigation"

const SingleBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const user = await getCurrentUser()

  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const isOwn = blog.userId === user?.id

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
      <div className="mt-4 flex gap-3 items-center">
        {blog.likes} likes
        <div className="flex gap-2">
          <form action={likeBlog}>
            <input type="hidden" name="blogId" value={blog.id} />
            <button type="submit" className="rounded-md bg-green-500 p-1 px-2">
              like
            </button>
          </form>
          {user && !isOwn && (
            <form action={addToReadingList}>
              <input type="hidden" name="blogId" value={blog.id} />
              <button type="submit" className="rounded-md bg-blue-500 p-1 px-2">
                add to reading list
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleBlog
