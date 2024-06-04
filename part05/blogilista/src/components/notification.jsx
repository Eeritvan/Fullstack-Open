import '../index.css'

const Notification = ({ info }) => {
    if (info) {
        const message = info[0]
        const color = info[1]
        return (
            <div className={color}>
                {message}
            </div>
        )
    }
}

const handleNotification = (message, color, setNotification) => {
    setNotification([message, color])
    setTimeout(() => { setNotification(null)}, 5000)
}

export { Notification, handleNotification }