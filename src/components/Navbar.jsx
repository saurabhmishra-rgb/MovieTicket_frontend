import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import axios from 'axios';
import { options, SearchMovie_Url } from '../utils/constant';
import { setSearchMovieDetails } from '../../redux/searchSlice';
const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchMovie, setSearchMovie] = useState(" ");

    const user = useSelector((state) => state.user?.currentUser);
    const handleLogout = () => {
        dispatch(setUser(null));
        localStorage.removeItem('user'); // if you store user data
        navigate('/login');
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`${SearchMovie_Url}${searchMovie}`, options);
            console.log(res.data.results);
            const movies = res.data.results;
            dispatch(setSearchMovieDetails({ searchMovie, movies }))
        } catch (error) {
            console.log(error);
        }
        setSearchMovie();
    }
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

                    {/* Right: Search  */}
                    <div className="w-1/4 flex justify-end items-center space-x-4">

                        <div>
                            <form onSubmit={submitHandler} className="flex items-center space-x-2">

                                {/* Search Input */}
                                <div className="relative">
                                    <input
                                        value={searchMovie}
                                        onChange={(e) => setSearchMovie(e.target.value)}
                                        placeholder="Search movies..."
                                        className="w-48 md:w-64 px-4 py-2 pl-10 rounded-full bg-white/10 text-white placeholder-gray-300 
                   border border-white/20 focus:border-red-500 focus:ring-2 focus:ring-red-600 
                   outline-none transition-all duration-300"
                                    />

                                    {/* Search Icon in Input */}
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                                        
                                    </span>
                                </div>

                                {/* Search Button */}
                                <button
                                    type="submit"
                                    onClick={() => navigate("/search")}
                                    className="px-5 py-2 bg-red-700 hover:bg-red-600 text-white rounded-full 
                 font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Search
                                </button>

                            </form>
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
