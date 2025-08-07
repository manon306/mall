import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signin() {
    const { register, handleSubmit,formState: { errors }, } = useForm();
    const { signup } = useAuth();
    const navigate = useNavigate();
  
    const onSubmit = (data) => {
      signup(data);
      alert("Signup successful!");
      navigate("/login");
    };
  
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[500px] text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* ✅ First & Last Name جنب بعض */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="First name"
                {...register("firstName", { required: true, maxLength: 80 })}
                className="w-full p-2 rounded text-black"
              />
              {errors.firstName && <p className="text-red-500 text-sm">First name is required</p>}
            </div>

            <div className="w-1/2">
              <input
                type="text"
                placeholder="Last name"
                {...register("lastName", { required: true, maxLength: 100 })}
                className="w-full p-2 rounded text-black"
              />
              {errors.lastName && <p className="text-red-500 text-sm">Last name is required</p>}
            </div>
          </div>

          {/* ✅ Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              className="w-full p-2 rounded text-black"
            />
            {errors.email && <p className="text-red-500 text-sm">Valid email is required</p>}
          </div>

          {/* ✅ Mobile & Password جنب بعض */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                type="tel"
                placeholder="Mobile number"
                {...register("mobileNumber", { required: true, minLength: 6, maxLength: 12 })}
                className="w-full p-2 rounded text-black"
              />
              {errors.mobileNumber && <p className="text-red-500 text-sm">Mobile number is required</p>}
            </div>

            <div className="w-1/2">
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
                className="w-full p-2 rounded text-black"
              />
              {errors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
            </div>
          </div>

          {/* ✅ Address */}
          <div>
            <input
              type="text"
              placeholder="Address"
              {...register("address", { required: true, maxLength: 200 })}
              className="w-full p-2 rounded text-black"
            />
            {errors.address && <p className="text-red-500 text-sm">Address is required</p>}
          </div>

          {/* ✅ City & State جنب بعض */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="City"
                {...register("city", { required: true })}
                className="w-full p-2 rounded text-black"
              />
              {errors.city && <p className="text-red-500 text-sm">City is required</p>}
            </div>

            <div className="w-1/2">
              <input
                type="text"
                placeholder="State"
                {...register("state", { required: true })}
                className="w-full p-2 rounded text-black"
              />
              {errors.state && <p className="text-red-500 text-sm">State is required</p>}
            </div>
          </div>

          {/* ✅ Country & Postal Code جنب بعض */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Country"
                {...register("country", { required: true })}
                className="w-full p-2 rounded text-black"
              />
              {errors.country && <p className="text-red-500 text-sm">Country is required</p>}
            </div>

            <div className="w-1/2">
              <input
                type="text"
                placeholder="Postal code"
                {...register("postalCode", { required: true })}
                className="w-full p-2 rounded text-black"
              />
              {errors.postalCode && <p className="text-red-500 text-sm">Postal code is required</p>}
            </div>
          </div>

          {/* ✅ Age */}
          <div>
            <input
              type="number"
              placeholder="Age"
              {...register("age", { required: true, min: 1, max: 120 })}
              className="w-full p-2 rounded text-black"
            />
            {errors.age && <p className="text-red-500 text-sm">Age must be between 1 and 120</p>}
          </div>

          <input
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4"
            value="Sign Up"
          />
        </form>
      </div>
    </div>
  );
}
