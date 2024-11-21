import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1); // Ensure only the last character is used
    setCode(newCode);

    // Move focus to the next input field if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      window.location.reload();
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
      toast.error("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      inputRefs.current[5].blur(); // Remove focus from the last input
    }
  }, [code]);

  return (
    <div className="max-w-md w-full bg-white bg-opacity-80 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 rounded-lg p-4">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 mb-6">Enter the 6-digit code sent to your email address.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                aria-label={`Verification digit ${index + 1}`}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-100 text-gray-800 border-2 border-gray-400 rounded-lg focus:border-gray-600 focus:outline-none shadow-md"
              />
            ))}
          </div>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full py-3 px-4 bg-gray-800 text-white font-bold rounded-lg shadow-xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-100 transition duration-200"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
