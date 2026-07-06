import { getUserDataByApiToken } from "@/app/services/users";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const auth = req.headers.get("Authorization");
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const apiToken = auth.split(" ")[1]

  const userData = await getUserDataByApiToken(apiToken)
  if (!userData) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id, username, name, blogs } = userData

  const createdBlogs = blogs.map(({title, author, url}) => ({ title, author, url}))

  const result = {
    id,
    username,
    name,
    createdBlogs
  }

  return NextResponse.json(result, { status: 200 })
}
