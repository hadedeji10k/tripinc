import { AiFillDashboard } from "react-icons/ai";
import { FaThList } from "react-icons/fa";
import { MdTour } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AmbassadorSideBar = () => {
  return (
    <DashboardSideBarMenu>
      <DashboardSideBarList>
        <Link to={`/ambassador`} className="text-white">
          <AiFillDashboard /> &nbsp; Dashboard
        </Link>
      </DashboardSideBarList>
      <DashboardSideBarList>
        <Link to={`/ambassador/attractions`} className="text-white">
          <FaThList /> &nbsp; Manage Attractions
        </Link>
      </DashboardSideBarList>
      <DashboardSideBarList>
        <Link to={`/ambassador/trips`} className="text-white">
          <MdTour /> &nbsp; Manage Trips
        </Link>
      </DashboardSideBarList>
    </DashboardSideBarMenu>
  );
};

export const DashboardSideBarMenu = styled.ul`
margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  text-align: center;
  // margin-right: -22px;
  margin-bottom: 0;
  padding; 0;
  gap: 1rem;
  padding-left: 0;
`;

const DashboardSideBarList = styled.li`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;

  &.active {
    border-bottom: 2px solid #252748;
  }
  &:hover {
    transition: all 0.2s ease-in-out;
  }
`;

export default AmbassadorSideBar;
