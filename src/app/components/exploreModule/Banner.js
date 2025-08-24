import React from 'react';
// import './Banner.css';
// import BannerUpdate from '../../ui/drawer/BannerUpdate';
// import { useVendorStore } from '../../../controllers/store';
const Banner = ({ mood, middleImage }) => {
  return (
    <div
      className="w-full h-[300px] overflow-hidden bg-gradient-to-b from-[#f8e2b6] to-white bg-no-repeat mt-8"
      style={{
        backgroundImage: middleImage
          ? `url('${middleImage}')`
          : "url('/assets/kiranaStoreBanner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional: <BannerUpdate /> */}
    </div>
  );
};
export default Banner;