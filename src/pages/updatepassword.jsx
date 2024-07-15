import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteCookie, getCookie } from "../utils/cookie";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
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
          oldPassword: passwords.oldPassword,
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
    <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-[#CB1919] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center w-full h-full m-1 rounded-lg">
        <div className="flex flex-col w-80 p-8 bg-white border border-black rounded-lg shadow-md items-center relative z-10">
          <img
            src="../src/assets/logo.svg"
            className="w-30 h-30 mb-1"
            alt="Logo"
          />
          <div className="text-black text-lg font-bold mb-4" style={{ marginTop: "-40px" }}>
            Internship
          </div>

          <form className="flex flex-col gap-4 w-full">
            {Object.keys(passwords).map((key, index) => (
              <input
                key={index}
                type="password"
                name={key}
                value={passwords[key]}
                onChange={handleInputChange}
                placeholder={
                  key === "oldPassword"
                    ? "Kata Sandi Lama"
                    : key === "newPassword"
                    ? "Kata Sandi Baru"
                    : "Konfirmasi Kata Sandi Baru"
                }
                className="focus:outline-none text-sm px-3 py-3 w-full bg-white border border-black rounded-lg"
              />
            ))}
          </form>

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

          <button
            onClick={handleUpdatePassword}
            className="text-white bg-black w-full py-3 rounded-lg mt-4"
            style={{ width: "100%" }}
          >
            Ubah Kata Sandi
          </button>
        </div>
      </div>
    </div>
  );
}
