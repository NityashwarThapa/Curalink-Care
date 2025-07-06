import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { FiFilter, FiGrid, FiList, FiSearch } from "react-icons/fi";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const PackageCard = ({ pkg }) => (
  <div className=" rounded-lg bg-white shadow-md p-4 mt-4 hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-[20px] text-[#042973] font-roboto font-bold text-center">{pkg.name}</h3>
    <div className="h-32 w-32 overflow-hidden flex justify-center items-center mx-auto">
      <img
        src={pkg.image ? pkg.image : "/images/default-package.png"}
        alt={pkg.name}
        className="object-cover h-full w-full rounded-full"
        loading="lazy"
      />
    </div>

    <h1 className="font-roboto text-[20px] font-bold text-[#0266C1] text-center my-4">
      NPR {pkg.price}
    </h1>
    <div className="space-y-2 my-4">

      <p className="text-[16px] text-[#666666FA] font-worksans font-normal">{pkg.description}</p>
      {/* <p className="text-sm text-gray-600">{pkg.servicesIncluded.join(", ")}</p> */}
      <div className="flex justify-between items-center">
        {/* <span className="text-sm text-gray-500">{pkg.duration} Days</span> */}
      </div>
      {/* <button className="mt-2 bg-primary text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-colors">
        Book Now
      </button> */}
      <div className="font-normal text-[16px] font-worksans text-[#0266C1] cursor-pointer"><p>Read more...</p></div>
    </div>
  </div>
);

const PackagesPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packageCategories, setPackageCategories] = useState(["All"]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:5003/packages");
        setPackages(response.data);

        // ✅ Extract unique package names dynamically for filtering
        const uniqueCategories = ["All", ...new Set(response.data.map(pkg => pkg.name))];
        setPackageCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const filteredPackages = useMemo(() => {
    let filtered = packages.filter(pkg => {
      const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || pkg.name === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // ✅ Sorting Logic
    if (sortOption === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "most-popular") {
      filtered.sort((a, b) => b.popularity - a.popularity); // Assuming popularity field exists
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortOption, packages]);

  return (
    <>
      <Navbar />
      <div className=" flex justify-center items-center bg-[#002570] text-center h-[448px] w-screen mt-[90px]">
        <h1 className="text-white font-extrabold font-poppins text-[48px]">Packages</h1>

      </div>
      <div className="min-h-screen bg-background p-6 mt-20 ">
        <div className="max-w-7xl mx-auto">


          <div className=" ">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 justify-between items-centerp-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <span className="bg-blue-700 text-white rounded-md p-2">
                  <FiFilter className="text-xl" />
                </span>
              </h3>


              {/* ✅ Category Filter */}
              <div>

                <label className="block text-sm font-medium mb-2">Package Name</label>
                <select
                  className="w-full p-2 border border-input rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {packageCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* ✅ Sorting Filter */}
              <div>

                <label className="block text-sm font-medium ">Sort By</label>
                <select
                  className="w-full p-2 border border-input rounded-md"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="default">All</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                  <option value="most-popular">Most Popular</option>
                </select>
              </div>
              <div className="relative flex-1 max-w-xl mt-4">
                <input
                  type="text"
                  placeholder="Search health packages..."
                  className="w-full pl-4 pr-20 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 md:top-1/3 -translate-y-1/2 bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700"
                >
                  Search
                </button>
              </div>

            </div>

            <div className=" md:col-span-3">
              {loading ? (
                <p className="text-center text-gray-600">Loading packages...</p>
              ) : filteredPackages.length === 0 ? (
                <p className="text-center text-gray-600">No packages found</p>
              ) : (
                <div>
                  <p className="font-bold text-xl text-primary">Packages</p>
                  <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10" : "space-y-6"}>

                    {filteredPackages.map(pkg => (
                      <PackageCard key={pkg._id} pkg={pkg} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PackagesPage;

