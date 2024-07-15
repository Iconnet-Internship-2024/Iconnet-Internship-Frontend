import React from "react";
import { LuGraduationCap } from "react-icons/lu";

const Magang = () => {
  return (
    <div className="relative min-h-screen bg-[#CB1919]">
      <div className="absolute inset-x-0 top-0 z-10">
        {/* Navbar Component */}
        {/* Taruh konten Navbar di sini */}
      </div>
      <div className="max-w-screen-lg mx-auto py-8 px-4">
        <div className="bg-white border-2 border-black rounded-lg p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <LuGraduationCap className="text-4xl text-black mr-2" />
            <h2 className="text-2xl font-bold text-black">Magang/Kerja Praktik</h2>
          </div>
          <form className="space-y-8">
            <div className="flex flex-col">
              <input
                type="text"
                id="suratPengantar"
                placeholder="Surat Pengantar"
                className="border border-black rounded-lg px-4 py-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                id="transkrip"
                placeholder="Transkrip Nilai/Nilai Rapor"
                className="border border-black rounded-lg px-4 py-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                id="proposal"
                placeholder="Proposal"
                className="border border-black rounded-lg px-4 py-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                id="pasPhoto"
                placeholder="Pas Photo"
                className="border border-black rounded-lg px-4 py-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                id="tanggalMulai"
                placeholder="Tanggal Mulai"
                className="border border-black rounded-lg px-4 py-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                id="tanggalSelesai"
                placeholder="Tanggal Selesai"
                className="border border-black rounded-lg px-4 py-2 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-black w-full py-2 rounded-lg hover:bg-gray-800 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Magang;
