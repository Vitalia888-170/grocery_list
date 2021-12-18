import { meals } from './mealsData';
import foodIcon from './icons/food.png';
export function iconGenerator(product) {
  let productStr = product.replace(/\d+/g, '');
  let measurements = ['kilogram', 'kilograms', 'kg', 'gram', 'grams', 'g','gr', 'item', 'items', 'packet', 'can', 'bottle', 'carton', 'jar', 'loaf'];
  let productArr = productStr.split(" ");
  function iconGenerator(prod) {
    let str = '';
    for (let i = 0; i < productArr.length; i++) {
      for (let j = 0; j < measurements.length; j++) {
        if (productArr[i] === measurements[j]) {
          str = prod.replace(`${productArr[i]}`, '');
        }
      }
    }
    return str;
  }
  let productItem = iconGenerator(productStr) || productStr;
  let icon = meals.find(item => item.name.search(productItem.trim()) !== -1);
  if (icon) {
    return icon.url;
  } else {
    return `${foodIcon}`;
  }
}