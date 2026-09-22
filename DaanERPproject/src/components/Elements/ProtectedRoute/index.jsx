import { trueStaff } from "../../../utils";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // const staff = IsStaff() === true;
  if (trueStaff) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet></Outlet>;
};

export default ProtectedRoute;
