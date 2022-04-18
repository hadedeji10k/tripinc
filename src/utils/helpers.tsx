import { useState, createContext } from "react";
import jwt_decode from "jwt-decode";

export const checkAuth = (): boolean => {
  let valid = false;
  const localToken = localStorage.getItem("profile") as any;
  if (localToken == null) {
    valid = false;
  } else {
    try {
      const decoded: any = jwt_decode(localToken?.access_Token);
      const expires: Date = new Date(decoded?.exp * 1000);
      if (expires > new Date()) valid = true;
    } catch {
      valid = false;
    }
  }
  console.log(valid);
  return valid;
};

checkAuth();

export const AuthContext = createContext({
  isLoggedIn: false,
  username: "",
  userId: 0,
  login: () => {},
  logout: () => {},
  setUsername: (user: string) => {},
  setUserId: (userId: number) => {},
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [loggedIn, setLoggedIn] = useState(() => checkAuth());
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const login = () => {
    setLoggedIn(true);
  };
  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: loggedIn,
        username: username,
        userId: userId,
        login: login,
        logout: logout,
        setUsername: setUsername,
        setUserId: setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export default function authHeader() {
//   const userStr = localStorage.getItem("user");
//   let user = null;
//   if (userStr)
//     user = JSON.parse(userStr);
//   if (user && user.accessToken) {
//     // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
//     return { 'x-access-token': user.accessToken };       // for Node Express back-end
//   } else {
//     return {};
//   }
// }
