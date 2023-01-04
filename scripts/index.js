// консты для попапа редактирования имени пррофиля

const popupEdit = document.querySelector(".popup-edit");
const popupClose = document.querySelector(".popup__button-closed");
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

// Открытие попапов

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// закрытие попапов

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// функция добавления новой карточки

function handleFormAddSubmit(evt) {
  evt.preventDefault();

  if (popupInputLink.value !== "") {
    const cardData = {
      name: popupInputImgName.value,
      link: popupInputLink.value,
    };
    cardsContainer.prepend(createCard(cardData));
  }
  evt.target.reset();
  closePopup(popupAdd);
}

// функция открытия больших картинок

function openBigImg(img, title) {
  openPopup(popupBigImg);
  popupImg.src = img;
  popupImgTitle.textContent = title;
  popupImg.alt = title;
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
  nameEnter.value = title.textContent;
  aboutEnter.value = about.textContent;
  openPopup(popupEdit);
});

popupClose.addEventListener("click", () => {
  closePopup(popupEdit);
});

btnPopupAdd.addEventListener("click", () => {
  openPopup(popupAdd);
});

popupAddClose.addEventListener("click", () => {
  closePopup(popupAdd);
});

// функция закрытия больших картинок

popupBtnCloseBigImg.addEventListener("click", () => {
  closePopup(popupBigImg);
});