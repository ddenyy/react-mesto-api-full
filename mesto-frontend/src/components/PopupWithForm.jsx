
function PopupWithForm({name, title, submitText, onClose, isOpen, onSubmit, children, useEscapePress}) {

  // навешиваем обработчик по нажитию Esc
 useEscapePress(onClose, isOpen);
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__window">
        <button type="button" className={`popup__button-exit popup__button-exit_place_${name}`} onClick={onClose} ></button>
        <form name={`form_${name}`} className="form popup__content" onSubmit={onSubmit} noValidate>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__button popup__button_submit">{submitText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;