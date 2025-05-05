import React, { useState } from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useToggleSuspendUserMutation,
  useUpdateBalanceMutation,
} from "../../features/users/usersApi";
import { Loader2, Trash2, Ban, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [toggleSuspendUser] = useToggleSuspendUserMutation();
  const [updateBalance] = useUpdateBalanceMutation();

  const [balances, setBalances] = useState({});
  const [updating, setUpdating] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteUser({ id }).unwrap();
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const handleSuspendToggle = async (id) => {
    try {
      await toggleSuspendUser({ id }).unwrap();
      toast.success("User suspension status updated");
    } catch (err) {
      toast.error(err?.data?.message || "Suspend update failed");
    }
  };

  const handleBalanceChange = (id, value) => {
    setBalances({ ...balances, [id]: value });
  };

  const handleBalanceUpdate = async (id, currentBalance) => {
    const newBalance = parseFloat(balances[id]);
    if (isNaN(newBalance)) {
      toast.error("Invalid balance value");
      return;
    }

    if (newBalance === currentBalance) {
      toast("No changes made");
      return;
    }

    try {
      setUpdating(id);
      await updateBalance({ userId: id, balance: newBalance }).unwrap();
      toast.success("Balance updated");
    } catch (err) {
      toast.error(err?.data?.message || "Balance update failed");
    } finally {
      setUpdating(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500 text-center mt-4">Failed to load users.</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Users</h1>
      <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-xs font-semibold text-gray-600 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-center">Role</th>
              <th className="px-4 py-3 text-center">Suspended</th>
              <th className="px-4 py-3 text-center">Balance</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <motion.tr
                key={user._id}
                className={`border-t text-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td className="px-4 py-3 text-left whitespace-nowrap">{user.name}</td>
                <td className="px-4 py-3 text-left">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3">{user.isSuspended ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="number"
                      className="w-24 px-2 py-1 border rounded text-sm"
                      value={balances[user._id] ?? user.balance}
                      onChange={(e) => handleBalanceChange(user._id, e.target.value)}
                    />
                    <button
                      disabled={updating === user._id}
                      onClick={() => handleBalanceUpdate(user._id, user.balance)}
                      className="text-green-600 hover:text-green-800 disabled:opacity-50"
                      title="Update Balance"
                    >
                      <CheckCircle size={18} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 flex justify-center gap-3">
                  <button
                    onClick={() => handleSuspendToggle(user._id)}
                    className="text-yellow-600 hover:text-yellow-800"
                    title={user.isSuspended ? "Unsuspend" : "Suspend"}
                  >
                    <Ban size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
