/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useContext } from "react";
import { AuthContext } from "../../../stores/Auth";
import { localLogoutProfile } from "../../../utils/helpers";
import defaultImage from "../../../images/default_profile_image.jpg";
import { GoThreeBars } from "react-icons/go";
// import { MdOutlineLanguage } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import LogoWhite from "../../../images/logo-tripinc-white.svg";
import LogoBlue from "../../../images/logo-tripinc.svg";
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
import { GoogleLoginClientId } from "../../../utils/constants";
import Swal from "sweetalert2";
import { BsBagCheck } from "react-icons/bs";
import { googleLogout, GoogleOAuthProvider } from "@react-oauth/google";

// Interface for this component
interface NavbarProps {
  isOpen: Boolean;
  toggleIsOpen: (arg: Boolean) => void;
  profilePicture?: any;
  isLoggedIn?: boolean;
  cartLength?: number;
  ordersLength?: number;
}

// react component for the NavbarContainer
const AmbassadorNavbar: React.FC<NavbarProps> = ({
  isOpen,
  toggleIsOpen,
  profilePicture,
  isLoggedIn,
  cartLength,
  ordersLength,
}: NavbarProps) => {
  const authContext = useContext(AuthContext);
  // this is used to check if the user has scrolled more than the nav bar
  const [navBarScrolled, setNavBarScrolled] = useState<boolean>(false);

  const changeNavbarBackground = () => {
    if (window.scrollY >= 80) {
      setNavBarScrolled(true);
    } else {
      setNavBarScrolled(false);
    }
  };

  window.addEventListener("scroll", changeNavbarBackground);

  const handleLogout = () => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        googleLogout();
        authContext.logout();
        localLogoutProfile();
        window.location.href = "/";
      }
    });
  };

  // return the NavbarContainer
  return (
    <>
      <GoogleOAuthProvider clientId={GoogleLoginClientId}>
        <Nav loggedIn={isLoggedIn ? true : false} className="navbar_active">
          <NavbarContainer>
            <NavbarLogo className="navbar_nature_logo_color" to="/">
              <img src={LogoWhite} alt="" />
            </NavbarLogo>
            <MobileIcon onClick={toggleIsOpen}>
              <GoThreeBars />
            </MobileIcon>
            <NavMenu>
              {/* <NavItem>
              <NavLink
                className={
                  navBarScrolled ? "navbar_active_color" : "navbar_nature_color"
                }
                to="/explore"
              >
                Explore
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  navBarScrolled ? "navbar_active_color" : "navbar_nature_color"
                }
                to="/bucket-list"
              >
                Bucket List
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  navBarScrolled ? "navbar_active_color" : "navbar_nature_color"
                }
                to="/my-trips"
              >
                My Trips
              </NavLink>
            </NavItem> */}
            </NavMenu>
            <NavBtn>
              {/* {isLoggedIn ? (
              <>
                <NavLink
                  className={
                    navBarScrolled
                      ? "navbar_active_color"
                      : "navbar_nature_color"
                  }
                  to="/shopping/cart"
                >
                  <ReactIcons>
                    <AiOutlineShoppingCart />
                    <span
                      className={
                        navBarScrolled ? "cart_number_active" : "cart_number"
                      }
                    >
                      {cartLength}
                    </span>
                  </ReactIcons>
                </NavLink>
                <NavLink
                  className={
                    navBarScrolled
                      ? "navbar_active_color"
                      : "navbar_nature_color"
                  }
                  to="/orders"
                >
                  <ReactIcons>
                    <BsBagCheck />
                    <span
                      className={
                        navBarScrolled ? "cart_number_active" : "cart_number"
                      }
                    >
                      {ordersLength}
                    </span>
                  </ReactIcons>
                </NavLink>
              </>
            ) : null} */}
              {isLoggedIn ? (
                <>
                  <NavBtnProfileLink
                    className="navbar_nature_color"
                    to="/profile"
                  >
                    {profilePicture !== "" ? (
                      <img
                        className="navbar_profile_pics"
                        src={profilePicture}
                        alt="profile pic"
                      />
                    ) : (
                      <img
                        className="navbar_profile_pics"
                        src={defaultImage}
                        alt="profile pic"
                      />
                    )}
                  </NavBtnProfileLink>
                  <NavBtnLinkLogout onClick={handleLogout}>
                    Log out
                  </NavBtnLinkLogout>
                </>
              ) : (
                <>
                  <NavBtnLink className="navbar_head_button" to="/sign-in">
                    Sign in
                  </NavBtnLink>{" "}
                  &nbsp;&nbsp;
                  <NavBtnLink className="navbar_head_button" to="/sign-up">
                    Try Beta
                  </NavBtnLink>
                </>
              )}
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </GoogleOAuthProvider>
    </>
  );
};

export default AmbassadorNavbar;
