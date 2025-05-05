import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import toast from 'react-hot-toast';


export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed:', err);
    }
  }
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-900 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <Link to="/logout" className="hover:underline" onClick={handleLogout}>Logout</Link>
      </header>
      <main className="p-6 bg-gray-100 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
