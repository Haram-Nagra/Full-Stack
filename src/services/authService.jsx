import axios from 'axios';
import useAuthStore from '../store/useAuthStore'; // Import your Zustand store

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your backend URL

// Function to handle user signup
export const signup = async (username, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { username, password, role });
    const { token, role } = response.data;  // Should return { token: '...', role: '...' }
    
    // Update the auth store with token and role
    useAuthStore.getState().login(token, role);
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Signup failed');
  }
};

// Function to handle user login
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { token, role } = response.data;

    useAuthStore.getState().login(token, role);

    return response.data;
  } catch (error) {
    console.error('Error in login function:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Unknown error');
  }
};

// Function to verify the JWT token (optional, remove if not used)
export const verifyToken = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // { message: 'Token is valid', userId: ..., role: ... }
  } catch (error) {
    throw error.response ? error.response.data : new Error('Token verification failed');
  }
};

// Function to handle logout
export const logout = () => {
  // Remove the token and role from local storage and update the store
  useAuthStore.getState().logout();
};

// Function to fetch bills
export const getBills = async () => {
  try {
    const response = await axios.get(`${API_URL}/bills`);
    return response.data; // Should return { currentBill: ..., pastBills: [...] }
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error fetching bills');
  }
};

// Export all the functions in a single authService object
const authService = {
  signup,
  login,
  verifyToken,
  logout,
  getBills,
};

export default authService;
