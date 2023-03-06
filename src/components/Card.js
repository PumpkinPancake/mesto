export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleCardRemove,
    handleCardLike,
    userId
  ) {
    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleCardRemove = handleCardRemove;
    this._handleCardLike = handleCardLike;

    this._link = data.link;
    this._title = data.name;
    this._data = data;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._isLike = false;
  }

  setLikes(anotherLike) {
    const index = this._likes.findIndex((like) => like._id === anotherLike._id);

    if (index === -1) {
      this._likes.push(anotherLike);
      this._btnLike.classList.add("element__button-like_active");
    } else {
      this._likes.splice(index, 1);
      this._btnLike.classList.remove("element__button-like_active");
    }

    if (this._isLike) {
      this._isLike = false;
      this._likesCounter.textContent--;
      this._btnLike.classList.remove("element__button-like_active");
    } else {
      this._isLike = true;
      this._likesCounter.textContent++;
      this._btnLike.classList.add("element__button-like_active");
    }
  }

  delete() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    this._template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element");
  }

  _setEventListeners() {
    this._btnLike.addEventListener("click", () => {
      this._handleCardLike(this, this._cardId);
    });

    this._btnDelete.addEventListener("click", () => {
      this._handleCardRemove(this);
    });

    this._cardImg.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });

    this._likesCounter.addEventListener("click", () => {
      this._handleCardLike(this, this._cardId);
    });
  }

  create() {
    this._card = this._getTemplate();
    this._element = this._template.cloneNode(true);
    this._cardImg = this._element.querySelector(".element__img");
    this._cardTitle = this._element.querySelector(".element__title");
    this._btnLike = this._element.querySelector(".element__button-like");
    this._btnDelete = this._element.querySelector(".element__del-btn");
    this._likesCounter = this._element.querySelector(".element__like-counter");

    if (this._ownerId !== this._userId) this._btnDelete.remove();

    this._cardImg.src = this._data.link;
    this._cardTitle.textContent = this._data.name;
    this._cardImg.alt = this._data.name;
    this._likesCounter.textContent = this._likes.length;

    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._btnLike.classList.add("element__button-like_active");
        this._isLike = true;
      }
    });

    this._setEventListeners();

    return this._element;
  }

  get isLike() {
    return this._isLike;
  }
}
