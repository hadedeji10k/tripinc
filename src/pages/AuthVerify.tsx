import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { refreshToken } from "../api/responseHandlers";
import {
  checkAuthForRefresh,
  cities,
  countries,
  localLogout,
} from "../utils/helpers";

const AuthVerify = ({ children }: { children: any }) => {
  useEffect(() => {
    cities();
    countries();
  });

  const navigate = useNavigate();

  const location = useLocation();

  // check for token authentication
  const data = checkAuthForRefresh();

  // if token is expired, and can still refresh, refresh token
  if (data.can_still_refresh) {
    const formData = {
      refreshToken: data.refreshToken,
    };
    refreshToken(formData);
  }

  // if token is null, and can_still_refresh is null, render children, then protected route will handle pages user can view in this case
  if (data.can_still_refresh === null && data.tokenExpired === null) {
    return <>{children}</>;
  }

  // if token is expired and can_still_refresh is false, logout user and redirect to login page
  if (data.tokenExpired === true) {
    if (data.can_still_refresh === false) {
      localLogout(navigate, location);
      return <>{children}</>;
    }
  }

  return <>{children}</>;
};

export default AuthVerify;
