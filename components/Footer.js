import { memo } from 'react';

const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Analytics', href: '/analytics' },
        { name: 'Services', href: '/services' },
        { name: 'Status', href: '/status' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Support', href: '/support' },
        { name: 'Settings', href: '/settings' },
        { name: 'Profile', href: '/profile' }
      ]
    },
    {
      title: 'Advanced',
      links: [
        { name: 'Plugin Deploy', href: '/plugin-deploy' },
        { name: 'Brain Room', href: '/brain-room' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4">🌟 Aranya One</h3>
            <p className="text-gray-400 mb-4">
              Your complete digital empire management platform, optimized for performance and built for scale.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                📧
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                🐦
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                📱
              </a>
            </div>
          </div>

          {/* Link Sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="col-span-1">
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Aranya One. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;