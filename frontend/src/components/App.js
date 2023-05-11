import React from "react";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ApprovalPopup from "./ApprovalPopup";
import ImagePopup from "./ImagePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

import api from "../utils/api";

import * as auth from "../utils/auth";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isApprovalPopupOpen, setIsApprovalPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loadingPopupRequest, setLoadingPopupRequest] = React.useState(false);
  const [willDeleteCard, setWillDeleteCard] = React.useState(null);

  const [emailUser, setEmailUser] = React.useState("");
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = React.useState(false);
  const [successRegister, setSuccessRegister] = React.useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .getAllNeededData()
      .then((data) => {
        const [userData, cardData] = data;

        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    checkToken();
  }, []);

  const handleIsLogged = () => {
    setLoggedIn(true);
  };

  const checkToken = () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setEmailUser(data.data.email);
            handleIsLogged();
            navigate("/", { replace: true });
          }
        })
        .catch((e) => {
          if (e === 400) {
            console.log(`Ошибка: ${e} - Токен не передан или передан не в том формате`);
          }
          if (e === 401) {
            console.log(`Ошибка: ${e} - Переданный токен некорректен`);
          }
        });
    }
  };

  const handleRegister = (password, email) => {
    auth
      .register(password, email)
      .then((data) => {
        setSuccessRegister(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((e) => {
        if (e === 400) {
          console.log(`Ошибка: ${e} - некорректно заполнено одно из полей`);
        }
        setSuccessRegister(false);
      })
      .finally(() => {
        setIsInfoToolTipPopupOpen(true);
      });
  };

  const handleLogin = (password, email) => {
    auth
      .login(password, email)
      .then((data) => {
        if (data.token) {
          handleIsLogged();
          setEmailUser(email);
          navigate("/", { replace: true });
        }
      })
      .catch((e) => {
        if (e === 400) {
          console.log(`Ошибка: ${e} - не передано одно из полей`);
        }
        if (e === 401) {
          console.log(`Ошибка: ${e} - пользователь с email не найден`);
        }
      });
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setIsMobileMenuOpen(false);
    navigate("/sign-in", { replace: true });
  };

  const handleAddPlaceSubmit = (newCardData) => {
    setLoadingPopupRequest(true);

    api
      .addNewUserCard(newCardData)
      .then((newApiCardData) => {
        setCards([newApiCardData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingPopupRequest(false));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    if (isLiked) {
      api
        .dislikeCard(card._id)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((item) => (item._id === card._id ? newCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((item) => (item._id === card._id ? newCard : item))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCardDelete = (card) => {
    setLoadingPopupRequest(true);

    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingPopupRequest(false));
  };

  const handleUpdateUser = (newUserData) => {
    setLoadingPopupRequest(true);

    api
      .setProfileUserInfo(newUserData)
      .then((newApiUserData) => {
        setCurrentUser(newApiUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingPopupRequest(false));
  };

  const handleUpdateAvatar = (newAvatarData) => {
    setLoadingPopupRequest(true);

    api
      .changeUserAvatar(newAvatarData)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar: newAvatarData.avatar });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingPopupRequest(false));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleDeleteBtnClick = (card) => {
    setWillDeleteCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleApprovalClick = () => {
    setIsApprovalPopupOpen(true);
  };

  const handleMenuMobileClick = () => {
    if (loggedIn) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsApprovalPopupOpen(false);
    setIsInfoToolTipPopupOpen(false);

    setSelectedCard(null);
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          emailUser={emailUser}
          handleSignout={handleSignout}
          handleMenuMobileClick={handleMenuMobileClick}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onApproval={handleApprovalClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteBtnClick}
                cards={cards}
                loggedIn={loggedIn}
              />
            }
          />

          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />

          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />

          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
        </Routes>

        {loggedIn && <Footer />}

        <InfoTooltip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          isSuccessRegister={successRegister}
        />

        <EditProfilePopup
          isLoadingRequest={loadingPopupRequest}
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          isLoadingRequest={loadingPopupRequest}
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isLoadingRequest={loadingPopupRequest}
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <ApprovalPopup
          card={willDeleteCard}
          isLoadingRequest={loadingPopupRequest}
          onDeleteCard={handleCardDelete}
          isOpen={isApprovalPopupOpen}
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
