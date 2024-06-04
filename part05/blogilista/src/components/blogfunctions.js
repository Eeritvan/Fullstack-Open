import blogService from '../services/blogs'
import { handleNotification } from './notification'

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
            handleNotification(`removed ${blog.title} by ${blog.author} `, 'error', setNotification)
        } catch (exception) {
            console.error(exception)
        }
    }
}

const getUserBlogs = ({ blog, user }) => {
    const blogOwner = blog.user.username
    const currentUser = user.username
    return blogOwner === currentUser
}

export default { addLike, removeBlog, getUserBlogs }