"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

interface NavBarItemProps {
  children: React.ReactNode
  href: string
}

const NavBarItem = ({ children, href }: NavBarItemProps) => (
  <Link
    href={href}
    className="hover:underline text-white"
  >
    {children}
  </Link>
)

const NavBar = () => {
  const { data: session } = useSession()

  return (
    <nav className="bg-neutral-600 h-16 items-center flex justify-between px-6">
      <div className="flex gap-4">
        <NavBarItem href="/"> home </NavBarItem>
        <NavBarItem href="/blogs"> blogs </NavBarItem>
        <NavBarItem href="/users"> users </NavBarItem>
        {session &&
          <>
            <NavBarItem href="/blogs/new"> create new </NavBarItem>
            <NavBarItem href="/me"> me </NavBarItem>
          </>
        }
      </div>

      <div className="flex gap-4">
        {session ? (
          <>
            <em className="self-center text-white">
              {session.user?.name} logged in
            </em>
            <button
              onClick={() => signOut()}
              className="rounded-md bg-red-500 p-2 text-white"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <NavBarItem href="/login">login</NavBarItem>
            <NavBarItem href="/register">register</NavBarItem>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
