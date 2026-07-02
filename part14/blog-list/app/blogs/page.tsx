import { getBlogs } from "@/app/services/blogs"
import { searchBlogs } from "@/app/actions/blog"
import Link from "next/link"

const Blogs = async ({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>
}) => {
  const { q } = await searchParams

  const blogs = q
    ? getBlogs()
      .filter(b => b.title.toLowerCase().startsWith(q.toLowerCase()))
    : getBlogs()

  return (
    <div>
      <h2>Blogs</h2>
      <form action={searchBlogs}>
        <input placeholder='search' name="q" />
        <button type='submit'>
          submit
        </button>
      </form>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author} ({blog.likes} likes)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
