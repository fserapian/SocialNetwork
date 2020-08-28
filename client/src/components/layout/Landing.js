import React from 'react';

export const Landing = () => {
  return (
    <div className="mt-5 text-center">
      <h1 className="text-6xl font-bold text-gray-800 ">Social Network</h1>
      <p>
        The best site to connect all developers, and share great ideas around
        the globe 🌎
      </p>
      <div className="buttons mt-5"></div>
      <button className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 mx-1 rounded">
        Signup
      </button>
      <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 mx-1 rounded">
        Login
      </button>
    </div>
  );
};
