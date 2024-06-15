import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        createBlog(state, action) {
            return state.concat(action.payload)
        },
        likeBlog(state, action) {
            const blogID = action.payload.id
            const newState = state.map(b => b.id === blogID ? { ...b, likes: b.likes + 1 } : b)
            return newState.sort((b, a) => a.likes - b.likes)
        },
        deleteBlog(state, action) {
            const blog = action.payload
            return state.filter(blogs => blogs.id === blog.id ? false : blog)
        },
        setBlogs(state, action) {
            return action.payload
        }
    }
})

export const { createBlog, likeBlog, deleteBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer