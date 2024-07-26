import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Create from '../Create'
import Delete from '../Delete'
import Charger from "../Charger";
import ChargerList from "./ChargerList";
function Service() {
  return (
    <>      
      <Create />
      <ChargerList/>
      <Footer />
    </>
  );
}

export default Service;
