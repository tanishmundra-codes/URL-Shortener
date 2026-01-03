import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn }) => { 
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsLoggedIn(false);
    navigate("/login"); 
  };

  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-300 sticky top-0 z-50">
      <header className="flex justify-between items-center px-6 md:px-8 h-16">
        
        <Link to="/" className="text-2xl font-bold text-blue-500 tracking-tight">
          NanoUrl
        </Link>
        <nav className="hidden md:flex space-x-10 h-full">
          <Link to="/" className="relative h-full flex items-center cursor-pointer group">
            <span className={`text-sm font-medium transition-colors duration-200 
              ${isActive('/') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              Home
            </span>
            {isActive('/') && (
              <div className="absolute left-0 right-0 bottom-0 h-0.75 bg-blue-500 rounded-t-md"></div>
            )}
          </Link>

          <Link to="/analytics" className="relative h-full flex items-center cursor-pointer group">
            <span className={`text-sm font-medium transition-colors duration-200 
              ${isActive('/analytics') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              Analytics
            </span>
            {isActive('/analytics') && (
              <div className="absolute left-0 right-0 bottom-0 h-0.75 bg-blue-500 rounded-t-md"></div>
            )}
          </Link>
          
          {!isLoggedIn ? (
             <Link to="/login" className="relative h-full flex items-center cursor-pointer group">
             <span className={`text-sm font-medium transition-colors duration-200 
               ${isActive('/login') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
               Login / Signup
             </span>
             {isActive('/login') && (
               <div className="absolute left-0 right-0 bottom-0 h-0.75 bg-blue-500 rounded-t-md"></div>
             )}
           </Link>
          ) : (
            <button 
              onClick={handleLogout}
              className="relative h-full flex items-center cursor-pointer group text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </nav>

        <button 
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 pb-4 shadow-lg">
          <div className="flex flex-col space-y-1 px-4 pt-2">
            
            <Link to="/" className={`block py-2 px-3 rounded-md text-base font-medium 
              ${isActive('/') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>
              Home
            </Link>

            <Link to="/analytics" className={`block py-2 px-3 rounded-md text-base font-medium 
              ${isActive('/analytics') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>
              Analytics
            </Link>

            {!isLoggedIn ? (
              <Link to="/login" className={`block py-2 px-3 rounded-md text-base font-medium 
                ${isActive('/login') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                Login / Signup
              </Link>
            ) : (
              <button 
                onClick={handleLogout}
                className="w-full text-left block py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;