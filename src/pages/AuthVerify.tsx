import React, { Component } from "react";
import { Route } from "react-router-dom";
const parseJwt = (token: any) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

// import React from 'react'

// const AuthVerify = () => {
//   return (
//     <div>AuthVerify</div>
//   )
// }

// export default AuthVerify

class AuthVerify extends Component {
  constructor(props) {
    super(props);
    props.history.listen(() => {
      const user = JSON.parse(localStorage.getItem("user") as any);
      if (user) {
        const decodedJwt = parseJwt(user.accessToken);
        if (decodedJwt.exp * 1000 < Date.now()) {
          props.logOut();
        }
      }
    });
  }
  render() {
    return <div></div>;
  }
}
export default (
  <Route>
    <AuthVerify />
  </Route>
);
