import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleSignInButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded inline-flex items-center"
    >
      <FcGoogle className="mr-2" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
