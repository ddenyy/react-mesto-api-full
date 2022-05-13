import PopupWithForm from "./PopupWithForm.jsx";
import React from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";
import useFormWithValidation from '../hooks/useFormWithValidation.jsx';
function EditProfilePopup({ isOpen, onClose, onUpdateUser, useEscapePress}) {
  const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation(); 
  const currentUserData = React.useContext(currentUserContext);


  React.useEffect(() => {
    if (currentUserData.name) {
      resetForm(currentUserData, {}, true);
    }
  }, [currentUserData, isOpen])


  // function handleСhangeName(e) {
  //   setName(e.target.value)
  // }


  // function handleСhangeDescription(e) {
  //   setDescription(e.target.value)
  // }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="edit_profile" title="редактировать профиль" submitText="Сохранить" isOpen={isOpen} onClose={onClose} useEscapePress={useEscapePress} >
      <fieldset className="popup__contact-info">
        <div className="input-container">
          <input value={values.name || ''} onChange={handleChange} name="name" type="text" className="popup__input" id="popup-edit-username" placeholder="Введите имя" autoComplete="off" required minLength="2" maxLength="40" />
          <span className="error-message popup-edit-username-error">{errors.name || ''}</span>
        </div>
        <div className="input-container">
          <input value={values.about || ''} onChange={handleChange} name="about" type="text" className="popup__input" id="popup-edit-job" autoComplete="off" placeholder="чем занимаетесь ?" required minLength="2" maxLength="200" />
          <span className={`error-message popup-edit-job-error ${!isValid && 'error-message_shown'}`}>{errors.about || ''}</span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;