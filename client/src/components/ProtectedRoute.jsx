import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ children, allowedRoles }) => {
    const { userInfo } = useSelector((state) => state.auth);
  
    if (!userInfo) {
      return <Navigate to="/login" replace />;
    }
  
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  
    return <Outlet />;
  };

  export default ProtectedRoutes;