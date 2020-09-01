import React, { Fragment } from 'react';
import './Navbar.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {
  const authLinks = (
    <ul className="flex items-center">
      <li className="px-3">
        <a href="#!" onClick={props.logout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="flex items-center">
      <li className="px-3">
        <Link to="/" className="hover:text-purple-200 hover:underline">
          Developers
        </Link>
      </li>
      <li className="px-3">
        <Link to="/register" className="hover:text-purple-200 hover:underline">
          Register
        </Link>
      </li>
      <li className="px-3">
        <Link to="/login" className="hover:text-purple-200 hover:underline">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <header className="border-b text-white p-3 flex justify-between items-center bg-gray-800 mb-3">
      <Link to="/" className="logo text-xl px-3">
        Social Network
      </Link>
      {!props.auth.loading && (
        <Fragment>
          {props.auth.isAuthenticated ? authLinks : guestLinks}
        </Fragment>
      )}
    </header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { logout })(Navbar);
