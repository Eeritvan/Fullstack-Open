import { emptyBlogsTable } from "@/app/services/blogs"
import { emptyReadingListTable } from "@/app/services/readingList"
import { emptyUsersTable } from "@/app/services/users"
import { NextResponse } from "next/server"

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  await emptyReadingListTable()
  await emptyBlogsTable()
  await emptyUsersTable()

  return new NextResponse(null, { status: 204 })
}
