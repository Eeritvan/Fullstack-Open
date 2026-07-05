import { getBlogs } from "@/app/services/blogs"
import { searchBlogs } from "@/app/actions/blog"
import Link from "next/link"

const Blogs = async ({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>
}) => {
  const { q } = await searchParams

  const allBlogs = await getBlogs()

  const blogs = q
    ? allBlogs.filter(b => b.title.toLowerCase().startsWith(q.toLowerCase()))
    : allBlogs

  return (
    <div className="mx-auto w-3xl m-6">
      <h2 className="text-3xl font-bold my-4">Blogs</h2>
      <form action={searchBlogs} className="flex my-4 h-10 gap-2">
        <input
          name="q"
          placeholder="search"
          defaultValue={q}
          className="w-full rounded-md border p-2"
        />
        <button type="submit" className="rounded-md bg-green-500 p-2">
          search
        </button>
      </form>
      <ul className="flex flex-col gap-2">
        {blogs.map((blog) => (
          <li key={blog.id} className="rounded-md border p-2 px-4">
            <Link href={`/blogs/${blog.id}`} className="flex items-center gap-1">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              By {blog.author} ({blog.likes} likes)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
