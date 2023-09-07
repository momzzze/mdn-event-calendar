import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p>&copy; M.D.N. Project 2023 - All rights reserved</p>
        </div>
        <div>
          <Link to="/about" className="text-blue-300 hover:text-blue-500">
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
