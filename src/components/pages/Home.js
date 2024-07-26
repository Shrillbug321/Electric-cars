import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Charger from "../Charger";
import ChargerList from "./ChargerList";
function Home() {
  return (
    <>

      <HeroSection />
      <Cards/>
      <Footer/>
    </>
  );
}

export default Home;
