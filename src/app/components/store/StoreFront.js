import React, { useState } from 'react';
import ProductCard from '../ui/card/ProductCard';
import DrinksAndJuicesCard from './hero/DrinksAndJuicesCard';
import HeroTiles from './hero/HeroTiles';
import HeroHeadline from './hero/HeroHeadline';
import BackgroundVisual from './hero/BackgroundVisual';

//===================================================================

export default function StoreFront() {
  //===================================================================
  const [mood, setMood] = useState('Ganesh Chaturthi');
  //===================================================================
  return (
    <>
      <section className="background-visua">

        <BackgroundVisual mood={mood} />

        {/* <HeroHeadline mood={mood} /> */}
        <HeroTiles mood={mood} />
        <DrinksAndJuicesCard />
      </section>
      <ProductCard />

    </>
  );
}
//===================================================================
