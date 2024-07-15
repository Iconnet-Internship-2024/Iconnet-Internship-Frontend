import { Footer } from "flowbite-react";
import { PiCopyrightThin } from "react-icons/pi";

function Component() {
  return (
    <Footer
      container
      fluid="true"
      className=""
      style={{
        backgroundColor: "#625A5A",
        color: "white",
        textAlign: "center",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <div className="text-white flex justify-center items-center">
        <span className="mr-1">Copyright</span>
        <span>
          <PiCopyrightThin />
        </span>
        <span className="ml">2024 - PLN Icon Plus</span>
      </div>
    </Footer>
  );
}

export default Component;
