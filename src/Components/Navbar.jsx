import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import sideimg from '../assets/sidebar.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false)
  }
  const NavbarItems = () => (
    <>

      <li className="flex md:text-base lg:text-lg">
        <Link to="/" onClick={closeSidebar}>Home</Link>
      </li>
      <li className="flex md:text-base lg:text-lg">
        <Link to="/Login" onClick={closeSidebar}>Login</Link>
      </li>
      <li className="flex md:text-base lg:text-lg">
        <Link to="/register" onClick={closeSidebar}>Register</Link>
      </li>
      <li className="flex  md:text-base lg:text-lg">
        <Link to="/contact-us" onClick={closeSidebar}>Contact Us</Link>
      </li>
      <li className="flex  md:text-base lg:text-lg">
        <Link to="/about-us" onClick={closeSidebar}>About Us</Link>
      </li>
      <li className="flex  md:text-base lg:text-lg">
        <Link to="/sign-up" onClick={closeSidebar}>Sign Up</Link>
      </li>
    </>
  );

  return (
    <>
      {!isOpen && (
        <div className="flex justify-between items-center p-4 md:hidden w-fit fixed top-0 left-0 z-10">
          <img
            src={sideimg}
            alt="Toggle Sidebar"
            className="cursor-pointer w-8 h-8 text-red-600"
            onClick={toggleSidebar}
          />
        </div>
      )}
      <div
        className={`flex md:hidden flex-col bg-buttonColor p-4 fixed top-0 left-0 w-full h-full transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
        <nav>
          <ul className="flex flex-col items-center space-y-4 text-cyan-50 mt-16">
            <NavbarItems />
          </ul>
        </nav>
      </div>

      <div className="hidden md:flex justify-center items-center bg-buttonColor p-4 fixed top-0 w-full z-10">
        <nav>
          <ul className="flex justify-between space-x-6 text-cyan-50">
            <NavbarItems />
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
