// components/Navbar.jsx

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // For hamburger and close icons

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-opacity-30 backdrop-blur-md shadow-lg">
      <div className="flex justify-between items-center p-4 px-8">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold font-play">
          <span className="text-3xl font-bold font-libre">Arcnet</span>
        </Link>

        {/* Hamburger Menu (Mobile Only) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-3xl text-gray-700 hover:text-black"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Main Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-7 space-y-4 md:space-y-0">
            {[
              { label: "Home", path: "/" },
              { label: "Risk Pools", path: "/risk-pool" },
              { label: "Policies", path: "/policy" },
              { label: "About", path: "/about" },
            ].map((item) => (
              <li
                key={item.label}
                className="hover:font-bold cursor-pointer font-libre text-lg"
              >
                <Link to={item.path} onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Connect Button */}
          <div className="flex justify-center md:justify-start">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
