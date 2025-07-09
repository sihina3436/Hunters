import React from 'react';
import Features from './Features';
import MainBanner from './MainBanner';
import Promotions from './Promotion';
import FeaturedProducts from '../shop/FeaturedProducts';
import SpecialEdition from './SpecialEdition';

const Home = () => {
  return (
    <div>
      <MainBanner />
      <Promotions />
      <FeaturedProducts />
      <SpecialEdition />
      <Features />
    </div>
  );
};

export default Home;
