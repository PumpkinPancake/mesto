const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__button-closed");
const editButton = document.querySelector(".profile__edit-button");
const title = document.querySelector(".profile__title");
const about = document.querySelector(".profile__subtitle");
const enterName = document.querySelector(".popup__input_text_type-username");
const enterAbout = document.querySelector(".popup__input_text_type-about");
const formElement = document.querySelector(".popup__form");

// Открытие попапа

function openPopup() {
  enterName.value = title.textContent;
  enterAbout.value = about.textContent;

  popup.classList.add("popup_opened");
}

// Закрытие попапа

function closePopup() {
  popup.classList.remove("popup_opened");
}

// Смена имени профиля

function handleFormSubmit(evt) {
  evt.preventDefault();

  title.textContent = `${enterName.value}`;
  about.textContent = `${enterAbout.value}`;
  closePopup();
}

editButton.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleFormSubmit);

// 5 ПР

// консты попапа добавления картинок

const popupAdd = document.querySelector(".popup-add");
const popupAddClose = document.querySelector(".popup-add_btn-closed");
const btnPopupAdd = document.querySelector(".profile__add-button");
const formAddEl = document.querySelector(".popup-add_form");
const popupAddSubmit = document.querySelector(".popup-add__submit");

// консты элементов

const elementContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element-template").content;
const delBtnCard = elementTemplate.querySelector(".element__del-btn");

// консты больших картинок

const popupImg = document.querySelector(".popup__img");
const popupBigImg = document.querySelector(".popup__open_big-img");
const popupImgTitle = document.querySelector(".popup__title-img");
const popupBtnCloseBigImg = document.querySelector(
  ".popup__button-closed_big-img"
);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function openPopupAdd() {
  popupAdd.classList.add("popup_opened");
}

function closePopupAdd() {
  popupAdd.classList.remove("popup_opened");
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  closePopupAdd();
}

function openBigImg(img, title) {
  popupBigImg.classList.add("popup_opened");
  popupImg.src = img;
  popupImgTitle.textContent = title;
  popupImg.alt = title;
}

function closeBigImg() {
  popupBigImg.classList.remove("popup_opened");
}

function addLike(evt) {
  evt.target.classList.toggle("element__button-like_active");
}

function addNewCard(name, link) {
  const newCard = elementTemplate.querySelector(".element").cloneNode(true);
  newCard.querySelector(".element__img").src = link;
  newCard.querySelector(".element__title").textContent = name;
  newCard.querySelector(".element__img").alt = name;

  newCard
    .querySelector(".element__button-like")
    .addEventListener("click", addLike);

  newCard.querySelector(".element__img").addEventListener("click", () => {
    openBigImg(link, name);
  });

  newCard.querySelector(".element__del-btn").addEventListener("click", () => {
    newCard.remove();
  });

  return newCard;
}

initialCards.forEach((item) => {
  elementContainer.append(addNewCard(item.name, item.link));
});

popupAddSubmit.addEventListener("click", function () {
  const popupInputImgName = document.querySelector(
    ".popup-add_input_text_type-title"
  );
  const popupInputLink = document.querySelector(
    ".popup-add_input_text_type-link"
  );
  if (popupInputLink.value !== "") {
    elementContainer.prepend(
      addNewCard(popupInputImgName.value, popupInputLink.value)
    );
  }
  popupInputImgName.value = "";
  popupInputLink.value = "";
});

popupBtnCloseBigImg.addEventListener("click", closeBigImg);
btnPopupAdd.addEventListener("click", openPopupAdd);
popupAddClose.addEventListener("click", closePopupAdd);
formAddEl.addEventListener("submit", handleFormAddSubmit);
