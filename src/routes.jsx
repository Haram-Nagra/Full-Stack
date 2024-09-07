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
import AddCustomerSupport from './pages/AddCustomerSupport'; // New component
import useAuthStore from './store/useAuthStore.jsx';

const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, userRole } = useAuthStore();
  
  // Redirect based on role
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Ensure user has the required role
  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, userRole } = useAuthStore();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Landing page is the initial page */}
            <Route path="/" element={<Landingpage />} />

            {/* Public routes for login and signup */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin route for adding customer support */}
            <Route
              path="/add-customer-support"
              element={
                <PrivateRoute role="admin">
                  <AddCustomerSupport />
                </PrivateRoute>
              }
            />

            {/* Private routes based on roles */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute role="admin">
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute role="resident">
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/page1"
              element={
                <PrivateRoute role="customer-support">
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
