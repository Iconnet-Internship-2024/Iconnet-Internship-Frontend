import React from "react";
import SidebarCreator from "../../components/SidebarAdmin";

function SettingsCreator() {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <SidebarCreator />
      </div>
      <div style={{ marginLeft: "20px", marginTop: "70px" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "30px" }}>
          Creator Settings
        </h1>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Profile Picture:
          </label>
          <input
            type="file"
            accept="image/*"
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Change Username:
          </label>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Email:
          </label>
          <input
            type="email"
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Password:
          </label>
          <input
            type="password"
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Change Password:
          </label>
          <input
            type="password"
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>
        <div>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsCreator;
