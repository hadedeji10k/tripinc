import styled from 'styled-components';
import { Link as ReactLinkRouter } from 'react-router-dom';
// import { Link as ReactLinkScroll } from 'react-scroll'

interface MobileNavbar {
    onClick: React.MouseEventHandler<HTMLDivElement> & ((e: Event) => void)
}

export const Nav = styled.nav`
    background-color: #fff;
    height: 80px;
    // margin-top: -80px;
    display : flex;
    justify-content: center;
    aligh-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    width: 100%;
    z-index: 1;
    padding: 0 24px;
    max-width: 1100px;
`

export const NavbarLogo = styled(ReactLinkRouter)`
    color: #252748;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
`

export const MobileIcon = styled.div<MobileNavbar | any>`
    display: none;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
        color: #777E90;
    }
`

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: -22px;
    margin-bottom: 0;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavItem = styled.li`
    height: 80px;
`

export const NavLink = styled(ReactLinkRouter)`
    color: #777E90;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &.active {
        border-bottom: 2px solid #252748;
    }
    &:hover {
        transition: all 0.2s ease-in-out;
        color: #252748;
    }
`

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavBtnLink = styled(ReactLinkRouter)`
    border-radius: 50px;
    background-color: #252748;
    white-space: nowrap;
    padding: 10px 20px;
    color: #fff;
    font-size: 1rem;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    
    &:hover {
        transition: all 0.2s ease-in-out;
        background-color: #d4d5e4;
        color: #252748;
    }
`

export const NavBtnLinkLogout = styled.p`
    border-radius: 50px;
    background-color: #252748;
    white-space: nowrap;
    padding: 7px 15px;
    color: #fff;
    font-size: 1rem;
    margin-left: 10px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    
    &:hover {
        transition: all 0.2s ease-in-out;
        background-color: #d4d5e4;
        color: #252748;
    }
`

export const NavBtnProfileLink = styled(ReactLinkRouter)`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-left: 20px;
    border: 3px solid #252748;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    
    &:hover {
        transition: all 0.2s ease-in-out;
    }
`

export const ReactIcons = styled.span`
    font-size: 1.5rem;
    position: relative;
`