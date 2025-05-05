import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Users, MessageCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/auth/authApi";
import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
          <div className="mb-6 text-sm text-gray-300 text-center">
            Logged in as: <span className="font-semibold">{userInfo?.name}</span>
          </div>
          <nav className="flex flex-col gap-4 text-lg">
            <NavLink
              to="users"
              className={({ isActive }) =>
                `flex items-center gap-2 hover:text-blue-400 transition ${isActive ? "text-blue-400" : "text-white"}`
              }
            >
              <Users size={18} /> Manage Users
            </NavLink>
            <NavLink
              to="chat"
              className={({ isActive }) =>
                `flex items-center gap-2 hover:text-blue-400 transition ${isActive ? "text-blue-400" : "text-white"}`
              }
            >
              <MessageCircle size={18} /> Chat Support
            </NavLink>
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-8 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm transition"
        >
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
