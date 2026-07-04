"use client"

import { useNotification } from "@/app/context/NotificationContext"

const Notification = () => {
  const { message, type } = useNotification()

  if (!message) return null

  const notificationClasses = type === "success"
    ? "bg-green-600"
    : "bg-red-600"

  return (
    <div
      className={`m-3 rounded-2xl p-4 ${notificationClasses}`}
    >
      {message}
    </div>
  )
}

export default Notification
