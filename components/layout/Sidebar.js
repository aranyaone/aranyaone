import { memo, useState } from 'react';
import Link from 'next/link';

const Sidebar = memo(function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { href: '/', icon: '🏠', label: 'Home' },
    { href: '/dashboard', icon: '🎯', label: 'Dashboard' },
    { href: '/analytics', icon: '📊', label: 'Analytics' },
    { href: '/services', icon: '⚙️', label: 'Services' },
    { href: '/settings', icon: '🔧', label: 'Settings' },
    { href: '/profile', icon: '👤', label: 'Profile' },
    { href: '/support', icon: '💬', label: 'Support' },
    { href: '/docs', icon: '📚', label: 'Documentation' },
    { href: '/status', icon: '✅', label: 'Status' }
  ];
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">🌟 Aranya One</h1>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="mt-4 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
});

export default Sidebar;