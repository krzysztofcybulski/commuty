import * as React from 'react';
import { Link } from 'react-router-dom';

export const NavigationMenu = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 p-4">
        <div className="mx-auto flex justify-between">
          <div className="text-white text-lg font-semibold">My Website</div>
          <div className="space-x-4">
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-gray-200">
              About
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
