import React, { useEffect, useState } from 'react';
import {VerifyUser} from "./Components/verifyUser";
import NotApproved from "./Components/notApproved";
import { useAuth } from './AuthContext';
import { Outlet, Navigate,useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const { role } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    if (role !== null) {
      setIsLoading(false);
    }
  }, [role]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const allowedRoles = ['pharmacist', 'patient', 'admin'];
  if (role && allowedRoles.includes(role)) {
    return <Outlet />;
  } else if(role === "notVerified"){
    navigate("/verifyUser");
    return <VerifyUser />;
  }else if(role === "notApproved"){
    return <NotApproved />;
  }else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
