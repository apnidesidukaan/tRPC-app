import React, { useState } from 'react';
import './CategoryTabs.css';
import { FaShoppingBag, FaHeadphones, FaGift } from 'react-icons/fa';
import { GiLipstick, GiBabyBottle } from 'react-icons/gi';
import { api } from '~/trpc/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
// import { useVendorStore } from '../../../controllers/store';

const icons = {
  All: <FaShoppingBag size={25} />,
  Electronics: <FaHeadphones size={25} />,
  Beauty: <GiLipstick size={25} />,
  Kids: <GiBabyBottle size={25} />,
  Gifting: <FaGift size={25} />,
};

const CategoryTabs = ({
  setCategoryId
}) => {
  const params = useParams()
  const { data: vendorCategory, } = api.store.getVendorCategories.useQuery(params?.id);








  // const tabs = ["All", "Electronics", "Beauty", "Kids", "Gifting"];
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="category-tabs-wrapper">
      <div className="category-tabs">
        {vendorCategory?.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              setCategoryId(tab.id),
                setActiveTab(tab.id)
            }
            }
          >
            <Image
              src={tab?.icon}
              alt={tab?.name}
              width={50}
              height={50}
              className=" object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="label">{tab?.name}</div>
            {tab?.name === "Beauty" && activeTab !== "Beauty" && (
              <span className="sale-tag">Sale</span>
            )}
            {activeTab === tab.id && <div className="underline" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
