import React from 'react';

import PopupWithForm from './PopupWithForm';

import { useForm } from '../hooks/useForm';

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoadingRequest}) {
  const {values, handleChange, setValues} = useForm({});

  React.useEffect(() => {
    setValues({})
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link,
    });

  };

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonTitle="Создать"
      isLoadingRequest={isLoadingRequest}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        required
        id="name-place-input"
        name="name"
        type="text"
        className="popup__input popup__input_field_place-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={values.name || ''}
        onChange={handleChange}/>
      <span className="popup__input-error name-place-input-error"></span>
      <input
        required
        id="link-place-input"
        name="link"
        type="url"
        className="popup__input popup__input_field_place-link"
        placeholder="Ссылка на картинку"
        value={values.link || ''}
        onChange={handleChange}/>
      <span className="popup__input-error link-place-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
