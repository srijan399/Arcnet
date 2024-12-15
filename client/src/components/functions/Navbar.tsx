// components/Navbar.jsx

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-opacity-30 backdrop-blur-md flex justify-between items-center p-4 px-8 shadow-lg">
      <Link to="/" className="text-2xl font-bold font-play">
        <span className="text-3xl font-bold font-libre">Arcnet</span>
      </Link>
      <div className="flex items-center space-x-8">
        <ul className="flex space-x-7">
          {[
            { label: "Home", path: "/" },
            { label: "Risk Pools", path: "/risk-pool" },
            { label: "Policies", path: "/policy" },
            { label: "About", path: "/about" },
          ].map((item) => (
            <li
              key={item.label}
              className="hover:font-bold cursor-pointer items-center font-libre text-lg"
            >
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          chainStatus="none"
        />
      </div>
    </nav>
  );
};

export default Navbar;
