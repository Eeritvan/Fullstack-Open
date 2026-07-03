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
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>blogs added by {user.name}</h3>
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

export default SingleUser
