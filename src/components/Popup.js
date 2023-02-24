export default class Popup {
    constructor(selector) {
        this._selector = selector;
        this._buttonClose = this._selector.querySelector('.popup__button-closed');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
      this._selector.classList.add('popup_opened');
      document.addEventListener('keydown', this.__handleEscClose);
    }

    close() {
      this._selector.classList.remove('popup_opened');
      document.removeEventListener('keydown', this.__handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
         this.close();
        };
     }

    _closePopupByOverlayClick(evt) {
        if (evt.target.classList.contains("popup")) {
            this.close(evt.currentTarget);
        };
    }

    setEventListeners() {
      this._buttonClose.addEventListener('click', () => {
        this.close();
      });

      this._selector.addEventListener('click', (evt) => {
        this._closePopupByOverlayClick(evt);
      });
    }
}