import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidation } from "./FormValidation.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_visible",
  typeError: "popup__input_type_error",
};

// консты для попапа редактирования имени пррофиля

const popupEdit = document.querySelector(".popup-edit");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const nameEnter = document.querySelector(".popup__input_text_type-username");
const aboutEnter = document.querySelector(".popup__input_text_type-about");
const popupEditForm = document.querySelector(".popup-edit__form");

// консты для профиля

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
const popupImg = document.querySelector(".popup__img");
const popupImgTitle = document.querySelector(".popup__title-img");

const buttonCloseList = document.querySelectorAll(".popup__button-closed");

// функция закрытия попапа по клику на оверлей

const closePopupByOverlayClick = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.currentTarget);
  }
};

buttonCloseList.forEach((btn) => {
  const popup = btn.closest(".popup");
  popup.addEventListener("mousedown", closePopupByOverlayClick);
  btn.addEventListener("click", () => closePopup(popup));
});

const FormEditValidation = new FormValidation(validationConfig, popupEditForm);
FormEditValidation.enableValidation();

const FormAddValidation = new FormValidation(validationConfig, popupAddForm);
FormAddValidation.enableValidation();

// Закрытие попапа кликом на Escape

const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

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

  createCard(cardData);

  evt.target.reset();
  closePopup(popupAdd);
}

// функция открытия больших картинок

function handleOpenPopup(title, link) {
  openPopup(popupBigImg);

  popupImg.src = link;
  popupImg.alt = title;
  popupImgTitle.textContent = title;
}

// Смена имени профиля

function handleFormEditSubmit(evt) {
  evt.preventDefault();

  title.textContent = nameEnter.value;
  about.textContent = aboutEnter.value;
  closePopup(popupEdit);
}

const createCard = (data) => {
  const card = new Card(data, "#element-template", handleOpenPopup);
  const element = card.create();
  cardsContainer.prepend(element);
};

initialCards.forEach(createCard);

buttonEditProfile.addEventListener("click", () => {
  openPopup(popupEdit);
  nameEnter.value = title.textContent;
  aboutEnter.value = about.textContent;
  FormEditValidation.resetValidation();
});

btnPopupAdd.addEventListener("click", () => {
  popupAddForm.reset();
  FormAddValidation.resetValidation();
  openPopup(popupAdd);
});

// слушатели отправки формы

popupEditForm.addEventListener("submit", handleFormEditSubmit);
popupAddForm.addEventListener("submit", handleFormAddSubmit);
