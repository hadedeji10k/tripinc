import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { AuthContext } from "../stores/Auth";
import { checkAuth } from "../utils/helpers";

export default function ScrollToTopOfPage() {
  const authContext = useContext(AuthContext);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    checkAuth() ? authContext.login() : authContext.logout();
    authContext.setLoggedIn(true);
    // console.log(checkAuth(), "checkAuth");
  }, [pathname, authContext]);

  return null;
}
