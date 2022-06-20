import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { localGetUserFirstName } from "../utils/helpers";

const LoggedInBanner = () => {
  const [name, setName] = useState<any>("");

  const { pathname } = useLocation();

  useEffect(() => {
    setName(localGetUserFirstName());
  }, [pathname]);

  return (
    <>
      {name ? (
        <div
          className="top_logged_in_banner"
          style={{
            display: "flex",
            position: "sticky",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            maxWidth: "97%",
            backgroundColor: "white",
            height: "25px",
            zIndex: 10,
            margin: "auto",
          }}
        >
          <Link to="/profile">
            <p style={{ textAlign: "center", color: "black", margin: "auto" }}>
              Hi, {name}. Welcome back.
            </p>
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default LoggedInBanner;
