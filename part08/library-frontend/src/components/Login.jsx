import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../mutations'
import { useField } from '../hooks/hooks'

const Login = (props) => {
  const { reset: resetUsername, ...username } = useField('')
  const { reset: resetPassword, ...password } = useField('')
  const [ loginUser, result ] = useMutation(LOGIN_USER)

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  const submitLogin = async () => {
    event.preventDefault()
    await loginUser({
      variables: {
        username: username.value,
        password: password.value
      }
    })
    resetUsername()
    resetPassword()
  }

  return (
    <form onSubmit={submitLogin}>
      <div> name <input {...username} /></div>
      <div> password <input {...password} type='password' /></div>
      <button type='submit'> submit</button>
    </form>
  )
}

export default Login