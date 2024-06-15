import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        userLogin(state, action) {
            return action.payload
        },
        userLogout(state, action) {
            return null
        }
    }
})

export const { userLogin, userLogout } = userSlice.actions
export default userSlice.reducer