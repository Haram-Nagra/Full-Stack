import React, { useEffect } from 'react';
import AppRoutes from './routes'; // Import your routes
import useAuthStore from './store/useAuthStore.jsx'; // Your Zustand store
import authService from './services/authService.jsx'; // Your auth service

const App = () => {
    const { setIsAuthenticated } = useAuthStore();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

        if (token) {
            // Verify the token on app initialization
            authService.verifyToken(token)
                .then(() => {
                    setIsAuthenticated(true); // Token is valid
                })
                .catch(() => {
                    setIsAuthenticated(false); // Token is invalid
                    localStorage.removeItem('token'); // Remove invalid token
                });
        }
    }, [setIsAuthenticated]);

    return <AppRoutes />; // Render your routes
};

export default App;
