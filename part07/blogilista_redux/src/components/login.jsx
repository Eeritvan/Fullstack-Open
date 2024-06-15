import { useDispatch } from 'react-redux'
import userService from '../services/users'
import blogService from '../services/blogs'
import { userLogin } from '../reducers/userReducer'
import Notification from './notification'
import { setNotification } from '../reducers/notificationReducer.js'
import { useField } from '../hooks/index'

const loginForm = () => {
    const { reset: clearUsername, ...username } = useField('text')
    const { reset: clearPassword, ...password } = useField('text')

    const dispatch = useDispatch()

    const handleLogin = async event => {
        event.preventDefault()
        try {
            const user = await userService.login({
                username: username.value,
                password: password.value
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
            <h2><b> log in to application </b></h2>
            <Notification />
            <form data-testid='loginform'>
                <div>
                    username <input {...username}></input>
                </div>
                <div>
                    password <input {...password} type='password'></input>
                </div>
                <button onClick={handleLogin}>login</button>
            </form>
        </div>
    )
}

export default loginForm