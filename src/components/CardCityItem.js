import React from 'react';
import { Link } from 'react-router-dom';
export default function CardCityItem(props) {
    const { cityName, isSelected, handleCityClick, isStartCity} = props;

    const handleClick = () => {
      handleCityClick(cityName);
    };
  
    return (
        <li className={`cards__item_small ${isSelected ? 'selected' : ''}`}
        onClick={handleClick}
        style={{
            border: isSelected ? '4px solid' : 'none',
            borderColor: isSelected ? (isStartCity ? 'lime' : 'cyan') : 'transparent'
          }}>
        <Link className='cards__item__link_small'>
          <figure className='cards__item__pic-wrap2'>
            <img
              className='cards__item__img_small'
              alt='Travel Image'
            />
          </figure>
          <div className='cards__item__info_small'>
            <h4 className='cards__item__text_small'>{cityName}</h4>
          </div>
        </Link>
      </li>
    );
  }