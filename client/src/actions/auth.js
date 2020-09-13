import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';
import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const baseUrl = 'http://localhost:5000/api/auth';

export const loadUser = () => (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  axios
    .get(`${baseUrl}/me`)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: USER_LOADED,
          payload: res.data.data,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const register = ({ name, email, password }) => (dispatch) => {
  // Post request
  axios
    .post(`${baseUrl}/register`, { name, email, password })
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.token,
      });
      dispatch(loadUser());
    })
    .catch((err) => {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const login = (email, password) => (dispatch) => {
  // Post request
  axios
    .post(`${baseUrl}/login`, { email, password })
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token,
      });
      dispatch(loadUser());
    })
    .catch((err) => {
      const errors = err.response.data.errors;

      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));

      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
