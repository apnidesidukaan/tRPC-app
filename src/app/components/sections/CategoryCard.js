'use client';
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ cat }) => {
  return (
    <Link to={cat.to} className="category-card" style={{ backgroundColor: cat.bgColor }}>
      <div className="icon">{cat.icon}</div>
      <div className="label">{cat.label}</div>
    </Link>
  );
};

export default CategoryCard;
