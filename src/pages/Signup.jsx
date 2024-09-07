import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';
import useAuthStore from '../store/useAuthStore';
import styles from "../styles.js";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isResident, setIsResident] = useState(false);
  const { login: setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(username, password, isResident ? 'resident' : 'user');
      if (response && response.token) {
        setToken(response.token);
        navigate('/dashboard');
      } else {
        console.error('Signup failed: Invalid response from server.');
      }
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div
      className={`${
        styles.paddingX + ' ' + styles.paddingY
      } h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#131227] to-[#130103] backdrop-blur-2xl`}
    >
      <form
        onSubmit={handleSignup}
        className="flex flex-col md:w-[350px] w-[350px] mt-12 gap-8 rounded-2xl bg-black-100 p-12 items-center"
      >
        <h1 className={styles.sectionSubText}>Sign Up</h1>
        <label className="flex flex-col">
          <span className="text-white font-medium mb-4">Username</span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none font-medium"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-white font-medium mb-4">Password</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none font-medium"
          />
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isResident}
            onChange={(e) => setIsResident(e.target.checked)}
            className="mr-2"
          />
          <span className="text-white font-medium">I am a resident</span>
        </label>

        <button
          type="submit"
          className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
