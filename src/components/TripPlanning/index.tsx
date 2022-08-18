import { useState, useEffect } from "react";
import "./TripPlanning.css";
import { IDeal, IPagination, ITravelDetails } from "../../api/interfaces";
import {
  generateDateArray,
  localGetUserId,
  generateDateArray2,
} from "../../utils/helpers";
import { dayNames, monthNames } from "../../utils/constants";
import TripPlanningExplore from "./TripExplore/TripExplore";
import MainTripPlanning from "./MainTripPlanning";

const trip_planning_menu = [
  {
    id: 1,
    stateOfClass: false,
    slug: "trip_explore",
  },
  {
    id: 2,
    stateOfClass: true,
    slug: "trip_planning",
  },
];

const initialTripData = {
  tripLocation: "",
  startDate: new Date(),
  endDate: new Date(),
  tripType: "",
  numberOfTraveler: 0,
  budget: 0,
  selectedAreaOfInterest: [],
  spentBudget: 0,
  budgetWarning: 0,
};

const TripPlanning = () => {
  const d1 = new Date("2022-01-17");
  const d2 = new Date("2022-01-25");

  const [tripPlanningData, setTripPlanningData] = useState(initialTripData);

  const [tripDate, setTripDate] = useState({ startDate: d1, endDate: d2 });

  // this is for the trip days object, containing date, day, and month
  const [tripDays, setTripDays] = useState<any[]>([]);

  const [tripPlanningMenu, setTripPlanningMenu] = useState(trip_planning_menu);
  let data = tripPlanningMenu.filter((item) => item.stateOfClass === true);

  // travel details states
  const [travelDetails, setTravelDetails] = useState<ITravelDetails>({
    flights: [],
    stays: [],
    rentalCars: [],
  });

  // states to manage itinerary, generateDateArray from a helper function
  const [itineraryData, setItineraryData] = useState(
    generateDateArray2(tripDate.startDate, tripDate.endDate)
  );

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

    const generated = generateDateArray2(tripDate.startDate, tripDate.endDate);
    setItineraryData(generated);
  }, [tripDate]);

  return (
    <div>
      {data[0].slug === "trip_explore" ? (
        <TripPlanningExplore
          tripDays={tripDays}
          itineraryData={itineraryData}
          setItineraryData={setItineraryData}
        />
      ) : data[0].slug === "trip_planning" ? (
        <MainTripPlanning
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
  );
};

export default TripPlanning;
