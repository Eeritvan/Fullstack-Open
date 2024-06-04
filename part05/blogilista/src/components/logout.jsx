import blogService from '../services/blogs'
import { handleNotification } from './notification'

const handleLogout = ( setUser, setNotification ) => {
    handleNotification('Logged out', 'success', setNotification)
    blogService.resetToken()
    setUser(null)
    window.localStorage.clear()
}

export default handleLogout