import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogForm from './components/blogform'
import LoginForm from './components/login'
import handleLogout from './components/logout'

const App = () => {
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        blogService.getAll()
            .then(blogs => blogs.sort((b, a) => a.likes - b.likes))
            .then(blogs => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    return (
        <div>
            {!user && <LoginForm setUser={setUser}
                notification={notification}
                setNotification={setNotification}
            />}

            {user && <BlogForm logOut={() => handleLogout(setUser, setNotification)}
                blogs={blogs}
                setBlogs={setBlogs}
                user={user}
                notification={notification}
                setNotification={setNotification}
            />}
        </div>
    )
}

export default App
