import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

const handleScrollDown = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight/2.5,
    behavior: 'smooth'
  });
};

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/night-run_1.mp4' autoPlay loop muted />
      <h1>Wypożyczalnia aut</h1>
      <p>Wybierz pojazd idealny dla twoich potrzeb</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={handleScrollDown}
        >
          ZACZYNAMY
        </Button>
        
      </div>
    </div>
  );
}

export default HeroSection;
