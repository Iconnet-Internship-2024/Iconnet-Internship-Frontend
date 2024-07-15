import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../utils/cookie";

export default function Dashboard({ setShowHeaderFooter }) {
  const [name, setName] = useState("");

  useEffect(() => {
    setShowHeaderFooter(false);
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setName(response.data.name);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const menuItems = [
    {
      id: 1,
      title: "Questions",
      link: "/questions",
      color: "bg-gray-800",
      hoverColor: "bg-gray-700",
      logo: "../src/assets/question.svg",
      subtitle: "Questions by Users",
    },
    {
      id: 2,
      title: "Reports",
      link: "/reports",
      color: "bg-gray-800",
      hoverColor: "bg-gray-700",
      logo: "../src/assets/reports.svg",
      subtitle: "Reports by Users",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="https://i.imgur.com/5mJnBk4.png" className="w-24" />
      <div className="w-full text-center px-4 py-2 rounded-md mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to Your Dashboard, {name}!
        </h1>
        <p className="text-lg text-gray-600">Explore the options below:</p>
      </div>
      <div className="flex gap-4">
        {menuItems.map((menuItem) => (
          <Link key={menuItem.id} to={menuItem.link}>
            <div
              className={`gap-8 text-white px-3 py-3 rounded-lg shadow-md hover:${menuItem.hoverColor} cursor-pointer transition duration-300 ease-in-out ${menuItem.color}`}
            >
              <div className="flex flex-col w-[100px]  mb-2 gap-4">
                <img
                  src={menuItem.logo}
                  alt={`${menuItem.title} Logo`}
                  className="w-6 h-6 mr-2 fill-white"
                />
                <h2 className="text-lg font-bold">{menuItem.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
