import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State untuk menyimpan pesan kesalahan
  const [successMessage, setSuccessMessage] = useState(""); // State untuk menyimpan pesan sukses
  const { username, email, password, confPassword } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!username || !email || !password || !confPassword) {
      setErrorMessage("Semua field harus diisi");
      return;
    }

    if (password !== confPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok");
      return;
    }

    // Jika pendaftaran berhasil, tampilkan pesan konfirmasi
    setSuccessMessage(
      "Register berhasil. Anda akan diarahkan ke halaman login."
    );

    // Atur timer untuk navigasi ke halaman login setelah beberapa detik
    setTimeout(() => {
      navigate("/login");
    }, 5000); // 5 detik
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-[#CB1919] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center w-full h-full m-1 border-2 border-black rounded-lg">
        <div className="flex flex-col w-80 p-8 bg-white border border-black rounded-lg shadow-md items-center relative z-10">
          <img
            src="../src/assets/logo.svg"
            className="w-30 h-30 mb-1"
            alt="Logo"
          />
          <div className="text-black text-lg font-bold mb-2" style={{ marginTop: "-40px" }}>
            Internship
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Username"
              className="focus:outline-none text-sm px-3 py-3 w-full bg-white border border-black rounded-lg"
              style={{ marginBottom: "8px" }}
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              className="focus:outline-none text-sm px-3 py-3 w-full bg-white border border-black rounded-lg"
              style={{ marginBottom: "8px" }}
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              className="focus:outline-none text-sm px-3 py-3 w-full bg-white border border-black rounded-lg"
              style={{ marginBottom: "8px" }}
            />
            <input
              type="password"
              name="confPassword"
              value={confPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="focus:outline-none text-sm px-3 py-3 w-full bg-white border border-black rounded-lg"
              style={{ marginBottom: "12px" }}
            />
          </form>

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm mt-2">{successMessage}</div>
          )}

          <button
            type="submit"
            onClick={handleSubmit} // Menggunakan handler untuk submit form
            className="text-white bg-black w-full p-3 rounded-lg"
            style={{ marginBottom: "16px" }}
          >
            Register
          </button>

          <div className="flex justify-center w-full text-xs">
            <span className="font-bold">Sudah punya akun? </span>
            <div
              className="cursor-pointer pl-1 text-black font-bold underline"
              onClick={() => navigate("/login")}
            >
              Login
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
