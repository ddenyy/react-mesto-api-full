import PopupWithForm from "./PopupWithForm.jsx";
import React from 'react';
import useFormWithValidation from '../hooks/useFormWithValidation.jsx';
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, useEscapePress}) {
  const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.avatar

    })
  }
  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm onSubmit={handleSubmit} name="change_avatar" title="Обновить аватар" submitText="Сохранить" isOpen={isOpen} onClose={onClose} useEscapePress={useEscapePress}>
      <fieldset className="popup__contact-info">
        <div className="input-container input-container_single">
          <input value={values.avatar || ''} onChange={handleChange} name="avatar" type="url" className="popup__input" id="popup-change-avatar" autoComplete="off" placeholder="Ссылка на картинку" required />
          <span className={`error-message popup-change-avatar-error ${!isValid && 'error-message_shown'}`}>{errors.avatar || ''}</span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;