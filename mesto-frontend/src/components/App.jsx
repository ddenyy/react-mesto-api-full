import React, { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import api from '../utils/Api';
import { currentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import Loader from './Loader.jsx';
import AcceptDeleteCardPopup from './AcceptDeleteCardPopup';
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import ProtectRoute from './ProtectedRoute.jsx';
import InfoTooltip from "./InfoTooltip.jsx";
import * as MestoAuth from "../utils/MestoAuth.js"

function App() {
  // стейт открытия попапа редактирования профиля 
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  // стейт открытия попапа добавления карточки 
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  // стейт открытия поапап редактирования аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  // стейт для открытия попапа подтверждения удаления
  const [isAcceptDeletePopupOpen, setIsAcceptDeletePopupOpen] = React.useState(false);
  // стейт для открытия попапа на весь экран картинки
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  // // стейт для удалённой карточки
  const [cardDelete, isCardDelete] = React.useState({});
  // стейт для открытия карточки на весь экран
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  // стейт для информации текущего пользователя 
  const [currentUser, setCurrentUser] = React.useState({});
  // стейт для карточекы
  const [cards, setCards] = React.useState([]);
  // стейт для лоадера
  const [isLoader, setLoader] = React.useState(false);

  const [loggedIn, setIsLoggedIn] = React.useState(null);

  const history = useHistory();

  const [PopupRegister, setOpenPopupRegister] = React.useState(false);

  const [succesRegister, setIssuccesRegister] = React.useState(false);

  const [UserEmail, setUserEmail] = React.useState("");

  React.useEffect(() => {
    // рендер страницы
    if (currentUser || loggedIn) {
      return api.renderUserAndCards()
        .then(([currentUserInfo, dataCards]) => {
          setCurrentUser(currentUserInfo.data);
          setCards(dataCards.data);
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  // UserData
  React.useEffect(() => {
    checkToken()
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/")
    }
  }, [loggedIn])

  // управление попапом изменение аватарки
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // управление попапом редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // управление попапом добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsAcceptDeletePopupOpen(false);
    setOpenPopupRegister(false);
    setIsImagePopupOpen(false);
  }

  function handleUpdateUser(data) {
    setLoader(true);
    api.updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData.data);
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false))
  }

  function handleUpdateAvatar(data) {
    setLoader(true)
    api.updateUserAvatar(data.avatar)
      .then((newData) => {
        setCurrentUser(newData.data);
        closeAllPopups()
      })
      .catch((err) => { console.log(err) })
      .finally(() => setLoader(false))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (!isLiked) {
      api.setLike(card)
        .then((newCard) => {
          return setCards((state) => state.map((c) => c._id === card._id ? newCard.card : c));
        })
        .catch((err) => console.log(err))
    }
    else {
      api.deleteLike(card)
        .then((newCard) => {
         return setCards((state) => state.map((c) => c._id === card._id ? newCard.card : c));
        })
        .catch((err) => { console.log(err) })
    }

  }
 
  // ф-ция подтверждения удаления
  function handleAcceptDelete() {
    handleCardDelete(cardDelete)
  }

  // ф-ция открытия попапа удаления карточки
  function handleOpenPopupDelete(data) {
    isCardDelete(data)
    setIsAcceptDeletePopupOpen(true);
  }

  // ф-ция управляет удалением карточки
  function handleCardDelete(card) {
    setLoader(true);
    api.deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((item) => item._id != card._id))
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setLoader(false))
  }

  function handleAddPlace(data) {
    setLoader(true);
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoader(false)
      })
  }

  function handleRegister(password, email) {
    setLoader(true);
    return (
      MestoAuth.register(password, email)
        .then((res) => {
          if (res.data.email) {
            setIssuccesRegister(true);
            setOpenPopupRegister(true);
            setLoader(false);
            history.push("/sign-in")
          }
          else {
            throw new Error("Что-то пошло не так!")
          }
        })
        .catch((e) => unsuccessfulRegister())
    );
  }

  function handleLogin(email, password) {
    setLoader(true);
    return (MestoAuth.authorize(email, password)
      .then((res) => {
        if (!res) {
          unsuccessfulRegister()
          setLoader(false);
        }
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          setLoader(false);
          history.push("/");
        }
      })
      .catch(e => console.log(e))
    );
  }

  function checkToken() {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      MestoAuth.getContent(jwt)
        .then((res) => {
          if (res.data) {
            const { email } = res.data;
            setUserEmail(email);
            setIsLoggedIn(true);
            history.push("/");
          }
        })
        .catch(e => console.log(e))
    }
  }

  function handleExit() {
    localStorage.removeItem('jwt');
    setUserEmail("");
    setIsLoggedIn(false);
    history.push('/sign-in');
  }

  function unsuccessfulRegister() {
    setLoader(false);
    setIssuccesRegister(false);
    setOpenPopupRegister(true);
  }

  function handleTextInfoTooltip() {
    if (succesRegister) {
      return "Вы успешно зарегистрировались !"
    }
    else {
      return "что-то пошло не так :("
    }
  }


  function useEscapePress(callback, dependency) {
    React.useEffect(() => {
      if (dependency) {
        const onEscClose = e => {
          if (e.key === 'Escape') {
            callback()
          }
        }
        document.addEventListener('keyup', onEscClose);
        // при размонтировании удалим обработчик данным колбэком
        return () => {
          document.removeEventListener('keyup', onEscClose)
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependency])
  }

  function handleCardClick(data) {
    setIsImagePopupOpen(true);
    setSelectedCard(data);
  }


  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header loggedIn={loggedIn} email={UserEmail} handleExit={handleExit} />
          <Switch>
            <Route path="/sign-in">
              <Login setLoader={setLoader} handleLogin={handleLogin} unsuccessfulRegister={unsuccessfulRegister} />
            </Route>
            <Route path="/sign-up">
              <Register unsuccessfulRegister={unsuccessfulRegister} handleRegister={handleRegister} />
            </Route>
            <ProtectRoute exact path="/" cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleOpenPopupDelete}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              component={Main}
              loggedIn={loggedIn}
            />
            <Route>
              {loggedIn ? <Redirect exact to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            useEscapePress={useEscapePress}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            useEscapePress={useEscapePress}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            useEscapePress={useEscapePress}
            isOpen = {isImagePopupOpen}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            useEscapePress={useEscapePress}
          />
          <Loader isOpen={isLoader} />
          <AcceptDeleteCardPopup
            isAccept={handleAcceptDelete}
            onClose={closeAllPopups}
            isOpen={isAcceptDeletePopupOpen}
            useEscapePress={useEscapePress}
          />
          <InfoTooltip
            text={handleTextInfoTooltip()}
            onClose={closeAllPopups}
            isRegister={succesRegister}
            isOpen={PopupRegister}
            useEscapePress={useEscapePress}
          />
        </div>
      </div>


    </currentUserContext.Provider>
  );
}

export default App;
