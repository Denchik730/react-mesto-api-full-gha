import React from 'react';

import Popup from './Popup';

function PopupWithForm({name, title, buttonTitle, isOpen, onClose, children, onSubmit, isLoadingRequest}) {

  if (isLoadingRequest && name !== 'approval') {
    buttonTitle = 'Сохранение...';
  } else if (isLoadingRequest && name === 'approval') {
    buttonTitle = 'Удаление...'
  }

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose} isWithContainer={true}>
      <form onSubmit={onSubmit} name={name} className="popup__form popup__form_edit">
        <h2 className="popup__title-form">{title}</h2>
        {children}
        <button
          type="submit"
          className={`popup__button-form ${name === 'approval' ? 'popup__button-form_type_approval' : null}`}>
          {buttonTitle}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
