import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../apis/api";
import Navbar from "../components/Navbar/navbar";

// ✅ Import Icons
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Check if User is Already Logged In on Load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      const user = JSON.parse(storedUser);
      if (user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }
  }, [navigate]);

  // ✅ Handle login form submission
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        if (response.user.role === "Admin") {
          toast.success("Welcome Admin!", { position: "top-right" });
        } else {
          toast.success(
            <div className="flex items-center">
              <div className="bg-green-500 text-white rounded-full p-1 mr-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-800">Success</p>
                <p className="text-gray-600 text-sm">You are Logged In successfully</p>
              </div>
            </div>,
            {
              className: "bg-white shadow-lg rounded-lg p-4",
              icon: false,
            }
          );
        }

        setTimeout(() => {
          if (response.user.role === "Admin") {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        }, 1000);
      } else {
        throw new Error("Token not received!");
      }
    } catch (error) {
      console.error("❌ Login Failed:", error);
      toast.error("Login failed! Please check your credentials.", { position: "top-right" });
    }
  }

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

                <p className="font-normal text-[16px] text-[#000000] font-worksans ">you can <span> <button
                  className="  text-primary font-medium text-[16px] font-worksans"
                  onClick={() => navigate("/signup")}
                >
                  Register here!
                </button></span></p>
              </div>
            </div>
            <div className="h-[283px] w-[600px] flex justify-end">
              <img className=" object-cover h-[270px] " src="/images/loginpic.png" alt="loginpic" />
            </div>

          </div>

          {/* Right Section - Form */}
          <div className="max-w-lg p-5 z-20 flex flex-col items-center gap-2">
            <form onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[211px] h-[31px] pb-[8px] pt-[8px] pl-[16px] pr-[16px] border border-gray-300 rounded-lg text-[10px] font-worksans focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[211px] h-[31px] pb-[8px] pt-[8px] pl-[16px] pr-[16px] border border-gray-300 rounded-lg text-[10px] font-worksans focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="flex justify-end font-worksans font-light text-[10px] text-sm text-[#E6F6F4] mb-4">
                <a href="/forgot-password">Recover Password?</a>
              </div>

              <button
                type="submit"
                className="w-[211px] h-[31px] bg-[#4461F2] pb-[8px] pt-[8px] pl-[16px] pr-[16px] text-white rounded-lg shadow-lg font-semibold text-center"
              >
                Sign In
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

        {/* ✅ Matched Background Gradient with Signup Page */}
        <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-blue-200 to-transparent z-[-1]"></div>
      </div>
    </>
  );
};

export default LoginPage;
