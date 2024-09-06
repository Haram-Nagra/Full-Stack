import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png"; // Assuming you have the logo import
import useAuthStore from "../store/useAuthStore.jsx";
import styles from "../styles.js";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to landing page on logout
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed bg-transparent`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => window.scrollTo(0, 0)}
        >
          <img src={logo1} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer">
            Haram Iqbal Nagra
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10 items-center">
          {isAuthenticated ? (
            <>
              <li className="text-[#cdcae4] hover:text-white text-[18px] font-medium cursor-pointer">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="text-[#cdcae4] hover:text-white text-[18px] font-medium cursor-pointer">
                <Link to="/page1">Page 1</Link>
              </li>
              <li className="text-[#cdcae4] hover:text-white text-[18px] font-medium cursor-pointer">
                <Link to="/page2">Page 2</Link>
              </li>
              <li className="text-[#cdcae4] hover:text-white text-[18px] font-medium cursor-pointer">
                <Link to="/page3">Page 3</Link>
              </li>
              <li className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-semibold
                      shadow-md shadow-primary rounded-xl">
                <button onClick={handleLogout}>Logout</button>
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
      </div>
    </nav>
  );
};

export default Navbar;
