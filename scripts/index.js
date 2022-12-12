let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__button-closed');
let addButton = document.querySelector('.profile__edit-button');
let title = document.querySelector('.profile__title');
let about = document.querySelector('.profile__subtitle');
let enterName = document.querySelector('.popup__input_text-name');
let enterAbout = document.querySelector('.popup__input_text-about');
let formElement = document.querySelector('.popup__form');


function openPopup() {
    enterName.value = title.textContent;
    enterAbout.value = about.textContent;

    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}


function handleFormSubmit (evt) {
    evt.preventDefault();

    title.textContent = `${enterName.value}`;
    about.textContent = `${enterAbout.value}`;
    closePopup();
}


addButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

