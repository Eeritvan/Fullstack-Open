import { getCurrentUserWithReadingList } from "@/app/services/session"
import { generateNewApiToken } from "@/app/actions/users"
import Link from "next/link"

const Me = async () => {
  const user = await getCurrentUserWithReadingList()

  console.log(user)
  if (!user) return

  return (
    <div className="mx-auto w-3xl m-6">
      <div>
        <h2 className="text-3xl font-bold">{user.name}</h2>
        <p>Username: {user.username}</p>
      </div>
      <div className="flex flex-col gap-2 mt-8">
        <h3 className="text-3xl font-bold">Reading list</h3>
        <ul className="ml-10">
          {user.readingList.map((x, i) => (
            <li key={i} className="list-disc">
              <Link href={`/blogs/${x.id}`} className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
                {x.blog.title}
              </Link>
            </li>
          ))}

        </ul>
        {/*<p>
          {user.token
            ? `current token: ${user.token}`
            : "api token missing"
          }
        </p>*/}
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
