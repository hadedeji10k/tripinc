import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function RequireAuth({ children }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile") as any);

  const location = useLocation();

  useEffect(() => {
    if (!user) {
      Swal.fire({
        title: "Error!",
        text: "You are logged out! kindly log in again to continue",
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
