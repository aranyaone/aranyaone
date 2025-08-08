import { useEffect, useState } from 'react'

export default function Status() {
  const [timestamp, setTimestamp] = useState('')

  useEffect(() => {
    setTimestamp(new Date().toISOString())
  }, [])

  return (
    <div>
      <h1>Status Check - New Version!</h1>
      <p>Timestamp: {timestamp}</p>
      <p>This proves the Pages Router version is working!</p>
      <a href="/">← Back to Home</a>
    </div>
  )
}
