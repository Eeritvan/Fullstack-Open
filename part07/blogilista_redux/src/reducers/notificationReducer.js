import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        applyNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return null
        }
    }
})

export const { applyNotification, clearNotification } = notificationSlice.actions

let timeoutId
export const setNotification = (message, color) => {
    return dispatch => {
        if (timeoutId) { clearTimeout(timeoutId) }

        dispatch(applyNotification([message, color]))

        timeoutId = setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }
}

export default notificationSlice.reducer