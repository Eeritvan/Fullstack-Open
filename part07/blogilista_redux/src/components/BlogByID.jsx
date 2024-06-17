import { useDispatch, useSelector } from 'react-redux'
import { AddLikeBlog, createComment } from '../reducers/blogsReducer'
import { useField } from '../hooks/index'
import { Input, Button, Title2 } from '@fluentui/react-components'
import { useStyles } from '../styles/index'
import { setNotification } from '../reducers/notificationReducer'

const BlogByID = ({ id }) => {
  const { reset: clearComment, ...comment } = useField('text')
  const style = useStyles()

  const blog = useSelector((state) => state.blogs.find((x) => x.id === id))

  const dispatch = useDispatch()

  const sendComment = (event) => {
    event.preventDefault()
    if (comment.value) {
      dispatch(setNotification(`Commented blog '${blog.title}'`, 'success'))
      dispatch(createComment(blog, comment.value))
      clearComment()
    }
  }

  const addLike = async () => {
    dispatch(setNotification(`Liked post '${blog.title}'`, 'success'))
    dispatch(AddLikeBlog(blog))
  }

  return (
    <div>
      {blog && (
        <>
          <div>
            <Title2>
              {blog.title} by {blog.author}
            </Title2>{' '}
          </div>
          Url: <a href={blog.url}>{blog.url}</a>
          <div>
            likes: {blog.likes}
            <Button size="small" shape="circular" onClick={() => addLike()}>
              add like
            </Button>
          </div>
          <div> added by: {blog.user.name} </div>
          <br />
          <div className={style.border}>
            <h3> comments </h3>
            <form>
              <Input {...comment}></Input>
              <Button onClick={sendComment}>add comment</Button>
            </form>
            {blog.comments.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default BlogByID
