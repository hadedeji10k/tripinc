/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
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
            <NavBtnLink to="/sign-in">Sign In</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
