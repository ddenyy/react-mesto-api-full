import React from 'react';
import Card from "./Card.jsx";
import {currentUserContext} from "../contexts/CurrentUserContext";
function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
  // подписываемся на контекст из currentUser
  const currentUserData = React.useContext(currentUserContext);
  
  return (
    <div className="content page__content">
      <section className="profile content__profile">
        <div className="profile__image" style={{ backgroundImage: `url(${currentUserData.avatar})` }} onClick={onEditAvatar}></div>
        <div className="profile__info">
          <h1 className="profile__username">{currentUserData.name}</h1>
          <button aria-label="edit" type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          <p className="profile__job">{currentUserData.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="places page__places">
        {cards.map((card) => {
          return (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          );
        })}
      </section>
    </div>
  );
};

export default Main