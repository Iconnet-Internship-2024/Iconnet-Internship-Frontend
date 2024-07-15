import React from "react";
import { useNavigate } from "react-router-dom";
import { LuGraduationCap } from "react-icons/lu";
import { IoBookOutline } from "react-icons/io5";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleBoxClick = (path) => {
    navigate(path);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#CB1919] overflow-hidden">
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
        <div
          className="flex flex-col justify-center items-center bg-white border-2 border-black rounded-xl w-72 h-80 cursor-pointer hover:bg-gray-200"
          onClick={() => handleBoxClick('/magang')}
        >
          <LuGraduationCap size={100} />
          <span className="mt-4 text-lg font-bold">Magang/Kerja Praktik</span>
        </div>

        <div
          className="flex flex-col justify-center items-center bg-white border-2 border-black rounded-xl w-72 h-80 cursor-pointer hover:bg-gray-200"
          onClick={() => handleBoxClick('/pkl')}
        >
          <IoBookOutline size={100} />
          <span className="mt-4 text-lg font-bold">PKL</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
