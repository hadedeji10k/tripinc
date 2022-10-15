import { useState, useEffect } from "react";
import { Spin } from "antd";
import PastTripCard from "../../Cards/PastTripCard/PastTripCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { TiLocationArrowOutline } from "react-icons/ti";
import { getUserTrips } from "../../../api";
import { localGetUserId } from "../../../utils/helpers";
import { ITripPlanningData } from "../../../api/interfaces";
import { BiSearch } from "react-icons/bi";

const menudata = [
  {
    id: 1,
    stateOfClass: true,
    title: "Approved",
    slug: "approved",
  },
  {
    id: 2,
    stateOfClass: false,
    title: "Pending",
    slug: "pending",
  },
];

const AmbassadorTrip = () => {
  // set the menudata to a state to manage the menu
  const [menuData, setMenuData] = useState(menudata);
  //   get the dummy data and set the attraction data
  const [attractionData, setAttractionData] = useState<ITripPlanningData[]>([]);
  const [initialAttractionData, setInitialAttractionData] = useState<
    ITripPlanningData[]
  >([]);
  //   using this to set the current data to filter the data
  const [currentData, setCurrentData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const userId = localGetUserId();

  useEffect(() => {
    // getting the current title from the menu
    const data = menuData.filter((item) => item.stateOfClass === true);
    // setting the current data to the current title
    setCurrentData(data[0].title);
  }, [currentData, menuData]);

  useEffect(() => {
    setIsLoading(true);
    getUserTrips(userId).then((res) => {
      console.log(res.data);
      setAttractionData(res.data.items);
      setInitialAttractionData(res.data.items);
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

  const handleInput = (e: any) => {
    if (e.target.value.length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
    const filtered = initialAttractionData.filter((item) =>
      item.startDestination.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAttractionData(filtered);
  };

  // when working on this uncomment line 38 - 41 inside useEffect
  return (
    <Spin spinning={isLoading} size="large">
      <div className="trip_page">
        <div className="trip_page_container">
          <div className="search_container w_90">
            <TiLocationArrowOutline className="w_5 trip_search_icon" />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search with cities..."
              className="w_85 trip_search_input"
              onChange={handleInput}
            />
            <span className="w_5">
              <button
                className="explore_page_search_button"
                onClick={handleInput}
              >
                <BiSearch />
              </button>
            </span>
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
              {/* <a href="/#/custom-plan-trip"> */}
              <span className="plan_new_trip_text">
                <BsFillPlusCircleFill className="plus_icon" />
                Create a new trip
              </span>
              {/* </a> */}
            </div>
          </div>
          <div className="my_trip_container">
            {/* <h3>tripPage</h3> */}
            {attractionData.length > 0 ? (
              <div className="trip_card">
                {attractionData.map((item) => (
                  <PastTripCard
                    key={item.id}
                    image="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                    item={item}
                  />
                ))}
              </div>
            ) : (
              <>
                <h3 className="mb-3 mt-3 fs-5 text-center">
                  {currentData === "Approved"
                    ? "You do not have any approved Trips"
                    : currentData === "Pending"
                    ? "You do not have any pending Trips"
                    : ""}
                </h3>
                <br />
              </>
            )}
            {isSearching ? (
              <button
                onClick={() => {
                  setAttractionData(initialAttractionData);
                  setIsSearching(false);
                }}
              >
                All
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default AmbassadorTrip;
