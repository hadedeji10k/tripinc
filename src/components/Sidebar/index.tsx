import React from 'react'
import { MdOutlineLanguage } from 'react-icons/md'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SidebarBtn, SidebarRoute } from './SidebarElement'

// interface for this component
interface SidebarProps {
    isOpen: Boolean,
    toggleIsOpen: (arg: Boolean) => void
}
// interface for the sidebar container
interface SidebarContainerProps {
    isOpen: boolean;
    onClick: React.MouseEventHandler<HTMLDivElement> & ((e: Event) => void)
}

// the react component
const Sidebar = ({isOpen, toggleIsOpen}: SidebarProps) => {
    // return the sidebar container
  return (
    <>
        <SidebarContainer isOpen={isOpen} onClick={toggleIsOpen}>
            <Icon onClick={toggleIsOpen}>
                <CloseIcon />
            </Icon>

            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="/">
                        Explorer
                    </SidebarLink>
                    <SidebarLink to="/">
                        Bucket List
                    </SidebarLink>
                    <SidebarLink to="/">
                        My Trips
                    </SidebarLink>
                    <SidebarLink to="/">
                       <MdOutlineLanguage />&nbsp; Language
                    </SidebarLink>
                    <SidebarLink to="/">
                        <AiOutlineShoppingCart />
                    </SidebarLink>
                    <SidebarLink to="/">
                        Sign Up
                    </SidebarLink>
                </SidebarMenu>
                <SidebarBtn>
                    <SidebarRoute to="/">
                        Sign In
                    </SidebarRoute>
                </SidebarBtn>
            </SidebarWrapper>
        </SidebarContainer>
    </>
  )
}

export default Sidebar