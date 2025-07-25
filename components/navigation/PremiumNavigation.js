import { memo, useState, useEffect } from 'react';
import { PREMIUM_CONFIG } from '../../config/premium';

const PremiumNavigation = memo(function PremiumNavigation() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [userProfile, setUserProfile] = useState({
    name: 'Premium User',
    avatar: '👤',
    status: 'online',
    plan: 'Enterprise'
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', badge: null },
    { id: 'analytics', label: 'Analytics', icon: '📈', badge: 'AI' },
    { id: 'insights', label: 'Insights', icon: '🧠', badge: 'NEW' },
    { id: 'automation', label: 'Automation', icon: '⚡', badge: null },
    { id: 'security', label: 'Security', icon: '🔒', badge: notifications > 0 ? notifications : null },
    { id: 'integrations', label: 'Integrations', icon: '🔗', badge: null },
    { id: 'reports', label: 'Reports', icon: '📋', badge: null },
    { id: 'settings', label: 'Settings', icon: '⚙️', badge: null }
  ];

  const quickActions = [
    { label: 'Export Data', icon: '📤', action: () => console.log('Export') },
    { label: 'AI Assistant', icon: '🤖', action: () => console.log('AI') },
    { label: 'Quick Report', icon: '📊', action: () => console.log('Report') }
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo & Brand */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A1</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">Aranya One</h1>
                <div className="text-white/60 text-xs">Premium Edition</div>
              </div>
            </div>

            {/* Center Navigation */}
            <div className="hidden lg:flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full p-1">
              {navigationItems.slice(0, 5).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-white text-slate-900 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </span>
                  {item.badge && (
                    <div className={`absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full ${
                      typeof item.badge === 'number' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-green-500 text-white'
                    }`}>
                      {item.badge}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              
              {/* Quick Actions */}
              <div className="hidden md:flex items-center space-x-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    title={action.label}
                  >
                    <span className="text-lg">{action.icon}</span>
                  </button>
                ))}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                  <span className="text-xl">🔔</span>
                  {notifications > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications}
                    </div>
                  )}
                </button>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-3 pl-4 border-l border-white/20">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">{userProfile.avatar}</span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                    userProfile.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                  }`}></div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-white font-medium text-sm">{userProfile.name}</div>
                  <div className="text-white/60 text-xs">{userProfile.plan} Plan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Navigation (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center justify-around py-2">
          {navigationItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`relative p-3 rounded-xl transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.badge && (
                <div className={`absolute -top-1 -right-1 px-1 py-0.5 text-xs rounded-full ${
                  typeof item.badge === 'number' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-green-500 text-white'
                }`}>
                  {item.badge}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Premium Features Indicator */}
      <div className="fixed top-20 right-6 z-40">
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3">
          <div className="text-white/90 text-xs font-medium">
            Token: {PREMIUM_CONFIG.TOKEN_ID.slice(-8)}
          </div>
          <div className="text-green-400 text-xs">✓ Premium Active</div>
        </div>
      </div>
    </>
  );
});

export default PremiumNavigation;
