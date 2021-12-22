import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import {getProductById} from './products';

export default class CheckoutComponent extends Component {
  @service shoppingCart;
  @action
  removeItem (item) {
    this.shoppingCart.removeItem(item.id);
  }
}
