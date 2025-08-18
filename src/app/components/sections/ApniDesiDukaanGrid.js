'use client';
import React from 'react';
import CategoryCard from './CategoryCard';
import './ApniDesiDukaanGrid.css';

const ApniDesiDukaanGrid = () => {
  const categories = [
    {
      label: 'अपनी राशन',
      icon: '🧺',
      bgColor: '#e09c30',
      to: '/ration',
    },
    {
      label: 'स्वस्थ मटन',
      icon: '🍖',
      bgColor: '#a5432e',
      to: '/mutton',
    },
    {
      label: 'दूध & अंडा',
      icon: '🥛🥚',
      bgColor: '#f2a641',
      to: '/milk-egg',
    },
    {
      label: 'दोपहर ओड़ा',
      icon: '🌿',
      bgColor: '#557c3e',
      to: '/lunch-oda',
    },
  ];

  return (
    <section className="dukaan-wrapper">
      <h1 className="dukaan-heading">अपनी देसी दुकान</h1>
      <div className="dukaan-grid">
        {categories?.map((cat, index) => (
          <CategoryCard key={index} cat={cat} />
        ))}
      </div>
    </section>
  );
};

export default ApniDesiDukaanGrid;
