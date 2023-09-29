import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { loginContext } from '../Context/UserContext'; 

const ProtectedRoute = ({ children}) => {
  const { isAuthenticated } = useContext(loginContext); 
  return  isAuthenticated? (
    children
  ) : (    
    <Navigate to="/" /> 
  );  
};

export default ProtectedRoute;
