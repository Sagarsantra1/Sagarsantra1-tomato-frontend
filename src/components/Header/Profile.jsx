import React, { useState } from 'react';
import { LuX } from "react-icons/lu";

function Profile() {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(prevShowProfile => !prevShowProfile);
  };

  return (
    <>
      <div
        className="h-10 w-10 bg-gray-400 sm:hidden rounded-3xl cursor-pointer"
        onClick={toggleProfile}
      ></div>
      <div
        className={`flex flex-col sm:flex-row absolute sm:static bg-white sm:bg-transparent h-screen sm:w-full sm:h-full right-0 top-0 items-center justify-center sm:space-x-3 overflow-hidden ${
          showProfile ? "w-screen" : "w-0"
        } transition-all ease-in-out duration-300 z-10`}
      >
        <LuX
          size={25}
          onClick={toggleProfile}
          className='absolute top-5 right-5 cursor-pointer sm:hidden'
        />
        <h3 className="hover:text-black cursor-pointer">Log in</h3>
        <h3 className="hover:text-black cursor-pointer">Sign up</h3>
      </div>
    </>
  );
}

export default Profile;
