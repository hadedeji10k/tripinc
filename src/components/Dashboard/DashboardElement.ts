import styled from 'styled-components';

interface SideBarToggleProps {
    sidebarOpen?: boolean;
}

export const Main = styled.nav<SideBarToggleProps>`
    max-width: 97%;
    width: 97%;
    display: flex;
    // grid-template-columns: 300px 1fr;
    // grid-gap: 20px;
    padding: 1rem;
    margin: auto;
    @media screen and (max-width: 950px) {
        // grid-template-columns: ${({ sidebarOpen }) => (sidebarOpen ? '100% 1fr' : '50px 1fr')};
    }
`

export const SideBarDashBoard = styled.div<SideBarToggleProps>`
    position: -webkit-sticky;
    position: sticky;
    overflow: hidden;
    top: 105px;
    left: 5px;
    width: 300px;
    padding: 1rem 0.5rem;
    max-height: calc(100vh - 100px);
    @media screen and (max-width: 950px) {
        padding: 0;
        width: ${({ sidebarOpen }) => (sidebarOpen ? '100%' : '50px')};
    }
`

export const SideBarDashBoardMain = styled.div<SideBarToggleProps>`
    opacity: 1;
    @media screen and (max-width: 950px) {
        opacity: ${({ sidebarOpen }) => (sidebarOpen ? '1' : '0')};
        transition: all 0.7s ease-in-out;
    }
`

export const SideBarDashBoardMenu = styled.div<SideBarToggleProps>`
    display:flex;
    flex-direction: column !important;
    padding: 5px 10px 5px 5px;
    @media screen and (max-width: 950px) {
        display: ${({ sidebarOpen }) => (sidebarOpen ? 'flex' : 'none')};
    }
`

export const SideBarMobileIcon = styled.div<SideBarToggleProps>`
    display: none;
    @media screen and (max-width: 950px) {
        // display: ${({ sidebarOpen }) => (sidebarOpen ? 'block' : 'none')};
        display: block;
        position: absolute;
        top: 0;
        right: ${({ sidebarOpen }) => (sidebarOpen ? '0' : '')};
        font-size: 1.8rem;
        cursor: pointer;
        color: #777E90;
    }
`

interface SideBarDashBoardMenuListProps {
    active?: boolean;
}

export const SideBarDashBoardMenuList = styled.div<SideBarDashBoardMenuListProps>`
    color: #333;
    font-size: 1rem;
    padding: 0.7rem;
    display: flex;
    align-items: center!important;
    margin-bottom: 0.5rem;
    background-color: ${({ active }) => (active ? '#333' : '')};
    color: ${({ active }) => (active ? 'white' : '#333')};
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #333;
        color: white;
    }
`

export const ProfileBarSideBar = styled.div<SideBarToggleProps>`
    display: flex;
    gap: 2px;
    flex-direction: row !important;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;  
    @media screen and (max-width: 950px) {
        display: ${({ sidebarOpen }) => (sidebarOpen ? 'block' : 'none')};
    } 
`

export const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column !important;
    align-items: flex-start;
    justify-content: flex-start;
`

export const MainDashBoard = styled.div<SideBarToggleProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    // min-height: calc(100vh - 105px);
    width: calc(100% - 300px);
    transition: display 1s ease-in-out;
    @media screen and (max-width: 950px) {
        display: ${({ sidebarOpen }) => (sidebarOpen ? 'none' : 'flex')};
        width: ${({ sidebarOpen }) => (sidebarOpen ? '0' : 'calc(100% - 50px)')};
    }
`

// export const DashboardDetails = styled.div`
//     display: flex;
//     flex-direction: row !important;
//     width: 80%;
//     margin: auto;
//     gap: 10px;
//     flex-wrap: wrap;
// `

// export const DashboardDetailsSpan = styled.div`
    
// `