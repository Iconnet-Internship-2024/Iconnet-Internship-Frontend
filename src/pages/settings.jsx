import React, { useState, useEffect } from "react";
import Account from "./account";
import Theme from "./theme";
import Sidebar from "../components/sidebar";
import Updateprofile from "./updateprofile";
import Subscription from "./subscription";
import Help from "./help";
import Terms from "./terms";
import Privacy from "./privacy";
import { useNavigate } from "react-router-dom";

export default function Settings({ setShowHeaderFooter }) {
  const [activePage, setActivePage] = useState("Profile");
  const navigate = useNavigate();

  const handlePageChange = (pageName) => {
    setActivePage(pageName);
  };

  useEffect(() => {
    setShowHeaderFooter(false);
  }, []);

  const handleBackClick = () => {
    setShowHeaderFooter(true);
    navigate("/");
  };

  return (
    <div className="flex">
      <Sidebar handlePageChange={handlePageChange} activePage={activePage} />
      <div className="ml-64 pl-8 pt-2 w-full">
        <div className=" flex items-center w-full justify-between font-bold mb-4 mt-6 text-2xl">
          <label>Settings</label>
          <div className="flex justify-end mb-8">
            <div className="flex flex-col align fixed items-center justify-end mr-12">
              <button onClick={handleBackClick}>
                <img
                  src="../src/assets/escape.svg"
                  className="w-8 h-8 hover:cursor-pointer hover:animate-pulse"
                ></img>
              </button>
              <span className="text-sm font-normal">Back</span>
            </div>
          </div>
        </div>

        <div className="w-full">
          {activePage === "Profile" && <Updateprofile />}
          {activePage === "Account" && <Account />}
          {activePage === "Theme" && <Theme />}
          {activePage === "Subscription" && <Subscription />}
          {activePage === "Help Center" && <Help />}
          {activePage === "Terms of Use" && <Terms />}
          {activePage === "Privacy Policy" && <Privacy />}
        </div>
      </div>
    </div>
  );
}
