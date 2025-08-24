// 'use server';
// import { fetchContentSection } from '../../../server/api';
import React from 'react';

const tileData = {
  'Ganesh Chaturthi': [
    { tag: "New Launch", image: "/assets/diyas.jpg" },
    { tag: "Featured", image: "/assets/diwali-sweets.jpg" },
    { tag: "Featured", image: "/assets/ethnics.jpg" },
  ],
};

export default function PromotionalSections({ promoContentSectionData }) {
  let mood = 'Ganesh Chaturthi'
  const tiles = tileData[mood] || [];


  // const promoContentSectionData = await fetchContentSection('promo');
  // console.log('promoContentSectionData', promoContentSectionData);

  return (
    <div
      // style={{
      //   backgroundImage: `url(/assets/kiranaStoreBanner.png)`,
      //   backgroundSize: 'contain',
      //   backgroundPosition: 'center'
      // }}
      className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 px-4 py-6 ">
    
    
      {promoContentSectionData?.sections?.map((data, idx) => (
        <div
          key={idx}
          className="p-0.5 relative border-3 border-blue-400 rounded-2xl overflow-hidden bg-white w-[200px] "
        >
          {/* Fancy curved top badge */}
          {/* {data?.type && (
          )} */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-white  text-red-500 text-xs font-semibold px-3 py-1 rounded-b-xl shadow-sm">
                {data?.promoCards[0]?.title}
              </div>
            </div>

          {/* Image */}
          <img
            src={data?.promoCards[0]?.image}
            alt={data?.promoCards[0]?.title}
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
      ))}
    </div>
  );
};

