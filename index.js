let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__button-closed');
let addButton = document.querySelector('.profile__edit-button');
let title = document.querySelector('.profile__title');
let about = document.querySelector('.profile__subtitle');
let submit = document.querySelector('.popup__submit');


popup.classList.remove('popup_opened');

addButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

function openPopup() {
    let enterName = document.querySelector('.input__popup-name');
    let enterAbout = document.querySelector('.input__popup-about');

    enterName.value = title.textContent;
    enterAbout.value = about.textContent;

    popup.classList.add('popup_opened');

}

function closePopup() {
    popup.classList.remove('popup_opened');
}



function addName() {
    let enterName = document.querySelector('.input__popup-name');
    let enterAbout = document.querySelector('.input__popup-about');

    title.innerHTML = `<h1 class="profile__title">${enterName.value}</h1>`;
    about.innerHTML = `<h2 class="profile__subtitle">${enterAbout.value}</h2>`;
    closePopup();
}

    submit.addEventListener('click', addName);
