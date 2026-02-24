import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );
      setMsg(res.data.message);
    } catch (err) {
      setMsg("User not found");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
            Send Reset Link
          </button>
        </form>

        {msg && (
          <p className="text-center text-sm text-green-600 mt-3">
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;