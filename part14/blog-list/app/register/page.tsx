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
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              defaultValue={state.values.username}
              required
            />
          </label>
        </div>
        {state.errors.username && <p style={{ color: "red" }}>{state.errors.username}</p>}
        {state.errors.usernameExists && <p style={{ color: "red" }}>{state.errors.usernameExists}</p>}
        <div>
          <label>
            name
            <input
              type="text"
              name="name"
              defaultValue={state.values.name}
              required
            />
          </label>
        </div>
        {state.errors.name && <p style={{ color: "red" }}>{state.errors.name}</p>}
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>
        <div>
          <label>
            Password Confirmation
            <input type="password" name="passwordConfirm" required />
          </label>
        </div>
        {state.errors.passwordDidNotMatch && <p style={{ color: "red" }}>{state.errors.passwordDidNotMatch}</p>}
        <button type="submit">register</button>
      </form>
    </div>
  )
}

export default RegisterPage
