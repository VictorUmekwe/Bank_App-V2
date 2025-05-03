import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-900 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <Link to="/logout" className="hover:underline">Logout</Link>
      </header>
      <main className="p-6 bg-gray-100 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
