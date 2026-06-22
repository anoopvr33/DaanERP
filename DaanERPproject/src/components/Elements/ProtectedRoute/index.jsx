import React from "react";
import { IsStaff } from "../../../utils";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const staff = IsStaff() === true;
  if (staff) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet></Outlet>;
};

export default ProtectedRoute;
