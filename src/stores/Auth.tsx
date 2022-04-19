import { useState, createContext } from "react";
import { checkAuth, localGetUser } from "../utils/helpers";

export const AuthContext = createContext({
  isLoggedIn: false,
  username: "",
  userId: 0,
  user: {},
  login: () => {},
  logout: () => {},
  setUsername: (user: string) => {},
  setUserId: (userId: number) => {},
  setUserProfile: () => {},
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [loggedIn, setLoggedIn] = useState(() => checkAuth());
  const [user, setUser] = useState(() => localGetUser());
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
