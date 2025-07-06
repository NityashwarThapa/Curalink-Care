import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const DoctorListComponent = ({ doctor }) => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <div className="flex flex-col  items-start md:items-center p-6 bg-white shadow-md rounded-lg mb-6">
      {/* Doctor Image - Ensure correct backend path */}
      <p className="text-[#042973] font-bold text-[20px] font-roboto mb-4">{doctor.specialization || "N/A"}</p>
      <img
        src={doctor.image || "/images/default-doctor.png"}
        alt={doctor.name}
        className="h-[124px] w-[124px] object-cover rounded-full my-4"
      />

      {/* Doctor Details */}
      <div className="flex-1">
        <h3 className="font-roboto font-bold text-[#0266C1] text-[20px] text-center my-4">
          {doctor.name}
        </h3>
        <p className="text-[#666666FA] font-worksans text-[16px] font-normal mt-4"><strong>Contact:</strong> {doctor.contact || "N/A"}</p>
        <p className="text-[#666666FA] font-worksans text-[16px] font-normal mb-4"><strong>Contact:</strong> {doctor.email || "N/A"}</p>

        {/* Hospital & Speciality */}
        <div className="flex flex-col justify-center items-center mt-4">
          <div>
            <p className="font-worksans font-normal text-[16px] text-[#0266C1] my-4">Read More...</p>
          </div>

          {/* Book Appointment Button */}
          <button
            className="px-4 py-2 bg-[#0266C1] font-worksans font-semibold text-white rounded-lg hover:bg-blue-700"
            onClick={() => navigate(`/book-appointment/${doctor._id}`)}
          >
            Book An Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorListComponent;
