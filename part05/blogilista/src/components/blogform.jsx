import Togglable from './togglable'
import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import { Notification, handleNotification } from './notification'
import PropTypes from 'prop-types'
import Blog from './blog'

const BlogForm = ({ logOut, blogs, setBlogs, user, notification, setNotification, handleNewBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleNewTitle = event => setNewTitle(event.target.value)
    const handleNewAuthor = event => setNewAuthor(event.target.value)
    const handleNewUrl = event => setNewUrl(event.target.value)

    const blogFormRef = useRef()

    const addLike = async (blog) => {
        await blogService.likeBlog(blog)
        setBlogs(blogs.map(b => b.id === blog.id ? { ...b, likes: b.likes + 1 } : b))
    }

    return (
        <div>
            <div>
                <h2>blogs</h2>
                <Notification info={notification}/>
                <p>
                    {user.name} logged in
                    <button onClick={logOut}> logout </button>
                </p>
                <Togglable buttonLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        handleNewBlog(blogs, newTitle, newAuthor, newUrl, setBlogs, user, setNotification, blogFormRef)
                    }}>
                        <h2>create new</h2>
                        <div>title: <input value={newTitle} onChange={handleNewTitle} className="title"></input></div>
                        <div>author: <input value={newAuthor} onChange={handleNewAuthor} className="author"></input>
                        </div>
                        <div>url: <input value={newUrl} onChange={handleNewUrl} className="url"></input></div>
                        <button type="submit">create</button>
                    </form>
                </Togglable>
            </div>
            {blogs.map(blog => <Blog key={blog.title}
                blog={blog}
                allBlogs={blogs}
                setBlogs={setBlogs}
                user={user}
                setNotification={setNotification}
                addLike={addLike}/>)}
        </div>
    )
}

BlogForm.propTypes = {
    logOut: PropTypes.func.isRequired,
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    setNotification: PropTypes.func.isRequired
}

export default BlogForm