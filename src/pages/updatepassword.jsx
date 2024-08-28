import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteCookie, getCookie } from "../utils/cookie";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async () => {
    try {
      const accessToken = getCookie("accessToken");

      const response = await axios.put(
        "http://localhost:3000/auth/update-password",
        {
          newPassword: passwords.newPassword,
          confNewPassword: passwords.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Jika berhasil, tampilkan pesan berhasil
        alert(response.data.msg);
        deleteCookie("accessToken");
        navigate("/");
      } else {
        setErrorMessage(response.data.msg);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage("Terjadi kesalahan saat mengubah kata sandi.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-white">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="bg-white border-4 border-[#CB1919] rounded-[28px] p-8 w-[384px] shadow-md">
          <h2 className="text-xl font-bold text-black mb-2 text-left">
            Atur Ulang Password
          </h2>
          <p className="text-left text-gray-600 mb-4 leading-snug">
            Kata sandi Anda yang baru harus berbeda dengan kata sandi Anda
            sebelumnya.
          </p>

          <form className="flex flex-col w-full mb-4">
            <div className="flex flex-col w-full mb-4">
              <label className="text-left text-sm font-semibold mb-1 text-gray-700" style={{ fontFamily: 'Poppins' }}>
                Password Baru
              </label>
              <div className="relative w-full mb-4">
                <div className="absolute inset-0 m-1 border-2 border-[#CB1919] rounded-lg" />
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleInputChange}
                  placeholder="Password Baru"
                  className="relative w-full h-12 pl-4 bg-white rounded-lg focus:outline-none text-sm border border-[#9AB1BB]"
                  style={{ fontFamily: 'Poppins' }}
                />
              </div>
            </div>

            <div className="flex flex-col w-full mb-4">
              <label className="text-left text-sm font-semibold mb-1 text-gray-700" style={{ fontFamily: 'Poppins' }}>
                Konfirmasi Password Baru
              </label>
              <div className="relative w-full mb-4">
                <div className="absolute inset-0 m-1 border-2 border-[#CB1919] rounded-lg" />
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwords.confirmNewPassword}
                  onChange={handleInputChange}
                  placeholder="Ulangi Password Baru"
                  className="relative w-full h-12 pl-4 bg-white rounded-lg focus:outline-none text-sm border border-[#9AB1BB]"
                  style={{ fontFamily: 'Poppins' }}
                />
              </div>
            </div>
          </form>

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2 text-center" style={{ fontFamily: 'Poppins' }}>
              {errorMessage}
            </div>
          )}

          <button
            onClick={handleUpdatePassword}
            className="text-white bg-[#CB1919] w-full py-3 rounded-lg mt-4"
            style={{ fontFamily: 'Poppins', marginTop: '-12px' }}
          >
            Reset Password
          </button>
        </div>
      </div>
      
      <p className="text-xs text-center mt-8 mb-4" style={{ fontFamily: 'Poppins', color: '#CB1919' }}>
        Copyright 2024 - PLN Icon Plus
      </p>
    </div>
  );
}
