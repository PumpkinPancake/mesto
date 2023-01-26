import { initialCards } from "./cards.js";

import { Card } from "./item.js";
import { validationConfig, FormValidation } from "./valid.js";

// консты для попапа редактирования имени пррофиля

const popupEdit = document.querySelector(".popup-edit");
const popupEditClose = document.querySelector(".popup-edit__btn-closed");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const nameEnter = document.querySelector(".popup__input_text_type-username");
const aboutEnter = document.querySelector(".popup__input_text_type-about");
const popupEditForm = document.querySelector(".popup-edit__form");

// консты для профиля

const title = document.querySelector(".profile__title");
const about = document.querySelector(".profile__subtitle");

// консты попапа добавления картинок

const popupAdd = document.querySelector(".popup-add");
const popupAddClose = document.querySelector(".popup-add__btn-closed");
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

const popupBtnCloseBigImg = document.querySelector(
  ".popup__button-closed_big-img"
);

const editFormValidation = new FormValidation(validationConfig, popupEditForm);
editFormValidation.enableValidation();

const addFormValidation = new FormValidation(validationConfig, popupAddForm);
addFormValidation.enableValidation();

// функция закрытия попапа по клику на оверлей

const closePopupByOverlayClick = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.currentTarget);
  }
};

// Закрытие попапа кликом на Escape

const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

// функция открытия попапов

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

// функция закрытия попапов

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

// функция добавления новой карточки

function handleFormAddSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: popupInputImgName.value,
    link: popupInputLink.value,
  };

  const card = new Card(cardData);

  cardsContainer.prepend(card.create());
  evt.target.reset();
  closePopup(popupAdd);
}

// Смена имени профиля

function handleFormEditSubmit(evt) {
  evt.preventDefault();

  title.textContent = nameEnter.value;
  about.textContent = aboutEnter.value;
  closePopup(popupEdit);
}

const createCard = (initialCards) => {
  const card = new Card(initialCards);
  const element = card.create();
  cardsContainer.append(element);
};

initialCards.forEach(createCard);

buttonEditProfile.addEventListener("click", () => {
  openPopup(popupEdit);
  nameEnter.value = title.textContent;
  aboutEnter.value = about.textContent;
  editFormValidation.resetValidation();
});

popupEditClose.addEventListener("click", () => {
  closePopup(popupEdit);
});

btnPopupAdd.addEventListener("click", () => {
  addFormValidation.resetValidation();
  openPopup(popupAdd);
});

popupAddClose.addEventListener("click", () => {
  closePopup(popupAdd);
});

// функция закрытия больших картинок

popupBtnCloseBigImg.addEventListener("click", () => {
  closePopup(popupBigImg);
});

// слушатели отправки формы

popupEditForm.addEventListener("submit", handleFormEditSubmit);
popupAddForm.addEventListener("submit", handleFormAddSubmit);

// слушатели закрытия по оверлею

popupAdd.addEventListener("click", closePopupByOverlayClick);
popupEdit.addEventListener("click", closePopupByOverlayClick);
popupBigImg.addEventListener("click", closePopupByOverlayClick);

// enableValidation(validationConfig);
