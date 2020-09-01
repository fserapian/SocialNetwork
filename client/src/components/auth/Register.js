import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      props.setAlert('passwords do not match!', 'danger');
    } else {
      props.register({ name, email, password });
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="heading mb-2">
        <h1 className="text-6xl text-gray-900 font-bold">Register with us</h1>
        <p>
          Create your account down here{' '}
          <span role="img" aria-label="down-pointer">
            👇
          </span>
        </p>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="py-3">
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            placeholder="Name"
          />
        </div>
        <div className="py-3">
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            placeholder="Email"
          />
          <p className="text-gray-500 text-sm">
            The site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </p>
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
          />
        </div>
        <div className="py-3">
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => onChange(e)}
            placeholder="Confirm Password"
            autoComplete="on"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-700 hover:bg-indigo-800 py-2 px-4 rounded text-white mt-3">
          Register
        </button>
        <p className="mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600">
            Sign in
          </Link>
        </p>
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
