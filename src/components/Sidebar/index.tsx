// import { MdOutlineLanguage } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import defaultImage from "../../images/default_profile_image.jpg";
import { BsBagCheck } from "react-icons/bs";
import { ReactIcons } from "../Navbar/NavbarElements";
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
import { useGoogleLogout } from "react-google-login";
import { GoogleLoginClientId } from "../../utils/constants";
import { useContext } from "react";
import { AuthContext } from "../../stores/Auth";
import { localLogoutProfile } from "../../utils/helpers";

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
const Sidebar = ({
  isOpen,
  toggleIsOpen,
  profilePicture,
  isLoggedIn,
  cartLength,
  ordersLength,
}: SidebarProps) => {
  const authContext = useContext(AuthContext);

  const handleGoogleLogoutSuccess = () => {
    // navigate("/");
  };
  const handleGoogleLogoutFailure = () => {
    // TODO: Handle failure scenario
  };

  const { signOut } = useGoogleLogout({
    clientId: GoogleLoginClientId as string,
    onLogoutSuccess: handleGoogleLogoutSuccess,
    onFailure: handleGoogleLogoutFailure,
  });

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
        console.log("logout");
        signOut();
        authContext.logout();
        localLogoutProfile();
        window.location.href = "/";
      }
    });
  };

  // return the sidebar container
  return (
    <>
      <SidebarContainer isOpen={isOpen} onClick={toggleIsOpen}>
        <Icon onClick={toggleIsOpen}>
          <CloseIcon />
        </Icon>

        <SidebarWrapper>
          <SidebarMenu>
            <SidebarLink to="/explore">Explore</SidebarLink>
            <SidebarLink to="/bucket-list">Bucket List</SidebarLink>
            <SidebarLink to="/my-trips">My Trips</SidebarLink>
            {/* <SidebarLink to="/">
              <MdOutlineLanguage />
              &nbsp; Language
            </SidebarLink> */}
            {isLoggedIn ? (
              <>
                <SidebarLink to="/shopping/cart">
                  <ReactIcons>
                    <AiOutlineShoppingCart />
                    <span className="cart_number_active">{cartLength}</span>
                  </ReactIcons>
                </SidebarLink>
                <SidebarLink to="/orders">
                  <ReactIcons>
                    <BsBagCheck />
                    <span className="cart_number_active">{ordersLength}</span>
                  </ReactIcons>
                </SidebarLink>
                <SidebarLink to="/profile">
                  <img
                    className="navbar_profile_pics sidebar_profile_pics"
                    src={profilePicture !== "" ? profilePicture : defaultImage}
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
    </>
  );
};

export default Sidebar;
