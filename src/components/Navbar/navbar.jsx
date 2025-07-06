import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Icons
import { useLocation, useNavigate } from "react-router-dom"; // Navigation
import Button from "../Button/button"; // Reusable Button Component

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Store user data

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // ✅ Safely parse user
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user"); // Clear invalid data
        setUser(null);
      }
    }
  }, []);

  const isLoggedIn = user !== null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/home");
  };

  const isDashboard = location.pathname === "/home";

  // Function to set active link dynamically
  const getNavLinkClass = (path) =>
    location.pathname === path ? " font-medium text-[#042973]" : "text-[#E1EDFF] font-medium hover:text-blue-900";

  return (
    <nav
      className={`${isDashboard ? "bg-[#E1EDFF]" : "bg-[#E1EDFF]"
        } fixed w-full z-50 top-0 transition-colors duration-300`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 pb-10">
        <a href="/home" className="flex items-center space-x-3">
          <img
            src="/images/logo.png"
            className="w-[69.43681335449219px] h-[75px] "
            alt="curalink logo"
          />
        </a>
        <div className=" justify-between  gap-1 items-center hidden md:flex space-x-8">
          <div className="flex flex-row justify-center items-center gap-[18px]">
            <div>
              <img
                src="/images/phone.png"
                className="h-[18px] w-[18px]"
                alt="Curalink Logo"
              />
            </div>
            <div>
              <p className="text-[#666666FA] text-[16px] font-poppins font-medium ">
                Phone
              </p>
              <p className="text-[#0266C1] font-worksans font-normal text-[16px]">
                1234567890
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-[18px]">
            <div>
              <img
                src="/images/mail.png"
                className="h-[18px] w-[18px]"
                alt="curalink logo"
              />
            </div>
            <div>
              <p className="text-[#666666FA] text-[16px] font-poppins font-medium ">
                Mail
              </p>
              <p className="text-[#0266C1] font-worksans font-normal text-[16px]">
                cura@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="relative group flex items-center space-x-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center space-x-2"
                >
                  <img src="/images/profile.png" alt="profile" />
                  <span className="font-medium text-[#042973] font-poppins text-[20px]">
                    {user.name}
                  </span>
                </button>
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black border border-gray-300 rounded px-2 py-1 text-sm shadow z-[9999] opacity-0 group-hover:opacity-100 transition">
                  Profile
                  {/* Pointer Arrow */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-l border-b border-gray-300 rotate-45"></div>
                </div>
              </div>

              <Button
                label="Log Out"
                variant="primar"
                className={`$ font-worksans text-[#0266C1] border-2 w-[93px] rounded-lg  h-[36px] border-[#0266C1]`}
                onClick={handleLogout}
              />
            </>
          ) : (
            <>
              <Button
                label="Log in"
                variant="secondary"
                onClick={() => navigate("/login")}
              />
              <Button
                label="Sign up"
                variant="primary"
                onClick={() => navigate("/signup")}
              />
            </>
          )}
        </div>
      </div>

      <div className="flex flex-row justify-center items-center">
        <div className="absolute max-w-screen-xl flex flex-wrap items-center justify-center mx-auto top-24 w-full  ">
          <div className="pl-10 items-center hidden justify-between md:flex space-x-8 bg-[#017EFF] h-[74px] w-full  rounded-md">
            <div className=" space-x-8">
              <a
                href="/home"
                className={` text-[20px] font-poppins font-medium  duration-150 ease-in-out${getNavLinkClass(
                  "/home"
                )}`}
              >
                Home
              </a>
              <a
                href="/doctor"
                className={` text-[20px] font-poppins font-medium  duration-150 ease-in-out ${getNavLinkClass(
                  "/doctor"
                )}`}
              >
                Doctor
              </a>
              <a
                href="/product"
                className={` text-[20px] font-poppins font-medium  duration-150 ease-in-out ${getNavLinkClass(
                  "/product"
                )}`}
              >
                Medicine
              </a>
              <a
                href="/packages"
                className={` text-[20px] font-poppins font-medium  duration-150 ease-in-out ${getNavLinkClass(
                  "/packages"
                )}`}
              >
                Packages
              </a>
              {/* ✅ New Packages Link */}
              <a
                href="/history"
                className={`text-[20px] font-poppins font-medium  duration-150 ease-in-out ${getNavLinkClass(
                  "/history"
                )}`}
              >
                History
              </a>
              <a
                href="/contactus"
                className={` text-[20px] font-poppins font-medium  duration-150 ease-in-out ${getNavLinkClass(
                  "/contactus"
                )}`}
              >
                Contact Us
              </a>
            </div>
            <div className="pr-10">
              <button
                onClick={() => navigate("/cart")}
                className="h-[42px] w-[42px] rounded-full bg-black flex flex-row items-center justify-center"
              >
                <FaShoppingCart className=" text-white h-[21px] w-[21px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
