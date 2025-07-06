import axios from "axios";
import React, { useState } from "react";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAttachEmail } from "react-icons/md";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit Contact Form (Review API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5003/review/add", {
        userId: "guest-user", // ✅ Use a default user ID or get from localStorage
        rating: 5, // ✅ Default rating for a contact form
        review: formData.message, // ✅ Message acts as a review
      });

      if (response.status === 201) {
        setSuccessMessage("Your message has been submitted successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" }); // ✅ Clear form
      }
    } catch (error) {
      console.error("❌ Error submitting contact form:", error);
      alert("Error submitting the message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="  flex justify-center items-center bg-[#002570] text-center h-[448px] w-screen mt-[90px]">
        <h1 className=" text-white font-extrabold font-poppins text-[48px]">Contact Us</h1>
      </div>
      <section className="py-24 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between items-center gap-4">
            <div>
              <h1 className="font-poppins text-[36px]  text-[#000A30] font-extrabold">Contact Us For</h1>
              <h1 className="font-poppins text-[36px]  text-[#0266C1] font-extrabold">More Info !</h1>
            </div>
            <p className="text-[#666666FA] font-normal font-worksans text-[16px]">Have questions or need assistance? Contact us today for more information. Our team is here to help you with personalized support and prompt responses.</p>
            <div className="flex items-end justify-end">
              <img src="/images/Social.png" alt="social icons" />
            </div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center md:justify-between items-center gap-4 md:gap-10 pt-10">
            <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-md md:gap-9 gap-4 py-3 md:py-8 md:w-2/3">
              <h1 className="font-poppins text-[20px] font-medium">Location:</h1>
              <div className="flex justify-center items-center">
                <IoLocationOutline size={90} />
              </div>
              <div>
                <p className="text-[#666666FA] font-worksans font-normal">Dillibazar,Kathmandu, </p>
                <p className="text-[#666666FA] font-worksans font-normal">Nepal</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-md md:gap-9 gap-4 py-3 md:py-8 md:w-2/3">
              <h1 className="font-poppins text-[20px] font-medium">Phone Number:</h1>
              <div className="flex justify-center items-center">
                <FaPhoneAlt size={90} />
              </div>
              <div>
                <p className="text-[#666666FA] font-worksans font-normal">Phone No : (+236)-768-9900, </p>
                <p className="text-[#666666FA] font-worksans font-normal">Mobile No : +769-556-6578</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-md md:gap-9 gap-4 py-3 md:py-8 md:w-2/3">
              <h1 className="font-poppins text-[20px] font-medium">Email Address:</h1>
              <div className="flex justify-center items-center">
                <MdOutlineAttachEmail size={90} />
              </div>
              <div>
                <p className="text-[#666666FA] font-worksans font-normal">company@example.com, </p>
                <p className="text-[#666666FA] font-worksans font-normal">abc_123@yourdomain.com</p>
              </div>
            </div>


          </div>
          {/* contact setion */}
          <div className="flex flex-col justify-center items-center">
            <div className="md:mt-10 mt-5">
              <div className="text-center">
                <h1 className="font-bold text-xl text-[#042973] text-[48px] mb-5">Contact Us</h1>
              </div>
              <div><p className="text-[#666666FA] font-worksans text-[16px]">Contact us if you need any kind of information about us</p></div>


              <div className=" p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">

                {successMessage && (
                  <p className="text-green-600 font-semibold text-lg mb-4">{successMessage}</p>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                    <div className="mb-5">
                      <h1 className="font-medium font-poppins text-[20px] text-[#0266C1] mb-2">Name</h1>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mb-2 w-[290px] h-[40px] pb-[8px] pt-[8px] pl-[16px] pr-[16px] text-[14px] text-[#66666699] placeholder-gray-400 bg-transparent text-lg font-normal rounded-md shadow-slate-400 shadow-inner border border-gray-200 focus:outline-none  "
                        placeholder="Your name here"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <h1 className="font-medium font-poppins text-[20px] text-[#0266C1] mb-2">Phone</h1>

                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mb-2 w-[290px] h-[40px] pb-[8px] pt-[8px] pl-[16px] pr-[16px] text-[14px] text-[#66666699] placeholder-gray-400 bg-transparent text-lg font-normal rounded-md shadow-slate-400 shadow-inner border border-gray-200 focus:outline-none  "
                        placeholder="987654321"
                        required
                      />
                    </div>
                  </div>
                  <div>

                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                    <div className="mb-5">
                      <h1 className="font-medium font-poppins text-[20px] text-[#0266C1] mb-2">Company</h1>
                      <input
                        type="text"
                        className="mb-2 w-[290px] h-[40px] pb-[8px] pt-[8px] pl-[16px] pr-[16px] text-[14px] text-[#66666699] placeholder-gray-400 bg-transparent text-lg font-normal rounded-md shadow-slate-400 shadow-inner border border-gray-200 focus:outline-none  "
                        placeholder="21st tech company"
                      />
                    </div>
                    <div className="mb-5">
                      <h1 className="font-medium font-poppins text-[20px] text-[#0266C1] mb-2">Email</h1>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mb-2 w-[290px] h-[40px] pb-[8px] pt-[8px] pl-[16px] pr-[16px] text-[14px] text-[#66666699] placeholder-gray-400 bg-transparent text-lg font-normal rounded-md shadow-slate-400 shadow-inner border border-gray-200 focus:outline-none  "
                        placeholder="example@gmail.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <h1 className="font-medium font-poppins text-[20px] text-[#0266C1] mb-2">Message</h1>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full h-32 text-[#66666699] font-poppins text-[14px] placeholder-gray-400 bg-transparent text-lg font-normal rounded-md  shadow-slate-400 shadow-inner  border border-gray-200 focus:outline-none pl-4 mb-6"
                      placeholder="Message"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 h-12 text-white text-[20px] font-poppins font-medium  rounded-lg transition-all duration-700 hover:bg-blue-800 bg-[#042973]"
                  >
                    {loading ? "submitting..." : "Submit"}
                  </button>
                </form>
              </div>


            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactUs;


