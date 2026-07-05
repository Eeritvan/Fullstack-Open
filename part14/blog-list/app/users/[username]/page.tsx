import { getUserAndBlogsByUsername } from "@/app/services/users"
import Link from "next/link"
import { notFound } from "next/navigation"

const SingleUser = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserAndBlogsByUsername(username)

  if (!user) {
    notFound()
  }

  const blogs = user.blogs

  return (
    <div className="mx-auto w-3xl m-6">
      <div>
        <h2 className="text-3xl font-bold">{user.name}</h2>
        <p>Username: {user.username}</p>
      </div>
      <div className="my-4">
        <h3 className="text-2xl">blogs added by {user.name}</h3>
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
    </div>
  )
}

export default SingleUser
