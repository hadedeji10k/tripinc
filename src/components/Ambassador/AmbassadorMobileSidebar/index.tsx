// import { MdOutlineLanguage } from "react-icons/md";
import { AiFillDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import defaultImage from "../../../images/default_profile_image.jpg";
import { BsBagCheck } from "react-icons/bs";
import { NavBtnProfileLink, ReactIcons } from "../../Navbar/NavbarElements";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SidebarBtn,
  SidebarRoute,
  SidebarNoLink,
} from "./SidebarElement";
import Swal from "sweetalert2";
import { GoogleLoginClientId } from "../../../utils/constants";
import { useContext } from "react";
import { AuthContext } from "../../../stores/Auth";
import { localLogoutProfile } from "../../../utils/helpers";
import { FaThList } from "react-icons/fa";
import { MdTour } from "react-icons/md";
import { googleLogout, GoogleOAuthProvider } from "@react-oauth/google";

// interface for this component
interface SidebarProps {
  isOpen: Boolean;
  toggleIsOpen: (arg: Boolean) => void;
  profilePicture?: any;
  isLoggedIn?: boolean;
  cartLength?: number;
  ordersLength?: number;
}
// interface for the sidebar container
// interface SidebarContainerProps {
//   isOpen: boolean;
//   onClick: React.MouseEventHandler<HTMLDivElement> & ((e: Event) => void);
// }

// the react component
const AmbassadorSidebar = ({
  isOpen,
  toggleIsOpen,
  profilePicture,
  isLoggedIn,
  cartLength,
  ordersLength,
}: SidebarProps) => {
  const authContext = useContext(AuthContext);

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

  // return the sidebar container
  return (
    <>
      <GoogleOAuthProvider clientId={GoogleLoginClientId}>
        <SidebarContainer isOpen={isOpen} onClick={toggleIsOpen}>
          <Icon onClick={toggleIsOpen}>
            <CloseIcon />
          </Icon>

          <SidebarWrapper>
            <SidebarMenu isOpen={isOpen}>
              <SidebarLink to="/ambassador">
                <AiFillDashboard /> &nbsp; Dashboard
              </SidebarLink>
              <SidebarLink to="/ambassador/attractions">
                <FaThList /> &nbsp; Manage Attractions
              </SidebarLink>
              <SidebarLink to="/ambassadors/trips">
                <MdTour /> &nbsp; Manage Trips
              </SidebarLink>
              <SidebarLink to="/admin/trip-planners">
                <MdTour /> &nbsp; Trip Planner Applications
              </SidebarLink>
              {isLoggedIn ? (
                <>
                  <SidebarLink to="/profile">
                    <img
                      className="navbar_profile_pics sidebar_profile_pics"
                      src={
                        profilePicture !== "" ? profilePicture : defaultImage
                      }
                      alt="profile pic"
                    />
                  </SidebarLink>
                  <SidebarNoLink onClick={handleLogout}>Log out</SidebarNoLink>
                </>
              ) : (
                <SidebarLink to="/sign-up">Sign Up</SidebarLink>
              )}
            </SidebarMenu>
            {!isLoggedIn ? (
              <SidebarBtn>
                <SidebarRoute to="/sign-in">Sign In</SidebarRoute>
              </SidebarBtn>
            ) : null}
          </SidebarWrapper>
        </SidebarContainer>
      </GoogleOAuthProvider>
    </>
  );
};

export default AmbassadorSidebar;
