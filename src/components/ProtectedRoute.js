import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ allowedRoles }) => {
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (token) {
      axios.get('/api/users/role', {
        headers: {
          'Authorization': `Bearer ${token}`,  // Send token in the Authorization header
        },
      })
      .then(response => {
        setUserRole(response.data.role);  // Assuming 'role' is returned from the API
        setIsAuthenticated(true);  // User is authenticated
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user role:', error);
        setIsAuthenticated(false); // User is not authenticated
        setIsLoading(false);
      });
    } else {
      setIsAuthenticated(false); // No token, user is unauthenticated
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Loading state while the role is being fetched
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if unauthenticated
  }

  // Check if user role is allowed, if so, render the protected route
  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/" />; // Redirect if the role is not allowed
};

export default ProtectedRoute;
