
export class Card {
  _data;
  _template;
  _element;
  _cardImg;
  _cardTitle;
  _btnLike;
  _btnDelete;
  _popupImg;
  _popupImgTitle;
  _popupOpened;
  _handleOpenPopup;

  constructor(data, templateSelector, handleOpenPopup) {
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
    this._link = data.link;
    this._title = data.name;
    this._data = data;
    this._getTemplate();
  }

  _like() {
    this._btnLike.classList.toggle("element__button-like_active");
  }

  _delete() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    this._template = document
      .querySelector("#element-template")
      .content.querySelector(".element");
  }

  create() {
    this._card = this._getTemplate();
    this._element = this._template.cloneNode(true);
    this._cardImg = this._element.querySelector(".element__img");
    this._cardTitle = this._element.querySelector(".element__title");
    this._btnLike = this._element.querySelector(".element__button-like");
    this._btnDelete = this._element.querySelector(".element__del-btn");

    this._cardImg.src = this._data.link;
    this._cardTitle.textContent = this._data.name;
    this._cardImg.alt = this._data.name;

    this.setEventListeners();

    return this._element;
  }

  setEventListeners() {
    this._btnLike.addEventListener("click", () => {
      this._like();
    });

    this._btnDelete.addEventListener("click", () => {
      this._delete();
    });

    this._cardImg.addEventListener('click', () => { 
      this._handleOpenPopup(this._title, this._link) 
    }); 
  }
}
