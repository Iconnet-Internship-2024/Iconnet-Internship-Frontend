import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarCreator from "../../components/Sidebar-creator";
import { getCookie } from "../../utils/cookie";

function ListMembership() {
  const [tiers, setTiers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const response = await fetch("http://localhost:3000/account-tier/acc", {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tiers");
        }

        const result = await response.json();
        setTiers(result.data);
        console.log(result.data)
      } catch (error) {
        console.error("Error:", error);
        alert("Error fetching tiers");
      }
    };

    fetchTiers();
  }, []);

  return (
    <div className="flex">
      <SidebarCreator />
      <div className="ml-20 mt-70 ">
        <h1 className="text-3xl mb-8">List Tier</h1>
        <div className="flex flex-wrap gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              onClick={() => {
                navigate(`/tier/update/${tier.tierId}`);
              }}
              className="border border-gray-300 rounded-md p-4 w-64 text-center transition-transform hover:scale-105 shadow-md"
            >
              {tier.tier && tier.tier.card && (
                <img
                  src={tier.tier.card}
                  alt={tier.tier.tier_name}
                  className="w-full rounded-md mb-4"
                />
              )}
              <div className="flex flex-col">
                <h2 className="font-bold text-left">{tier.tier?.tier_name}</h2>
                <p className="text-sm text-justify mt-2">{tier.tier?.description}</p>
                <div className="bg-black text-white rounded-md mt-4 w-auto p-1">
                  <p>{tier.tier?.price} Matic</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListMembership;
