"use client";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Aranya One - Dashboard</title>
        <meta name="description" content="A powerful dashboard application" />
      </head>
      <body>{children}</body>
    </html>
  )
}
