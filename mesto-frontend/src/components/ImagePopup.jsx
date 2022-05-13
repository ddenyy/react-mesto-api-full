
function ImagePopup({card,onClose, isOpen, useEscapePress}) {

  useEscapePress(onClose, isOpen);

  return (
    <div id="popup-fullscr-img" className={`popup popup_picture_fullscreen ${isOpen && 'popup_opened'}`} >
      <figure className="popup__window popup__window_picture">
        <img className="popup__picture" src={card.link} alt={card.name}/>
        <button type="button" className="popup__button-exit popup__button-exit_place_picture_fullscreen" onClick={onClose}></button>
        <figcaption className="popup__picture-name">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;

