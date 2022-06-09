import "./PageNotFound.css";
import pageNotFound from "../../images/page_not_found.png";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <Link className="page_not_found_container" to="/">
        <img className="page_not_found_image" src={pageNotFound} alt="" />
      </Link>
    </div>
  );
};

export default PageNotFound;
