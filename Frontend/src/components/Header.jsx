import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("uid");
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        localStorage.removeItem("uid");
        setIsLoggedIn(false);
        navigate("/signup"); 
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-300 sticky top-0 z-50">
      <header className="flex justify-between items-center px-8 h-16">
        
        <Link to="/" className="text-2xl font-bold text-blue-500 tracking-tight">
          NanoUrl
        </Link>

        {/* 👇 Navigation stays on the right */}
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
          
          {!isLoggedIn ? (
             <Link to="/signup" className="relative h-full flex items-center cursor-pointer group">
             <span className={`text-sm font-medium transition-colors duration-200 
                ${isActive('/signup') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
               Login/Signup
             </span>
             {isActive('/signup') && (
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
      </header>
    </div>
  );
};

export default Header;