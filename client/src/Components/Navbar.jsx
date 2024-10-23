import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import mission from "../assets/mission.svg";
import sideimg from "../assets/sidebar.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  const handleImageClick = () => {
    setDropdownOpen((prev) => !prev);
  };
  const closeSidebar = () => {
    setDropdownOpen(false);
    setIsOpen(false);
  };
  const logOut = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    navigate("/login");
  };

  const confirmLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const openProfile = () => {
    navigate("/profile");
  };
  const openSetting = () => {
    navigate("/setting");
  };

  useEffect(() => {
    setUserName(localStorage.getItem("name"));
    console.log(localStorage.getItem("name"));
  }, [userName]);
  console.log("NAME IS ", userName);
  const NavbarItems = () => (
    <>
      <div className="flex md:text-base lg:text-lg">
        <li className="flex md:text-base lg:text-lg">
          <Link to="/" onClick={closeSidebar}>
            Home
          </Link>
        </li>
      </div>

      <div className="flex lg:flex-row md:flex-row flex-col md:text-base space-x-4 md:space-y-0 space-y-4 lg:space-y-0 items-center lg:text-lg lg:space-x-14 ">
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
        <li className="lg:flex md:text-base lg:text-lg">
          <div className="flex lg:flex-row space-x-4">
            <h3>{userName}</h3>
            <img
              src={mission}
              alt="profile"
              className="w-8 cursor-pointer"
              onClick={handleImageClick}
            />
          </div>
          {dropdownOpen && (
            <div className="absolute right-1 md:mt-3 lg:mt-11 bg-slate-900 rounded-md shadow-lg z-10">
              <ul className="flex flex-col border border-gray-300 rounded-md">
                <li
                  className="p-2 cursor-pointer hover:bg-gray-700"
                  onClick={openProfile}
                >
                  Profile
                </li>
                <li
                  className="p-2 cursor-pointer hover:bg-gray-700"
                  onClick={openSetting}
                >
                  Settings
                </li>
                <li
                  className="p-2 cursor-pointer hover:bg-gray-700"
                  onClick={confirmLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </li>
      </div>
    </>
  );

  return (
    <>
      {showLogoutConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className=" lg:w-72 w-64 bg-white p-6 rounded-md shadow-lg">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                No
              </button>
              <button
                onClick={logOut}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

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
          <ul className="flex flex-col items-center space-y-4 text-cyan-50 mt-10">
            <NavbarItems />
          </ul>
        </nav>
      </div>

      <div className="hidden md:flex justify-between items-center bg-navColor p-4 fixed top-0 w-full z-10">
        <nav className="flex  w-full justify-between">
          <ul className="flex justify-between w-full text-cyan-50">
            <NavbarItems />
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
