import React, { useState, useEffect } from "react";
import moment from "moment";
import SidebarCreator from "../../components/Sidebar-creator";

function Audience() {
  const [audienceData, setAudienceData] = useState([]);

  useEffect(() => {
    fetchAudienceData();
  }, []);

  const fetchAudienceData = async () => {
    try {
      const response = await fetch("http://localhost:3000/audience");
      const data = await response.json();
      const formattedData = data.map((item) => {
        const subscriptions = item.subscriptions.map((sub) => ({
          Username: item.Username,
          Email: item.Email,
          "Current Tier": sub.tier["Current Tier"],
          "Join Date": formatDateTime(sub["Join Date"]),
          "Last Charge Date": formatDateTime(sub["Last Charge Date"]),
        }));
        return subscriptions;
      });
      const flattenedData = formattedData.flat();
      setAudienceData(flattenedData);
    } catch (error) {
      console.error("Error fetching audience data:", error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    return moment(dateTimeString).format("MMM D, YYYY h:mm a");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <SidebarCreator />
      <div style={{ flex: 1, marginLeft: "20px", marginRight: "20px" }}>
        <div className="overflow-x-auto mt-3">
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Username</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>Current Tier</th>
                <th style={styles.tableHeader}>Join Date</th>
                <th style={styles.tableHeader}>Last Charge Date</th>
              </tr>
            </thead>
            <tbody>
              {audienceData.map((row, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{row.Username}</td>
                  <td style={styles.tableCell}>{row.Email}</td>
                  <td style={styles.tableCell}>{row["Current Tier"]}</td>
                  <td style={styles.tableCell}>{row["Join Date"]}</td>
                  <td style={styles.tableCell}>{row["Last Charge Date"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  tableHeader: {
    border: "2px solid #000", // Thicker border
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#000", // Black background
    color: "#fff", // White font color
  },
  tableCell: {
    border: "2px solid #ddd", // Thicker border
    padding: "8px",
    textAlign: "left",
  },
};

export default Audience;