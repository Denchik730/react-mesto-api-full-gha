import React from 'react';

import PopupWithForm from './PopupWithForm';

import { useForm } from '../hooks/useForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoadingRequest}) {

  const currentUser = React.useContext(CurrentUserContext);

  const {values, handleChange, setValues} = useForm({});

  React.useEffect(() => {
    setValues({name: currentUser.name, about: currentUser.about})
  }, [currentUser, isOpen]);


  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }


  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isLoadingRequest={isLoadingRequest}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        required
        id="name-profile-input"
        name="name"
        type="text"
        className="popup__input popup__input_field_name"
        placeholder="Имя"
        value={values.name || ''}
        onChange={handleChange}
        minLength="2"
        maxLength="40"
        />
      <span className="popup__input-error name-profile-input-error"></span>
      <input
        required
        id="post-input"
        name="about"
        type="text"
        className="popup__input popup__input_field_post"
        placeholder="О себе"
        value={values.about || ''}
        onChange={handleChange}
        minLength="2"
        maxLength="200"
        />
      <span className="popup__input-error post-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
