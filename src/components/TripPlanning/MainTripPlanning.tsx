import { useState, useEffect } from "react";
import "./TripPlanning.css";
import DateComponent from "./DateComponent";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { localGetUserId } from "../../utils/helpers";
import TripMapPlanning from "./TripMapPlanning/TripMapPlanning";
import TripPlanning from "./TripPlanning";
import { ITripPlanningItineraryDay } from "../../api/interfaces";

interface Prop {
  tripDays: any;
  itineraryData: ITripPlanningItineraryDay[];
  setItineraryData: any;
  tripPlanningData: any;
  setTripPlanningData: any;
  handleTripPlanningMenuClick: any;
}

const trip_planning_menu = [
  {
    id: 1,
    stateOfClass: true,
    slug: "trip_map_planning",
  },
  {
    id: 2,
    stateOfClass: false,
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
  handleTripPlanningMenuClick,
}: Prop) => {
  const [mainTripPlanningMenu, setMainTripPlanningMenu] =
    useState(trip_planning_menu);
  let data = mainTripPlanningMenu.filter((item) => item.stateOfClass === true);

  // travel details states
  // const [travelDetails, setTravelDetails] = useState<ITravelDetails>({
  //   flights: [],
  //   stays: [],
  //   rentalCars: [],
  // });

  // state to show date_nav_button
  const [showDateNavButton, setShowDateNavButton] = useState<boolean>(false);

  // user ID
  // const userId = localGetUserId();

  // manage scroll buttons in date_component
  let dateContainer = document.getElementById(
    "trip_planning_date_tag_container"
  ) as HTMLElement;
  let dateTagContainer = document.getElementById(
    "trip_planning_date_tag_container"
  ) as HTMLElement;

  useEffect(() => {
    console.log(
      "From DateContainer",
      dateTagContainer?.scrollHeight,
      dateContainer?.scrollHeight
    );
    if (dateContainer?.scrollHeight >= dateTagContainer?.scrollHeight) {
      setShowDateNavButton(false);
    } else {
      setShowDateNavButton(true);
    }
  }, [dateContainer?.scrollHeight, dateTagContainer?.scrollHeight]);

  // function to handle menu click
  const handleMainTripPlanningMenuClick = (action: string) => {
    for (let i = 0; i < mainTripPlanningMenu.length; i++) {
      const element = mainTripPlanningMenu[i];
      element.stateOfClass = false;
    }

    let index;
    switch (action) {
      case "next":
        index = mainTripPlanningMenu.findIndex(
          (item) => item.id === data[0].id + 1
        );
        mainTripPlanningMenu[index].stateOfClass = true;
        break;
      case "prev":
        index = mainTripPlanningMenu.findIndex(
          (item) => item.id === data[0].id - 1
        );
        mainTripPlanningMenu[index].stateOfClass = true;
        break;
      default:
        break;
    }

    window.scrollTo(0, 0);
    setMainTripPlanningMenu([...mainTripPlanningMenu]);
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
          <TripMapPlanning
            handleTripPlanningMenuClick={handleTripPlanningMenuClick}
            handleMainTripPlanningMenuClick={handleMainTripPlanningMenuClick}
            tripDays={tripDays}
            itineraryData={itineraryData}
            setItineraryData={setItineraryData}
            tripPlanningData={tripPlanningData}
            setTripPlanningData={setTripPlanningData}
          />
        ) : data[0].slug === "trip_planning" ? (
          <TripPlanning
            tripDays={tripDays}
            itineraryData={itineraryData}
            setItineraryData={setItineraryData}
            tripPlanningData={tripPlanningData}
            setTripPlanningData={setTripPlanningData}
            handleMainTripPlanningMenuClick={handleMainTripPlanningMenuClick}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MainTripPlanning;
