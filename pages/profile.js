import Head from 'next/head'
import Link from 'next/link'

export default function ProfilePage() {
  return (
    <div>
      <Head>
        <title>Profile - Aranya One</title>
        <meta name="description" content="Manage your empire profile and personal settings" />
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">👤 Empire Profile</h1>
            <p className="text-gray-600">Manage your personal information and empire achievements</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Profile Card */}
            <aside className="lg:col-span-1" role="complementary" aria-label="Profile summary">
              <ProfileCard />
              <AchievementsBadges />
            </aside>
            
            {/* Main Profile Content */}
            <section className="lg:col-span-2 space-y-8" role="main" aria-label="Profile information">
              <PersonalInformation />
              <EmpireStats />
              <ActivityTimeline />
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100 text-center mb-6">
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
          <span className="text-3xl font-bold text-white">AO</span>
        </div>
        <button className="absolute bottom-0 right-1/2 transform translate-x-6 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-600 transition-colors">
          📷
        </button>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Aranya One Empire</h2>
      <p className="text-gray-600 mb-4">Digital Empire Builder</p>
      
      <div className="flex justify-center gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">127</div>
          <div className="text-xs text-gray-500">Days Active</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">15</div>
          <div className="text-xs text-gray-500">Services</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">8.4K</div>
          <div className="text-xs text-gray-500">Revenue</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
          📝 Edit Profile
        </button>
        <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
          📤 Share Profile
        </button>
      </div>
    </div>
  );
}

function AchievementsBadges() {
  const achievements = [
    { icon: "🏆", title: "Empire Founder", description: "Created your first empire" },
    { icon: "💎", title: "Pro User", description: "Upgraded to Pro plan" },
    { icon: "🚀", title: "Launch Master", description: "Launched 5+ services" },
    { icon: "💰", title: "Revenue Generator", description: "Earned first $1000" },
    { icon: "🔥", title: "Streak Master", description: "30 day activity streak" },
    { icon: "⭐", title: "Top Performer", description: "Top 10% this month" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-yellow-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🏅 Achievements</h3>
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement, index) => (
          <button key={index} className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group w-full">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{achievement.icon}</div>
            <div className="text-xs font-semibold text-gray-800">{achievement.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PersonalInformation() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📋 Personal Information</h2>
        <button className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
          ✏️ Edit
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoField label="Full Name" value="Aranya One" />
        <InfoField label="Email" value="hello@aranyaone.com" />
        <InfoField label="Phone" value="+1 (555) 123-4567" />
        <InfoField label="Location" value="Digital Realm" />
        <InfoField label="Time Zone" value="UTC+5:30" />
        <InfoField label="Language" value="English" />
        <InfoField label="Company" value="Aranya One Digital Empire" />
        <InfoField label="Website" value="aranyaone.com" />
      </div>
      
      <div className="mt-6">
        <label htmlFor="bio-text" className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <div 
          id="bio-text"
          className="p-4 bg-gray-50 rounded-lg"
          role="textbox"
          aria-readonly="true"
          aria-describedby="bio-desc"
        >
          <p className="text-gray-800">
            Building the future of digital empires with AI-powered tools and innovative solutions. 
            Passionate about technology, automation, and helping businesses grow their online presence.
          </p>
        </div>
        <span id="bio-desc" className="sr-only">User biography information</span>
      </div>
      
      <div className="mt-6 flex gap-4">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
          💾 Save Changes
        </button>
        <button className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
          🔐 Change Password
        </button>
      </div>
    </div>
  );
}

function EmpireStats() {
  const stats = [
    { icon: "👥", title: "Total Users", value: "1,234", change: "+12%" },
    { icon: "💰", title: "Revenue", value: "$8,432", change: "+23%" },
    { icon: "📈", title: "Growth Rate", value: "15.3%", change: "+5%" },
    { icon: "⭐", title: "Rating", value: "4.9/5", change: "+0.2" },
    { icon: "🌐", title: "Website Visits", value: "45.2K", change: "+18%" },
    { icon: "🔗", title: "API Calls", value: "892K", change: "+31%" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Empire Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 bg-gray-50 rounded-lg text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{stat.title}</h3>
            <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
            <div className="text-sm text-green-600 font-medium">{stat.change}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Link href="/analytics" className="text-blue-600 hover:text-blue-800 font-medium">
          📈 View Detailed Analytics →
        </Link>
      </div>
    </div>
  );
}

function ActivityTimeline() {
  const activities = [
    {
      time: "2 hours ago",
      action: "Launched new AI Chat service",
      icon: "🤖",
      color: "blue"
    },
    {
      time: "1 day ago",
      action: "Updated SEO settings for 3 websites",
      icon: "🔍",
      color: "green"
    },
    {
      time: "3 days ago",
      action: "Reached 1000+ monthly users milestone",
      icon: "🎯",
      color: "purple"
    },
    {
      time: "1 week ago",
      action: "Integrated social media automation",
      icon: "📱",
      color: "orange"
    },
    {
      time: "2 weeks ago",
      action: "Upgraded to Pro plan",
      icon: "💎",
      color: "yellow"
    },
    {
      time: "1 month ago",
      action: "Created Aranya One empire",
      icon: "🏗️",
      color: "gray"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">⏰ Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
          📋 View Full History
        </button>
      </div>
    </div>
  );
}

function InfoField({ label, value }) {
  const fieldId = `info-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div>
      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div 
        id={fieldId}
        className="p-3 bg-gray-50 rounded-lg text-gray-800 font-medium"
        role="textbox"
        aria-readonly="true"
      >
        {value}
      </div>
    </div>
  );
}

function ActivityItem({ time, action, icon, color }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    yellow: "bg-yellow-100 text-yellow-600",
    gray: "bg-gray-100 text-gray-600"
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-800">{action}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  );
}
