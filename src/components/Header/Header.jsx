import React from "react";
import HeaderSearch from "./HeaderSearch";
import Profile from "./Profile";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sm:h-12 h-10 flex items-center justify-between px-4 my-2 shadow-md">
      {/* Logo */}
      <Link to={"/"} className="font-bold text-xl sm:text-3xl mr-1 sm:mr-3 w-fit">Tomato</Link>
      
      {/* Search Bar */}
      <div className="h-full w-52 sm:flex-1">
        <HeaderSearch />
      </div>
      
      {/* User Profile */}
      <div className="flex ml-2 sm:ml-4 md:ml-8 lg:ml-14 text-lg text-gray-500">
        <Profile />
      </div>
    </header>
  );
}

export default Header;
