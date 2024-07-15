import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../utils/cookie"; // Import function to get cookie

async function fetchProfile(accessToken) {
  try {
    const response = await axios.get("http://localhost:3000/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the profile!", error);
    return { name: "", nationality: "" }; // Return default values on error
  }
}

export default function Profile() {
  const [profile, setProfile] = useState({ name: "", nationality: "" });

  useEffect(() => {
    // Fetch profile data when component mounts
    const getProfile = async () => {
      // Get accessToken from cookie
      const accessToken = getCookie("accessToken");
      const profileData = await fetchProfile(accessToken);
      setProfile(profileData);
    };

    getProfile();
  }, []);

  return (
    <div className="flex items-center gap-3 border-b pb-2 mb-6">
      <div>
        <img
          src="https://i.imgur.com/eOx9uGG.jpeg"
          className="w-[40px] h-[40px] rounded-full"
          alt="Profile Picture"
        />
      </div>
      <div className="flex flex-col">
        <label>{profile.name}</label>
        <label>{profile.nationality}</label>
      </div>
    </div>
  );
}
