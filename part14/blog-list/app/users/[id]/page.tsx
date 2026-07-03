import { getUserById } from "@/app/services/users"
import { notFound } from "next/navigation"

const SingleUser = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const user = await getUserById(Number(id))

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      {/*<form action={likeBlog}>
        <input type="hidden" name="blogId" value={blog.id} />
        <button type="submit">
          like
        </button>
      </form>*/}
    </div>
  )
}

export default SingleUser
