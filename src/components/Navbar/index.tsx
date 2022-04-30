/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../stores/Auth";
import { getUserProfilePicture } from "../../utils/helpers";
import defaultImage from "../../images/default_profile_image.jpg";
import { GoThreeBars } from "react-icons/go";
import { MdOutlineLanguage } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  Nav,
  NavbarContainer,
  NavbarLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLink,
  NavBtn,
  NavBtnLink,
  ReactIcons,
  NavBtnProfileLink,
  NavBtnLinkLogout,
} from "./NavbarElements";
// import logo from '../../logo.svg'

// Interface for this component
interface NavbarProps {
  isOpen: Boolean;
  toggleIsOpen: (arg: Boolean) => void;
}

// react component for the NavbarContainer
const Navbar: React.FC<NavbarProps> = ({
  isOpen,
  toggleIsOpen,
}: NavbarProps) => {
  const [profilePicture, setProfilePicture] = useState("");

  const authContext = useContext(AuthContext);

  console.log(authContext.isLoggedIn ? "logged in" : "logged out");
  // console.log(authContext.userId);

  // console.log(authContext.user);
  // console.log(fullUserProfile);

  useEffect(() => {
    getUserProfilePicture().then((res) => {
      setProfilePicture(res);
    });
  }, []);

  console.log(profilePicture);

  const handleLogout = () => {
    console.log("logout");
  };

  // return the NavbarContainer
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavbarLogo to="/">TripInc</NavbarLogo>
          <MobileIcon onClick={toggleIsOpen}>
            <GoThreeBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLink to="/explore">Explore</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/bucket-list">Bucket List</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/my-trips">My Trips</NavLink>
            </NavItem>
            {/* <NavItem>
                        <NavLink to="/">
                            <GrLanguage />&nbsp; Language
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/">
                            <AiOutlineShoppingCart />
                        </NavLink>
                    </NavItem> */}
          </NavMenu>
          <NavBtn>
            <NavLink to="/">
              <MdOutlineLanguage />
              &nbsp; Language
            </NavLink>
            <NavLink to="/">
              <ReactIcons>
                <AiOutlineShoppingCart />
              </ReactIcons>
            </NavLink>
            {authContext.isLoggedIn ? (
              // <NavBtnLink to="/sign-in">Sign In</NavBtnLink>
              profilePicture !== "" ? (
                <>
                  <NavBtnProfileLink to="/profile">
                    <img src={profilePicture} alt="profile pic" />
                  </NavBtnProfileLink>
                  <NavBtnLinkLogout onClick={handleLogout}>
                    Log out
                  </NavBtnLinkLogout>
                </>
              ) : (
                <>
                  <NavBtnProfileLink to="/profile">
                    <img
                      className="navbar_profile_pics"
                      src={defaultImage}
                      alt="profile pic"
                    />
                  </NavBtnProfileLink>
                  <NavBtnLinkLogout onClick={handleLogout}>
                    Log out
                  </NavBtnLinkLogout>
                </>
              )
            ) : (
              <NavBtnLink to="/sign-up">Try Beta</NavBtnLink>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
