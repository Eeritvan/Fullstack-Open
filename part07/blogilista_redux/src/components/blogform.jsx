import Togglable from './togglable'
import { useRef } from 'react'
import blogService from '../services/blogs'
import Blog from './blog'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks/index'
import {
  Input,
  Label,
  Button,
  Title2,
  Title3,
} from '@fluentui/react-components'

const BlogForm = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const { reset: clearTitle, ...title } = useField('text')
  const { reset: clearAuthor, ...author } = useField('text')
  const { reset: clearUrl, ...url } = useField('text')

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const handleNewBlog = async (newTitle, newAuthor, newUrl, blogFormRef) => {
    const blog = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
    }
    try {
      const response = await blogService.newBlog(blog)
      const responseWithUser = { ...response, user: user }
      dispatch(createBlog(responseWithUser))
      dispatch(
        setNotification(
          `a new blog ${blog.title} by ${blog.author} added`,
          'success'
        )
      )
      clearTitle()
      clearAuthor()
      clearUrl()
    } catch (exception) {
      dispatch(setNotification('Failed to add new blog', 'error'))
    }
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <div>
        <Title2>blogs</Title2>
        <Togglable buttonLabel="new blog" hideLabel="cancel" ref={blogFormRef}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleNewBlog(title, author, url, blogFormRef)
            }}
          >
            <div>
              {' '}
              <Title3>create new</Title3>{' '}
            </div>
            <Label size="small"> title </Label>
            <div>
              {' '}
              <Input {...title} className="title" />{' '}
            </div>
            <Label size="small"> author </Label>
            <div>
              {' '}
              <Input {...author} className="author" />{' '}
            </div>
            <Label size="small"> url </Label>
            <div>
              {' '}
              <Input {...url} className="url" />{' '}
            </div>
            <Button type="submit">create</Button>
          </form>
        </Togglable>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.title} blog={blog} />
      ))}
    </div>
  )
}

export default BlogForm
