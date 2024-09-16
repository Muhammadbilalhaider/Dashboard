import React, { useState } from "react";
import { Link } from "react-router-dom";
import sideimg from "../assets/sidebar.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const NavbarItems = () => (
    <>
      <li className="flex text-sm md:text-base lg:text-lg">
        <Link to="/">Home</Link>
      </li>
      <li className="flex text-sm md:text-base lg:text-lg">
        <Link to="/Login">Login</Link>
      </li>
      <li className="flex text-sm md:text-base lg:text-lg">
        <Link to="/register">Register</Link>
      </li>
      <li className="flex text-sm md:text-base lg:text-lg">
        <Link to="/contact-us">Contact Us</Link>
      </li>
    </>
  );

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-red-600 md:hidden w-fit fixed top-0 left-0 z-10">
        <img
          src={sideimg}
          alt="Toggle Sidebar"
          className="cursor-pointer w-8 h-8 text-red-600"
          onClick={toggleSidebar}
        />
      </div>

      <div
        className={`flex md:hidden flex-col bg-red-600 p-4 fixed top-0 left-0 w-1/4 h-full transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
        <nav>
          <ul className="flex flex-col space-y-4 text-cyan-50 mt-16">
            <NavbarItems />
          </ul>
        </nav>
      </div>

      <div className="hidden md:flex justify-center items-center bg-red-600 p-4 fixed top-0 w-full z-10">
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
