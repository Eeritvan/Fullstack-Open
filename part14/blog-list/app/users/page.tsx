import { getUsers } from "@/app/services/users"
import Link from "next/link"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="mx-auto w-3xl m-6">
      <h2 className="text-3xl font-bold my-4">Users</h2>
      <ul className="flex flex-col gap-2">
        {users.map(user => (
          <li key={user.id} className="rounded-md border p-2 px-4">
            <Link href={`/users/${user.username}`} className="flex items-center gap-1">
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
