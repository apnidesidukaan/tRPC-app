import React from 'react';
import Image from 'next/image';

const ApniDesiDukaanBanner = () => {
  return (
    <section className="dukaan-banner">
      <Image
        src="/images/bg.png"
        alt="अपनी देसी दुकान"
        className="dukaan-banner-image"
        width={1200} // set your actual image width
        height={400} // set your actual image height
        priority
      />
    </section>
  );
};

export default ApniDesiDukaanBanner;