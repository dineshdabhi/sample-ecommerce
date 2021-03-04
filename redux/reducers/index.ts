import { combineReducers } from 'redux';
import notificationReducer from '../../modules/shared/components/Notification/redux/notification.reducer';
import cartReducer from "../../modules/cart/redux/cart.reducer";

export default combineReducers({
  notificationState: notificationReducer,
  cartState: cartReducer,
});
