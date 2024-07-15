import React, { useState, useEffect, useContext } from "react";
import { Label, TextInput, Button, Select } from "flowbite-react";
import axios from "axios";
import { getCookie } from "../utils/cookie";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Authcontext";

function Upgradetocreators() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState(getCookie("accessToken"));
  const { updateIsCreator } = useContext(AuthContext);

  useEffect(() => {}, [token]);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleUpgrade = async (e) => {
    e.preventDefault();
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      alert("Access token not found. Please login again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/account/upgrade-role",
        { name, category },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSuccess(response.data.message);
      setError(null);
      navigate("/");
      setToken(response.data.accessToken);
      updateIsCreator(true);
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Internal server error"
      );
      setSuccess(null);
    }
  };

  return (
    <div className="flex justify-center h-screen pt-20">
      <div className="max-w-xl text-center">
        <div className="mb-4 mt-20 flex flex-col items-center">
          <img
            src="https://i.imgur.com/5mJnBk4.png"
            alt="Upgrade to creator"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <div
            className="text-black"
            style={{ fontSize: "2.0rem", fontWeight: "bold" }}
          >
            <Label
              htmlFor="name"
              value="UPGRADE TO CREATOR RANKARYA"
              color="black"
              style={{ fontSize: "1.2rem", fontWeight: "bold" }}
            />
          </div>
        </div>
        <form onSubmit={handleUpgrade}>
          <TextInput
            id="name"
            name="name"
            type="text"
            color="black"
            placeholder="Creator name"
            required
            value={name}
            onChange={handleInputChange}
            style={{
              width: "100%",
              height: "30px",
              fontSize: "1.0rem",
              padding: "0.5rem",
              marginTop: "0.5rem",
            }}
          />
          <Select
            id="category"
            name="category"
            color="black"
            required
            value={category}
            onChange={handleCategoryChange}
            style={{
              width: "100%",
              fontSize: "1.0rem",
              padding: "0.5rem",
              marginTop: "0.8rem",
            }}
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="art">Art</option>
            <option value="music">Music</option>
            <option value="photography">Photography</option>
            <option value="game">Game</option>
            <option value="podcast">Podcast</option>
          </Select>
          <div className="text-sm mt-4">
            By clicking "Upgrade," you agree to our
            <a
              href="/terms"
              className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Terms and Conditions
            </a>
            and
            <a
              href="/privacy"
              className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Privacy Policy
            </a>
            .
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          {success && <div className="text-green-500 mt-2">{success}</div>}
          <div className="relative mt-8">
            <Button
              type="submit"
              size="lg"
              color="orange"
              style={{
                backgroundColor: "orange",
                color: "black",
                fontWeight: "bold",
              }}
              className="w-full border border-orange"
            >
              Upgrade
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upgradetocreators;
