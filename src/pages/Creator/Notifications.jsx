import React, { useState, useEffect } from "react";
import SidebarCreator from "../../components/SidebarAdmin";
import { FaBell } from "react-icons/fa";
import { Card, Modal } from "flowbite-react"; // asumsikan ada komponen Modal dari flowbite-react

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://6628773654afcabd0735d58f.mockapi.io/creator/Audience")
      .then((response) => response.json())
      .then((data) => {
        const descData = data.map((item) => item.DESC);
        setNotifications(descData.slice(0, 10)); // Mengambil 10 data DESC pertama
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const openModal = (desc) => {
    setSelectedNotification(desc);
    setIsModalOpen(true);
    console.log("Modal opened for:", desc);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <SidebarCreator />
      </div>
      <div
        style={{
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
          marginTop: "70px",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginLeft: "20px",
            marginBottom: "50px",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaBell style={{ marginRight: "10px", fontSize: "30px" }} />
          Notifications
        </h1>
        {notifications.map((desc, index) => (
          <button
            key={index}
            className="max-w mt-3 mb-5"
            onClick={() => openModal(desc)}
          >
            <Card>
              <p
                className="font-normal text-gray-700 dark:text-gray-400 ml-4 mr-9"
                style={{ whiteSpace: "nowrap" }}
              >
                {desc}
              </p>
            </Card>
          </button>
        ))}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <p>{selectedNotification}</p>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Notifications;
