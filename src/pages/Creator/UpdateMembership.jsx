import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarCreator from "../../components/Sidebar-creator";
import { getCookie } from '../../utils/cookie';

function UpdateMembership() {
  const { id } = useParams();
  const [tierName, setTierName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTier = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tier/${id}`, {
          headers: {
            'Authorization': `Bearer ${getCookie('accessToken')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tier');
        }

        const result = await response.json();
        const { tier_name, description, price, card } = result.data;
        setTierName(tier_name);
        setDescription(description);
        setPrice(price);
        setCard(card);
      } catch (error) {
        console.error('Error:', error);
        alert('Error fetching tier details');
      }
    };

    fetchTier();
  }, [id]);

  const handleFileChange = (e) => {
    setCard(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tier_name", tierName);
    formData.append("description", description);
    formData.append("price", price);
    if (card instanceof File) {
      formData.append("card", card);
    }

    try {
      const response = await fetch(`http://localhost:3000/tier/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update tier');
      }

      const result = await response.json();
      alert(result.message);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating tier');
    }
  };

  return (
    <div style={{ display: "flex" }} className='pb-12'>
      <SidebarCreator />
      <div style={{ marginLeft: "20px", marginTop: "70px" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "30px" }}>Update Membership</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
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
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
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
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
              Card:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            {card && !(card instanceof File) && (
              <div style={{ marginTop: "10px" }}>
                <img src={card} alt="Current Card" style={{ width: "50%", height: "auto", borderRadius: "5px" }} />
              </div>
            )}
          </div>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateMembership;