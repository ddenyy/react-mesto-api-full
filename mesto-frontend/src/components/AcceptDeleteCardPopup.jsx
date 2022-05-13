import React from 'react';
import PopupWithForm from "./PopupWithForm.jsx";


function AcceptDeleteCardPopup({isOpen, isAccept, onClose, useEscapePress}) {

  function handleDeleteCard (e) {
    e.preventDefault();
    isAccept()
  }

  return (
    <PopupWithForm onClose={onClose} onSubmit={handleDeleteCard} title="вы уверены ?" name="delete_card" submitText="да" isOpen={isOpen} useEscapePress={useEscapePress}></PopupWithForm>
  );
};

export default AcceptDeleteCardPopup;

