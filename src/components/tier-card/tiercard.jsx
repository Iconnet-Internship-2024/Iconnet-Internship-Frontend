import React from 'react';

const TierCard = ({ image, tier_name, description, price, onClick }) => {
  return (
    <div className="border border-black rounded-[20px] w-full flex flex-col justify-between">
      <img src={image} alt="Card Image" className="object-cover w-full h-48 md:h-64 rounded-t-[20px]" />
      <div className="p-4 flex flex-col justify-center h-full">
        <h2 className="text-lg md:text-xl font-bold mb-2 text-center">{tier_name}</h2>
        <p className="text-sm md:text-base text-gray-700 text-center mb-4">{`${price} Matic / Month`}</p>
        <p className="text-base md:text-lg font-medium mb-2 text-center">{description}</p>
        <button className="bg-black text-white px-8 py-2 rounded-lg self-center" onClick={onClick}>
          Join
        </button>
      </div>
    </div>
  );
}

export default TierCard;
