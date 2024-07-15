import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteCookie, getCookie } from "../utils/cookie";

export default function Account() {
  const [email, setEmail] = useState(""); // State untuk menyimpan alamat email
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmail(); // Panggil fungsi fetchEmail saat komponen dimuat
  }, []);

  const fetchEmail = async () => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.get("http://localhost:3000/account/email", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setEmail(response.data.email); // Set state dengan alamat email dari respons
    } catch (error) {
      console.error("Error fetching email:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        console.error("Token akses tidak tersedia.");
        return;
      }
      const response = await axios.delete("http://localhost:3000/auth/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        deleteCookie('accessToken')
        navigate("/");
      } else {
        console.error("Gagal logout:", response.data.msg);
      }
    } catch (error) {
      console.error("Error saat logout:", error.message);
    }
  };

  const handleUpdatePassword = async () => {
    navigate("/update-password");
  };

  return (
    <>
      <div className="h-screen">
        <div className="flex flex-col gap-1">
          <label className="font-semibold mt-6">Email</label>
          <input
            type="text"
            className={`w-[600px] focus:outline-none py-2 ${
              // theme === "dark"
              //   ? "bg-neutral-900 text-white border-b border-b-white hover:bg-neutral-800 hover:rounded-t-lg":
              "border-b border-b-gray-300 bg-stone-100 "
            }`}
            value={email} // Atur nilai input dengan alamat email dari state
            readOnly // Tetapkan input sebagai hanya baca
          ></input>
        </div>
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleLogout}
            className={`${"bg-black text-white rounded-md px-2 py-1 w-[150px] hover:bg-neutral-700 duration-150"}`}
          >
            Log Out
          </button>
          <button
            onClick={handleUpdatePassword}
            className={`${"bg-black text-white rounded-md px-2 py-1 w-[150px] hover:bg-neutral-700 duration-150"}`}
          >
            Change Password
          </button>
        </div>
      </div>
    </>
  );
}
