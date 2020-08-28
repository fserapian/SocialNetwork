import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <header className="border-b text-white p-3 flex justify-between items-center bg-gray-800 mb-3">
      <Link to="/" className="logo text-xl">
        Social Network
      </Link>
      <ul className="flex items-center">
        <li className="px-3">
          <a href="#" className="hover:text-purple-200 hover:underline">
            Developers
          </a>
        </li>
        <li className="px-3">
          <Link
            to="/register"
            className="hover:text-purple-200 hover:underline">
            Register
          </Link>
        </li>
        <li className="px-3">
          <Link to="/login" className="hover:text-purple-200 hover:underline">
            Login
          </Link>
        </li>
      </ul>
    </header>
  );
};
