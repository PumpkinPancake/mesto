import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmit }) {
    super(popupSelector);
    this._popup = popupSelector;
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector(".popup__form");

    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach(
      (input) => (this._inputValues[input.name] = input.value)
    );
    return this._inputValues;
  }


  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}


