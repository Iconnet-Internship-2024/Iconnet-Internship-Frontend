import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../../utils/cookie";
import AdminSidebar from "../../components/SidebarAdmin";
import { FaRegUserCircle, FaUser } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Januari', MagangKP: 10, PKL: 20 },
  { month: 'Februari', MagangKP: 15, PKL: 25 },
  { month: 'Maret', MagangKP: 20, PKL: 30 },
  { month: 'April', MagangKP: 25, PKL: 35 },
  { month: 'Mei', MagangKP: 30, PKL: 40 },
  { month: 'Juni', MagangKP: 35, PKL: 45 },
  { month: 'Juli', MagangKP: 40, PKL: 50 },
  { month: 'Agustus', MagangKP: 45, PKL: 55 },
  { month: 'September', MagangKP: 50, PKL: 60 },
  { month: 'Oktober', MagangKP: 55, PKL: 65 },
  { month: 'November', MagangKP: 60, PKL: 70 },
  { month: 'Desember', MagangKP: 65, PKL: 75 }
];

export default function Dashboard({ setShowHeaderFooter }) {
  const [name, setName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLinkClicked, setIsLinkClicked] = useState(false);

  useEffect(() => {
    setShowHeaderFooter(false);
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setName(response.data.name);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Handle logout functionality
    console.log("Logout clicked");
  };

  const pengajuanItems = Array(10).fill({
    title: "Review candidate applications",
    time: "Today - 11.30 AM"
  });

  const handleLinkClick = () => {
    setIsLinkClicked(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-[#CB1919]" style={{ fontFamily: 'Poppins' }}>Dashboard</h1>
            <p className="text-md text-[#ABABAB]" style={{ fontFamily: 'Poppins' }}>Kamis, 1 Agustus 2024</p>
          </div>

          {/* Profile Box with Dropdown */}
          <div className="relative w-[240px] h-[40px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaRegUserCircle className="text-black text-2xl" />
            </div>
            <div className="w-full h-full pl-10 pr-4 py-2 rounded-[20px] border border-[#9AB1BB] outline-none flex items-center justify-between">
              <p className="font-normal text-black" style={{ fontFamily: 'Poppins' }}>admin1@email.com</p>
              <button
                onClick={toggleDropdown}
                className="text-black"
                aria-label="Dropdown"
              >
                <HiChevronDown />
              </button>
            </div>
            <svg
              width="240"
              height="40"
              viewBox="0 0 240 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0 pointer-events-none"
            >
              <rect
                x="0.5"
                y="0.5"
                width="239"
                height="39"
                rx="20"
                stroke="#9AB1BB"
              />
            </svg>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                <Link
                  to="/profile"
                  className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
                >
                  <FaUser className="inline mr-2" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
                >
                  <TbLogout2 className="inline mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Welcome Box */}
        <div className="bg-[#FFFFFF] shadow-md rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold text-[#CB1919]" style={{ fontFamily: 'Poppins' }}>Hallo Admin 1!</h2>
          <p className="text-base" style={{ fontFamily: 'Poppins' }}>Selamat Datang di Dashboard Iconnet Internship</p>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="h-40 bg-purple-200 rounded-lg flex flex-col justify-center items-center p-4">
            <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Poppins' }}>Total Pengajuan</h2>
            <p className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins' }}>200</p>
            <div className="flex flex-col items-center">
              <p className="text-purple-600" style={{ fontFamily: 'Poppins' }}>120 Magang/KP</p>
              <p className="text-purple-600" style={{ fontFamily: 'Poppins' }}>80 PKL</p>
            </div>
          </div>
          <div className="h-40 bg-yellow-200 rounded-lg flex flex-col justify-center items-center p-4">
            <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Poppins' }}>Pengajuan Diproses</h2>
            <p className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins' }}>200</p>
            <div className="flex flex-col items-center">
              <p className="text-yellow-600" style={{ fontFamily: 'Poppins' }}>120 Magang/KP</p>
              <p className="text-yellow-600" style={{ fontFamily: 'Poppins' }}>80 PKL</p>
            </div>
          </div>
          <div className="h-40 bg-blue-200 rounded-lg flex flex-col justify-center items-center p-4">
            <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Poppins' }}>Pengajuan Diterima</h2>
            <p className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins' }}>36</p>
            <div className="flex flex-col items-center">
              <p className="text-blue-600" style={{ fontFamily: 'Poppins' }}>30 Magang/KP</p>
              <p className="text-blue-600" style={{ fontFamily: 'Poppins' }}>6 PKL</p>
            </div>
          </div>
          <div className="h-40 bg-red-200 rounded-lg flex flex-col justify-center items-center p-4">
            <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Poppins' }}>Pengajuan Ditolak</h2>
            <p className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins' }}>164</p>
            <div className="flex flex-col items-center">
              <p className="text-red-600" style={{ fontFamily: 'Poppins' }}>90 Magang/KP</p>
              <p className="text-red-600" style={{ fontFamily: 'Poppins' }}>74 PKL</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-[24rem] bg-[#FFFFFF] rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ angle: -45, textAnchor: 'end' }} interval={0} height={60} />
              <YAxis />
              <Tooltip />
              <Legend wrapperStyle={{ marginTop: 10 }} />
              <Bar dataKey="MagangKP" fill="#2B8EFF" barSize={40} />
              <Bar dataKey="PKL" fill="#FF2B2B" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
          </div>
          <div className="h-[24rem] bg-[#FFFFFF] rounded-lg p-4 overflow-hidden flex flex-col justify-between">
            <div>
              <h2 className="text-center text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins' }}>Pengajuan Terlama</h2>
              <div className="h-64 overflow-y-auto">
                {pengajuanItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-100 rounded-lg mb-2"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                    <div className="text-gray-400">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-4">
              <Link
                to="/pengajuan"
                onClick={handleLinkClick}
                className={`text-red-500 font-semibold hover:underline hover:text-red-700 ${isLinkClicked ? "underline text-red-700" : ""}`}
                style={{ fontFamily: 'Poppins' }}
              >
                Lihat Semua Pengajuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
