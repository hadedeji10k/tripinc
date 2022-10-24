import { useState, useEffect } from "react";
// import "../TripPlanning.css";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Budget from "./Budget";
import TravelDetails from "./TravelDetails";
import {
  IDeal,
  IPagination,
  ITravelDetails,
  ITripPlanningItineraryDay,
} from "../../../api/interfaces";
import {
  generateTripDateArray,
  generateTripColorArray,
  localGetUserId,
} from "../../../utils/helpers";
import { getTripById } from "../../../api";
import Itinerary from "./Itinerary";
import TripMapView from "./TripMapView";
import { Link, useParams } from "react-router-dom";
import { dayNames, monthNames, newTripData } from "../../../utils/constants";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import DateComponent from "../../TripPlanning/DateComponent";

const tripmenu = [
  {
    id: 1,
    stateOfClass: true,
    name: "budget",
  },
  {
    id: 2,
    stateOfClass: false,
    name: "travel_details",
  },
  {
    id: 3,
    stateOfClass: false,
    name: "itinerary",
  },
];

const initialTripData = {
  tripLocation: "",
  tripLocationPosition: { lat: 41.903839, lng: 12.45249 },
  startDate: new Date(),
  endDate: new Date(),
  tripType: "",
  numberOfTraveler: 0,
  budget: 0,
  selectedAreaOfInterest: [],
  spentBudget: 0,
  budgetWarning: 0,
  tripDaysColors: [], // to manage the colors of the trip days to show on map
};

