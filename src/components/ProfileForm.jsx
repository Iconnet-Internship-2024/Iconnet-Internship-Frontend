import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiImageAddLine, RiAccountCircleFill } from 'react-icons/ri';
import { getCookie } from '../utils/cookie';

const ProfileForm = ({ profileData = {}, onUpdateProfile }) => {
  // Initialize formData with a fallback object structure to prevent undefined properties
  const [formData, setFormData] = useState({
    name: profileData.name || '',
    description: profileData.description || '',
    profile_picture: profileData.profile_picture || '',
    cover: profileData.cover || ''
  });
  const [changeSaved, setChangeSaved] = useState(false);

  useEffect(() => {
    setFormData({
      name: profileData.name || '',
      description: profileData.description || '',
      profile_picture: profileData.profile_picture || '',
      cover: profileData.cover || ''
    });
  }, [profileData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const newFormData = new FormData();
    newFormData.append('profile_picture', file);
    newFormData.append('originalname', file.name);

    try {
      const response = await axios.put('http://localhost:3000/profileCreator/', newFormData, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const updatedProfileData = {
        ...formData,
        profile_picture: response.data.data.profile_picture,
      };
      setFormData(updatedProfileData);
      setChangeSaved(true);
      setTimeout(() => setChangeSaved(false), 3000);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleCoverInputChange = async (event) => {
    const file = event.target.files[0];
    const newFormData = new FormData();
    newFormData.append('cover', file);
    newFormData.append('originalname', file.name);

    try {
      const response = await axios.put('http://localhost:3000/profileCreator/', newFormData, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const updatedProfileData = {
        ...formData,
        cover: response.data.data.cover,
      };
      setFormData(updatedProfileData);
      setChangeSaved(true);
      setTimeout(() => setChangeSaved(false), 3000);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleCoverIconClick = () => {
    document.getElementById('cover_picture').click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Only send relevant fields in the update profile request
      const { name, description } = formData;
      const updatedProfile = await onUpdateProfile({ name, description });
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...updatedProfile
      }));
      setChangeSaved(true);
      setTimeout(() => setChangeSaved(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative bg-no-repeat bg-cover rounded-2xl text-white p-4 md:p-10 lg:p-16" style={{ backgroundImage: `url(${formData.cover || 'default_cover_url'})` }}>
      <div className="absolute inset-0 bg-black opacity-30 rounded-[20px]"></div>
      <div className="relative flex flex-col md:flex-row md:items-center gap-4">
        <div className="col-span-1 flex justify-center md:justify-start relative">
          <label htmlFor="profile_picture" className="cursor-pointer">
            {formData.profile_picture ? (
              <img src={formData.profile_picture} alt="Avatar" className="w-36 h-36 md:w-48 md:h-48 rounded-full" />
            ) : (
              <RiAccountCircleFill className="w-36 h-36 md:w-48 md:h-48 rounded-full text-white" />
            )}
            <input type="file" id="profile_picture" name="profile_picture" className="hidden" onChange={handleFileInputChange} />
            <RiImageAddLine className="absolute right-0 bottom-0 w-auto h-6 mr-1 text-stone-200 duration-200 cursor-pointer hover:text-white" />
          </label>
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Add username"
            className="text-2xl md:text-4xl font-bold mb-2 bg-transparent border-b border-white"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Add headline"
            className="text-lg md:text-xl bg-transparent border-b text-white placeholder:text-white border-white"
          ></textarea>
        </div>
      </div>
      <button type="submit" className="absolute bottom-4 right-4 bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Update Profile
      </button>
      {changeSaved && <p className="absolute bottom-4 left-4 text-black-500">Changes saved</p>}
      <input type="file" id="cover_picture" name="cover" className="hidden" onChange={handleCoverInputChange} />
      <RiImageAddLine className="absolute top-0 right-0 m-4 w-auto h-6 text-stone-200 duration-200 cursor-pointer hover:text-white" onClick={handleCoverIconClick} />
    </form>
  );
};

export default ProfileForm;
