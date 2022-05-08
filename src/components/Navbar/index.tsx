/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../stores/Auth";
import { getUserProfilePicture, localLogoutProfile } from "../../utils/helpers";
import { useGoogleLogout } from "react-google-login";
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
import { GoogleLoginClientId } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

  const navigate = useNavigate();

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

  const handleGoogleLogoutSuccess = () => {
    // navigate("/");
  };
  const handleGoogleLogoutFailure = () => {
    // TODO: Handle failure scenario
    console.log("Logout failure");
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