const TripView = () => {
  const { tripId } = useParams();

  const [tripPlanningData, setTripPlanningData] = useState(initialTripData);

  const [itineraryData, setItineraryData] = useState<
    ITripPlanningItineraryDay[]
  >([]);

  const [tripDate, setTripDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  // this is for the trip days object, containing date, day, and month
  const [tripDays, setTripDays] = useState<any[]>([]);

  const [tripMenu, setTripMenu] = useState(tripmenu);

  const [budgetWarningError, setBudgetWarningError] = useState("");

  // travel details states
  const [travelDetails, setTravelDetails] = useState<ITravelDetails>({
    flights: [],
    stays: [],
    rentalCars: [],
  });

  // Bucket list states
  // fetch user wishlist to use in Bucket List
  // const [wishListData, setWishListData] = useState<IDeal[]>([]);
  // const [pagination, setPagination] = useState<IPagination | any>();
  const [isBucketListLoading, setIsBucketListLoading] =
    useState<boolean>(false);

  // user ID
  const userId = localGetUserId();

  // useEffect for wishlist on bucket_list
  useEffect(() => {
    setIsBucketListLoading(true);
    if (userId) {
      getTripById(tripId).then((res) => {
        console.log(res.data);
        setTripPlanningData((prev) => {
          return {
            ...prev,
            tripLocation: res.data.startDestination,
            startDate: new Date(res.data.startDate),
            endDate: new Date(res.data.endDate),
            tripType: res.data.noOfPartners,
            numberOfTraveler: res.data.noOfPartners,
            budget: res.data.budget,
            selectedAreaOfInterest: JSON.parse(res.data.preferedInterests).map(
              (item) => parseInt(item)
            ),
          };
        });
        setTripDate({
          startDate: new Date(res.data.startDate),
          endDate: new Date(res.data.endDate),
        });
      });
    }
  }, [userId, tripId]);

  // useEffect to manage date
  useEffect(() => {
    const date = new Date(tripDate.startDate.getTime());

    const dates: any[] = [];

    while (date <= tripDate.endDate) {
      const dateObj = {
        date: date.getDate(),
        month: monthNames[date.getMonth()],
        day: dayNames[date.getDay()],
      };
      dates.push(dateObj);
      date.setDate(date.getDate() + 1);
    }
    setTripDays(dates);

    // update this with the fetched data
    const generated = generateTripDateArray(
      tripDate.startDate,
      tripDate.endDate
    );
    const data = newTripData as any;
    console.log(newTripData);
    setItineraryData(data);

    const generatedColorArray = generateTripColorArray(
      tripDate.startDate,
      tripDate.endDate
    );
    setTripPlanningData((prev) => {
      return {
        ...prev,
        tripDaysColors: generatedColorArray,
      };
    });
  }, [tripDate]);

  // function to handle faqs click
  const handleMenuClick = (id: any) => {
    // e.preventDefault();
    // console.log(e);
    let prevState = tripMenu[id].stateOfClass;
    for (let i = 0; i < tripMenu.length; i++) {
      tripMenu[i].stateOfClass = false;
    }
    tripMenu[id].stateOfClass = !prevState;
    // tripMenu[index].class = tripMenu[index].stateOfClass ? 'clicked' : 'not-clicked'
    setTripMenu([...tripMenu]);
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

      {/* THE IMAGE CONTAINER */}
      <div className="trip_planning_container">
        <TripMapView
          itineraryData={itineraryData}
          tripPlanningData={tripPlanningData}
        />

        {/* THE MENUs */}
        <div className="trip_planning_menu m_b_50 m_t_50">
          {/* Budget */}
          <div className="trip_planning_menu_container">
            {/* <div className="question_answer_container"> */}
            <div
              className="trip_planning_menu_row"
              onClick={() => handleMenuClick(0)}
            >
              {tripMenu[0].stateOfClass ? (
                <span>
                  <IoIosArrowDown className="trip_planning_arrow_drop" />
                </span>
              ) : (
                <span>
                  <IoIosArrowForward className="trip_planning_arrow_drop" />
                </span>
              )}

              <h4 className="general_faq_question">Budget</h4>
            </div>
            <div className="trip_planning_budget_container">
              {tripMenu[0].stateOfClass ? (
                <Budget
                  tripPlanningData={tripPlanningData}
                  setTripPlanningData={setTripPlanningData}
                  budgetWarningError={budgetWarningError}
                  setBudgetWarningError={setBudgetWarningError}
                />
              ) : (
                ""
              )}
            </div>
            <hr className="general_faq_line" style={{ margin: "5px 0 15px" }} />
            {/* </div> */}
          </div>
          {/* End of Budget */}

          {/* Travel Details */}
          <div className="trip_planning_menu_container">
            <div
              className="trip_planning_menu_row"
              onClick={() => handleMenuClick(1)}
            >
              {tripMenu[1].stateOfClass ? (
                <span>
                  <IoIosArrowDown className="trip_planning_arrow_drop" />
                </span>
              ) : (
                <span>
                  <IoIosArrowForward className="trip_planning_arrow_drop" />
                </span>
              )}

              <h4 className="general_faq_question">Travel Details</h4>
            </div>
            <div className="trip_planning_budget_container">
              {tripMenu[1].stateOfClass ? (
                <>
                  <TravelDetails
                    travelDetails={travelDetails}
                    setTravelDetails={setTravelDetails}
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <hr className="general_faq_line" style={{ margin: "5px 0 15px" }} />
          </div>
          {/* End of Travel Details */}

          {/* Itinerary */}
          <div className="trip_planning_menu_container">
            <div
              className="trip_planning_menu_row"
              onClick={() => handleMenuClick(2)}
              id="itinerary_data"
              data-itinerary-menu-status={tripMenu[2].stateOfClass}
            >
              {tripMenu[2].stateOfClass ? (
                <span>
                  <IoIosArrowDown className="trip_planning_arrow_drop" />
                </span>
              ) : (
                <span>
                  <IoIosArrowForward className="trip_planning_arrow_drop" />
                </span>
              )}

              <h4 className="general_faq_question">Itinerary</h4>
            </div>
            <div className="trip_planning_budget_container">
              {tripMenu[2].stateOfClass ? (
                <>
                  <Itinerary
                    tripDays={tripDays}
                    itineraryData={itineraryData}
                    setItineraryData={setItineraryData}
                    tripPlanningData={tripPlanningData}
                    setTripPlanningData={setTripPlanningData}
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <hr className="general_faq_line" style={{ margin: "5px 0 15px" }} />
          </div>
          {/* End of Itinerary*/}
        </div>
        <div className="scroll_button">
          <Link to={`/plan-trip/${tripId}`}>
            <button className="explore_navigation_button_active">
              Edit Trip
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripView;
