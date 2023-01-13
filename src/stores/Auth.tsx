import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, createContext } from "react";
import { auth } from "../utils/firebase";
import { checkAuth, localGetUser, localGetUserId } from "../utils/helpers";

export const AuthContext = createContext({
  isLoggedIn: checkAuth(),
  username: "",
  userId: localGetUserId(),
  user: localGetUser() || {},
  login: () => {},
  logout: () => {},
  setUsername: (user: string) => {},
  setUserId: (userId: number) => {},
  setUserProfile: () => {},
  setLoggedIn: (loggedIn: boolean) => {},
  currentChatUser: {},
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [loggedIn, setLoggedIn] = useState(() => checkAuth());
  const [user, setUser] = useState(() => localGetUser());
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(0);
  const [currentChatUser, setCurrentChatUser] = useState({});

  // const { pathname } = useLocation();
  const checkAuthFunc = checkAuth();

  // chat settings
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentChatUser(user ? user : {});
    });

    return () => {
      unsub();
    };
  }, []);

  // useEffect(() => {
  //   checkAuth() ? login() : logout();
  // }, [pathname]);

  useEffect(() => {
    setUserProfile();
    setUserId(localGetUserId());
  }, [checkAuthFunc]);

  const login = () => {
    setLoggedIn(true);
  };
  const logout = () => {
    setLoggedIn(false);
  };
  const setUserProfile = () => {
    const user = localGetUser();
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: loggedIn,
        username: username,
        user: user,
        userId: userId,
        login: login,
        logout: logout,
        setUsername: setUsername,
        setUserId: setUserId,
        setUserProfile: setUserProfile,
        setLoggedIn: setLoggedIn,
        currentChatUser: currentChatUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
