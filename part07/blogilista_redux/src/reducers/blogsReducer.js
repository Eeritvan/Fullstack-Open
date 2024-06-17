import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      return state.concat(action.payload)
    },
    likeBlog(state, action) {
      const blogID = action.payload.id
      const newState = state.map((b) =>
        b.id === blogID ? { ...b, likes: b.likes + 1 } : b
      )
      return newState.sort((b, a) => a.likes - b.likes)
    },
    deleteBlog(state, action) {
      const blog = action.payload
      return state.filter((blogs) => (blogs.id === blog.id ? false : blog))
    },
    setBlogs(state, action) {
      return action.payload
    },
    addComment(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
  },
})

export const { createBlog, likeBlog, deleteBlog, setBlogs, addComment } =
  blogSlice.actions

export const AddLikeBlog = (blog) => async (dispatch) => {
  await blogService.likeBlog(blog)
  dispatch(likeBlog(blog))
}

export const createComment = (blog, comment) => async (dispatch) => {
  const updatedBlog = await blogService.commentBlog(blog, comment)
  dispatch(addComment(updatedBlog.data))
}

export default blogSlice.reducer
