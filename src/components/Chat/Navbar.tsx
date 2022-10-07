import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { AuthContext } from "../../stores/Auth";

const Navbar = () => {
  const { currentChatUser }: { currentChatUser: any } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="user">
        <img src={currentChatUser.photoURL} alt="" />
        <span>{currentChatUser.displayName}</span>
      </div>
    </div>
  );
};

export default Navbar;
