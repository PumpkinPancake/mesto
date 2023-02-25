export class UserInfo {
  constructor({ name, about }) {
    this._name = name;
    this._info = about;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._info.textContent = about;
  }
}
