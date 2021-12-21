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
  @action
  missingDeps (item) {
    let result = [];
    console.log(item)
    if (item.depends) {
      for (const dep of item.depends) {
        const depItem = this.shoppingCart.getItemById(dep);
        if (!depItem) {
          result.push(getProductById(dep));
        }
      }
    }
    return result;
  }
}
