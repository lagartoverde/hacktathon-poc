import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ShoppingCartService extends Service {
  @tracked cart = [];

  get length() {
    return this.cart.length;
  }

  addItem(item) {
    const productInCart = this.cart.find(
      (cartProduct) => cartProduct.id === item.id
    );
    if (productInCart) {
      alert('You already added that service, please select a different one');
    } else {
      this.cart.push(item);
      this.cart = this.cart;
    }
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
