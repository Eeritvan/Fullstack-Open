"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

const NavBar = () => {
  const { data: session } = useSession()

  return (
    <nav>
      <Link href="/">home</Link>
      {" "}
      <Link href="/blogs">blogs</Link>
      {" "}
      <Link href="/users">users</Link>
      {" "}
      {session ? (
        <>
          <Link href="/blogs/new">create new</Link>
          {" "}
          <em>{session.user?.name} logged in</em>{" "}
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : (
        <Link href="/login">login</Link>
      )}
    </nav>
  )
}

export default NavBar
