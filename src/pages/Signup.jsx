import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { registerUser } from "../apis/api";
import Navbar from "../components/Navbar/navbar";

// ✅ Import Icons
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaPhone, FaUser } from "react-icons/fa";

// ✅ Validation Schema
const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required").min(3, "Full Name must be at least 3 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignUpPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ Toggle Password Visibility

  const onSubmit = async (data) => {
    console.log("📤 Form Submitted, Data:", data);
    setLoading(true);

    const userData = {
      name: data.fullName,
      email: data.email,
      password: data.password,
      phone: data.phoneNumber,
      role: "Patient",
    };

    try {
      console.log("📨 Sending API Request...");
      const response = await registerUser(userData);
      console.log("✅ API Response:", response);

      if (response?.user) {
        toast.success("Sign up successful! Redirecting... 🎉");
        reset();

        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Signup Error:", error);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-white-50 min-h-screen flex flex-col relative bg-[#002570FA] mt-[90px]">
        {/* Main Section */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 items-center justify-center max-w-[1400px] mx-auto px-20 mt-20 lg:mt-32 z-10">
          {/* Left Section */}
          <div className="flex flex-row justify-end items-center gap-0">
            <div className=" md:ml-[50px] md:w-[612px]">
              <div>
                <h1 className="font-medium font-poppins text-[36px] text-white">Log In to Go</h1>
              </div>
              <div>
                <p className="font-normal text-[16px] text-[#000000] font-worksans ">If you don't have account</p>
              </div>
              <div>

                <p className="font-normal text-[16px] text-[#000000] font-worksans ">you can <span> <a
                  className="  text-primary font-medium text-[16px] font-worksans"
                  href="/login"
                >
                  Login
                </a></span></p>
              </div>
            </div>
            <div className="h-[283px] w-[600px] flex justify-end">
              <img className=" object-cover h-[270px] " src="/images/loginpic.png" alt="loginpic" />
            </div>

          </div>

          {/* Right Section - Form */}
          <div className="max-w-lg p-5 z-20 flex flex-col items-center gap-2">
            {/* Signup Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name Field with Icon */}
              <div className="mb-4 relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName")}
                  className="w-[211px] h-[31px] pb-[8px] pt-[8px] pl-[16px] pr-[16px] border border-gray-300 rounded-lg text-[10px] font-worksans focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <p className="text-red-500 text-sm mt-1">{errors.fullName?.message}</p>
              </div>

              {/* Email Field with Icon */}
              <div className="mb-4 ">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="w-[211px] h-[31px] pb-[8px] pt-[8px] pl-[16px] pr-[16px] border border-gray-300 rounded-lg text-[10px] font-worksans focus:outline-none focus:ring-2 focus:ring-blue-600" />
                <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
              </div>

              {/* Phone Number Field with Icon */}
              <div className="mb-4 ">
                <input
                  type="text"
                  placeholder="Phone No."
                  {...register("phoneNumber")}
                  className="w-[211px] h-[31px] pb-[8px] pt-[8px] pl-[16px] pr-[16px] border border-gray-300 rounded-lg text-[10px] font-worksans focus:outline-none focus:ring-2 focus:ring-blue-600" />
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber?.message}</p>
              </div>

              {/* Password Field with Icon & Eye Toggle */}
              <div className="mb-4 ">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="w-[211px] h-[31px] pb-[8px] pt-[8px] pl-[16px] pr-[16px] border border-gray-300 rounded-lg text-[10px] font-worksans focus:outline-none focus:ring-2 focus:ring-blue-600" />
                <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>

              </div>

              <button type="submit" className="w-[211px] h-[31px] bg-[#4461F2] pb-[8px] pt-[8px] pl-[16px] pr-[16px] text-white rounded-lg shadow-lg font-semibold text-center"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
            <div className="flex items-center max-w-xs w-[211px] mt-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-xs text-white whitespace-nowrap">or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="flex flex-row justify-between items-center gap-3">
              <div className="w-[62px] h-[31px] bg-white flex justify-center items-center rounded">
                <img className="h-[18px] w-[18px] object-contain" src="/images/google.png" alt="fbicon" />
              </div>
              <div className="w-[62px] h-[31px] bg-white flex justify-center items-center rounded">
                <img className="h-[18px] w-[18px] object-contain" src="/images/fb.png" alt="fbicon" />
              </div>
              <div className="w-[62px] h-[31px] bg-white flex justify-center items-center rounded">
                <img className="h-[18px] w-[18px] object-contain" src="/images/apple.png" alt="fbicon" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
