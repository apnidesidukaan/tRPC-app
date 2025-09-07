import DrinksAndJuicesCard from './hero/DrinksAndJuicesCard';
import HeroTiles from './hero/HeroTiles';

import StoreDisplay from './StoreDisplay';

//===================================================================

export default function StoreFront() {
  //===================================================================

  //===================================================================
  return (
    <>
      <section className="background-visua">

        <StoreDisplay />
   
        <HeroTiles />
        <DrinksAndJuicesCard />
      </section>

    </>
  );
}
//===================================================================
