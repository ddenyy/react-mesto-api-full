import PopupWithForm from "./PopupWithForm.jsx";
import React from "react"
import useFormWithValidation from '../hooks/useFormWithValidation.jsx';
 
function AddPlacePopup({ isOpen, onClose, onAddPlace, useEscapePress}) {
  const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation(); 

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    if (values.name) {
      onAddPlace({
        name: values.name,
        link: values.link
      })
    }
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm])

  return (
    <PopupWithForm onSubmit={handleAddPlaceSubmit} name="add_picture" title="Новое место" submitText="Добавить" isOpen={isOpen} onClose={onClose} useEscapePress={useEscapePress}>
      <fieldset className="popup__contact-info">
        <div className="input-container">
          <input value={values.name || ''} onChange={handleChange} name="name" type="text" className="popup__input" id="popup-picture-name" autoComplete="off" placeholder="Название" required minLength="2" maxLength="30" />
          <span className={`error-message popup-picture-name-error ${!isValid && 'error-message_shown'}`}>{errors.name|| ''}</span>
        </div>
        <div className="input-container">
          <input value={values.link || ''} onChange={handleChange} name="link" type="url" className="popup__input" id="popup-picture-link" autoComplete="off" placeholder="Ссылка на картинку" required />
          <span className={`error-message popup-picture-link-error ${!isValid && 'error-message_shown'}`}>{errors.link || ''}</span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;