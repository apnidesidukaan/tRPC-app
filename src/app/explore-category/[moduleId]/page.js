'use client'
import React, { useState, useMemo } from 'react';
import { Star, Filter, ChevronDown, MapPin, Clock, Truck, Heart, ShoppingCart } from 'lucide-react';
import CategoryProductsLayout from '../../components/categoryProducts/CategoryProducts';
import { useParams } from 'next/navigation';
import Header from '../../../app/layouts/Header';
import Footer from '../../../app/layouts/Footer';


const ExploreCategoryPage = () => {

  return (
    <>
      <Header />
      <CategoryProductsLayout/>
      <Footer />
    </>
  );
};

export default ExploreCategoryPage;