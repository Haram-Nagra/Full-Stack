import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Profile from './pages/Profile';
import Landingpage from './pages/Landingpage'; // Assuming you have a LandingPage component
import useAuthStore from './store/useAuthStore.jsx';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <main className='flex-grow'>
          <Routes>
            {/* Landing page is the initial page */}
            <Route path="/" element={<Landingpage />} />

            {/* Public routes for login and signup */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Private routes for authenticated users */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/page1"
              element={
                <PrivateRoute>
                  <Page1 />
                </PrivateRoute>
              }
            />
            <Route
              path="/page2"
              element={
                <PrivateRoute>
                  <Page2 />
                </PrivateRoute>
              }
            />
            <Route
              path="/page3"
              element={
                <PrivateRoute>
                  <Page3 />
                </PrivateRoute>
              }
            />

            {/* Redirect any other paths to landing page if not authenticated */}
            <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/'} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
