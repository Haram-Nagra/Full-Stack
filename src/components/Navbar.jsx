// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore.jsx';
import logo1 from '../assets/logo1.png';  // Assuming you have the logo imported
import { styles } from '../../styles.js';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuthStore();

    return (
        <nav
            className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-transparent`}
        >
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo Section */}
                <Link
                    to='/'
                    className="flex items-center gap-2"
                    onClick={() => window.scrollTo(0, 0)}
                >
                    <img src={logo1} alt="logo" className="w-9 h-9 object-contain" />
                    <p className='text-white text-[18px] font-bold cursor-pointer'>Haram Iqbal Nagra</p>
                </Link>

                {/* Links Section */}
                <ul className='list-none hidden sm:flex flex-row gap-10'>
                    <li className="text-[#cdcae4] hover:text-white text-[18px] font-medium cursor-pointer">
                        <Link to="/dashboard">Dashboard</Link>
                    </li>

                    {isAuthenticated ? (
                        <>
                            <li className="text-[#cdcae4] hover:text-white text-[18px] font-medium cursor-pointer">
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li className="text-[#cdcae4] hover:text-white text-[18px] font-medium cursor-pointer">
                                <button onClick={logout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="text-[#cdcae4] hover:text-white text-[18px] font-medium cursor-pointer">
                                <Link to="/login">Login</Link>
                            </li>
                            <li className="text-[#cdcae4] hover:text-white text-[18px] font-medium cursor-pointer">
                                <Link to="/signup">Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Optional: Add a mobile menu toggle here if needed */}
            </div>
        </nav>
    );
};

export default Navbar;
