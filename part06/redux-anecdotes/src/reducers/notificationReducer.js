import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        applyNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return null
        }
    }
})

export const { applyNotification, clearNotification } = notificationReducer.actions

let timeoutId
export const setNotification = (content, time) => {
    return async dispatch => {
        if (timeoutId) { clearTimeout(timeoutId) }

        dispatch(applyNotification(content))

        timeoutId = setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export default notificationReducer.reducer