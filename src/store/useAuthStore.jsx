import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // Retrieve token and role from localStorage, or default to null if not present
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  userRole: localStorage.getItem('role') || null, // 'admin', 'customer-support', or 'resident'

  // Login function to set token and role
  login: (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    set({ token, isAuthenticated: true, userRole: role });
  },

  // Logout function to remove token and role
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    set({ token: null, isAuthenticated: false, userRole: null });
  },

  // Function to update role if needed
  setRole: (role) => set({ userRole: role })
}));

export default useAuthStore;
