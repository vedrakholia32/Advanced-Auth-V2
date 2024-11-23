import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-white bg-opacity-80 backdrop-filter border border-gray-400 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden mx-4 sm:mx-8 md:mx-16 lg:mx-auto" // Increased width here
    >
      <div className="p-6">
        {" "}
        {/* Further reduced padding */}
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 rounded-lg p-4">
          {" "}
          {/* Reduced margin */}
          Create Account
        </h2>
        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow-md"
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-md"
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-md"
          />
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <PasswordStrengthMeter password={password} />

          <motion.button
            className="mt-4 w-full py-3 px-4 bg-gray-800 text-white font-bold rounded-lg shadow-xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-100 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-3 pb-8 bg-opacity-50 flex justify-center shadow-lg">
        {" "}
        {/* Reduced padding */}
        <p className="text-sm text-gray-800">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
