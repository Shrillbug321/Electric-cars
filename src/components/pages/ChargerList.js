import React, { useState, useEffect } from 'react';
import { useLazyWriteCypher, useReadCypher } from 'use-neo4j';
import ChargersDelete from "./ChargersDelete";
import CardCityItem from '../CardCityItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ButtonMU from '@mui/material/Button';

export default function ChargerList() {
  const [chargers, setChargers] = useState([]);
  const [deleted, setDeleted] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  const handleDelete = (name) => {
    setDeleted(name);
    alert("Usunięto ładowarkę: " + name);

    deleteCharger({ ch_name: name })
      .then(() => {
        setChargers(prevChargers => prevChargers.filter(charger => charger !== name));
      })
      .catch(error => {
        console.error("Błąd podczas usuwania ładowarki:", error);
      });
	  setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleShowMore = () => {
    setStartIndex((prevIndex) => {
      const remainingItems = chargers.length - (prevIndex + itemsPerPage);
      const newIndex = prevIndex + itemsPerPage;
      if (remainingItems >= 3)
        return newIndex;
      else
        return newIndex - 3;
    });
  };

  const handleShowPrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const [deleteCharger] = useLazyWriteCypher(
    `MATCH (n:Charger {name: '$ch_name'})
          RETURN n`
  );

  const { cypher, error, loading, result } = useReadCypher('MATCH (n:Charger) RETURN n.name AS name');

  useEffect(() => {
    if (result && result.records) {
      const updatedChargers = result.records.map((record) => record.get('name'));
      setChargers(updatedChargers);
    }
  }, [result]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Wybierz ładowarkę do usunięcia!</h1>
      <ul className="cards__items_small">
        {chargers.slice(startIndex, startIndex + itemsPerPage).map((city, index) => (
          <CardCityItem
            key={index}
            cityName={city}
            handleCityClick={() => handleDelete(city)}
            isStartCity
          />
        ))}
      </ul>
      {startIndex > 0 && (
        <ButtonMU
          onClick={handleShowPrevious}
          style={{ marginLeft: '4%' }}
          variant="outlined"
        >
          <ArrowBackIcon />
        </ButtonMU>
      )}
      {chargers.length > startIndex + itemsPerPage && (
        <ButtonMU
          onClick={handleShowMore}
          style={{ float: 'right', marginLeft: '4%', marginRight: '1%' }}
          variant="outlined"
        >
          <ArrowForwardIcon />
        </ButtonMU>
      )}
      <div></div>

      {deleted !== '' && <ChargersDelete name={deleted} />}
      <h1 style={{ marginBottom: '60px' }}></h1>
    </div>
  );
}