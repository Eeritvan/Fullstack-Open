import { useState } from 'react'
import userService from '../services/users'
import blogService from '../services/blogs'
import { Notification, handleNotification } from './notification'
import PropTypes from 'prop-types'

const loginForm = ({ setUser, notification, setNotification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleName = event => setUsername(event.target.value)
    const handlePassword = event => setPassword(event.target.value)

    const handleLogin = async event => {
        event.preventDefault()
        try {
            const user = await userService.login({ username, password })
            setUser(user)
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            handleNotification('Login successful', 'success', setNotification)
            setUsername('')
            setPassword('')
        } catch (exception) {
            handleNotification('Wrong credentials', 'error', setNotification)
        }
    }

    return (
        <div>
            <h2><b> log in to application </b></h2>
            <Notification info={notification}/>
            <form>
                <div>
                    username <input value={username} onChange={handleName}></input>
                </div>
                <div>
                    password <input type='password' value={password} onChange={handlePassword}></input>
                </div>
                <button onClick={handleLogin}>login</button>
            </form>
        </div>
    )
}

loginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired
}

export default loginForm