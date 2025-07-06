
import axios from "axios";
import React, { useEffect, useState } from "react";
import DoctorListComponent from "../components/DocList/doclist";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [specialities, setSpecialities] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5003/doctors/getAll");

        // Normalize specialization casing
        const normalizedDoctors = response.data.map(doc => ({
          ...doc,
          specialization:
            doc.specialization?.charAt(0).toUpperCase() +
            doc.specialization?.slice(1).toLowerCase()
        }));

        setDoctors(normalizedDoctors);

        const uniqueSpecialities = [
          ...new Set(normalizedDoctors.map(doc => doc.specialization))
        ];
        setSpecialities(uniqueSpecialities);
      } catch (err) {
        setError("Failed to load doctors. Please try again.");
        console.error("❌ Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      <Navbar />

      {/* Banner */}
      <div className="relative h-[448px] mt-[90px]">
        <img
          src="/images/doct.png"
          alt="Contact Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-700 bg-opacity-70"></div>
        <div className="relative flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold">Doctor</h1>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-col min-h-screen bg-blue-50">
        <div className="max-w-7xl mx-auto flex-grow py-10 px-4">
          {loading ? (
            <p className="text-gray-600">Loading doctors...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <div className="space-y-12">
              {specialities.map((speciality) => {
                const doctorsBySpeciality = doctors.filter(
                  (doc) => doc.specialization === speciality
                );

                return (
                  <div key={speciality}>
                    <h2 className="text-2xl font-bold text-blue-700 mb-6">
                      {speciality} Specialists
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {doctorsBySpeciality.map((doctor) => (
                        <DoctorListComponent key={doctor._id} doctor={doctor} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DoctorsPage;

