export default function Status() {
  return (
    <div>
      <h1>Status Check - New Version!</h1>
      <p>Timestamp: {new Date().toISOString()}</p>
      <p>This proves the Pages Router version is working!</p>
      <a href="/">← Back to Home</a>
    </div>
  )
}
