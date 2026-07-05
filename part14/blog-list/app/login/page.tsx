"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginPage = () => {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="mx-auto w-3xl m-6">
      <h2 className="text-3xl font-bold my-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col">
          Username
          <input
            type="text"
            name="username"
            required
            className="rounded-md border p-2"
          />
        </label>
        <label className="flex flex-col">
          Password
          <input
            type="password"
            name="password"
            required
            className="rounded-md border p-2"
          />
        </label>
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="w-20 rounded-md bg-green-500 mt-2 p-2">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
