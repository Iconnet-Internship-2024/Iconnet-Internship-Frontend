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

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLupaPassword = () => {
    navigate("/update-password");
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-[#CB1919] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center w-full h-full">
        <div className="flex flex-col w-80 p-8 bg-white border border-black rounded-lg shadow-md items-center relative z-10">
          <img
            src="../src/assets/logo.svg"
            className="w-30 h-30 mb-1"
            alt="Logo"
          />
          <div className="text-black text-lg font-bold mb-2" style={{ marginTop: "-40px" }}>
            Internship
          </div>

          <div className="flex w-full mb-4">
            <div className="relative w-full">
              <div className="absolute inset-0 m-1 border-2 border-black rounded-lg" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Username/Email"
                className="relative w-full h-12 pl-4 bg-white rounded-lg focus:outline-none text-sm border border-black"
              />
            </div>
          </div>

          <div className="flex w-full mb-4">
            <div className="relative w-full">
              <div className="absolute inset-0 m-1 border-2 border-black rounded-lg" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="relative w-full h-12 pl-4 bg-white rounded-lg focus:outline-none text-sm border border-black"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="text-white bg-black w-full p-3 rounded-lg mb-4"
          >
            Login
          </button>

          <div className="flex justify-center w-full text-xs mb-2">
            <span className="font-bold">Belum punya akun? </span>
            <div
              className="cursor-pointer pl-1 text-black font-bold underline"
              onClick={handleRegister}
            >
              Register
            </div>
          </div>

          <div
            onClick={handleLupaPassword}
            className="text-xs cursor-pointer text-black font-bold underline text-center w-full mb-2"
          >
            Lupa Password
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm text-left mt-4">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
