import AuthSessionProvider from "@/app/components/SessionProvider"
import NavBar from "@/app/components/navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          <NavBar />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  )
}
