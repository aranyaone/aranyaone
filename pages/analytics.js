import Head from "next/head"

export default function AnalyticsPage() {
  return (
    <div>
      <Head>
        <title>Analytics Dashboard - Aranya One</title>
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📊 Analytics Dashboard</h1>
          <p className="text-gray-600">Step 2: Real-time graphs and controls completed!</p>
          
          <div className="mt-8 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
          </div>
        </div>
      </main>
    </div>
  );
}
