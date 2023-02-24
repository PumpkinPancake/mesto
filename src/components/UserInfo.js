export class UserInfo {
  constructor({ name, info }) {
    this._name = name;
    this._info = info;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    };
  }

  setUserInfo({ name, info }) {
    this._name.textContent = name;
    this._info.textContent = info;
  }
}
