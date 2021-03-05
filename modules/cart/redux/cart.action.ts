import { Product } from '../../products/shared/product.type';
import CART_ACTIONS from './cart.action-types';

export const updateCartItemQuantity = (cartData: {quantity: number, product: Product}) => ({
  type: CART_ACTIONS.UPDATE_QUANTITY,
  payload: cartData,
});

export const clearCartAction = () => ({
  type: CART_ACTIONS.CLEAR_CART,
});
