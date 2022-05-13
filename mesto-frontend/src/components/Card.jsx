import React from 'react';
import ReactDOM from 'react-dom';
import {currentUserContext} from "../contexts/CurrentUserContext";


function Card({card, onCardClick, onCardLike, onCardDelete}) {
  
  const currentUserData = React.useContext(currentUserContext)
  
  const isLiked = card.likes.some(i => i === currentUserData._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick () {
    onCardLike(card)
  }
   
  function handleCardDelete () {
    onCardDelete(card)
  }
  // console.log(card)
  return (
    <article className="place">
      {card.owner === currentUserData._id ? <button onClick={handleCardDelete} className="place__button-delete"></button> : <></>}
      <img className="place__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="place__item">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__container_like">
          <button onClick={handleLikeClick} type="button" className={`place__heart-button ${isLiked ? "place__heart-button_active" : ""}`}></button>
          <p className="place__heart-quantity">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;