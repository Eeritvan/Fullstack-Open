import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

import { createNewUser } from "@/app/services/users"

export const POST = async (req: NextRequest) => {
	if (process.env.NODE_ENV === "production") {
		return NextResponse.json(
			{ error: "This endpoint is not available in production" },
			{ status: 403 },
		)
	}

	const body = await req.json()
	const { username, name, password } = body

	if (!username || !name || !password) {
		return NextResponse.json({ error: "missing fields" }, { status: 400 })
	}

	const passwordHash = await bcrypt.hash(password, 10)

	try {
		await createNewUser(username, name, passwordHash)
	} catch {
		return NextResponse.json({ error: "User already exists" }, { status: 409 })
	}

	return new NextResponse(null, { status: 201 })
}
