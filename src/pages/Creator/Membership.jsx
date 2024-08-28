import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarCreator from "../../components/SidebarAdmin";
import { getCookie } from '../../utils/cookie';

function Membership() {
  const [tierName, setTierName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setCard(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tier_name", tierName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("card", card);

    try {
      const response = await fetch('http://localhost:3000/tier', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getCookie('accessToken')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to create tier');
      }

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating tier');
    }
  };

  const handleListMembershipClick = () => {
    navigate('/ListMembership'); // Mengarahkan ke ListMembership
  };

  return (
    <div style={{ display: "flex" }}>
      <SidebarCreator />
      <div style={{ marginLeft: "20px", marginTop: "70px", width: "100%" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "30px" }}>
          Membership Settings
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
            <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
              Tier Name:
            </label>
            <input
              type="text"
              value={tierName}
              onChange={(e) => setTierName(e.target.value)}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
            <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
            <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
              Price:
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
            <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
              Card:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Create
            </button>
            <button
              type="button"
              onClick={handleListMembershipClick}
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              List Membership
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Membership;
