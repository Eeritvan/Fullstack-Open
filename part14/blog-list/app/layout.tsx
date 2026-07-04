import "./globals.css"
import AuthSessionProvider from "@/app/components/SessionProvider"
import NavBar from "@/app/components/Navbar"
import Notification from "@/app/components/Notifications"
import { NotificationProvider } from "./context/NotificationContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            {children}
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
