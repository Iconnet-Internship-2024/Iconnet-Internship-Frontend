import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Authcontext";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State untuk menyimpan pesan kesalahan
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = () => {
    try {
      if (!identifier) {
        setErrorMessage("Identifier tidak boleh kosong");
        return;
      }

      if (!password) {
        setErrorMessage("Password tidak boleh kosong");
        return;
      }

      // Simulasikan login berhasil
      setIsLoggedIn(true);
      const userRole = 3; // Gantilah ini dengan logika peran pengguna yang sesuai

      // Cek peran pengguna
      if (userRole === 3) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      // Tangani kesalahan yang mungkin terjadi
      console.error("Login failed:", error.message);
      setErrorMessage("Terjadi kesalahan saat melakukan login");
    }
  };

  const handleLupaPassword = () => {
    navigate("/update-password");
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-[#FFFFFF] overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col w-96 p-8 bg-white border-4 border-[#CB1919] rounded-[28px] shadow-md items-center relative z-10">
          <img
            src="../src/assets/logo.svg"
            className="w-28 h-16 mb-6"
            alt="Logo"
          />
          <div className="text-black text-lg font-normal mb-2" style={{ marginTop: "-40px", fontFamily: 'Poppins' }}>
            Internship
          </div>

          <div className="flex flex-col w-full mb-4">
            <label className="text-sm font-semibold mb-1 text-gray-700" style={{ fontFamily: 'Poppins' }}>Username</label>
            <div className="relative w-full mb-4">
              <div className="absolute inset-0 m-1 border-2 border-[#CB1919] rounded-lg" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Username"
                className="relative w-full h-12 pl-4 bg-white rounded-lg focus:outline-none text-sm border border-[#9AB1BB]"
                style={{ fontFamily: 'Poppins' }}
              />
            </div>
          </div>

          <div className="flex flex-col w-full mb-4">
            <label className="text-sm font-semibold mb-1 text-gray-700" style={{ fontFamily: 'Poppins' }}>Password</label>
            <div className="relative w-full mb-4">
              <div className="absolute inset-0 m-1 border-2 border-[#CB1919] rounded-lg" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="relative w-full h-12 pl-4 bg-white rounded-lg focus:outline-none text-sm border border-[#9AB1BB]"
                style={{ fontFamily: 'Poppins' }}
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="text-white bg-[#CB1919] w-full p-3 rounded-lg mb-4"
            style={{ fontFamily: 'Poppins' }}
          >
            Login
          </button>

          <div
            onClick={handleLupaPassword}
            className="text-xs cursor-pointer text-[#3850F8] font-bold underline text-center w-full mb-2"
            style={{ fontFamily: 'Arial' }} // Menggunakan font default untuk "Lupa Password"
          >
            Lupa Password
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm text-left mt-4" style={{ fontFamily: 'Poppins' }}>
              {errorMessage}
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-center mt-8" style={{ fontFamily: 'Poppins', color: '#CB1919' }}>
        Copyright 2024 - PLN Icon Plus
      </p>
    </div>
  );
}
