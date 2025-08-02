export default function AdminPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-100 via-violet-50 to-pink-50 p-6">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-primary max-w-2xl w-full flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-primary mb-4 drop-shadow-lg">
          🛡️ Admin Dashboard
        </h1>
        <div className="flex gap-8 mb-8">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">1,245</span>
            <span className="text-subtle text-sm">Active Users</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">99.99%</span>
            <span className="text-subtle text-sm">Uptime</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">8,500</span>
            <span className="text-subtle text-sm">Messages</span>
          </div>
        </div>
        <div className="flex gap-6 text-base">
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg hover:scale-105 transition">
            Manage Users
          </button>
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-accent to-primary text-white font-bold shadow-lg hover:scale-105 transition">
            View Analytics
          </button>
        </div>
        <p className="mt-8 text-subtle text-center">
          (This is a premium placeholder — add your real admin features here!)
        </p>
      </div>
    </main>
  );
} 