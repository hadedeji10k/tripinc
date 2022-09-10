import { useState, useEffect } from "react";
import "./MyTrip.css";
import { Spin } from "antd";
import PastTripCard from "../Cards/PastTripCard/PastTripCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { getUserTrips } from "../../api";
import { localGetUserId } from "../../utils/helpers";
import { ITripPlanningData } from "../../api/interfaces";

const menudata = [
  {
    id: 1,
    stateOfClass: true,
    title: "Upcoming Trips",
    slug: "upcoming_trips",
  },
  {
    id: 2,
    stateOfClass: false,
    title: "Past Trips",
    slug: "past_trips",
  },
];

const MyTrip = () => {
  // set the menudata to a state to manage the menu
  const [menuData, setMenuData] = useState(menudata);
  //   get the dummy data and set the attraction data
  const [attractionData, setAttractionData] = useState<ITripPlanningData[]>([]);
  //   using this to set the current data to filter the data
  const [currentData, setCurrentData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userId = localGetUserId();

  useEffect(() => {
    // getting the current title from the menu
    const currentdata = menuData.filter((item) => item.stateOfClass === true);
    // setting the current data to the current title
    setCurrentData(currentdata[0].title);
  }, [currentData, menuData]);

  useEffect(() => {
    setIsLoading(true);
    getUserTrips(userId).then((res) => {
      console.log(res.data);
      setAttractionData(res.data.items);
      setIsLoading(false);
    });
  }, []);

  // function to manage the trips button when it is clicked
  const handleLocationsClick = (e: any, action: string) => {
    // prevent default so it won't refresh the page
    e.preventDefault();
    let index;
    switch (action) {
      case "click":
        // get the id of the location tag clicked
        const id = e.target.id;

        // get the index of the location in the locationData state
        index = menuData.findIndex((item) => item.id === parseInt(id));
        break;
      case "select":
        const value = e.target.value;

        // get the index of the location in the locationData state
        index = menuData.findIndex((item) => item.title === value);
        break;
      default:
        break;
    }

    for (let i = 0; i < menuData.length; i++) {
      menuData[i].stateOfClass = false;
    }

    // change the state of the class of the clicked location tag
    menuData[index].stateOfClass = !menuData[index].stateOfClass;
    // set the location data state to be the current location data
    setMenuData([...menuData]);
    setCurrentData(menuData[index].title);
  };

  // when working on this uncomment line 38 - 41 inside useEffect
  return (
    <Spin spinning={isLoading} size="large">
      <div className="trip_page">
        <div className="trip_page_container">
          <div className="search_container">
            <input type="search" name="" id="" />
          </div>
          <div className="header_container">
            <h3 className="trip_page_header">My Trips</h3>
          </div>
          <div className="navigation_container">
            <div className="trips_button_container">
              {menuData.map((item) => (
                <span
                  onClick={(e) => handleLocationsClick(e, "click")}
                  className={
                    item.stateOfClass
                      ? "trips_button_clicked nav_menu_trips"
                      : "trips_button_not_clicked nav_menu_trips"
                  }
                  key={item.id.toString()}
                  id={item.id.toString()}
                >
                  {item.title}
                </span>
              ))}

              {/* Mobile device select */}
              <div className="trips_select_container">
                <select
                  name=""
                  id="select_input"
                  defaultValue={currentData}
                  onClick={(e) => handleLocationsClick(e, "select")}
                >
                  {menuData.map((item) => (
                    <option
                      key={item.id.toString()}
                      id={item.id.toString()}
                      value={item.title}
                    >
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="plan_new_trip">
              <a href="/#/custom-plan-trip">
                <span className="plan_new_trip_text">
                  <BsFillPlusCircleFill className="plus_icon" />
                  Plan a new trip
                </span>
              </a>
            </div>
          </div>
          <div className="my_trip_container">
            {/* <h3>tripPage</h3> */}
            {attractionData.length > 0 ? (
              <div className="card">
                {attractionData.map((item) => (
                  <PastTripCard
                    key={item.id}
                    image="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                    location={item.startDestination}
                    budget={item.budget}
                    tripId={item.id}
                  />
                ))}
              </div>
            ) : (
              <>
                <h3 className="no_data_text">
                  {currentData === "Upcoming Trips"
                    ? "You do not have any upcoming Trips"
                    : currentData === "Past Trips"
                    ? "You do not have any past Trips"
                    : ""}
                </h3>
                <br />
              </>
            )}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default MyTrip;
