import React from "react";
import { useState } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { useRegisterMutation } from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register(form).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Registered successfully!");
        navigate(res.role === "admin" ? "/admin" : "/dashboard");
      } catch (err) {
        toast.error(err?.data?.message || "Registration failed");
      }
    }
  };
  return (
    <section className="flex items-center justify-center min-h-screen bg-black">
      <motion.div
        className="max-w-md  p-6 bg-slate-900 text-white shadow-lg rounded-xl mx-auto  "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-400">
          Register
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            id="name"
            placeholder="Name"
            type="text"
            className="w-full p-2 rounded border"
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Email"
            className="w-full p-2 rounded border"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            className="w-full p-2 rounded border"
            onChange={handleChange}
          />
          <input
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-2 rounded border"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 cursor-pointer transition-color duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
              <div className="flex items-center justify-center">

                <Loader2 className="animate-spin text-white h-5 w-5 mr-2" aria-hidden='true'/>
                Loading...
              </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center">

                <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                Register
                </div>
              </>
            )}
          </button>
        
        </form>
        <p className="text-center text-gray-500 text-sm">
            Already have an account?
          <Link to='/login' className="text-indigo-500 hover:underline ml-1">
          Login
          </Link>
          </p>
      </motion.div>
    </section>
  );
};

export default RegisterPage;
