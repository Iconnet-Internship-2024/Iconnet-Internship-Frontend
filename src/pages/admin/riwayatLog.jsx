import React, { useState } from 'react';
import AdminSidebar from "../../components/SidebarAdmin";
import { FaRegUserCircle, FaUser } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import { TbLogout2 } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const RiwayatLog = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleLogout = () => {
    // Add your logout logic here
  };

  return (
    <div className="flex font-poppins">
      <AdminSidebar />
      <div className="flex-1 p-4 relative">
        {/* Profile Box with Dropdown */}
        <div className="absolute top-4 right-4 w-[240px] h-[40px]">
          <div className="relative">
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
        </div>

        <h1 className="text-red-600 text-2xl font-bold mb-4">Riwayat Log</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-2 font-bold">Hari Ini</h2>
            <div className="bg-white p-4 rounded shadow space-y-4">
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">14.15</span> Admin1 mengubah status ID pengajuan <span className="font-bold">7538928198139819</span> dari <span className="text-blue-500 font-bold">Menunggu Diproses</span> menjadi <span className="text-red-500 font-bold">Diproses</span></p>
              </div>
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">14.13</span> Admin1 menghapus ID pengajuan <span className="font-bold">7538928198139815</span></p>
              </div>
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">14.12</span> Admin1 mengubah status ID pengajuan <span className="font-bold">7538928198139813</span> dari <span className="text-red-500 font-bold">Diproses</span> menjadi <span className="text-green-500 font-bold">Diterima</span></p>
              </div>
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">14.10</span> Admin1 menghapus ID pengajuan <span className="font-bold">7538928198139810</span></p>
              </div>
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">14.08</span> Admin1 mengubah status ID pengajuan <span className="font-bold">7538928198139809</span> dari <span className="text-blue-500 font-bold">Menunggu Diproses</span> menjadi <span className="text-red-500 font-bold">Diproses</span></p>
              </div>
              <a href="#" className="text-red-600 font-bold">Tampilkan Lebih Banyak...</a>
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-semibold mb-2 font-bold">Kemarin</h2>
            <div className="bg-white p-4 rounded shadow space-y-4">
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">09.13</span> Admin1 mengubah status ID pengajuan <span className="font-bold">7538928198139819</span> dari <span className="text-blue-500 font-bold">Menunggu Diproses</span> menjadi <span className="text-red-500 font-bold">Diproses</span></p>
              </div>
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">09.12</span> Admin1 menghapus ID pengajuan <span className="font-bold">7538928198139815</span></p>
              </div>
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">09.10</span> Admin1 mengubah status ID pengajuan <span className="font-bold">7538928198139813</span> dari <span className="text-red-500 font-bold">Diproses</span> menjadi <span className="text-green-500 font-bold">Diterima</span></p>
              </div>
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">08.10</span> Admin1 menghapus ID pengajuan <span className="font-bold">7538928198139810</span></p>
              </div>
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">08.09</span> Admin1 mengubah status ID pengajuan <span className="font-bold">7538928198139809</span> dari <span className="text-blue-500 font-bold">Menunggu Diproses</span> menjadi <span className="text-red-500 font-bold">Diproses</span></p>
              </div>
              <a href="#" className="text-red-600 font-bold">Tampilkan Lebih Banyak...</a>
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-semibold mb-2 font-bold">Terbaru</h2>
            <div className="bg-white p-4 rounded shadow space-y-4">
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">Senin</span> Admin1 mengubah status ID pengajuan <span className="font-bold">7538928198139819</span> dari <span className="text-blue-500 font-bold">Menunggu Diproses</span> menjadi <span className="text-red-500 font-bold">Diproses</span></p>
              </div>
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">Jumat</span> Admin1 mengubah status ID pengajuan <span className="font-bold">7538928198139815</span> dari <span className="text-blue-500 font-bold">Menunggu Diproses</span> menjadi <span className="text-red-500 font-bold">Diproses</span></p>
              </div>
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">Kamis</span> Admin1 mengubah status ID pengajuan <span className="font-bold">7538928198139813</span> dari <span className="text-red-500 font-bold">Diproses</span> menjadi <span className="text-green-500 font-bold">Diterima</span></p>
              </div>
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">Rabu</span> Admin1 menghapus ID pengajuan <span className="font-bold">7538928198139810</span></p>
              </div>
              <div className="border-b border-gray-300 pb-2 mb-2">
                <p className="text-gray-700"><span className="font-bold">Selasa</span> Admin1 mengubah status ID pengajuan <span className="font-bold">7538928198139809</span> dari <span className="text-blue-500 font-bold">Menunggu Diproses</span> menjadi <span className="text-red-500 font-bold">Diproses</span></p>
              </div>
              <a href="#" className="text-red-600 font-bold">Tampilkan Lebih Banyak...</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default RiwayatLog;
