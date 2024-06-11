import React from 'react';
import Navi from '../../components/Navi'
import Banner from './components/Banner';
import LatestListings from './components/LatestListings';
import PopularCategories from './components/PopularCategories';
import About from './components/About';
import './components/styles/Home.css'

const Home = () => (
  <div className="home">
    <Navi />
    <Banner />
    <PopularCategories />
    <LatestListings />
    <About />
  </div>
);

export default Home;
