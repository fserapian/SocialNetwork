import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const register = ({ name, email, password }) => (dispatch) => {
  // Post request
  axios
    .post(`http://localhost:5000/api/auth/register`, { name, email, password })
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.token,
      })
    )
    .catch((err) => {
      const errors = err.response.data.errors;

      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));

      dispatch({
        type: REGISTER_FAIL,
      });
    });
};
