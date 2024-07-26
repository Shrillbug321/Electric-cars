import React, { useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import CardCityItem from './CardCityItem';
import { Button } from './Button';
import Track from "./pages/Track";
import {useLazyWriteCypher, useReadCypher} from 'use-neo4j'
import { toBeEmpty } from '@testing-library/jest-dom/dist/matchers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ButtonMU from '@mui/material/Button';

function Cards() {
  const [selectedCard, setSelectedCard] = useState(null);

  const [range, setRange] = useState(null);
  const [selectedStartCity, setSelectedStartCity] = useState(null);
  const [selectedDestinationCity, setSelectedDestinationCity] = useState(null);
  const [cities, _] = useState([]);

  const [startIndex, setStartIndex] = useState(0);
  const [startIndexDest, setStartIndexDest] = useState(0);
  const itemsPerPage = 6;
  const handleShowMore = () => {
    setStartIndex((prevIndex) => {
		  const remainingItems = cities.length - (prevIndex + itemsPerPage);
		  const newIndex = prevIndex + itemsPerPage;
	  	if (remainingItems >= 3) {
			return newIndex;
		  } else {
			return newIndex-3;
		  }
		});
  };

  const handleShowPrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleShowMoreDest = () => {
    setStartIndexDest((prevIndex) => {
		  const remainingItems = cities.length - (prevIndex + itemsPerPage);
		  const newIndex = prevIndex + itemsPerPage;
	  	if (remainingItems >= 3) {
			return newIndex;
		  } else {
			return newIndex-3;
		  }
		});
  };

  const handleShowPreviousDest = () => {
    setStartIndexDest((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  let {
		cypher,
		error,
		loading,
		result
	} = useReadCypher('MATCH (n:City) RETURN n.name AS name')
  let view = (<div className="ui active dimmer">Loading...</div>)

  if (loading) return (<div>Loading...</div>)

	if (error) {
		view = (<div className="ui negative message">{error.message}</div>)
	} else if (!loading) {

		const records = result?.records
    if(cities.length === 0){
		if (records !== undefined) {
			for (let i = 0; i < records.length; i++) {
				let record = records[i].get('name');
				cities.push(<tr>
					<td>{record}</td>
				</tr>)
			}
		}
  }
		view = <div>{cities}</div>
	}
  const handleCardClick = (cardNumber, cardRange) => {
    console.clear();
    console.log(cardRange)
    console.log(range)
    setSelectedCard((prevSelectedCard) => {
      if (prevSelectedCard === cardNumber) {
        setRange(0);
        return null;
      } else {
        setRange(cardRange);
        return cardNumber;
      }
    });
  };

  const handleStartCityClick = (cityName) => {
    setSelectedStartCity((prevSelectedCity) => {
      if (prevSelectedCity === cityName.props.children.props.children) {
        return null;
      } else {
        console.log(cityName.props.children.props.children)
        return cityName.props.children.props.children;
      }
    });
  };

  const handleDestinationCityClick = (cityName) => {
    setSelectedDestinationCity((prevSelectedDestinationCity) => {
      if (prevSelectedDestinationCity === cityName.props.children.props.children) {
        return null;
      } else {
        return cityName.props.children.props.children;
      }
    });
  };

  return (
    <div className='cards' >
      <h1>Wybierz pojazd!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper' style={{ width: '95%', margin: '0 auto' }}>
          <ul className='cards__items'>
            <CardItem
              src='images/tesla3.png'
              text='Tesla Model 3'
              desc='Zasięg: 300 km'
              label='Adventure'
              cardNumber={1}
              cardRange={300}
              isSelected={selectedCard === 1}
              handleCardClick={handleCardClick}
            //path='/services'
            />
            <CardItem
              src='images/teslax.png'
              text='Tesla Model X'
              desc='Zasięg: 350 km'
              label='Adventure'
              cardNumber={2}
              cardRange={350}
              isSelected={selectedCard === 2}
              handleCardClick={handleCardClick}
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/porshetaycan.jpg'
              text='Porshe Taycan'
              desc='Zasięg: 400 km'
              label='Adrenaline'
              cardNumber={3}
              cardRange={400}
              isSelected={selectedCard === 3}
              handleCardClick={handleCardClick}
            />
            <CardItem
              src='images/bmwi8.jpg'
              text='BMW i8'
              desc='Zasięg: 450 km'
              label='Luxury'
              cardNumber={4}
              cardRange={450}
              isSelected={selectedCard === 4}
              handleCardClick={handleCardClick}
            />
            <CardItem
              src='images/kiaev6.jpg'
              text='Kia EV6 GT'
              desc='Zasięg: 500 km'
              label='Mystery'
              cardNumber={5}
              cardRange={500}
              isSelected={selectedCard === 5}
              handleCardClick={handleCardClick}
            />
            <CardItem
              src='images/smart.jpg'
              text='Smart EQ fortwo'
              desc='Zasięg: 100 km'
              label='Cheap'
              cardNumber={6}
              cardRange={100}
              isSelected={selectedCard === 6}
              handleCardClick={handleCardClick}
            />

          </ul>

        </div>
      </div>

      <h1>Wybierz miasto startowe!</h1>
      <ul className='cards__items_small'>
        {cities.slice(startIndex, startIndex + itemsPerPage).map((city, index) => (
          <CardCityItem
            key={index}
            cityName={city}
            isSelected={selectedStartCity === city.props.children.props.children}
            handleCityClick={handleStartCityClick}
            isStartCity
          />
        ))}
      </ul>
      {startIndex > 0 && (
        <ButtonMU onClick={handleShowPrevious}
        style={{ marginLeft: '4%' }}
        variant="outlined">
          <ArrowBackIcon />
        </ButtonMU>
      )}
      {cities.length > startIndex + itemsPerPage && (
        <ButtonMU onClick={handleShowMore}
        style={{ float: 'right', marginRight: '1%' }}
        variant="outlined">
          <ArrowForwardIcon />
        </ButtonMU>
      )}

      <h1>Wybierz miasto docelowe!</h1>
      
      <ul className='cards__items_small'>
        {cities.slice(startIndexDest, startIndexDest + itemsPerPage).map((city, index) => (
          <CardCityItem
            key={index}
            cityName={city}
            isSelected={selectedDestinationCity === city.props.children.props.children}
            handleCityClick={handleDestinationCityClick}
            isStartCity={false}
          />
        ))}
      </ul>
      {startIndexDest > 0 && (
        <ButtonMU onClick={handleShowPreviousDest}
        style={{ marginLeft: '4%' }}
        variant="outlined">
          <ArrowBackIcon />
        </ButtonMU>
      )}
      {cities.length > startIndexDest + itemsPerPage && (
        <ButtonMU onClick={handleShowMoreDest}
        style={{ float: 'right', marginRight: '1%' }}
        variant="outlined">
          <ArrowForwardIcon />
        </ButtonMU>
      )}
      {
        canShowTrack() &&
        <Track key={selectedStartCity+selectedDestinationCity+range}
               startCity={selectedStartCity} destinationCity={selectedDestinationCity} range={range}/>}
    </div>

  );
  function canShowTrack()
  {
    return (selectedStartCity !== null && selectedDestinationCity !== null && range !== null && range !== 0);
  }
}

export default Cards;

