import React from 'react';
import './Navbar.css';

export const Navbar = () => {
  return (
    <header className="border-b text-white p-3 flex justify-between items-center bg-gray-800 mb-3">
      <span className="logo text-xl">Social Network</span>
      <ul className="flex items-center">
        <li className="px-3">
          <a href="#" className="hover:text-red-200">
            Developers
          </a>
        </li>
        <li className="px-3">
          <a href="#" className="hover:text-red-200">
            Register
          </a>
        </li>
        <li className="px-3">
          <a href="#" className="hover:text-red-200">
            Login
          </a>
        </li>
      </ul>
    </header>
  );
};
