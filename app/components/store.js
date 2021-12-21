import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import products from './products';

export default class StoreComponent extends Component {
  @service shoppingCart;
  @service router;
  @tracked titleSearch;
  @tracked tagSearch;
  @tracked _products;
  constructor() {
    super(...arguments);
    this._products = products;
    this.cart = [];
    this.titleSearch = this.args.titleSearch;
    this.tagSearch = this.args.tagSearch;
  }

  get cartLength() {
    return this.shoppingCart.length;
  }

  get products() {
    let prods = this._products;
    
    if (this.tagSearch && this.tagSearch.length) {
      prods = prods.filter(
        (product) => product.tags.filter(
            (tag) => tag.search(RegExp(this.tagSearch, 'ig')) >= 0
          ).length > 0
      );
    }
    if (this.titleSearch && this.titleSearch.length) {
      prods = prods.filter(
        (product) => product.title.search(RegExp(this.titleSearch, "ig")) >= 0
      );
    }

    return prods;
  }

  @action
  addToCart(product) {
    console.log('executing');
    console.log(product);
    const productInCart = this.cart.find(
      (cartProduct) => cartProduct.id === product.id
    );
    if (productInCart) {
      alert('Product was already in cart, please select a different one');
    } else {
      this.shoppingCart.addItem(product);
      
    }
  }
  @action
  goToCheckout() {
    this.router.transitionTo('checkout')
  }
}
