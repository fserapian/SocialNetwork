import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="heading mb-2">
        <h1 className="text-6xl text-gray-900 font-bold">Login here</h1>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="py-3">
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            placeholder="Email"
            required
          />
        </div>
        <div className="py-3">
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            placeholder="Password"
            autoComplete="on"
            required
            minLength="6"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-700 hover:bg-indigo-800 py-2 px-4 rounded text-white mt-3">
          Login
        </button>
        <p className="mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600">
            Sign up
          </Link>
        </p>
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
