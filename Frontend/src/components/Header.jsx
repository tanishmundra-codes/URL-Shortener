import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-300 sticky top-0 z-50">
      <header className="flex justify-end items-center px-8 h-16">
        <nav className="flex space-x-10 h-full">
 
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
          
          {/* <div className="relative h-full flex items-center cursor-pointer group">
            <span className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200">
              Login/Signup
            </span>
          </div>  */}

        </nav>
      </header>
    </div>
  );
};

export default Header;