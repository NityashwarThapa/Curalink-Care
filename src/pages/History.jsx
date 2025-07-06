import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";
import { useNavigate } from "react-router-dom";
const History = () => {
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")); // Parse user object
  const token = localStorage.getItem("token");

  // Extract user ID safely
  const userId = storedUser?._id;

  useEffect(() => {
    if (!userId || !token) {
      console.error("User not logged in or token missing");
      return;
    }
    fetchUserOrders();
    fetchUserAppointments();
  }, [userId]);

  // ✅ Fetch user orders
  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5003/order/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Ensure each order contains product details (name, image, quantity)
      const categorizedOrders = response.data.map((order) => ({
        ...order,
        status: order.status.toLowerCase(),
      }));

      // ✅ Sort orders by latest createdAt date
      categorizedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setOrders(categorizedOrders);
    } catch (error) {
      console.error("❌ Error fetching user orders:", error);
    }
  };

  // ✅ Fetch user appointments
  const fetchUserAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5003/appointments/getAll?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Ensure only this user's appointments are shown
      const userAppointments = response.data
        .filter((appointment) => appointment.userId?._id === userId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setAppointments(userAppointments);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching user appointments:", error);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);
  if (!userId) return <p className="text-red-500 text-center mt-4">Please log in to view your history.</p>;
  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  console.log(orders)
  return (
    <>
      <Navbar />
      <div className=" flex justify-center items-center bg-[#002570] text-center h-[448px] w-screen mt-[90px]">
        <h1 className="text-white font-extrabold font-poppins text-[48px]">History</h1>

      </div>
      <div className="mx-auto max-w-7xl pt-2">
        {/* 📌 Appointments Section */}
        <h2 className="text-[24px] font-poppins font-bold text-[#0266C1] my-7">Appointments</h2>
        {appointments.length > 0 ? (
          <div className="overflow-x-auto ">
            <table className="min-w-full bg-[#e5efff] rounded-md border border-gray-300 text-left text-sm text-gray-700 mb-32 md:mb-52">
              <thead className="bg-[#e5efff] text-[#666666] font-medium font-poppins">
                <tr>
                  <th className="px-4 py-3 border-b">#</th>
                  <th className="px-4 py-3 border-b">Service</th>
                  <th className="px-4 py-3 border-b">Doctor Name</th>
                  <th className="px-4 py-3 border-b">Description</th>
                  <th className="px-4 py-3 border-b">Date</th>
                </tr>
              </thead>
              <tbody className="bg-[#f4f8ff] font-normal text-[#666666] font-poppins">
                {appointments.map((appointment, index) => (
                  <tr key={appointment._id} className="border-t">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{appointment.serviceName || "Whole Body CheckUp"}</td>
                    <td className="px-4 py-3">{appointment.doctorName}</td>
                    <td className="px-4 py-3">{appointment.problemDescription}</td>
                    <td className="px-4 py-3">
                      {new Date(appointment.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      / {appointment.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No appointments found.</p>
        )}

        <h2 className="text-[24px] font-poppins font-bold text-[#0266C1] my-7">Orders</h2>
        {orders.length > 0 ? (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-[#e5efff] rounded-md border border-gray-300 text-left text-sm text-gray-700">
              <thead className="bg-[#e5efff] text-[#666666] font-medium font-poppins">
                <tr>
                  <th className="px-4 py-3 border-b">#</th>
                  <th className="px-4 py-3 border-b">Name</th>
                  <th className="px-4 py-3 border-b">Price</th>
                  <th className="px-4 py-3 border-b">Address</th>
                  <th className="px-4 py-3 border-b">Date</th>
                </tr>
              </thead>
              <tbody className="bg-[#f4f8ff] font-normal text-[#666666] font-poppins">
                {orders.flatMap((order) =>
                  order.items.map((item, index) => ({
                    ...item,
                    product: item.productId,
                    description: order.shippingAddress,
                    date: order.createdAt,
                    time: order.updatedAt,
                  }))
                ).map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3">{item.product?.name || "Whole Body CheckUp"}</td>
                    <td className="px-4 py-3">{item.price}</td>
                    <td className="px-4 py-3">{item.description}</td>


                    <td className="px-4 py-3">
                      {new Date(item.date || item.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No order found.</p>
        )}
      </div >
      <Footer />
    </>
  );
};

export default History;
