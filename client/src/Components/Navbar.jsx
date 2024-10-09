import React, { useState } from "react";

import { Link } from "react-router-dom";

import sideimg from "../assets/sidebar.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };
  const NavbarItems = () => (
    <>
      <div className="flex md:text-base lg:text-lg">
        <li className="flex md:text-base lg:text-lg">
          <Link to="/" onClick={closeSidebar}>
            Home
          </Link>
        </li>
      </div>

      <div className="flex lg:flex-row flex-col md:text-base space-y-4 lg:space-y-0 items-center lg:text-lg lg:space-x-14 ">
        <li className="flex md:text-base lg:text-lg">
          <Link to="/contact-us" onClick={closeSidebar}>
            Contact Us
          </Link>
        </li>
        <li className="flex md:text-base lg:text-lg">
          <Link to="/about-us" onClick={closeSidebar}>
            About Us
          </Link>
        </li>
      </div>
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
      {isOpen && (
        <div className="flex justify-end items-end  p-4 md:hidden w-fit fixed top-0 left-0 z-10">
          <button
            onClick={toggleSidebar}
            className="cursor-pointer text-xl text-white"
          >
            &#x2715;
          </button>
        </div>
      )}
      <div
        className={`flex md:hidden flex-col bg-navColor p-4 fixed top-0 left-0 w-full h-full transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex w-full justify-center">
          <ul className="flex flex-col items-center space-y-4 text-cyan-50 mt-16">
            <NavbarItems />
          </ul>
        </nav>
      </div>

      <div className="hidden md:flex justify-between items-center bg-navColor p-4 fixed top-0 w-full z-10">
        <nav className="flex w-full justify-between">
          <ul className="flex justify-between w-full text-cyan-50">
            <NavbarItems />
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
