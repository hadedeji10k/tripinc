import { useState, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import {
  Main,
  MainDashBoard,
  ProfileBarSideBar,
  ProfileDetails,
  SideBarDashBoard,
  SideBarDashBoardMain,
  SideBarDashBoardMenu,
  SideBarDashBoardMenuList,
  SideBarMobileIcon,
} from "./DashboardElement";
import defaultImage from "../../images/default_profile_image.jpg";
import { Link } from "react-router-dom";
import { GoThreeBars } from "react-icons/go";
import { AuthContext } from "../../stores/Auth";

const menuBarData = [
  {
    id: 1,
    state: true,
    title: "Dashboard",
    link: "/ambassador",
  },
  {
    id: 2,
    state: false,
    title: "Attractions",
    link: "/ambassador/attractions",
  },
  {
    id: 3,
    state: false,
    title: "Trips",
    link: "/ambassador/trips",
  },
  {
    id: 4,
    state: false,
    title: "Applications",
    link: "/admin/trip-planners",
  },
  {
    id: 5,
    state: false,
    title: "Chats",
    link: "/ambassador/chat",
  },
  {
    id: 6,
    state: false,
    title: "Settings",
    link: "",
  },
];

const NewDashboard = ({ children }) => {
  const [menuBar, setMenuBar] = useState(menuBarData);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user } = useContext(AuthContext);

  // let data = menuBar.filter((item) => item.state === true);

  const handleMenuClick = (id: number) => {
    toggleIsOpen();
    const index = menuBar.findIndex((item) => item.id === id);
    for (let i = 0; i < menuBar.length; i++) {
      menuBar[i].state = false;
    }
    menuBar[index].state = !menuBar[index].state;

    setMenuBar([...menuBar]);
  };

  const toggleIsOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Main sidebarOpen={sidebarOpen}>
      <SideBarDashBoard sidebarOpen={sidebarOpen}>
        <SideBarMobileIcon sidebarOpen={sidebarOpen} onClick={toggleIsOpen}>
          {sidebarOpen ? <FaTimes /> : <GoThreeBars />}
        </SideBarMobileIcon>
        <SideBarDashBoardMain sidebarOpen={sidebarOpen}>
          <ProfileBarSideBar sidebarOpen={sidebarOpen}>
            <img
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
              }}
              src={defaultImage}
              alt="profile pic"
            />
            <ProfileDetails>
              <h5
                style={{ wordBreak: "break-all" }}
                className="medium_title fw-bold mb-0"
              >
                {`${user.firstName} ${user.lastName}`}
              </h5>
              <h6
                style={{ wordBreak: "break-all" }}
                className="small_title mb-0"
              >
                {user.email}
              </h6>
            </ProfileDetails>
          </ProfileBarSideBar>
          <SideBarDashBoardMenu sidebarOpen={sidebarOpen}>
            {menuBar.map((item) => (
              <Link to={item.link} key={item.id}>
                <SideBarDashBoardMenuList
                  active={item.state}
                  onClick={() => handleMenuClick(item.id)}
                >
                  {item.title}
                </SideBarDashBoardMenuList>
              </Link>
            ))}
          </SideBarDashBoardMenu>
        </SideBarDashBoardMain>
      </SideBarDashBoard>
      <MainDashBoard sidebarOpen={sidebarOpen}>
        {/* {data[0].id === 1 ? (
          <></>
        ) : data[0].id === 2 ? (
          <>
            <AmbassadorAttraction />
          </>
        ) : data[0].id === 3 ? (
          <>
            <AmbassadorTrip />
          </>
        ) : null} */}
        {children}
      </MainDashBoard>
    </Main>
  );
};

export default NewDashboard;
