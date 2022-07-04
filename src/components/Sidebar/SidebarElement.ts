import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Link as ReactLinkRouter } from 'react-router-dom';
// import { Link as ReactLinkScroll } from 'react-scroll'

interface SidebarContainerProps {
    isOpen: boolean;
    onClick: React.MouseEventHandler<HTMLDivElement> & ((e: Event) => void)
}

export const SidebarContainer = styled.aside<SidebarContainerProps | any>`
    position: fixed;
    z-index: -100;
    width: 100%;
    height: 100%;
    background: #252748;
    display: grid;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};

    @media (max-width: 801px) {
        z-index: 999;
    }
`

export const CloseIcon = styled(FaTimes)`
    color: #fff;
`

export const Icon = styled.div<SidebarContainerProps | any>`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    cursor: pointer;
    background: transparent;
    font-size: 1.8rem;
    outline: none;
`

export const SidebarWrapper = styled.div`
    color: #fff;
`

export const SidebarMenu = styled.ul`
    margin-top: 100px;
    margin-bottom: 150px;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 60px);
    text-align: center;

    @media screen and (max-width: 480px) {
        grid-template-rows: repeat(6, 60px);
    }
`

export const SidebarLink = styled(ReactLinkRouter)`
    display: flex; 
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    transition: 0.3s ease-in-out;
    color: #fff;
    cursor: pointer;

    &:hover {
        color: #252748;
        background: #d4d5e4;
        transition: 0.3s ease-in-out;
    }
`

export const SidebarNoLink = styled.p`
    display: flex; 
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    transition: 0.3s ease-in-out;
    color: #fff;
    cursor: pointer;

    &:hover {
        color: #252748;
        background: #d4d5e4;
        transition: 0.3s ease-in-out;
    }
`

export const SidebarBtn = styled.div`
    display: flex;
    justify-content: center;
`

export const SidebarRoute = styled(ReactLinkRouter)`
    border-radius: 50px;
    background: #777E90;
    white-space: nowrap;
    padding: 16px 50px;
    color: #d4d5e4;
    font-size: 1rem;
    outline: none;
    border: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: 0.3s ease-in-out;
        background: #d4d5e4;
        color: #777E90;
    }
`
