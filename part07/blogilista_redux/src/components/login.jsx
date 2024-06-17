import { useDispatch } from 'react-redux'
import userService from '../services/users'
import blogService from '../services/blogs'
import { userLogin } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks/index'
import { Input, Label, Button, Title3 } from '@fluentui/react-components'
import { PersonRegular, PasswordRegular } from '@fluentui/react-icons'

const loginForm = () => {
  const { reset: clearUsername, ...username } = useField('text')
  const { reset: clearPassword, ...password } = useField('text')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await userService.login({
        username: username.value,
        password: password.value,
      })
      dispatch(userLogin(user))
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setNotification('Login successful', 'success'))
      clearUsername()
      clearPassword()
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 'error'))
    }
  }
  return (
    <div>
      <Title3> log in to application </Title3>
      <form data-testid="loginform">
        <Label size="small"> username </Label>
        <div>
          {' '}
          <Input contentBefore={<PersonRegular />} {...username} />{' '}
        </div>

        <Label size="small"> password </Label>
        <div>
          {' '}
          <Input
            contentBefore={<PasswordRegular />}
            {...password}
            type="password"
          />{' '}
        </div>

        <Button type="submit" onClick={handleLogin}>
          login
        </Button>
      </form>
    </div>
  )
}

export default loginForm
