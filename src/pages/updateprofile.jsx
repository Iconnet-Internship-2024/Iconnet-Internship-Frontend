import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../utils/cookie";

export default function UpdateProfile() {
  const [profileData, setProfileData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    about: "",
    occupation: "",
    nationality: "",
  });
  const [countries, setCountries] = useState([]);
  const [popUpMessage, setPopUpMessage] = useState(null); // State for pop-up message

  useEffect(() => {
    fetchProfileData();
    fetchCountries();
  }, []);

  useEffect(() => {
    let timer;
    if (popUpMessage) {
      timer = setTimeout(() => {
        setPopUpMessage(null);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [popUpMessage]);

  const fetchProfileData = async () => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProfileData(response.data);

      setFormData({
        name: response.data.name || "",
        gender: response.data.gender === "Male" ? "Male" : "Female",
        phone: response.data.phone || "",
        about: response.data.about || "",
        nationality: response.data.nationality || "",
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleMetamaskLogin = async () => {
    try {
      const accessToken = getCookie("accessToken");

      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const userAddress = accounts[0];

        const checkResponse = await axios.get(
          "http://localhost:3000/account/wallet",
          {
            params: {
              walletAddress: userAddress,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (checkResponse.data.exists) {
          alert("Anda sudah memiliki wallet address.");
        } else {
          const response = await axios.post(
            "http://localhost:3000/account/wallet",
            {
              walletAddress: userAddress,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          alert("Login dengan Metamask berhasil!");
          console.log(userAddress);
        }
      } else {
        window.open("https://metamask.io/download.html", "_blank");
        alert(
          "Metamask tidak terdeteksi, mohon download ekstensi metamask terlebih dahulu"
        );
      }
    } catch (error) {
      console.error("Login gagal:", error);
      alert("Terjadi kesalahan saat melakukan login menggunakan Metamask.");
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://localhost:3000/countries");
      const sortedCountries = response.data.sort((a, b) => {
        // Menggunakan localeCompare untuk membandingkan nama negara secara case insensitive
        return a.name.localeCompare(b.name);
      });
      setCountries(sortedCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        setPopUpMessage({
          message: "Access token not found. Please login again.",
          type: "error",
        });
        return;
      }

      const isDataChanged =
        formData.name !== profileData.name ||
        formData.gender !== profileData.gender ||
        formData.phone !== profileData.phone ||
        formData.about !== profileData.about ||
        formData.nationality !== profileData.nationality;

      if (!isDataChanged) {
        setPopUpMessage({
          message: "No changes detected.",
          type: "info",
        });
        return;
      }

      await axios.put("http://localhost:3000/profile/update", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPopUpMessage({
        message: "Changes saved successfully!",
        type: "success",
      });
      // Reload window after saving changes

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error saving changes:", error);
      setPopUpMessage({
        message: "Failed to save changes. Please try again later.",
        type: "error",
      });
    }
  };

  const inputFields = [
    { label: "Display Name", type: "text", name: "name", value: formData.name },
    {
      label: "Gender",
      type: "select",
      name: "gender",
      value: formData.gender,
      options: ["Male", "Female"],
    },
    { label: "Phone", type: "text", name: "phone", value: formData.phone },
    { label: "About Me", type: "text", name: "about", value: formData.about },
    // Add nationality field with options from countries
    {
      label: "Nationality",
      type: "select",
      name: "nationality",
      value: formData.nationality,
      options: countries.map((country) => country.name), // Map country names
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 mt-10 h-screen">
        {inputFields.map((field, index) => (
          <div key={index} className="flex flex-col gap-1">
            <label className="font-semibold">{field.label}</label>
            {field.type === "select" && (
              <select
                className="w-[600px] focus:outline-none py-2 border-b border-b-gray-300 bg-stone-100 hover:bg-white rounded-t-lg"
                name={field.name}
                value={field.value}
                onChange={handleInputChange}
              >
                {field.options.map((option, optionIndex) => (
                  <option
                    key={optionIndex}
                    className="bg-white text-black hover:bg-black hover:text-white"
                    value={option}
                    selected={option === formData.nationality} // Set selected attribute for default value
                  >
                    {option}
                  </option>
                ))}
              </select>
            )}
            {field.type !== "select" && (
              <input
                type={field.type}
                className="w-[600px] focus:outline-none py-2 border-b border-b-gray-300 bg-stone-100 hover:bg-white rounded-t-lg"
                name={field.name}
                value={field.value}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
        <div className="flex gap-8">
          <div className="flex items-center gap-8">
            <div
              className="bg-black text-white w-28 text-center p-1 rounded-lg hover:cursor-pointer hover:bg-gray-800 "
              onClick={handleSaveChanges}
            >
              Save
            </div>
          </div>
          <div
            className="flex items-center rounded-md duration-300 p-2 w-[180px] hover:cursor-pointer hover:bg-stone-200"
            onClick={handleMetamaskLogin}
          >
            <img
              className="w-12 h-12"
              src="https://i.imgur.com/xLaQSxJ.png"
              alt="MetaMask Logo"
            />
            <label className="text-xs text-orange-400 font-bold cursor-pointer">
              Connect with Metamask
            </label>
          </div>
        </div>
        {popUpMessage && (
          <div
            className={`fixed flex items-center gap-4 top-4 right-24 p-4 rounded-lg shadow-lg opacity-0 transition-opacity ${
              popUpMessage.type === "success"
                ? "bg-white text-green-500 font-bold opacity-100"
                : "bg-white text-red-800 font-bold opacity-100"
            }`}
          >
            <img
              src={
                popUpMessage.type === "success"
                  ? "../src/assets/check.svg" // Gambar untuk berhasil
                  : "../src/assets/cross.svg" // Gambar untuk gagal
              }
              className="w-8"
              alt={
                popUpMessage.type === "success" ? "Check icon" : "Cross icon"
              }
            />
            <p>{popUpMessage.message}</p>
          </div>
        )}
      </div>
    </>
  );
}
