"use client"

import { registerUser, RegisterUserState } from "@/app/actions/users";
import { useActionState } from "react";

const initialState: RegisterUserState = {
  values: {
    username: "",
    name: "",
  },
  errors: {}
}

const RegisterPage = () => {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div className="mx-auto w-3xl m-6">
      <h2 className="text-3xl font-bold my-4">Register</h2>
      <form action={formAction}>
        <label className="flex flex-col">
          Username
          <input
            type="text"
            name="username"
            defaultValue={state.values.username}
            required
            className="rounded-md border p-2"
          />
        </label>
        {state.errors.username && <p className="text-red-600">{state.errors.username}</p>}
        {state.errors.usernameExists && <p className="text-red-600">{state.errors.usernameExists}</p>}
        <label className="flex flex-col">
          name
          <input
            type="text"
            name="name"
            defaultValue={state.values.name}
            required
            className="rounded-md border p-2"
          />
        </label>
        {state.errors.name && <p className="text-red-600">{state.errors.name}</p>}
        <label className="flex flex-col">
          Password
          <input
            type="password"
            name="password"
            required
            className="rounded-md border p-2"
          />
        </label>
        <label className="flex flex-col">
          Password Confirmation
          <input
            type="password"
            name="passwordConfirm"
            required
            className="rounded-md border p-2"
          />
        </label>
        {state.errors.passwordDidNotMatch && <p className="text-red-600">{state.errors.passwordDidNotMatch}</p>}
        <button type="submit" className="w-20 rounded-md bg-green-500 mt-2 p-2">
          register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
