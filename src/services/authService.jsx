// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your backend URL

// Function to handle user signup
export const signup = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, { username, password });
      return response.data;  // Should return { token: '...' }
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };
// Function to handle user login
export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // { token: '...' }
};

// Function to verify the JWT token
export const verifyToken = async (token) => {
    const response = await axios.get(`${API_URL}/verify`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // { message: 'Token is valid', userId: ... }
};

// Function to logout (optional)
export const logout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
};

const authService = {
    signup,
    login,
    verifyToken,
    logout,
};

export default authService;
