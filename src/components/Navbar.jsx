import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
const Navbar = () => {
      const navigate = useNavigate();
  const dispatch = useDispatch();

    const [isSearchOpen, setIsSearchOpen] = useState(false)
  
      const user = useSelector((state) => state.user?.currentUser);
          const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem('user'); // if you store user data
    navigate('/login');
  };
    return (
        <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center h-16">
                    {/* Left: Logo */}
                    <div className="w-1/4">
                        <Link to="/" className="text-white text-2xl font-bold">
                            MovieTicket
                        </Link>
                    </div>

                    {/* Center: Navigation links (only these are centered) */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="flex items-center space-x-12">
                            <Link to="/" className="text-white hover:text-gray-300 transition-colors">
                                Home
                            </Link>
                            <Link to="/movies" className="text-white hover:text-gray-300 transition-colors">
                                Movies
                            </Link>
                            <Link to="/my-booking" className="text-white hover:text-gray-300 transition-colors">
                                My Bookings
                            </Link>
                        </div>
                    </div>

                    {/* Right: Search and Login/User */}
                    <div className="w-1/4 flex justify-end items-center space-x-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="text-white hover:text-gray-300 transition-colors p-2"
                                aria-label="Open search"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            {isSearchOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                                    <input
                                        type="text"
                                        placeholder="Search movies..."
                                        className="w-full px-4 py-2 text-gray-800 focus:outline-none"
                                    />
                                </div>
                            )}
                        </div>

                      {/* login button */}

                        <Link
                            to="/login"
                            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile: search/login/menu (shown on small screens) */}
                    <div className="md:hidden absolute right-4 flex items-center space-x-3">
                        <Link to="/my-booking" className="text-white px-3 py-1 rounded hover:bg-white/5">My Bookings</Link>
                        <button className="text-white p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        {/* login button */}
                          {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-gray-700 hover:bg-gray-800 rounded-full transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-full transition-colors"
              >
                Login
              </Link>
            )}
                        <button className="text-white p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
