import '../index.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const info = useSelector((state) => state.notification)
  if (info) {
    const message = info[0]
    const color = info[1]
    return <div className={color}>{message}</div>
  }
}

export default Notification
