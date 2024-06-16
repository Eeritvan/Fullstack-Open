import blogService from '../services/blogs'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useVisibility } from '../hooks/index'

const Blog = ({ blog }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const { hideWhenVisible, showWhenVisible, toggleVisibility } = useVisibility('boolean')

    const removeBlog = async () => {
        const confirm = window.confirm(`Remove blog ${blog.name} by ${blog.author}`)
        if (confirm) {
            try {
                await blogService.removeBlog(blog)
                dispatch(deleteBlog(blog))
                dispatch(setNotification(`removed ${blog.title} by ${blog.author} `, 'error'))
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

    const addLike = async (blog) => {
        await blogService.likeBlog(blog)
        dispatch(likeBlog(blog))
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