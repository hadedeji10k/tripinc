import { useState, useEffect } from "react";
import "./TripPlanning.css";
import DateComponent from "./DateComponent";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { IDeal, IPagination, ITravelDetails } from "../../api/interfaces";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import {
  generateDateArray,
  localGetUserId,
  generateDateArray2,
} from "../../utils/helpers";
import { getUserWishListAsAttraction } from "../../api";
import { dayNames, monthNames } from "../../utils/constants";
import TripPlanningExplore from "./TripExplore/TripExplore";
import TripMapPlanning from "./TripMapPlanning/TripMapPlanning";
import TripPlanning from "./TripPlanning";

interface Prop {
  tripDays: any;
  itineraryData: any;
  setItineraryData: any;
  tripPlanningData: any;
  setTripPlanningData: any;
}

const trip_planning_menu = [
  {
    id: 1,
    stateOfClass: false,
    slug: "trip_map_planning",
  },
  {
    id: 2,
    stateOfClass: true,
    slug: "trip_planning",
  },
];

// needs state of array generated for date and dates
const MainTripPlanning = ({
  tripDays,
  itineraryData,
  setItineraryData,
  tripPlanningData,
  setTripPlanningData,
}: Prop) => {
  const [tripPlanningMenu, setTripPlanningMenu] = useState(trip_planning_menu);
  let data = tripPlanningMenu.filter((item) => item.stateOfClass === true);

  // travel details states
  const [travelDetails, setTravelDetails] = useState<ITravelDetails>({
    flights: [],
    stays: [],
    rentalCars: [],
  });

  // state to show date_nav_button
  const [showDateNavButton, setShowDateNavButton] = useState<boolean>(false);

  // user ID
  const userId = localGetUserId();

  // manage scroll buttons in date_component
  let dateContainer = document.getElementById(
    "trip_planning_date_tag_container"
  ) as HTMLElement;
  let dateTagContainer = document.getElementById(
    "trip_planning_date_tag_container"
  ) as HTMLElement;

  useEffect(() => {
    if (dateContainer?.scrollHeight >= dateTagContainer?.scrollHeight) {
      setShowDateNavButton(false);
    } else {
      setShowDateNavButton(true);
    }
  }, [dateContainer, dateTagContainer]);

  // function to handle faqs click
  const handleMenuClick = (id: any) => {
    // e.preventDefault();
    // console.log(e);
    let prevState = tripPlanningMenu[id].stateOfClass;
    for (let i = 0; i < tripPlanningMenu.length; i++) {
      tripPlanningMenu[i].stateOfClass = false;
    }
    tripPlanningMenu[id].stateOfClass = !prevState;
    // tripPlanningMenu[index].class = tripPlanningMenu[index].stateOfClass ? 'clicked' : 'not-clicked'
    setTripPlanningMenu([...tripPlanningMenu]);
  };

  const handleScrollUp = (e: any) => {
    let element = document.getElementById(
      "trip_planning_date_tag_container"
    ) as HTMLElement;
    console.log("Clicked", element.scrollTop);
    element.scrollTop -= 70;
    console.log(element.scrollTop);
  };

  const handleScrollDown = (e: any) => {
    let element = document.getElementById(
      "trip_planning_date_tag_container"
    ) as HTMLElement;
    console.log("Clicked", element.scrollTop);
    element.scrollTop += 70;
    console.log(element.scrollTop);
  };

  return (
    <div className="trip_planning_page_container">
      <div
        className="trip_planning_date_container"
        id="trip_planning_date_container"
      >
        <button
          className="h_5 trip_planning_date_navigation_button"
          id="trip_planning_date_navigation_up"
          onClick={handleScrollUp}
        >
          <BsArrowUpCircle />
        </button>
        <DateComponent tripDays={tripDays} />
        <button
          className="h_5 trip_planning_date_navigation_button"
          id="trip_planning_date_navigation_down"
          onClick={handleScrollDown}
        >
          <BsArrowDownCircle />
        </button>
      </div>
      <div className="trip_planning_container">
        {data[0].slug === "trip_map_planning" ? (
          <TripMapPlanning />
        ) : data[0].slug === "trip_planning" ? (
          <TripPlanning
            tripDays={tripDays}
            itineraryData={itineraryData}
            setItineraryData={setItineraryData}
            tripPlanningData={tripPlanningData}
            setTripPlanningData={setTripPlanningData}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MainTripPlanning;
