import React from 'react';
import Navi from '../../components/Navi'
import Banner from './components/Banner';
import LatestListings from './components/LatestListings';
import PopularCategories from './components/PopularCategories';
import About from './components/About';

const Home = () => (
  <div className="home">
    <Navi />
    <Banner />
    <LatestListings />
    <PopularCategories />
    <About />
  </div>
);

export default Home;
