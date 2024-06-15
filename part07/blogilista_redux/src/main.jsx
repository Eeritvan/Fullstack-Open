import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import userReducer from './reducers/userReducer'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
        user: userReducer,
        blogs: blogsReducer,
        notification: notificationReducer
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)