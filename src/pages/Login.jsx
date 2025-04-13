import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import ApiService from "../services/ApiService";
import ApiRoutes from "../utils/ApiRoutes";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  sessionStorage.clear();
  const navigate = useNavigate();
  const fetchLogin = async () => {
    try {
      const res = await ApiService.post(
        ApiRoutes.LOGIN.path,
        { email, password },
        {
          authentication: ApiRoutes.LOGIN.authentication,
        }
      );
      toast.success("login success");
      sessionStorage.setItem("token", res.token);
      sessionStorage.setItem("role", res.role);
      sessionStorage.setItem("id", res.id);

      if (res.role === "admin") {
        return navigate("/dashboard");
      }
      if (res.role === 'user') {
        return navigate('/profile')
      }
    } catch (error) {
      toast.error(error.response.data.Error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin();
  };
  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white items-center justify-center p-10 rounded-3xl space-y-2"
      >
        <h1 className="text-5xl font-semibold mb-10">Login</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="border px-1 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="border px-1 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="px-3 py-1 bg-green-600 text-white rounded-lg mt-5">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
