import { useEffect } from 'react'
import blogService from './services/blogs'
import BlogForm from './components/blogform'
import LoginForm from './components/login'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from './reducers/userReducer'
import { setBlogs } from './reducers/blogsReducer'

const App = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        blogService.getAll()
            .then(blogs => blogs.sort((b, a) => a.likes - b.likes))
            .then(blogs => {
                dispatch(setBlogs(blogs))
            })
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(userLogin(user))
            blogService.setToken(user.token)
        }
    }, [dispatch])

    return (
        <div>
            {!user && <LoginForm/>}
            {user && <BlogForm/>}
        </div>
    )
}

export default App
