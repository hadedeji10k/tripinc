/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import { GoThreeBars } from 'react-icons/go'
import { MdOutlineLanguage } from 'react-icons/md'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Nav, NavbarContainer, NavbarLogo, MobileIcon, NavMenu, NavItem, NavLink, NavBtn, NavBtnLink, ReactIcons } from './NavbarElements'
// import logo from '../../logo.svg'

interface NavbarProps {
    isOpen: Boolean,
    toggleIsOpen: (arg: Boolean) => void
}

const Navbar: React.FC <NavbarProps> = ({isOpen, toggleIsOpen}: NavbarProps) => {
  return (
    <>
        <Nav>
            <NavbarContainer>
                <NavbarLogo to="/">
                    TripInc
                </NavbarLogo>
                <MobileIcon onClick={toggleIsOpen}>
                    <GoThreeBars />
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                        <NavLink to="/">
                            Explorer
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/">
                            Bucket List
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/">
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
                    <NavLink to="/">
                        <MdOutlineLanguage />&nbsp; Language
                    </NavLink>
                    <NavLink to="/">
                        <ReactIcons>
                            <AiOutlineShoppingCart />
                        </ReactIcons>
                    </NavLink>
                    <NavBtnLink to="/">
                        Sign In
                    </NavBtnLink>
                </NavBtn>
            </NavbarContainer>
        </Nav>
    </>
  )
}

export default Navbar