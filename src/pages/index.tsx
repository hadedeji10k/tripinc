import {
  Fragment,
  FunctionComponent,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer/Footer";
import LoggedInBanner from "./LoggedInBanner";
import {
  localGetCartLength,
  localGetOrdersLength,
  getUserProfilePicture,
  checkAuth,
} from "../utils/helpers";
import { AuthContext } from "../stores/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLoginClientId } from "utils/constants";

export const Loading: FunctionComponent = () => {
  return (
    <div className="d-flex justify-content-center m-5">
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border"
          role="status"
          aria-hidden="true"
        ></span>
        <strong>Loading...</strong>
      </button>
      {/*<div className="animated fadeIn pt-3 text-center">Loading...</div> */}
    </div>
  );

  // return (
  // 	<div className="pt-3 text-center">
  // 		<div className="sk-spinner sk-spinner-pulse"></div>
  // 	</div>
  // );
};

export const MainLayout: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const authContext = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authContext.isLoggedIn);
  const [cartLength, setCartLength] = useState<number>(0);
  const [ordersLength, setOrdersLength] = useState<number>(0);

  const { pathname } = useLocation();

  useEffect(() => {
    checkAuth() ? setIsLoggedIn(true) : setIsLoggedIn(false);
    localGetCartLength().then((res) => {
      setCartLength(res);
    });
    localGetOrdersLength().then((res) => {
      setOrdersLength(res);
    });
  }, [pathname]);

  useEffect(() => {
    getUserProfilePicture().then((res) => {
      setProfilePicture(res);
    });
  }, [isLoggedIn]);

  const toggleIsOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <GoogleOAuthProvider clientId={GoogleLoginClientId}>
      <Fragment>
        <LoggedInBanner />
        <Sidebar
          isOpen={isOpen}
          toggleIsOpen={toggleIsOpen}
          profilePicture={profilePicture}
          isLoggedIn={isLoggedIn}
          cartLength={cartLength}
          ordersLength={ordersLength}
        />
        <Navbar
          isOpen={isOpen}
          toggleIsOpen={toggleIsOpen}
          profilePicture={profilePicture}
          isLoggedIn={isLoggedIn}
          cartLength={cartLength}
          ordersLength={ordersLength}
        />

        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>

        <Footer />
      </Fragment>
    </GoogleOAuthProvider>
  );
};
