import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function RequireAuth({ children }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile") as any);

  const location = useLocation();

  useEffect(() => {
    if (!user) {
      Swal.fire({
        title: "Error!",
        text: "This feature is unavailable as you are not signed in. Please sign in to access this page.",
        icon: "error",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          navigate("/sign-in", {
            replace: true,
            state: { from: location.pathname },
          });
        }
      });
    }
  });

  return user ? children : "";
}
export default RequireAuth;
