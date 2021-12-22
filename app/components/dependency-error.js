import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DependencyErrorComponent extends Component {
  @service shoppingCart;
  constructor() {
    super(...arguments);
  }
  get missingProducts() {
    return this.args.getMissingDeps();
  }
  @action
  addToCart(product) {
    this.shoppingCart.addItem(product);
  }
}
