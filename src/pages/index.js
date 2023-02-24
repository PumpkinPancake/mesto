import { initialCards } from "../components/cards.js";
import { Card } from "../components/Card.js";
import { FormValidation } from "../components/FormValidation.js";
import "./index.css";
import { Section } from "../components/Section.js";
import { validationConfig } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

// консты для попапа редактирования имени пррофиля

const popupEdit = document.querySelector(".popup-edit");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const nameEnter = document.querySelector(".popup__input_text_type-username");
const aboutEnter = document.querySelector(".popup__input_text_type-about");
const popupEditForm = document.querySelector(".popup-edit__form");
const title = document.querySelector(".profile__title");
const about = document.querySelector(".profile__subtitle");

// консты попапа добавления картинок

const popupAdd = document.querySelector(".popup-add");
const btnPopupAdd = document.querySelector(".profile__add-button");
const popupAddForm = document.querySelector(".popup-add__form");
const popupInputImgName = document.querySelector(
  ".popup__input_text_type-title"
);
const popupInputLink = document.querySelector(".popup__input_text_type-link");

// консты элементов

const cardsContainer = document.querySelector(".elements");

// консты больших картинок

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
  selector: popupAdd,
  formSubmit: handleFormAddSubmit,
});

formAddCard.setEventListeners();

// функция добавления новой карточки

function handleFormAddSubmit() {
  cardsList.addNewItem(
    createCard({
      name: popupInputImgName.value,
      link: popupInputLink.value,
    })
  );
  formAddCard.close();
}

btnPopupAdd.addEventListener("click", () => {
  formAddCard.open();
});

const formEdit = new PopupWithForm({
  selector: popupEdit,
  formSubmit: handleFormEditSubmit,
});

const userInfo = new UserInfo({
  name: title,
  info: about,
});

function handleFormEditSubmit() {
  userInfo.setUserInfo({
    name: nameEnter.value,
    info: aboutEnter.value,
  });
  formEdit.close();
}

buttonEditProfile.addEventListener("click", () => {
  const { name, info } = userInfo.getUserInfo();
  nameEnter.value = name;
  aboutEnter.value = info;
  formEdit.open();
  formEditValidation.resetValidation();
});

formEdit.setEventListeners();
