import blogService from '../services/blogs'
import { AddLikeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useVisibility } from '../hooks/index'
import { Link } from 'react-router-dom'
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from '@fluentui/react-components'
import { useStyles } from '../styles/index'

const Alert = ({ message, remove }) => {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button shape="circular" size="small">
          Remove blog
        </Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Deletion</DialogTitle>
          <DialogContent>{message}</DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button onClick={() => remove()} appearance="primary">
                Delete
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

const Blog = ({ blog }) => {
  const style = useStyles()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const { hideWhenVisible, showWhenVisible, toggleVisibility } =
    useVisibility('boolean')

  const removeBlog = async () => {
    try {
      await blogService.removeBlog(blog)
      dispatch(deleteBlog(blog))
      dispatch(
        setNotification(`removed ${blog.title} by ${blog.author} `, 'error')
      )
    } catch (exception) {
      console.error(exception)
    }
  }

  const getUserBlogs = () => {
    const blogOwner = blog.user.username
    const currentUser = user.username
    return blogOwner === currentUser
  }

  const addLike = async (blog) => {
    dispatch(setNotification(`Liked post '${blog.title}'`, 'success'))
    dispatch(AddLikeBlog(blog))
  }

  return (
    <div className={style.border}>
      <div style={hideWhenVisible} className="visible">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          <Button size="small" shape="circular" onClick={toggleVisibility}>
            hide
          </Button>
        </div>
        <div> Written by: {blog.author} </div>
        Link to blog: <a href={blog.url}>{blog.url}</a>
        <div>
          likes: {blog.likes}
          <Button size="small" shape="circular" onClick={() => addLike(blog)}>
            add like
          </Button>
        </div>
        <div> Added by: {blog.user.name} </div>
        {getUserBlogs() && (
          <Alert
            message={`Are you sure you want to delete "${blog.title}" by ${blog.author}`}
            remove={() => removeBlog()}
          />
        )}
      </div>
      <div style={showWhenVisible} className="collapsed">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          <Button size="small" shape="circular" onClick={toggleVisibility}>
            view
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Blog
