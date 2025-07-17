import './globals.css'

export const metadata = {
  title: 'Aranya One - Dashboard',
  description: 'A powerful dashboard application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
