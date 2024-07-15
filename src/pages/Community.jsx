import React from "react";
import { Button } from "flowbite-react";

// Komponen untuk menampilkan kategori dan carousel
function Comunity() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "white",
        paddingTop: "50px", // Menambahkan batas atas
        paddingBottom: "50px", // Menambahkan batas bawah
      }}
    >
      <div style={{ textAlign: "center", marginTop: "-20px" }}>
        <h1 className="text-black font-bold text-2xl">JOIN COMMUNITY CHATS !</h1>
        <p
          className="text-black mb-11"
          style={{ wordWrap: "break-word", maxWidth: "600px", margin: "auto" }}
        >
          Community chat, also known as chat community, refers to a platform or
          chat room used by members of a community to communicate, share
          information, and interact with each other.
        </p>
        <div className="flex items-center justify-center">
          <CarouselComponent
            imageUrl="https://i.imgur.com/hopdbNH.png"
            buttonText="JOIN"
            buttonLink="https://discord.gg/wR2885yN"
            buttonColor="black"
            buttonTextColor="white"
            title="DISCORD"
          />
          <div className="text-black mx-4 text-lg">OR</div>
          <CarouselComponent
            imageUrl="https://i.imgur.com/QRxXrn5.png"
            buttonText="SCAN QR"
            buttonColor="black"
            buttonTextColor="white"
          />
        </div>
      </div>
    </div>
  );
}

function CarouselComponent({
  imageUrl,
  buttonText,
  buttonLink,
  title,
  buttonColor,
  buttonTextColor,
}) {
  return (
    <div className="max-w-xs mr-4 mt-10">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto rounded-xl mb-4 mt-11 hover:opacity-75 transition-opacity duration-300"
          style={{
            maxWidth: "250px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <div className="mb-11 absolute bottom-0 left-0 w-full text-center text-black font-bold text-lg">
          {title}
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            href={buttonLink}
            style={{
              width: "70%",
              fontSize: "1.25rem !important",
              backgroundColor: buttonColor,
              color: buttonTextColor,
            }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Comunity;
