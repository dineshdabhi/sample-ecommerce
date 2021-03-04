import { clearCartAction } from '../redux/cart.action';

export const removeCartItemService = async ({ productId }) => {

};


export const clearCartService = async (dispatch) => {
  dispatch(clearCartAction());
};

export const createOrderFromCartService = async (dispatch) => {
  setTimeout(()=>{
    dispatch(clearCartAction());
  }, 2000);
};
