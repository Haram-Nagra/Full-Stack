import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles';

const LandingPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-primary">
      <h1 className="text-white text-4xl mb-8">Welcome to the App</h1>
      {/* <div className="flex gap-4">
        <Link to="/login" className="px-6 py-3 bg-blue-500 text-white rounded-md">Login</Link>
        <Link to="/signup" className="px-6 py-3 bg-green-500 text-white rounded-md">Sign Up</Link>
      </div> */}
    </div>
  );
};

export default LandingPage;
