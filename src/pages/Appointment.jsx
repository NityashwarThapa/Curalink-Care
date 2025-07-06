import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const BookAppointmentPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    problemDescription: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/doctors/${doctorId}`);
        setDoctor(response.data);
      } catch (err) {
        setError("Failed to load doctor details.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    fetchDoctor();
  }, [doctorId]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "age") value = value < 0 ? 0 : value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to book an appointment.");
      return;
    }

    const appointmentData = {
      userId: user._id,
      doctorId,
      doctorName: doctor?.name,
      specialization: doctor?.specialization,
      age: formData.age,
      gender: formData.gender,
      problemDescription: formData.problemDescription,
      date: formData.date,
      time: formData.time,
    };
    try {
      await axios.post("http://localhost:5003/appointments/schedule", appointmentData);
      localStorage.setItem("appointment", JSON.stringify(appointmentData));
      navigate("/appointment-success"); // ✅ Redirect after successful booking
    } catch (err) {
      alert("Error booking appointment. Please try again.");
    }
  };


  return (
    <>
      <Navbar />
      <div className=" min-h-screen p-8 mt-20 flex justify-center pt-[100px] bg-[#E1EDFFFA]">
        <div className="max-w-6xl w-full  shadow-lg rounded-lg flex flex-col bg-[#E1EDFFFA]">
          {/* ✅ Left Section - Bigger Doctor Info */}
          <div className=" bg-[#E1EDFFFA] p-6 rounded-l-lg text-center flex flex-col items-center">
            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              < div className="w-full bg-white p-10 rounded-lg shadow-sm  flex flex-col md:flex-row gap-7">
                <div className="w-1/5">

                  <img
                    src={doctor?.image ? `http://localhost:5003/${doctor.image}` : "/images/default-doctor.png"}
                    alt={doctor?.name || "Doctor"}
                    className="w-[156px] h-[177px] object-cover " // ✅ Increased Size
                  />
                  <h2 className="text-2xl text-start font-bold text-gray-800 mt-3">{doctor?.name}</h2>
                </div>
                <div className="flex flex-col items-start justify-start">

                  <p className="text-[#0266C1] font-bold font-poppins text-[24px] mb-8">{doctor?.specialization} Surgeon</p>
                  <p className="text-[16px] font-medium font-worksans text-[#0266C1]">Email:- <span className="font-normal">{doctor?.email}</span></p>
                  <p className="text-[16px] font-medium font-worksans text-[#0266C1] mb-8">Phone:- <span className="font-normal">{doctor?.contact}</span></p>
                  <p>Meet our experienced and caring doctors, dedicated to providing you with expert, personalized care for better health and wellness.</p>
                </div>
              </div>
            )}
          </div>

          {/* ✅ Right Section - User & Form */}
          <div className="w-2/3 p-8 bg-[#E1EDFFFA]">
            {/* <div className="bg-[#E1EDFFFA] p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold">Your Details</h3>
              <p><strong>Name:</strong> {user?.name || "Not Available"}</p>
              <p><strong>Email:</strong> {user?.email || "Not Available"}</p>
            </div> */}

            {/* ✅ Appointment Form */}
            <h3 className="text-[#042973] text-[20px] font-medium mb-4">Please Fill Details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Patient Name (Auto-Filled & Read-Only) */}
              <div>
                <label className="block text-[#0266C1] font-poppins text-[20px] font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full  text-[14px] text-[#66666699] border border-black  rounded-lg py-2 px-4 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-[#0266C1] font-poppins text-[20px] font-medium mb-2">E-mail</label>
                <input
                  type="text"
                  className="w-full  text-[14px] text-[#66666699] border border-black  rounded-lg py-2 px-4 " placeholder="e-mail"
                />
              </div>
              <div>
                <label className="block text-[#0266C1] font-poppins text-[20px] font-medium mb-2">Patient Name</label>
                <input
                  type="text"
                  className="w-full  text-[14px] text-[#66666699] border border-black  rounded-lg py-2 px-4 " placeholder="patient name"
                />
              </div>
              <div className="flex flex-col md:flex-row w-full gap-4">

                <div className="w-full">
                  <label className="block text-[#0266C1] font-poppins text-[20px] font-medium mb-2">Select Age</label>
                  <select
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full text-[14px] text-[#66666699] border border-black  rounded-lg py-2 px-4 cursor-pointer"
                  >
                    <option value="">Select Age</option>
                    {[...Array(100).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1} years
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gender Selection */}
                <div className="w-full">
                  <label className="block text-[#0266C1] font-poppins text-[20px] font-medium mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full  text-[14px] text-[#66666699] border border-black  rounded-lg py-2 px-4"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-[#0266C1] font-poppins text-[20px] font-medium mb-2">Problem Description</label>
                <textarea
                  name="problemDescription"
                  value={formData.problemDescription}
                  onChange={handleChange}
                  required
                  className="w-full  text-[14px] text-[#66666699] border border-black  rounded-lg py-2 px-4 h-20"
                  placeholder="Briefly describe your health issue..."
                />
              </div>

              {/* Date Selection (Restricts Past Dates) */}
              <div>
                <label className="block text-[#0266C1] font-poppins text-[20px] font-medium mb-2">Select Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]} // Prevents past dates
                  className="w-full text-[14px] text-[#66666699] border border-black  rounded-lg py-2 px-4 cursor-pointer"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-[#0266C1] font-poppins text-[20px] font-medium mb-2">Select Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full text-[14px] text-[#66666699] border border-black  rounded-lg py-2 px-4 cursor-pointer"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className=" bg-[#042973] text-[20px] font-poppins text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700"
                onClick={(e) => {
                  const storedUser = localStorage.getItem("user");
                  if (!storedUser) {
                    e.preventDefault();
                    navigate("/login");
                    return;
                  }
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookAppointmentPage;
