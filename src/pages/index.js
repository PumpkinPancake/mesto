import { Card } from "../components/Card.js";
import { FormValidation } from "../components/FormValidation.js";
import "./index.css";
import { Section } from "../components/Section.js";
import { validationConfig } from "../utils/constants.js";
import { config } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import { PopupWithWarning } from "../components/popupWithWarning.js";

const popupEdit = document.querySelector(".popup-edit");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const nameEnter = document.querySelector(".popup__input_text_type-username");
const aboutEnter = document.querySelector(".popup__input_text_type-about");
const title = document.querySelector(".profile__title");
const about = document.querySelector(".profile__subtitle");
const userAvatar = document.querySelector(".profile__avatar");
const popupAdd = document.querySelector(".popup-add");
const btnPopupAdd = document.querySelector(".profile__add-button");
const popupAddForm = document.querySelector(".popup-add__form");
const popupEditForm = document.querySelector(".popup-edit__form");
const popupEditAvatar = document.querySelector(".popup-avatar");
const popupEditAvatarForm = document.querySelector(".popup-avatar__form");
const popupOpenWarning = document.querySelector(".popup-warning");
const btnEditAvatar = document.querySelector(".profile__avatar-edit-btn");

const cardsContainer = document.querySelector(".elements");
const popupBigImg = document.querySelector(".popup_open_big-img");
let userId;

const api = new Api(config);

console.log(popupAddForm);

const popupOpenBigImg = new PopupWithImage(popupBigImg);
const userInfo = new UserInfo({
  name: title,
  about: about,
  avatar: userAvatar,
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, arrayCards]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(arrayCards);
  })
  .catch((err) => {
    console.log(err);
  });

const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.addNewItem(createCard(item));
    },
  },
  cardsContainer
);

const createCard = (data) => {
  const card = new Card(
    data,
    "#element-template",
    handleCardClick,
    handleCardRemove,
    handleCardLike,
    userId
  );
  const cardElement = card.create();
  return cardElement;
};

function handleCardLike(card, cardId) {
  if (!card.isLike) {
    api
      .likeCard(cardId)
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .likeRemove(cardId)
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch((err) => console.log(err));
  }
}

const popupWarning = new PopupWithWarning(
  popupOpenWarning,
  checkBeforeDeletion
);

function handleCardRemove(card, cardId) {
  popupWarning.open(card, cardId);
}

function checkBeforeDeletion(card) {
  popupWarning.showWaitingText("Удаление...");
  api
    .deleteCard(card._cardId)
    .then(() => {
      card.delete();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWarning.showWaitingText("Да");
    });
}

popupWarning.setEventListeners();

function handleCardClick(title, link) {
  popupOpenBigImg.open(title, link);
}

popupOpenBigImg.setEventListeners();

const formAddCard = new PopupWithForm({
  popupSelector: popupAdd,
  formSubmit: handleFormAddSubmit,
});

formAddCard.setEventListeners();

function handleFormAddSubmit(cardElement) {
  formAddCard.showWaitingText("Сохранение...");
  api
    .getPlaceCard(cardElement)
    .then((res) => {
      cardsList.addNewItem(createCard(res));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formAddCard.showWaitingText("Создать");
    });
}

const formEdit = new PopupWithForm({
  popupSelector: popupEdit,
  formSubmit: handleFormEditSubmit,
});

function handleFormEditSubmit(data) {
  formEdit.showWaitingText("Сохранение...");
  api
    .setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      formEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formEdit.showWaitingText("Сохранить");
    });
}

formEdit.setEventListeners();

const popupWithAvatar = new PopupWithForm({
  popupSelector: popupEditAvatar,
  formSubmit: handleFormEditAvatarSubmit,
});

popupWithAvatar.setEventListeners();

function handleFormEditAvatarSubmit(newLink) {
  popupWithAvatar.showWaitingText('Сохранение...')
  api
    .installAvatar(newLink.avatar)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithAvatar.showWaitingText('Сохранить')
    });
}

btnPopupAdd.addEventListener("click", () => {
  formAddValidation.resetValidation();
  formAddCard.open();
});

btnEditAvatar.addEventListener("click", () => {
  formAvatarValidation.resetValidation();
  popupWithAvatar.open();
});

buttonEditProfile.addEventListener("click", () => {
  const { name, info } = userInfo.getUserInfo();
  nameEnter.value = name;
  aboutEnter.value = info;
  formEditValidation.resetValidation();
  formEdit.open();
});

const formEditValidation = new FormValidation(validationConfig, popupEditForm);
formEditValidation.enableValidation();

const formAddValidation = new FormValidation(validationConfig, popupAddForm);
formAddValidation.enableValidation();

const formAvatarValidation = new FormValidation(
  validationConfig,
  popupEditAvatarForm
);

formAvatarValidation.enableValidation();
