import Head from 'next/head'

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Dashboard - Aranya One</title>
        <meta name="description" content="Dashboard control room" />
      </Head>
      <h1>📊 Aranya Dashboard</h1>
      <p>Welcome to your empire's control room. Monitor everything here.</p>
      <a href="/">← Back to Home</a>
    </div>
  )
}
