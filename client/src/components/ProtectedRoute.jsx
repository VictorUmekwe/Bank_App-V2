import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles = [] }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;