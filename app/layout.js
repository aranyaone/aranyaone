export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="msvalidate.01" content="F2AD1B41FC838077051C56AC2ABB90B8" />
        <title>AranyaOne – AI Empire</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
