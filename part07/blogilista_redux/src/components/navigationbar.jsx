import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { userLogout } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { Tab, TabList, Button, Avatar } from '@fluentui/react-components'
import { useStyles } from '../styles/index'

const NavigationBar = () => {
  const user = useSelector((state) => state.user)
  const style = useStyles()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(setNotification('Logged out', 'success'))
    dispatch(userLogout())
    blogService.resetToken()
    window.localStorage.clear()
  }

  let defaultTab = 'blogs'
  if (location.pathname.includes('/users')) {
    defaultTab = 'users'
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TabList defaultSelectedValue={defaultTab}>
          <Tab value="blogs">
            <Link className={style.link} to="/">
              <b>Blogs</b>
            </Link>
          </Tab>
          <Tab value="users">
            <Link className={style.link} to="/users">
              <b>Users</b>
            </Link>
          </Tab>
        </TabList>
        <div className={style.navbarUser}>
          {user ? (
            <>
              <Button size="small" shape="circular" onClick={handleLogout}>
                logout
              </Button>
              {user.name}
            </>
          ) : (
            'Not logged in'
          )}
          <Avatar />
        </div>
      </div>
    </div>
  )
}

export default NavigationBar
