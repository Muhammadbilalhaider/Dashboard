// src/components/SideNavbar.js
import React, { useState } from 'react';

const SideNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                className="p-4 text-white bg-gray-800 focus:outline-none relative z-10"
                onClick={toggleSidebar}>
                <svg width="27" height="18" viewBox="0 0 27 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 18C1.075 18 0.719 17.856 0.432 17.568C0.144 17.281 0 16.925 0 16.5C0 16.075 0.144 15.719 0.432 15.432C0.719 15.144 1.075 15 1.5 15H22.5C22.925 15 23.281 15.144 23.568 15.432C23.856 15.719 24 16.075 24 16.5C24 16.925 23.856 17.281 23.568 17.568C23.281 17.856 22.925 18 22.5 18H1.5ZM1.5 10.5C1.075 10.5 0.719 10.356 0.432 10.068C0.144 9.781 0 9.425 0 9C0 8.575 0.144 8.2185 0.432 7.9305C0.719 7.6435 1.075 7.5 1.5 7.5H15C15.425 7.5 15.781 7.6435 16.068 7.9305C16.356 8.2185 16.5 8.575 16.5 9C16.5 9.425 16.356 9.781 16.068 10.068C15.781 10.356 15.425 10.5 15 10.5H1.5ZM1.5 3C1.075 3 0.719 2.8565 0.432 2.5695C0.144 2.2815 0 1.925 0 1.5C0 1.075 0.144 0.7185 0.432 0.4305C0.719 0.1435 1.075 0 1.5 0H25.5C25.925 0 26.281 0.1435 26.568 0.4305C26.856 0.7185 27 1.075 27 1.5C27 1.925 26.856 2.2815 26.568 2.5695C26.281 2.8565 25.925 3 25.5 3H1.5Z" fill="white" />
                </svg>

            </button>
            <div
                className={`fixed top-0 left-0 h-screen w-[350px] bg-gray-800 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}>
                <div className="flex items-center justify-center h-20 shadow-md">
                    <h1 className="text-white">Sidebar</h1>
                </div>
            </div>
        </>
    );
};

export default SideNavbar;
