import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = popupSelector;
    this._popupImg = this._popup.querySelector(".popup__img");
    this._popupTitle = this._popup.querySelector(".popup__title-img");
  }

  open(title, link) {
    this._popupImg.src = link;
    this._popupImg.alt = title;
    this._popupTitle.textContent = title;

    super.open();
  }
}
