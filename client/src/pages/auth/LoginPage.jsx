import { useState } from "react";
import { useLoginMutation } from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Loader2, UserPlus, EyeClosed, LucideEye } from "lucide-react";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Logged in successfully!");
      navigate(res.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };
  return (
    <section className="flex items-center justify-center min-h-screen bg-black">
      <motion.div
        className="max-w-md p-6 bg-slate-900 text-white shadow-lg rounded-xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-400">
          Login
        </h2>
        <form className="space-y-4 " onSubmit={handleSubmit}>
          <input
            name="email"
            id="email"
            placeholder="Email"
            type="email"
            className="w-full p-2 rounded border outline-none "
            onChange={handleChange}
          />
          <div className="relative">
            <input
              name="password"
              id="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="w-full p-2 rounded border"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
            >
              {showPassword ? <LucideEye/>: <EyeClosed />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 cursor-pointer transition-color duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="flex items-center justify-center">
                  <Loader2
                    className="animate-spin text-white h-5 w-5 mr-2"
                    aria-hidden="true"
                  />
                  Loading...
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center">
                  <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                  Login
                </div>
              </>
            )}
          </button>
          <p className="text-center text-gray-500 text-sm">
            Don't have an account?
            <Link
              to="/register"
              className="text-indigo-500 hover:underline ml-1"
            >
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </section>
  );
};

export default LoginPage;
