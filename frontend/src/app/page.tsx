export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Smart Price Tracker
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Track prices and find the best deals with AI-powered forecasting
        </p>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Ready to start tracking prices?
          </h2>
          <p className="text-gray-600">
            Your Next.js frontend is set up and ready! The backend API is running on port 8000.
          </p>
        </div>
      </div>
    </main>
  )
}
