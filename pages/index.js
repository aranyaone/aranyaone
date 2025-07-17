import Head from 'next/head'

// Pages Router version - fixed deployment
export default function Home() {
  return (
    <div>
      <Head>
        <title>Aranya One - Dashboard</title>
        <meta name="description" content="A powerful dashboard application" />
      </Head>
      <h1>🌟 Welcome to Aranya One</h1>
      <p>Your digital empire starts here</p>
      <a href="/dashboard">Enter Dashboard 📊</a>
    </div>
  )
}
