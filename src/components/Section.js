export class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;

    this._container = selector;
  }

  renderItems(items) {
    items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  addNewItem(element) {
    this._container.prepend(element);
  }
}