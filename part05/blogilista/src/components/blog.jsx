import { useState } from 'react'
import blogService from '../services/blogs'
import { handleNotification } from './notification'

const Blog = ({ blog, allBlogs, setBlogs, user, setNotification, addLike }) => {
    const [visible, setVisible] = useState(true)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const removeBlog = async () => {
        const confirm = window.confirm(`Remove blog ${blog.name} by ${blog.author}`)
        if (confirm) {
            try {
                await blogService.removeBlog(blog)
                setBlogs(allBlogs.filter(blogs => blogs.id === blog.id ? false : blog))
                handleNotification(`removed ${blog.title} by ${blog.author} `, 'error', setNotification)
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
            <div style={hideWhenVisible} className="visible">
                {blog.title} {blog.author}
                <button onClick={toggleVisibility}>hide</button>
                <div> {blog.url} </div>
                <div>
                    likes {blog.likes}
                    <button onClick={() => addLike(blog)}>like</button>
                </div>
                <div> {blog.user.name} </div>
                {getUserBlogs() && <button onClick={removeBlog}>remove</button>}
            </div>
            <div style={showWhenVisible} className="collapsed">
                {blog.title} {blog.author}
                <button onClick={toggleVisibility}>view</button>
            </div>
        </div>
    )
}

export default Blog