import { getCurrentUserWithReadingList } from "@/app/services/session"
import { generateNewApiToken } from "@/app/actions/users"
import Link from "next/link"
import { markAsRead } from "../actions/readingList"

const Me = async () => {
  const user = await getCurrentUserWithReadingList()

  if (!user) return

  const readBlogs = user.readingList.filter((blog) => blog.read)
  const unreadBlogs = user.readingList.filter((blog) => !blog.read)

  return (
    <div className="mx-auto w-3xl m-6">
      <div>
        <h2 className="text-3xl font-bold">{user.name}</h2>
        <p>Username: {user.username}</p>
      </div>
      <div className="flex flex-col gap-2 mt-8">
        <h3 className="text-3xl font-bold">Reading list</h3>
        {unreadBlogs.length !== 0 && (
          <>
            <h4> Unread ({ unreadBlogs.length }) </h4>
            <ul className="flex flex-col gap-2 m-2">
              {unreadBlogs.map((x, i) => (
                <li
                  key={i}
                  className="rounded-md border p-2 px-4 flex flex-row items-center justify-between bg-yellow-100"
                >
                  <Link
                    href={`/blogs/${x.blog.id}`}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 visited:text-purple-600"
                  >
                    {x.blog.title}
                  </Link>
                  <form action={markAsRead}>
                    <input type="hidden" name="blogId" value={x.blog.id} />
                    <button
                      type="submit"
                      className="w-32 rounded-md bg-green-500 p-1 text-white"
                    >
                      mark as read
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </>
        )}
        {readBlogs.length !== 0 && (
          <>
            <h4> Read ({ readBlogs.length }) </h4>
            <ul className="flex flex-col gap-2 m-2">
              {readBlogs.map((x, i) => (
                <li key={i} className="rounded-md border p-2 px-4 flex flex-row bg-green-100">
                  <Link href={`/blogs/${x.blog.id}`} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 visited:text-purple-600">
                    {x.blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-8">
        <h3 className="text-3xl font-bold">Api token</h3>
        <p>
          {user.token
            ? `current token: ${user.token}`
            : "api token missing"
          }
        </p>
        <form action={generateNewApiToken}>
          <input type="hidden" name="userId" value={user.id} />
          <button
            type="submit"
            className="w-40 rounded-md bg-green-500 p-2 text-white"
          >
            generate new token
          </button>
        </form>
      </div>
    </div>
  )
}

export default Me
