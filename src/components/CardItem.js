import React from 'react';
import { Link } from 'react-router-dom';

export default function CardItem(props) {
  const { cardNumber, cardRange, isSelected, handleCardClick } = props;

  const handleClick = () => {
    handleCardClick(cardNumber,cardRange);
  };

  return (
    <>
      <li className={`cards__item ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      style={{ border: isSelected ? '4px solid lightgreen' : 'none' }}>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              src={props.src}
              alt="card"
            />
          </figure>
          <div className='cards__item__info'>
            <h4 className='cards__item__text'>{props.text}</h4>
            <h5 className='cards__item__desc'>{props.desc}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}