import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Login = ({handleLogin, username, handleName, password, handlePassword}) => {
    return (
        <form>
            <div>
                username <input value={username} onChange={handleName}></input>
            </div>
            <div>
                password <input type="password" value={password} onChange={handlePassword}></input>
            </div>
            <button onClick={handleLogin}>login</button>
        </form>
    )
}

const Blog = ({ blog }) => {
    return (
        <div>
            <div>{blog.title} {blog.author}</div>
        </div>
    )
}

const Notification = ({message, color}) => (
    <div className={color}> {message} </div>
)

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleName = event => setUsername(event.target.value)
    const handlePassword = event => setPassword(event.target.value)
    const handleNewTitle = event => setNewTitle(event.target.value)
    const handleNewAuthor = event => setNewAuthor(event.target.value)
    const handleNewUrl = event => setNewUrl(event.target.value)

    const handleNotification = (message, color) => {
        setNotification([message, color])
        setTimeout(() => { setNotification(null)}, 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            setUser(user)
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            handleNotification('Login successful', 'success')
            setUsername('')
            setPassword('')
        } catch (exception) {
            handleNotification('Wrong credentials', 'error')
        }
    }

    const handleLogout = () => {
        handleNotification('Logged out', 'success')
        blogService.resetToken()
        setUser(null)
        window.localStorage.clear()
    }

    const handleNewBlog = async (event) => {
        await event.preventDefault()
        const blog = ({
            "title": newTitle,
            "author": newAuthor,
            "url": newUrl})
        try {
            const response = await blogService.newBlog(blog)
            setBlogs(blogs.concat(blog))
            setNewTitle('')
            setNewAuthor('')
            setNewUrl('')
            handleNotification(`a new blog ${blog.title} by ${blog.author} added`, 'success')
        } catch (exception) {
            handleNotification('Failed to add new blog', 'error')
        }
    }

    const loginForm = () => {
        return (
            <div>
                <h2><b> log in to application </b></h2>
                {notification && <Notification message={notification[0]} color={notification[1]}/>}
                <Login handleLogin={handleLogin}
                       username={username}
                       handleName={handleName}
                       password={password}
                       handlePassword={handlePassword}/>
            </div>
        )
    }

    const blogForm = ({handleLogout, handleNewBlog, newTitle, newAuthor, setUrl, handleNewTitle, handleNewAuthor, handleNewUrl}) => {
        return (
            <div>
                <div>
                    <h2>blogs</h2>
                    {notification && <Notification message={notification[0]} color={notification[1]}/>}
                    <p>
                        {user.name} logged in
                        <button onClick={handleLogout}> logout </button>
                    </p>
                    <form>
                        <h2>create new</h2>
                        <div>title: <input value={newTitle} onChange={handleNewTitle}></input></div>
                        <div>author: <input value={newAuthor} onChange={handleNewAuthor}></input></div>
                        <div>url: <input value={newUrl} onChange={handleNewUrl}></input></div>
                        <button onClick={handleNewBlog}>create</button>
                    </form>
                </div>
                {blogs.map(blog => <Blog key={blog.title} blog={blog} />)}
            </div>
        )
    }

    return (
        <div>
            {!user && loginForm()}
            {user && blogForm({handleLogout,
                               handleNewBlog,
                               newTitle,
                               newAuthor,
                               newUrl,
                               handleNewTitle,
                               handleNewAuthor,
                               handleNewUrl})}
        </div>
  )
}

export default App
