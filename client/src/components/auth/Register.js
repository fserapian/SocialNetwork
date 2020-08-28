import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {
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
      console.log('Passwords do not match');
    } else {
      console.log(formData);
    }
  };

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
            required
          />
        </div>
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
            required
            minLength="6"
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
            required
            minLength="6"
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
