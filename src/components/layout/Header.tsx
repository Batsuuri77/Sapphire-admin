import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full px-4 py-1">
      <div className="text-sm font-medium text-gray-700">backbutton</div>

      <nav>
        <ul className="flex space-x-6 text-sm font-medium text-gray-700">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="#">Categories</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
