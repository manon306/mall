import * as React from 'react';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import { useAuth } from './AuthContext.jsx';

function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="py-4 px-6" dir="ltr">
      <Divider />
      <div className="container mx-auto flex justify-between items-center p-5">
        {/* Logo */}
        <h1 className="text-2xl text-black tracking-wide text-4xl">
          <span className="font-bold">BOOK</span>SAW
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-700 hover:text-blue-600">HOME</a>
          <a href="/books" className="text-gray-700 hover:text-blue-600">BOOKS</a>
          <a href="/cart" className="text-gray-700 hover:text-blue-600">CART</a>
          <a href="/article" className="text-gray-700 hover:text-blue-600">BookDetails</a>
          {!user ? (
            <>
              <a href="/login" className="text-gray-700 hover:text-blue-600">LOGIN</a>
              <a href="/signin" className="text-gray-700 hover:text-blue-600">SIGNUP</a>
            </>
          ) : (
            <>
              <span className="text-red-700 text-base">Hi, {user.firstName}</span>
              <button onClick={logout} className="text-red-500 hover:text-red-700">LOGOUT</button>
              <a href="/profile" className="text-gray-700 hover:text-blue-600">PROFILE</a>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-gray-100">
          <a href="/" className="text-gray-700 hover:text-blue-600">HOME</a>
          <a href="/books" className="text-gray-700 hover:text-blue-600">BOOKS</a>
          <a href="/cart" className="text-gray-700 hover:text-blue-600">CART</a>
          <a href="/article" className="text-gray-700 hover:text-blue-600">BookDetails</a>
          {!user ? (
            <>
              <a href="/login" className="text-gray-700 hover:text-blue-600">LOGIN</a>
              <a href="/signin" className="text-gray-700 hover:text-blue-600">SIGNUP</a>
            </>
          ) : (
            <>
              <span className="text-red-700 text-base">Hi, {user.firstName}</span>
              <button onClick={logout} className="text-red-500 hover:text-red-700">LOGOUT</button>
              <a href="/profile" className="text-gray-700 hover:text-blue-600">PROFILE</a>
            </>
          )}
        </div>
      )}
      <Divider />
    </nav>
  );
}

export default Navbar;
