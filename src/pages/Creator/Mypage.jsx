import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarCreator from "../../components/SidebarAdmin";
import ProfileForm from '../../components/ProfileForm';
import { getCookie } from '../../utils/cookie';
import ListPostCreator from '../ListPostCreator';

const MyPage = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    description: '',
    profile_picture: '',
    cover: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = getCookie('accessToken');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await axios.get('http://localhost:3000/profileCreator/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        alert(error.response?.data?.message || error.message || 'Unknown error');
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdateProfile = async (updatedData) => {
    try {
      const token = getCookie('accessToken');
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.put('http://localhost:3000/profileCreator/', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData(response.data.data);
      console.log('Profile updated:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || error.message || 'Unknown error');
    }
  };

  return (
    <div className="flex">
      <SidebarCreator />
      <div className="container mx-auto p-4">
        <ProfileForm profileData={profileData} onUpdateProfile={handleUpdateProfile} />
        <ListPostCreator/>
      </div>
    </div>
  );
};

export default MyPage;