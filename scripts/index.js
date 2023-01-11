// консты для попапа редактирования имени пррофиля

const popupEdit = document.querySelector(".popup-edit");
const popupEditClose = document.querySelector(".popup-edit__btn-closed");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const nameEnter = document.querySelector(".popup__input_text_type-username");
const aboutEnter = document.querySelector(".popup__input_text_type-about");
const popupEditForm = document.querySelector(".popup-edit__form");
const popupEditBtnSubmit = document.querySelector('.popup-edit__submit');

// консты для профиля

const title = document.querySelector(".profile__title");
const about = document.querySelector(".profile__subtitle");

// консты попапа добавления картинок

const popupAdd = document.querySelector(".popup-add");
const popupAddClose = document.querySelector(".popup-add__btn-closed");
const btnPopupAdd = document.querySelector(".profile__add-button");
const formAddEl = document.querySelector(".popup-add__form");
const popupInputImgName = document.querySelector(
  ".popup__input_text_type-title"
);
const popupInputLink = document.querySelector(".popup__input_text_type-link");

// консты элементов

const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#element-template").content;
const cardNew = cardTemplate.querySelector(".element");

// консты больших картинок

const popupImg = document.querySelector(".popup__img");
const popupBigImg = document.querySelector(".popup_open_big-img");
const popupImgTitle = document.querySelector(".popup__title-img");
const popupBtnCloseBigImg = document.querySelector(
  ".popup__button-closed_big-img"
);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_visible",
  typeError: "popup__input_type_error"
};

// функция закрытия попапа по клику на оверлей

const closePopupByOverlayClick = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.currentTarget);    
  }
}

// Закрытие попапа кликом на Escape

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
}

// функция открытия попапов

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEsc);
}

// функция закрытия попапов

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByEsc);
}

// функция добавления новой карточки

function handleFormAddSubmit(evt) {
  evt.preventDefault();

    const cardData = {
      name: popupInputImgName.value,
      link: popupInputLink.value,
    };
    cardsContainer.prepend(createCard(cardData));
  evt.target.reset();
  closePopup(popupAdd);
}

// функция открытия больших картинок

function openBigImg(img, title) {
  openPopup(popupBigImg);
  popupImg.src = img;
  popupImgTitle.textContent = title;
  popupImg.alt = title;
  popupBigImg.addEventListener('click', closePopupByOverlayClick);
}

// Смена имени профиля

function handleFormEditSubmit(evt) {
  evt.preventDefault();

  title.textContent = nameEnter.value;
  about.textContent = aboutEnter.value;
  closePopup(popupEdit);
}

// функция создания новой карточки

function createCard(cardData) {
  const cardElement = cardNew.cloneNode(true);
  const cardImg = cardElement.querySelector(".element__img");
  const cardTitle = cardElement.querySelector(".element__title");

  cardImg.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardImg.alt = cardData.name;

  // для лайка

  const btnLike = cardElement.querySelector(".element__button-like");

  btnLike.addEventListener("click", () => {
    btnLike.classList.toggle("element__button-like_active");
  });

  // для открытия большой картинки

  cardImg.addEventListener("click", () => {
    openBigImg(cardImg.src, cardTitle.textContent);
  });

  // для удаления карточки

  cardElement
    .querySelector(".element__del-btn")
    .addEventListener("click", () => {
      cardElement.remove();
    });

  return cardElement;
}

// создание карточек из массива

initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});

// слушатели отправки формы

popupEditForm.addEventListener("submit", handleFormEditSubmit);
formAddEl.addEventListener("submit", handleFormAddSubmit);

buttonEditProfile.addEventListener("click", () => {
  openPopup(popupEdit);
  nameEnter.value = title.textContent;
  aboutEnter.value = about.textContent;
  setEventListeners(popupEdit, validationConfig);
  popupEdit.addEventListener('click', closePopupByOverlayClick);
});

popupEditClose.addEventListener("click", () => {
  closePopup(popupEdit);
});

btnPopupAdd.addEventListener("click", () => {
  openPopup(popupAdd);
  setEventListeners(popupAdd, validationConfig);
  popupAdd.addEventListener('click', closePopupByOverlayClick);
});

popupAddClose.addEventListener("click", () => {
  closePopup(popupAdd);
});

// функция закрытия больших картинок

popupBtnCloseBigImg.addEventListener("click", () => {
  closePopup(popupBigImg);
});

enableValidation(validationConfig);
