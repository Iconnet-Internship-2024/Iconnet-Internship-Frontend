import React, { useState, useEffect } from "react";
import { Card } from "flowbite-react";

function Creatorspage() {
  // State untuk menyimpan data dari API
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/search/creators")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data);
        setCreators(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setCreators([]);
      });
  }, []);

  return (
    <div className="flex justify-center pt-8 pb-5">
      <div className="grid grid-cols-4 gap-4">
        {Array.isArray(creators) && creators.length > 0 ? (
          creators.map((creator, index) => (
            <a key={index} href={`/post/${creator.id}`} className="block">
              <Card style={{ maxWidth: "250px" }}>
                <img
                  className="w-full h-auto"
                  src={creator.image} 
                  alt={creator.name} 
                />
                <div className="p-4">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                    {creator.name}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {creator.category} 
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {creator.description} 
                  </p>
                </div>
              </Card>
            </a>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default Creatorspage;
