import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import { toast, ToastContainer } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";
import { MdEdit } from "react-icons/md";
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedUser, setUpdatedUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigation

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setUpdatedUser(storedUser);

      fetchCart(storedUser._id);
      fetchOrders(storedUser._id);
    }

    setLoading(false);
  }, []);

  const fetchCart = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5003/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const fetchOrders = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5003/orders/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5003/user/update/${updatedUser._id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen  py-10 px-4 flex flex-col items-center pt-[200px]">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <div className="flex flex-row justify-between items-center mb-8">
            <h2 className="font-poppins text-[20px] font-medium text-[#042973]">Edit Profile</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#ECE9E9] text-[#0266C1] h-[28px] w-[28px] text-center flex items-center justify-center rounded-full hover:bg-blue-100 transition"
            >
              <MdEdit />
            </button>
          </div>
          <ToastContainer position="top-right" autoClose={3000} />

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <div className="space-y-6">
              {/* User Details */}
              <div className="">
                {/* Name */}
                <div className="mb-8">

                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={updatedUser.name}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="border border-gray-300 p-3 w-full bg-gray-100 text-[#666666] font-worksans font-normal rounded-lg">{user.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-8">

                  <p className="border border-gray-300 p-3 w-full text-[#666666] font-worksans font-normal bg-gray-100 rounded-lg">{user.email}</p>
                </div>

                {/* Phone */}
                <div>

                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={updatedUser.phone || ""}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="border border-gray-300 p-3 w-full text-[#666666] font-worksans font-normal bg-gray-100 rounded-lg">
                      {user.phone || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between space-x-4 mt-6">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleUpdateProfile}
                      className="bg-[#0266C1] text-white font-worksans font-medium text-[16px]  px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-[#FF4F59FC] text-white font-worksans font-medium text-[16px] px-5 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>

                  </>
                ) : (
                  <div className="flex space-x-4">
                    {/* ✅ Change Password Button */}
                    <button
                      onClick={() => navigate("/forgot-password")} // Redirect to Forgot Password page
                      className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Change Password
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User's Cart */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart</h3>
          {cartItems.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item._id} className="flex justify-between p-3">
                  <span className="text-gray-700 font-medium">{item.name || "Unnamed Product"}</span>
                  <span className="text-gray-900 font-bold">${item.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
