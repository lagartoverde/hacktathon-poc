import { helper } from '@ember/component/helper';
import {getProductById} from '../components/products';

export default helper(function getMissingDeps([shoppingCart, item] /*, named*/) {

  let result = [];
  if (item.depends) {
    for (const dep of item.depends) {
      const depItem = shoppingCart.getItemById(dep);
      if (!depItem) {
        result.push(getProductById(dep));
      }
    }
  }
  return result;
});
