import React from "react";
import { BsSend } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-2  gap-3 gap-y-8 md:gap-8 py-10 max-w-sm mx-auto sm:max-w-3xl lg:max-w-full">
          {/* Logo Section */}
          <div className="grid grid-cols-1 md:grid-cols-3">

            <div className="">
              <a href="/" className="flex items-center space-x-3">
                <img src="/images/logo.png" className=" h-[95px] w-[87px]" alt="curalink logo" />
              </a>
            </div>
            {/* Pagedone Section */}
            <div className="lg:mx-auto text-left">
              <h4 className="text-[20px] font-roboto text-[#666666] font-semibold mb-7">CuraLink Care</h4>
              <ul className="text-sm transition-all duration-500">
                <li className="mb-6">
                  <a href="javascript:;" className="text-[#666666] text-[16px] font-montserrat hover:text-gray-900">
                    Home
                  </a>
                </li>
                <li className="mb-6">
                  <a href="javascript:;" className="text-[#666666] text-[16px] font-montserrat hover:text-gray-900">
                    About
                  </a>
                </li>

              </ul>
            </div>
            {/* Products Section */}
            <div className="lg:mx-auto text-left">
              <h4 className="text-[20px] font-roboto text-[#666666] font-semibold mb-7">Doctors</h4>
              <ul className="text-sm transition-all duration-500">
                <li className="mb-6">
                </li>
                <li className="mb-6">
                  <a href="javascript:;" className="text-[#666666] text-[16px] font-montserrat hover:text-gray-900">
                    Specialities
                  </a>
                </li>
                <li>
                  <a href="javascript:;" className="text-[#666666] text-[16px] font-montserrat hover:text-gray-900">
                    Consultation
                  </a>
                </li>
              </ul>
            </div>

          </div>
          <div className="w-full max-w-md mx-auto ">
            <ul className="flex justify-end text-sm transition-all duration-500 ">
              <div className="flex items-center justify-end rounded-md  w-[311px]">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow text-[#666666] font-montserrat text-[16px] font-normal   shadow-slate-500 border rounded-l-lg p-3 border-gray-200 w-[311px]  shadow-inner bg-transparent  placeholder-gray-500 focus:outline-none"
                />
                <button className="bg-[#00487C] p-[14px] rounded-r-lg hover:bg-blue-800 transition text-white">
                  <BsSend className="w-5 h-5" />
                </button>
              </div>
            </ul>
          </div>

        </div>
        {/* Footer Bottom Section */}
        <div className="py-7 border-t border-gray-200 text-center">
          <div className="flex items-center justify-center flex-col lg:flex-row text-center">
            <p className="text-[#666666] font-montserrat text-[16px] font-normal"> ©All rights copyright reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
