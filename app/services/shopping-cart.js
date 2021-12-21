import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ShoppingCartService extends Service {
  @tracked cart = [];

  get length() {
    return this.cart.length;
  }

  addItem(item) {
    this.cart.push(item);
    this.cart = this.cart;
  }

  removeItem(itemId) {
    const itemIndex = this.cart.findIndex((item) => item.id === itemId);
    this.cart.splice(itemIndex, 1);
    this.cart = this.cart;
  }

  getItemById(id) {
    return this.cart.find((item) => item.id === id);
  }
}
