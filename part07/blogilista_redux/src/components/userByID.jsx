import { useSelector } from 'react-redux'
import userService from '../services/users'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Title1, Subtitle1 } from '@fluentui/react-components'
import { useStyles } from '../styles/index'

const UserByID = ({ id }) => {
  const [user, setUser] = useState([])
  const blogs = useSelector((state) => state.blogs)
  const style = useStyles()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userService.getUser(id)
      setUser(user[0])
    }
    fetchUser()
  }, [])

  const usersBlogs = blogs.filter((u) => u.user.id === id)

  return (
    <div>
      {user && (
        <>
          <div>
            <Title1>{user.name}</Title1>
          </div>
          <div className={style.border}>
            <Subtitle1>added blogs</Subtitle1>
            {usersBlogs.map((b) => (
              <li key={b.id}>
                <Link to={`/blogs/${b.id}`}> {b.title} </Link>
              </li>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default UserByID
