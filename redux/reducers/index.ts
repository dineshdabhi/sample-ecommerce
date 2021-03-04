import { combineReducers } from 'redux';
import notificationReducer from '../../modules/shared/components/Notification/redux/notification.reducer';

export default combineReducers({
  notificationState: notificationReducer,
});
