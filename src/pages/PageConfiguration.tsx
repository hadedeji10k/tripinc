import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { AuthContext } from "../stores/Auth";
import { checkAuth, checkForAuth } from "../utils/helpers";

export default function PageConfiguration() {
  const authContext = useContext(AuthContext);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    checkAuth() ? authContext.login() : authContext.logout();
    authContext.setLoggedIn(true);

    // check for auth
    checkForAuth();
  }, [pathname, authContext]);

  return null;
}
