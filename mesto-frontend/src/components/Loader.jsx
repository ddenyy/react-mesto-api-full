import React from 'react';

function Loader({isOpen}) {
  
  return (
    <div className={`popup popup_loader ${isOpen && "popup_opened"}`}>
      <div className="loader"></div>
    </div>
  );

}

export default Loader;