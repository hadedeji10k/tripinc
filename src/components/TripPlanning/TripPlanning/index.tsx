import { useState, useEffect } from "react";
import "../TripPlanning.css";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Budget from "./Budget";
import TravelDetails from "./TravelDetails";
import { IDeal, IPagination, ITravelDetails } from "../../../api/interfaces";
import TripPlanningBucketList from "./BucketList";
import { localGetUserId } from "../../../utils/helpers";
import { getUserWishListAsAttraction } from "../../../api";
import Itinerary from "./Itinerary";

interface Prop {
  tripDays: any;
  itineraryData: any;
  setItineraryData: any;
  tripPlanningData: any;
  setTripPlanningData: any;
  handleMainTripPlanningMenuClick: any;
}

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

const TripPlanning = ({
  tripDays,
  itineraryData,
  setItineraryData,
  tripPlanningData,
  setTripPlanningData,
  handleMainTripPlanningMenuClick,
}: Prop) => {
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
  const [wishListData, setWishListData] = useState<IDeal[]>([]);
  const [pagination, setPagination] = useState<IPagination | any>();
  const [isBucketListLoading, setIsBucketListLoading] =
    useState<boolean>(false);

  // user ID
  const userId = localGetUserId();

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

  const handleSubmit = () => {
    console.log("Trip days", tripDays);
    console.log("Trip Planning data", tripPlanningData);
    console.log("Itinerary Data", itineraryData);
  };

  return (
    <div className="">
      {/* THE IMAGE CONTAINER */}

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
                  tripDays={tripDays}
                  itineraryData={itineraryData}
                  setItineraryData={setItineraryData}
                  tripPlanningData={tripPlanningData}
                  setTripPlanningData={setTripPlanningData}
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
        <button
          className={"explore_navigation_button_active"}
          onClick={() => handleMainTripPlanningMenuClick("prev")}
        >
          Go back
        </button>
        <button
          className={"explore_navigation_button_active"}
          onClick={handleSubmit}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default TripPlanning;
