import { initialCards } from "../utils/cards.js";
import { Card } from "../components/Card.js";
import { FormValidation } from "../components/FormValidation.js";
import "./index.css";
import { Section } from "../components/Section.js";
import { validationConfig } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

const popupEdit = document.querySelector(".popup-edit");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const nameEnter = document.querySelector(".popup__input_text_type-username");
const aboutEnter = document.querySelector(".popup__input_text_type-about");
const title = document.querySelector(".profile__title");
const about = document.querySelector(".profile__subtitle");
const popupAdd = document.querySelector(".popup-add");
const btnPopupAdd = document.querySelector(".profile__add-button");
const popupAddForm = document.querySelector(".popup-add__form");
const popupEditForm = document.querySelector(".popup-edit__form");

const cardsContainer = document.querySelector(".elements");
const popupBigImg = document.querySelector(".popup_open_big-img");

const popupOpenBigImg = new PopupWithImage(popupBigImg);

const createCard = (data) => {
  const card = new Card(data, "#element-template", handleCardClick);
  return card.create();
};

function handleCardClick(title, link) {
  popupOpenBigImg.open(title, link);
}

popupOpenBigImg.setEventListeners();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    },
  },
  cardsContainer
);

cardsList.renderItems();

const formEditValidation = new FormValidation(validationConfig, popupEditForm);
formEditValidation.enableValidation();

const formAddValidation = new FormValidation(validationConfig, popupAddForm);
formAddValidation.enableValidation();

const formAddCard = new PopupWithForm({
  popupSelector: popupAdd,
  formSubmit: handleFormAddSubmit,
});

formAddCard.setEventListeners();

function handleFormAddSubmit(data) {
  cardsList.addNewItem(createCard(data));
  formAddCard.close();
}

btnPopupAdd.addEventListener("click", () => {
  formAddValidation.resetValidation();
  formAddCard.open();
});

const formEdit = new PopupWithForm({
  popupSelector: popupEdit,
  formSubmit: handleFormEditSubmit,
});

formEdit.setEventListeners();

const userInfo = new UserInfo({
  name: title,
  about: about,
});

function handleFormEditSubmit(data) {
  userInfo.setUserInfo(data);
  formEdit.close();
}

buttonEditProfile.addEventListener("click", () => {
  const { name, info } = userInfo.getUserInfo();
  nameEnter.value = name;
  aboutEnter.value = info;
  formEditValidation.resetValidation();
  formEdit.open();
});
