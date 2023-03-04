export class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = name;
    this._info = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
      avatar: this._avatar.src
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._avatar.src = avatar;
    this._name.textContent = name;
    this._info.textContent = about;
  }
}

