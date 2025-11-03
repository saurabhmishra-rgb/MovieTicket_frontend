import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

// Use a relative API path so the Vite dev server proxy forwards requests to the backend
const API_END_POINT = "/api/v1/user";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const getInputdata = async (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      // login
      const user = { email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/login`, user, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (res.data.success) {
          toast.success(res.data.message);
          // Store user in Redux (implement userSlice first)
          dispatch(setUser(res.data.user));
          navigate("/");
        }
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Login failed");
      }
    } else {
      // register
      const user = { fullName, email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/register`, user, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (res.data.success) {
          toast.success(res.data.message);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Register error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Registration failed");
      }
    }

    // clear inputs
    setEmail("");
    setFullName("");
    setPassword("");
  };

  return (
    <div className="relative min-h-screen text-white bg-gray-900">
      {/* Login / Register Form */}
      <form
        onSubmit={getInputdata}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 p-8 rounded-lg w-96 space-y-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">
          {isLoggedIn ? "Login" : "Sign up"}
        </h2>

        <div className="space-y-4">
          {!isLoggedIn && (
            <div className="space-y-1">
              <label className="text-sm">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                className="w-full p-2 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full p-2 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full p-2 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          {isLoggedIn ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-sm">
          {isLoggedIn ? "New user?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={loginHandler}
            className="text-blue-500 hover:text-blue-400 font-medium"
          >
            {isLoggedIn ? "Sign up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;