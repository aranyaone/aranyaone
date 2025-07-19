export default function LuxuryFooter() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    'Platform': [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Analytics', href: '/analytics' },
      { name: 'Services', href: '/services' },
      { name: 'Status', href: '/status' }
    ],
    'Account': [
      { name: 'Profile', href: '/profile' },
      { name: 'Settings', href: '/settings' },
      { name: 'Support', href: '/support' },
      { name: 'Documentation', href: '/docs' }
    ],
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' }
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: '𝕏' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'GitHub', href: '#', icon: '💻' },
    { name: 'Discord', href: '#', icon: '💬' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-platinum-900 via-platinum-800 to-royal-900 text-white">
      {/* Luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-royal-900/20 via-transparent to-gold-900/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-royal-gradient rounded-xl flex items-center justify-center shadow-royal">
                <span className="text-2xl">👑</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gradient">Aranya One</h3>
                <p className="text-platinum-300 text-sm">Digital Empire Platform</p>
              </div>
            </div>
            
            <p className="text-platinum-300 leading-relaxed max-w-md">
              Build and manage your digital empire with powerful tools, insights, and world-class infrastructure designed for modern entrepreneurs.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-royal-500/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-lg font-semibold text-gold-400">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-platinum-300 hover:text-white transition-colors duration-200 hover:underline decoration-royal-400"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter section */}
        <div className="border-t border-white/10 pt-12 mb-8">
          <div className="max-w-md mx-auto text-center lg:max-w-none lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="lg:flex-1">
              <h4 className="text-xl font-semibold mb-2 text-gold-gradient">
                Stay Updated
              </h4>
              <p className="text-platinum-300 mb-4 lg:mb-0">
                Get the latest updates on new features and platform improvements.
              </p>
            </div>
            
            <div className="lg:ml-8 lg:flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-royal-400 focus:ring-2 focus:ring-royal-400/20 focus:outline-none text-white placeholder-platinum-400 backdrop-blur-sm"
                />
                <button className="btn-royal whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-platinum-400 text-sm">
                © {currentYear} Aranya One. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm text-platinum-400">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>All systems operational</span>
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-platinum-400">
              <span>🌟 Powered by Next.js</span>
              <span>⚡ Deployed on Vercel</span>
              <span>🔐 Enterprise Security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal-500 via-gold-400 to-royal-500"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #9f61ff 0%, transparent 50%), radial-gradient(circle at 75% 75%, #ffca3a 0%, transparent 50%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
    </footer>
  );
}