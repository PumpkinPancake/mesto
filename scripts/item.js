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

  constructor(data) {
    this._image = document.querySelector(".popup__img");
    this._popupImg = document.querySelector(".popup_open_big-img");
    this._popupImgTitle = document.querySelector(".popup__title-img");
    this._link = data.link;
    this._title = data.name;
    this._data = data;
    this._getTemplate();
  }

  _like() {
    this.btnLike.classList.toggle("element__button-like_active");
  }

  _delete() {
    this._element.remove();
  }

  _openImg() {
    this._popupImg.classList.add("popup_opened");

    this._image.src = this._link;
    this._popupImgTitle.textContent = this._title;
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

    this._cardImg.addEventListener("click", () => {
      this._openImg();
    });
  }
}
