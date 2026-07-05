import { getCurrentUser } from "@/app/services/session"
import { generateNewApiToken } from "@/app/actions/users"

const Me = async () => {
  const user = await getCurrentUser()

  if (!user) return

  return (
    <div className="mx-auto w-3xl m-6">
      <div>
        <h2 className="text-3xl font-bold">{user.name}</h2>
        <p>Username: {user.username}</p>
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
