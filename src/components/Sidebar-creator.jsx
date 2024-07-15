import React from "react";
import { Sidebar } from "flowbite-react";
import { HiCog, HiInbox, HiViewBoards, HiUser, HiUsers } from "react-icons/hi";

function SidebarCreator() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "1", overflowY: "auto" }}>
        <Sidebar
          aria-label="Sidebar with multi-level dropdown example"
          style={{
            width: "250px",
            backgroundColor: "White",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Sidebar.Items>
            <Sidebar.ItemGroup className="mb-9">
              <Sidebar.Item href="Creator" icon={HiUser}>
                Profile Creator
              </Sidebar.Item>
              <Sidebar.Item href="audience" icon={HiViewBoards}>
                Audience
              </Sidebar.Item>
              <Sidebar.Item href="Membership" icon={HiUsers}>
                Membership
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </div>
  );
}

export default SidebarCreator;
