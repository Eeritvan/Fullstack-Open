import { useEffect, useState } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'
import {
  Title3,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
} from '@fluentui/react-components'
import { useStyles } from '../styles/index'

const Users = () => {
  const [usersList, setUsersList] = useState([])
  const style = useStyles()

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userService.getUsers()
      users.sort((a, b) => b.blogs.length - a.blogs.length)
      setUsersList(users)
    }
    fetchUsers()
  }, [])

  return (
    <div className={style.border}>
      <Title3>Users</Title3>
      <Table style={{ width: '80%', margin: 'auto' }}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>User</TableHeaderCell>
            <TableHeaderCell>blogs created</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersList.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Users
