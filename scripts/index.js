// консты для попапа редактирования имени пррофиля

const popups = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__button-closed");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const nameEnter = document.querySelector(".popup__input_text_type-username");
const aboutEnter = document.querySelector(".popup__input_text_type-about");
const popupEditForm = document.querySelector(".popup__form");

// консты для профиля

const title = document.querySelector(".profile__title");
const about = document.querySelector(".profile__subtitle");

// консты попапа добавления картинок

const popupAdd = document.querySelector(".popup-add");
const popupAddClose = document.querySelector(".popup-add__btn-closed");
const btnPopupAdd = document.querySelector(".profile__add-button");
const formAddEl = document.querySelector(".popup-add__form");
const popupAddSubmit = document.querySelector(".popup-add__submit");
const popupInputImgName = document.querySelector(".popup__input_text_type-title");
const popupInputLink = document.querySelector(".popup__input_text_type-link");

// консты элементов

const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#element-template").content;
const newCard = cardTemplate.querySelector(".element");

// консты больших картинок

const popupImg = document.querySelector(".popup__img");
const popupBigImg = document.querySelector(".popup_open_big-img");
const popupImgTitle = document.querySelector(".popup__title-img");
const popupBtnCloseBigImg = document.querySelector(
  ".popup__button-closed_big-img"
);

const popupBtnOpen = document.querySelectorAll('.open_popup');

nameEnter.value = title.textContent;
aboutEnter.value = about.textContent;

// открытие и закрытие попапа

popupBtnOpen.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    popups.classList.add('popup_opened');
  });
});

popupClose.addEventListener('click',() => {
  popups.classList.remove('popup_opened');
});

// функция добавления новой карточки

function handleFormAddSubmit(evt) {
  evt.preventDefault();

  if (popupInputLink.value !== "") {
    cardsContainer.prepend(
      createCard(popupInputImgName.value, popupInputLink.value)
    );
  }
  evt.target.reset();
  popupAdd.classList.remove('popup_opened');
}

// функция открытия больших картинок

function openBigImg(img, title) {
  popupBigImg.classList.add('popup_opened');
  popupImg.src = img;
  popupImgTitle.textContent = title;
  popupImg.alt = title;
}

// функция закрытия больших картинок

popupBtnCloseBigImg.addEventListener("click", () => {
  popupBigImg.classList.remove('popup_opened');
});

// Смена имени профиля

function handleFormEditSubmit(evt) {
  evt.preventDefault();

  title.textContent = nameEnter.value;
  about.textContent = aboutEnter.value;
  popups.classList.remove("popup_opened");
}

// функция смены класса для лайка

function handleLikeClick(evt) {
  evt.target.classList.toggle("element__button-like_active");
}

// функция создания новой карточки

function createCard(name, link) {
  const cardElement = newCard.cloneNode(true);
  cardElement.querySelector(".element__img").src = link;
  cardElement.querySelector(".element__title").textContent = name;
  cardElement.querySelector(".element__img").alt = name;

  // для лайка

  cardElement
    .querySelector(".element__button-like")
    .addEventListener("click", handleLikeClick);

  // для открытия большой картинки

  cardElement.querySelector(".element__img").addEventListener("click", () => {
    openBigImg(link, name);
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
  cardsContainer.append(createCard(item.name, item.link));
});

// слушатели отправки формы

popupEditForm.addEventListener("submit", handleFormEditSubmit);
formAddEl.addEventListener("submit", handleFormAddSubmit);
