import { useEffect } from 'react'
import blogService from './services/blogs'
import BlogForm from './components/blogform'
import LoginForm from './components/login'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from './reducers/userReducer'
import { setBlogs } from './reducers/blogsReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import Users from './components/users'
import UserByID from './components/userByID'
import NavigationBar from './components/navigationbar'
import BlogByID from './components/BlogByID'
import { useStyles } from './styles/index'
import { Title1 } from '@fluentui/react-components'
import Notification from './components/notification'

const App = () => {
  const style = useStyles()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => blogs.sort((b, a) => a.likes - b.likes))
      .then((blogs) => {
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

  const usersMatch = useMatch('/users/:id')
  const userID = usersMatch ? usersMatch.params.id : null

  const blogsMatch = useMatch('/blogs/:id')
  const blogID = blogsMatch ? blogsMatch.params.id : null

  return (
    <div className={style.root}>
      <NavigationBar />
      <Notification />
      <Title1 className={style.center}>Blog app</Title1>
      <Routes>
        {!user && <Route path="/" element={<LoginForm />} />}
        {user && <Route path="/" element={<BlogForm />} />}
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserByID id={userID} />} />
        <Route path="/blogs/:id" element={<BlogByID id={blogID} />} />
      </Routes>
    </div>
  )
}

export default App
