import { memo, useState, useEffect } from 'react';

const DarkModeToggle = memo(function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(initialDark);
    
    // Apply initial theme
    applyTheme(initialDark);
  }, []);

  const applyTheme = (dark) => {
    const body = document.body;
    
    if (dark) {
      body.classList.add('dark');
      body.style.backgroundColor = '#1a1a1a';
      body.style.color = '#ffffff';
    } else {
      body.classList.remove('dark');
      body.style.backgroundColor = '#f9fafb';
      body.style.color = '#1f2937';
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    
    // Save preference
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    
    // Apply theme
    applyTheme(newMode);
    
    // Smooth transition
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        relative inline-flex items-center justify-center p-2 rounded-lg
        transition-all duration-300 ease-in-out
        ${isDark 
          ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <div className={`
          absolute inset-0 transition-all duration-300 transform
          ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
        `}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        
        {/* Moon Icon */}
        <div className={`
          absolute inset-0 transition-all duration-300 transform
          ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
        `}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </div>
      </div>
      
      <span className="ml-2 text-sm font-medium">
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
});

export default DarkModeToggle;