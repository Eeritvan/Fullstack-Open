import Togglable from './togglable'
import { useRef } from 'react'
import blogService from '../services/blogs'
import Blog from './blog'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducers/userReducer'
import { createBlog } from '../reducers/blogsReducer'
import Notification from './notification'
import { setNotification } from '../reducers/notificationReducer.js'
import { useField } from '../hooks/index'

const BlogForm = () => {
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)

    const { reset: clearTitle, ...title } = useField('text')
    const { reset: clearAuthor, ...author } = useField('text')
    const { reset: clearUrl, ...url } = useField('text')

    const dispatch = useDispatch()
    const blogFormRef = useRef()

    const handleLogout = () => {
        dispatch(setNotification('Logged out', 'success'))
        dispatch(userLogout())
        blogService.resetToken()
        window.localStorage.clear()
    }

    const handleNewBlog = async (newTitle, newAuthor, newUrl, blogFormRef) => {
        const blog = ({
            'title': newTitle.value,
            'author': newAuthor.value,
            'url': newUrl.value })
        try {
            const response = await blogService.newBlog(blog)
            const responseWithUser = { ...response, user: user }
            dispatch(createBlog(responseWithUser))
            dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 'success'))
        } catch (exception) {
            dispatch(setNotification('Failed to add new blog', 'error'))
        }
        blogFormRef.current.toggleVisibility()
    }

    return (
        <div>
            <div>
                <h2>blogs</h2>
                <Notification />
                <p>
                    {user.name} logged in
                    <button onClick={handleLogout}> logout </button>
                </p>
                <Togglable buttonLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
                    <form onSubmit={e => {
                        e.preventDefault()
                        handleNewBlog(title, author, url, blogFormRef)
                    }}>
                        <h2>create new</h2>
                        <div>title: <input {...title} className="title"></input></div>
                        <div>author: <input {...author} className="author"></input>
                        </div>
                        <div>url: <input {...url} className="url"></input></div>
                        <button type="submit">create</button>
                    </form>
                </Togglable>
            </div>
            {blogs.map(blog => <Blog key={blog.title} blog={blog} />)}
        </div>
    )
}

export default BlogForm