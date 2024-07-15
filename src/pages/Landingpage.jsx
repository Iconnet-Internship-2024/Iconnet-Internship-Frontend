import React from 'react';
import { MdOutlineVerified, MdCorporateFare } from "react-icons/md";
import { RiSuitcaseFill } from "react-icons/ri";
import { LuGlobe } from "react-icons/lu";

const LandingPage = () => {
  return (
    <div className="bg-white">
      {/* Top section with full-width image */}
      <div className="relative">
        {/* Background with red overlay */}
        <div className="absolute inset-0 bg-red-500 opacity-70"></div>

        {/* Text centered at the top */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-white text-center py-8 z-10">
          <div className="font-semibold text-xl md:text-5xl lg:text-6xl">
            <div style={{ marginBottom: '20px' }}>Selamat Datang di Program Internship</div>
            <div>PLN Icon Plus</div>
          </div>
        </div>

        {/* Image */}
        <img src="../src/assets/building.svg" alt="Building" style={{ width: '100%', height: 'auto' }} />
      </div>

      {/* Section with group image and description */}
      <div className="flex flex-col md:flex-row items-center p-8">
        <div className="w-full md:w-1/2">
          <img src="../src/assets/group.svg" alt="Group of Professionals" className="w-full h-auto" />
        </div>
        <div className="text-625A5A w-full md:w-1/2 md:pl-8">
          <h1 style={{ fontSize: 'smaller', color: '#625A5A' }}>
            PLN Icon Plus, a prospective Telecommunication Company with a vision to be Leading provider of network-centric ICT solutions in Indonesia by utilizing unique strategic assets, is creating a Shared Serviced Center (SSC), an accountable entity within a multi-unit organization tasked with supplying the business unit, respective divisions and departments with specialized services. Please review the Job Opportunities below. If there are no opportunities deemed available or suitable, please submit your resume as a general application.
          </h1>
        </div>
      </div>

      {/* "Apa Yang Akan Kamu Dapatkan?" section */}
      <div className="text-center text-625A5A font-semibold mt-8 mb-4 bg-white py-2 px-4">
        <h2 style={{ fontSize: '1.5em', color: '#625A5A' }}>Apa Yang Akan Kamu Dapatkan?</h2>
      </div>

      <div className="flex flex-wrap justify-around items-center bg-white p-4">
        <div className="flex flex-col items-center text-center mb-8" style={{ width: '100%', maxWidth: '300px' }}>
          <div className="icon-box" style={{ width: '100%', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url(../src/assets/card.svg)', backgroundSize: 'cover', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '30px' }}>
              <MdOutlineVerified size={60} color="red" />
            </div>
            <div style={{ width: '90%', padding: '0 10px', textAlign: 'center', position: 'absolute', top: '130px' }}>
              <span style={{ fontWeight: 'bold', display: 'block', color: '#FFFFFF', fontSize: '1.2em' }}>Program Certificate</span>
              <span style={{ fontSize: '1em', color: '#FFFFFF' }}>Getting a BUMN FHCI certificate as appreciation for the contribution that has been made.</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center mb-8" style={{ width: '100%', maxWidth: '300px' }}>
          <div className="icon-box" style={{ width: '100%', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url(../src/assets/card.svg)', backgroundSize: 'cover', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '30px' }}>
              <RiSuitcaseFill size={60} color="red" />
            </div>
            <div style={{ width: '90%', padding: '0 10px', textAlign: 'center', position: 'absolute', top: '130px' }}>
              <span style={{ fontWeight: 'bold', display: 'block', color: '#FFFFFF', fontSize: '1.2em' }}>Real Project Challenge</span>
              <span style={{ fontSize: '1em', color: '#FFFFFF' }}>Immerse yourself in real use cases in various scientific disciplines.</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center mb-8" style={{ width: '100%', maxWidth: '300px' }}>
          <div className="icon-box" style={{ width: '100%', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url(../src/assets/card.svg)', backgroundSize: 'cover', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '30px' }}>
              <LuGlobe size={60} color="red" />
            </div>
            <div style={{ width: '90%', padding: '0 10px', textAlign: 'center', position: 'absolute', top: '130px' }}>
              <span style={{ fontWeight: 'bold', display: 'block', color: '#FFFFFF', fontSize: '1.2em' }}>Experience in National & Worldwide Company</span>
              <span style={{ fontSize: '1em', color: '#FFFFFF' }}>Internship experience in a leading company, as a career gateway.</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center mb-8" style={{ width: '100%', maxWidth: '300px' }}>
          <div className="icon-box" style={{ width: '100%', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url(../src/assets/card.svg)', backgroundSize: 'cover', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '30px' }}>
              <MdCorporateFare size={60} color="red" />
            </div>
            <div style={{ width: '90%', padding: '0 10px', textAlign: 'center', position: 'absolute', top: '130px' }}>
              <span style={{ fontWeight: 'bold', display: 'block', color: '#FFFFFF', fontSize: '1.2em' }}>Corporate Culture</span>
              <span style={{ fontSize: '1em', color: '#FFFFFF' }}>Work culture in a digital telecommunications company with core values ​​Solid, Speed, Smart.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
