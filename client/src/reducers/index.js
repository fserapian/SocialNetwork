import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
});
