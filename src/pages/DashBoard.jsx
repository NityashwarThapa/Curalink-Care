import React from "react";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="">
        {/* Hero Section */}
        <section className="bg-blue-5  relative bg-[#002570FA]">
          <div className=" max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center relative">

            <div className="lg:w-1/2 flex justify-center relative mt-10 lg:mt-0 ">
              {/* White circular background */}
              {/* <div className="absolute bg-white w-[400px] h-[400px] rounded-full -top-25"></div> */}
              {/* Doctor image */}
              <img
                src="/images/doctor.png"
                alt="Doctor"
                className="relative bottom-[-100px] z-10 w-3/4 lg:w-full object-contain -mt-10"
              />
              <div className=" absolute bottom-[-200px] md:bottom-[-100px]  bg-[#0266C1] rounded-lg w-[100%] md:w-[800px]  lg:w-[1000px] h-[200px] lg:ml-[400px]  ">
                <div className="flex flex-row justify-between lg:justify-end  items-end py-4 px-2 lg:mr-40 gap-16">
                  <div className="flex flex-col pt-20 md:items-center  justify-end">
                    <p className="text-white font-bold text-lg">100+</p>
                    <p className="text-white ">Online Support</p>
                  </div>
                  <div className="flex flex-col items-center  justify-end "><p className="text-white font-bold text-lg">1M+</p>
                    <p className="text-white ">Online Support</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 md:mt-0 mt-52 lg:pb-0 pb-3">
              <h1 className="text-5xl font-extrabold text-white mb-4 leading-snug">
                Best Caring,</h1>
              <h1 className="text-5xl font-extrabold text-[#0266C1] mb-4 leading-snug">
                Better Doctors</h1>
              <p className="text-white mb-6">
                Exceptional care starts with better doctors and ends with your complete wellness.              </p>
              <div className="flex items-center bg-white p-3 rounded-lg shadow-lg">
                <input
                  type="text"
                  placeholder="Search Doctors in your location"
                  className="flex-grow px-4 py-2 text-black border-none focus:outline-none focus:ring-0"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className=" text-white pt-32 px-4"> {/* Added negative margin-top */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-between items-center gap-8 p-2">
            <div>
              <h2 className="text-4xl font-bold text-black">ExtravOrdinary</h2>
              <h2 className="text-4xl font-bold text-[#0266C1]"> Health Solution</h2>
            </div>
            <div>
              <p className="text-black">At CureLink Care, we go beyond the ordinary to connect you with personalized, reliable, and innovative healthcare solutions — making quality care more accessible, compassionate, and efficient for a healthier tomorrow.</p>
            </div>
            <div>
              <p className="bg-[#0266C1] text-lg p-2 rounded-md w-2/3">More Department</p>
            </div>
          </div>
        </section>



        {/* Consulting Specialists */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Primary Care",
                  description: "Personalized medical advice for general health, check-ups, and preventive care.",
                  icon: "/images/primary.png" // ✅ Use an image of a doctor consulting with a patient 
                },
                {
                  title: "Cardio and Respiratory",
                  description: "Advanced consultation for heart and lung-related conditions with certified specialists.",
                  icon: "/images/cardio.jpg" // ✅ Use an image of a cardiologist with a heart monitor or lungs scan
                },
                {
                  title: "Nutrition and Wellness",
                  description: "Expert help with supplements, diet plans, and achieving a healthier lifestyle.",
                  icon: "/images/wellness.png" // ✅ Use an image of vitamins and health supplements in bottles
                },
                {
                  title: "Mind and Mood",
                  description: "Professional support for mental clarity, emotional balance, and psychological health.",
                  icon: "/images/mind.png" // ✅ Use an image of a psychologist talking to a patient
                },
              ].map((specialist, index) => (
                <div
                  key={index}
                  className={`p-6 border rounded-lg shadow-lg ${index === 80 ? "bg-blue-50 border-blue-600" : "bg-white"
                    }`}
                >
                  <h3
                    className={`text-lg font-bold mb-2 text-center ${index === 1 ? "text-blue-600" : "text-gray-800"
                      }`}
                  >
                    {specialist.title}
                  </h3>
                  <div className="flex justify-center items-center w-20 h-20   mx-auto mb-4">
                    <img
                      src={specialist.icon}
                      alt={specialist.title}
                      className="w-full h-full object-cover "
                    />
                  </div>
                  <p className="text-gray-600 text-center">
                    {specialist.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className=" py-20 ">
          <div className="max-w-7xl mx-auto px-6  lg:gap-x-10 items-center z-10">
            {/* Image Section */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div></div>
              {/* Text Section */}
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Why You Choose Us?</h2>
                <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">

                </div>
                <ul className="text-gray-600 space-y-3 mb-6">
                  {[
                    "Consult top medical professionals across specialties.",
                    "Reliable, around-the-clock support when you need it most.",
                    "A platform trusted by patients worldwide.",
                  ].map((reason, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-blue-600 mr-2">✔</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 bg-blue-500 py-16 overflow-visible">
              {/* Image: hidden on small screens, shown on md+ */}
              <div className="relative hidden md:flex justify-center items-center  ">
                <img
                  src="/images/asth.png"
                  alt="Future Health"
                  className="absolute top-1/2 -translate-y-1/2 h-[300px] w-[400px] object-contain"
                />
              </div>

              {/* Text Section */}
              <div className="flex flex-col justify-center text-white px-4">
                <div>
                  <h1 className="font-poppins font-bold text-[24px] text-[#042973] mb-2">Advancing Health <span className="font-poppins font-bold text-[24px] text-[#E1EDFFFA]">for Tomorrow</span></h1>
                  <p className="font-poppins font-normal text-[16px] mb-2">Shaping a healthier future with care, technology, and innovation.</p>

                  <div className="relative w-full max-w-md  ">
                    <ul className="flex justify-start text-sm transition-all duration-500 ">
                      <div className="flex items-center justify-end rounded-md pr-10 w-[311px]">
                        <input
                          type="email"
                          placeholder="Your email address"
                          className="flex-grow  text-[#FFFFFF] rounded-lg font-poppins text-[16px] font-normal  bg-white rounded-l-lg p-4 border-gray-200 w-[311px]  shadow-inner bg-transparent  placeholder-gray-500 focus:outline-none"
                        />
                        <button className="absolute rounded-lg  mr-3 bg-[#F2BD17] p-[14px] rounded-r-lg hover:bg-blue-800 transition text-white">
                          <p>Search</p>
                        </button>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>




          </div>
        </section>


      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
