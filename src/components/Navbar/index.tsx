/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../stores/Auth";
import {
  checkAuth,
  getUserProfilePicture,
  localLogoutProfile,
} from "../../utils/helpers";
import { useGoogleLogout } from "react-google-login";
import defaultImage from "../../images/default_profile_image.jpg";
import { GoThreeBars } from "react-icons/go";
// import { MdOutlineLanguage } from "react-icons/md";
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
import { GoogleLoginClientId } from "../../utils/constants";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
// import logo from '../../logo.svg'
import { localGetCartLength } from "../../utils/helpers";

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
  const authContext = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authContext.isLoggedIn);
  const [cartLength, setCartLength] = useState<number>(0);
  // this isused to check if the user has scrolled more than the nav bar
  const [navBarScrolled, setNavBarScrolled] = useState<boolean>(false);

  useEffect(() => {
    setCartLength(localGetCartLength());
  });

  const { pathname } = useLocation();

  const changeNavbarBackground = () => {
    if (window.scrollY >= 80) {
      setNavBarScrolled(true);
    } else {
      setNavBarScrolled(false);
    }
  };

  window.addEventListener("scroll", changeNavbarBackground);

  useEffect(() => {
    checkAuth() ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [pathname]);

  useEffect(() => {
    getUserProfilePicture().then((res) => {
      setProfilePicture(res);
    });
  }, [isLoggedIn]);

  const handleGoogleLogoutSuccess = () => {
    // navigate("/");
  };
  const handleGoogleLogoutFailure = () => {
    // TODO: Handle failure scenario
  };

  const { signOut } = useGoogleLogout({
    clientId: GoogleLoginClientId,
    onLogoutSuccess: handleGoogleLogoutSuccess,
    onFailure: handleGoogleLogoutFailure,
  });

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("logout");
        signOut();
        authContext.logout();
        localLogoutProfile();
        window.location.href = "/";
      }
    });
  };

  // return the NavbarContainer
  return (
    <>
      <Nav className={navBarScrolled ? "navbar_active" : "navbar_nature"}>
        <NavbarContainer>
          <NavbarLogo
            className={
              navBarScrolled
                ? "navbar_active_logo_color"
                : "navbar_nature_logo_color"
            }
            to="/"
          >
            TripInc
          </NavbarLogo>
          <MobileIcon onClick={toggleIsOpen}>
            <GoThreeBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
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
            {/* <NavLink to="/">
              <MdOutlineLanguage />
              &nbsp; Language
            </NavLink> */}
            <NavLink
              className={
                navBarScrolled ? "navbar_active_color" : "navbar_nature_color"
              }
              to="/shopping"
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
            {isLoggedIn ? (
              // <NavBtnLink to="/sign-in">Sign In</NavBtnLink>
              profilePicture !== "" ? (
                <>
                  <NavBtnProfileLink
                    className={
                      navBarScrolled
                        ? "navbar_active_color"
                        : "navbar_nature_color"
                    }
                    to="/profile"
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "inherit",
                      }}
                      src={profilePicture}
                      alt="profile pic"
                    />
                  </NavBtnProfileLink>
                  <NavBtnLinkLogout onClick={handleLogout}>
                    Log out
                  </NavBtnLinkLogout>
                </>
              ) : (
                <>
                  <NavBtnProfileLink
                    className={
                      navBarScrolled
                        ? "navbar_active_color"
                        : "navbar_nature_color"
                    }
                    to="/profile"
                  >
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
              <NavBtnLink
                className={
                  navBarScrolled
                    ? "navbar_head_active_button"
                    : "navbar_head_button"
                }
                to="/sign-up"
              >
                Try Beta
              </NavBtnLink>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
