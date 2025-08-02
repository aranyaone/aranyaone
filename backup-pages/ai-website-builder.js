import Head from "next/head";

import Layout from "../components/layout/Layout";

export default function AIWebsiteBuilder() {
  return (
    <Layout>
      <Head>
        <title>🌐 AI Website Builder - Stanford/MIT Intelligence | Aranya One</title>
        <meta
          name="description"
          content="World-class AI website builder with automatic generation and optimization"
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 max-w-xl w-full text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🌐 AI Website Builder</h1>
          <p className="text-gray-600 mb-6">
            Stanford/MIT intelligence creates world-class websites automatically.
          </p>
          <div className="mt-8">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              🚀 Launch Site
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
