// components/Navbar.jsx

import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-opacity-30 backdrop-blur-md flex justify-between items-center p-4 px-8 shadow-lg">
      <h1 className="text-xl font-bold">Arcnet</h1>
      <ul className="flex space-x-6">
        {["Home", "About", "Risk Pools", "Policies", "Contact"].map((item) => (
          <li key={item} className="hover:font-bold cursor-pointer">
            {item}
          </li>
        ))}
        <ConnectButton />
      </ul>
    </nav>
  );
};

export default Navbar;
