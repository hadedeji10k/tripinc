import { useState, useEffect } from "react";
import "./TripPlanning.css";
import DateComponent from "./DateComponent";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Budget from "./Budget";
import TravelDetails from "./TravelDetails";
import { IDeal, IPagination, ITravelDetails } from "../../api/interfaces";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import TripPlanningBucketList from "./BucketList";
import { generateDateArray, localGetUserId } from "../../utils/helpers";
import { getUserWishListAsAttraction } from "../../api";
import { dayNames, monthNames } from "../../utils/constants";
import Itinerary from "./Itinerary";

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
    name: "bucket_list",
  },
  {
    id: 4,
    stateOfClass: false,
    name: "itinerary",
  },
];

const TripPlanning = () => {
  const d1 = new Date("2022-01-18");
  const d2 = new Date("2022-01-24");

  const [tripDate, setTripDate] = useState({ startDate: d1, endDate: d2 });
  // this is for the trip days object, containing date, day, and month
  const [tripDays, setTripDays] = useState<any[]>([]);

  const [tripMenu, setTripMenu] = useState(tripmenu);

  // Budget states
  const [budget, setBudget] = useState(500);
  const [budgetWarning, setBudgetWarning] = useState(0);
  const [spentBudget, setSpentBudget] = useState(200);
  const [budgetWarningError, setBudgetWarningError] = useState("");

  // travel details states
  const [travelDetails, setTravelDetails] = useState<ITravelDetails>({
    flights: [],
    stays: [],
    rentalCars: [],
  });

  // Bucket list states
  // fetch user wishlist to use in Bucket List
  const [wishListData, setWishListData] = useState<IDeal[]>([]);
  const [pagination, setPagination] = useState<IPagination | any>();
  const [isBucketListLoading, setIsBucketListLoading] =
    useState<boolean>(false);

  // states to manage itinerary, generateDateArray from a helper function
  const [itineraryData, setItineraryData] = useState(
    generateDateArray(tripDate.startDate, tripDate.endDate)
  );

  // state to show date_nav_button
  const [showDateNavButton, setShowDateNavButton] = useState<boolean>(false);

  // user ID
  const userId = localGetUserId();

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
  }, [tripDate]);

  // manage scroll buttons in date_component

  let dateContainer = document.getElementById(
    "trip_planning_date_tag_container"
  ) as HTMLElement;
  let dateTagContainer = document.getElementById(
    "trip_planning_date_tag_container"
  ) as HTMLElement;

  useEffect(() => {
    console.log(dateContainer?.scrollHeight);
    console.log(dateTagContainer?.scrollHeight);
    if (dateContainer?.scrollHeight >= dateTagContainer?.scrollHeight) {
      setShowDateNavButton(false);
    } else {
      setShowDateNavButton(true);
    }
  }, [dateContainer, dateTagContainer]);

  // useEffect for wishlist on bucket_list
  useEffect(() => {
    setIsBucketListLoading(true);
    if (userId) {
      getUserWishListAsAttraction(userId, "PageSize=5")
        .then((res) => {
          const wishListItems = res.data.items ? res.data.items : [];
          setWishListData(wishListItems);
          setIsBucketListLoading(false);
          setPagination({
            hasNext: res.data.hasNext,
            hasPrevious: res.data.hasPrevious,
            currentPage: res.data.currentPage,
            pageSize: res.data.pageSize,
            totalPages: res.data.totalPages,
            totalCount: res.data.totalCount,
          });
        })
        .catch((err) => {
          setWishListData([]);
          setIsBucketListLoading(false);
        });
    }
  }, [userId]);

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
      <div className="trip_planning_container">
        {/* THE IMAGE CONTAINER */}
        {/* <div className="trip_planning_header">
         
          <div className="trip_planning_header_text">
            <h3 className="trip_planning_header_title">Explore Cities!</h3>
            <p className="trip_planning_header_description">
              You can search cities you wish on this page using the search form.
            </p>
          </div>
        </div> */}

        <div className="trip_planning_header">
          {/* <img className="trip_planning_header_image" src="https://images.unsplash.com/photo-1596889157941-d2651f70a4f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRvdXJpc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" /> */}
          <div className="trip_planning_header_text">
            <h3 className="trip_planning_header_title">Explore Cities!</h3>
            <p className="trip_planning_header_description">
              You can search cities you wish on this page using the search form.
            </p>
          </div>
        </div>

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
                  budget={budget}
                  setBudget={setBudget}
                  budgetWarning={budgetWarning}
                  setBudgetWarning={setBudgetWarning}
                  budgetWarningError={budgetWarningError}
                  setBudgetWarningError={setBudgetWarningError}
                  spentBudget={spentBudget}
                  setSpentBudget={setSpentBudget}
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

          {/* Bucket List */}
          <div className="trip_planning_menu_container">
            <div
              className="trip_planning_menu_row"
              onClick={() => handleMenuClick(2)}
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

              <h4 className="general_faq_question">Bucket List</h4>
            </div>
            <div className="trip_planning_budget_container">
              {tripMenu[2].stateOfClass ? (
                <>
                  <TripPlanningBucketList
                    itineraryData={itineraryData}
                    setItineraryData={setItineraryData}
                    wishListData={wishListData}
                    setWishListData={setWishListData}
                    pagination={pagination}
                    setPagination={setPagination}
                    isBucketListLoading={isBucketListLoading}
                    setIsBucketListLoading={setIsBucketListLoading}
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <hr className="general_faq_line" style={{ margin: "5px 0 15px" }} />
          </div>
          {/* End of Bucket List */}

          {/* Itinerary */}
          <div className="trip_planning_menu_container">
            <div
              className="trip_planning_menu_row"
              onClick={() => handleMenuClick(3)}
              id="itinerary_data"
              data-itinerary-menu-status={tripMenu[3].stateOfClass}
            >
              {tripMenu[3].stateOfClass ? (
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
              {tripMenu[3].stateOfClass ? (
                <>
                  <Itinerary
                    tripDays={tripDays}
                    setTripDays={setTripDays}
                    itineraryData={itineraryData}
                    setItineraryData={setItineraryData}
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <hr className="general_faq_line" style={{ margin: "5px 0 15px" }} />
          </div>
          {/* End of Itinerary*/}

          <button
            onClick={(e) => {
              e.preventDefault();
              console.log(itineraryData);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripPlanning;
