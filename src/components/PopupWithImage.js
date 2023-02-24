import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._selector = selector;
    this._popupImg = this._selector.querySelector('.popup__img');
    this._popupTitle = this._selector.querySelector('.popup__title-img');
  }

  open(title, link) {
    this._popupImg.src = link;
    this._popupImg.alt = title;
    this._popupTitle.textContent = title;

    super.open();
  }
}