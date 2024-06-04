import Togglable from './togglable'
import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import userService from '../services/users'
import { Notification, handleNotification } from './notification'

const Blog = ({ blog, allBlogs, setBlogs, user }) => {
    const [visible, setVisible] = useState(true)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const addLike = async () => {
        const response = await blogService.likeBlog(blog)
        setBlogs(allBlogs.map(blog => blog.id === response.data.id ? { ...blog, likes: blog.likes + 1 } : blog))
    }

    const removeBlog = async () => {
        const confirm = window.confirm(`Remove blog ${blog.name} by ${blog.author}`)
        if (confirm) {
            try {
                await blogService.removeBlog(blog)
                setBlogs(allBlogs.filter(blogs => blogs.id === blog.id ? false : blog))
            } catch (exception) {
                console.error(exception)
            }
        }
    }

    const getUserBlogs = () => {
        const blogOwner = blog.user.username
        const currentUser = user.username
        return blogOwner === currentUser
    }

    return (
        <div className='blog-border'>
            <div style={hideWhenVisible}>
                {blog.title} {blog.author}
                <button onClick={toggleVisibility}>hide</button>
                <div> {blog.url} </div>
                <div>
                    likes {blog.likes}
                    <button onClick={addLike}>like</button>
                </div>
                <div> {blog.user.name} </div>
                {getUserBlogs() && <button onClick={removeBlog}>remove</button>}
            </div>
            <div style={showWhenVisible}>
                {blog.title} {blog.author}
                <button onClick={toggleVisibility}>view</button>
            </div>
        </div>
    )
}

const BlogForm = ({ logOut, blogs, setBlogs, user, notification, setNotification }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleNewTitle = event => setNewTitle(event.target.value)
    const handleNewAuthor = event => setNewAuthor(event.target.value)
    const handleNewUrl = event => setNewUrl(event.target.value)

    const blogFormRef = useRef()

    const handleNewBlog = async event => {
        await event.preventDefault()
        const blog = ({
            'title': newTitle,
            'author': newAuthor,
            'url': newUrl })
        try {
            const response = await blogService.newBlog(blog)
            const responseWithUser = { ...response, user: user }
            setBlogs(blogs.concat(responseWithUser))
            setNewTitle('')
            setNewAuthor('')
            setNewUrl('')
            blogFormRef.current.toggleVisibility()
            handleNotification(`a new blog ${blog.title} by ${blog.author} added`, 'success', setNotification)
        } catch (exception) {
            handleNotification('Failed to add new blog', 'error', setNotification)
        }
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
                    <form onSubmit={handleNewBlog}>
                        <h2>create new</h2>
                        <div>title: <input value={newTitle} onChange={handleNewTitle}></input></div>
                        <div>author: <input value={newAuthor} onChange={handleNewAuthor}></input></div>
                        <div>url: <input value={newUrl} onChange={handleNewUrl}></input></div>
                        <button type='submit'>create</button>
                    </form>
                </Togglable>
            </div>
            {blogs.map(blog => <Blog key={blog.title} blog={blog} allBlogs={blogs} setBlogs={setBlogs} user={user} />)}
        </div>
    )
}

export default BlogForm