import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import useAuthStore from "../store/useAuthStore";
import  styles from "../styles.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(username, password);
      setToken(token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div
      className={`${
        (styles.paddingX, styles.paddingY)
      } h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#131227] to-[#130103] backdrop-blur-2xl`}
    >
      
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col md:w-[350px] w-[350px] mt-12 gap-8 rounded-2xl bg-black-100 p-12 items-center"
      >
        <h1 className={`${(styles.sectionSubText)}`}>Login</h1>
        <label className="flex flex-col">
          <span className="text-white font-medium mb-4">Username</span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="bg-tertiary py-4 px-6 placeholder:text-secondary
                        text-white rounded-lg outline-none font-medium"
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
            className="bg-tertiary py-4 px-6 placeholder:text-secondary
                        text-white rounded-lg outline-none font-medium"
          />
        </label>
        <button
          type="submit"
          className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold
                      shadow-md shadow-primary rounded-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
