import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext"; // Adjust the import path as necessary


const Login = () => {
  
    const { register, handleSubmit ,formState:{errors},
     } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const onSubmit = (data) => {
      const success = login(data.email, data.password);
      if (success) {
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Invalid data. Please try again.");
      }
    };
  
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Login Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* ✅ Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className="w-full border rounded p-2 text-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* ✅ Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="w-full border rounded p-2 text-black"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          
          {/* ✅ Submit Button */}
          <input
            type="submit"
            value="Login"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
