import React, { useState, useEffect } from "react";
import "./MyTrip.css";
import { attractiondata } from "../../currentUserData";
import PastTripCard from "../Cards/PastTripCard/PastTripCard";
import { BsFillPlusCircleFill } from "react-icons/bs";

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
  const [attractionData, setAttractionData] = useState(attractiondata);
  //   using this to set the current data to filter the data
  const [currentData, setCurrentData] = useState("");

  useEffect(() => {
    // console.log(currentData);
    // getting the current title from the menu
    const currentdata = menuData.filter((item) => item.stateOfClass === true);
    // setting the current data to the current title
    setCurrentData(currentdata[0].title);

    // get the select input and set the value to current data
    let select_input = document.getElementById(
      "select_input"
    ) as HTMLSelectElement;
    select_input.value = currentData;

    // set the attraction data after filtering the current data
    if (currentData === "Upcoming Trips") {
      let newData = attractiondata.filter((item) => item.location === "Lag");
      setAttractionData(newData);
    } else if (currentData === "Past Trips") {
      let newData = attractiondata.filter((item) => item.location === "Lonn");
      setAttractionData(newData);
    }
  }, [currentData, menuData]);

  // function to manage the trip button when it is clicked (for select)
  const handleLocationsClickSelect = (e: any) => {
    // prevent default so it won't refresh the page
    e.preventDefault();

    // get the id of the location tag clicked
    const value = e.target.value;

    // get the index of the location in the locationData state
    const index = menuData.findIndex((item) => item.title === value);

    for (let i = 0; i < menuData.length; i++) {
      menuData[i].stateOfClass = false;
    }

    // change the state of the class of the clicked location tag
    menuData[index].stateOfClass = !menuData[index].stateOfClass;
    // set the location data state to be the current location data
    setMenuData([...menuData]);
    setCurrentData(menuData[index].title);
  };

  // function to manage the trips button when it is clicked
  const handleLocationsClick = (e: any) => {
    // prevent default so it won't refresh the page
    e.preventDefault();
    // console.log(e.target.id)

    // get the id of the location tag clicked
    const id = e.target.id;

    // get the index of the location in the locationData state
    const index = menuData.findIndex((item) => item.id === parseInt(id));

    for (let i = 0; i < menuData.length; i++) {
      menuData[i].stateOfClass = false;
    }

    // change the state of the class of the clicked location tag
    menuData[index].stateOfClass = !menuData[index].stateOfClass;
    // set the location data state to be the current location data
    setMenuData([...menuData]);
    setCurrentData(menuData[index].title);
  };

  return (
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
                onClick={handleLocationsClick}
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

            <div className="trips_select_container">
              <select
                name=""
                id="select_input"
                defaultValue={currentData}
                onClick={handleLocationsClickSelect}
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
            <span className="plan_new_trip_text">
              <BsFillPlusCircleFill className="plus_icon" />
              Plan a new trip
            </span>
          </div>
        </div>
        <div className="upcoming_trip_container">
          {/* <h3>tripPage</h3> */}
          {attractionData.length > 0 ? (
            <div className="card">
              {attractionData.slice(0, 3).map((item) => (
                <PastTripCard
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  reviews={item.reviews}
                  liked={item.liked}
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
  );
};

export default MyTrip;
