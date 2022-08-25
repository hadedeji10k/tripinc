import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { geocodeByAddress } from "react-google-places-autocomplete";
import "./TripPlanning.css";
import { ITravelDetails } from "../../api/interfaces";
import {
  localGetUserId,
  generateDateArray,
  generateTripColorArray,
} from "../../utils/helpers";
import { dayNames, monthNames } from "../../utils/constants";
import TripPlanningExplore from "./TripExplore/TripExplore";
import MainTripPlanning from "./MainTripPlanning";
import { getTripById } from "../../api";

const trip_planning_menu = [
  {
    id: 1,
    stateOfClass: true,
    slug: "trip_explore",
  },
  {
    id: 2,
    stateOfClass: false,
    slug: "trip_planning",
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

const TripPlanning = () => {
  const { tripId } = useParams();

  const [tripPlanningData, setTripPlanningData] = useState(initialTripData);

  const [tripDate, setTripDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

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
    generateDateArray(tripDate.startDate, tripDate.endDate)
  );

  // user ID
  const userId = localGetUserId();

  useEffect(() => {
    getTripById(tripId).then((res) => {
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
  }, [tripId]);

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

    const generated = generateDateArray(tripDate.startDate, tripDate.endDate);
    setItineraryData(generated);
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
    // geocodeByAddress("Ikeja, Nigeria")
    //   .then((results) => {
    //     // setTripPlanningData((prev) => {
    //     //   return {
    //     //     ...prev,
    //     //     tripLocationPosition: {
    //     //       lat: results[0].geometry.location.lat(),
    //     //       lng: results[0].geometry.location.lng(),
    //     //     },
    //     //   };
    //     // });
    //     console.log({
    //       lat: results[0].geometry.location.lat(),
    //       lng: results[0].geometry.location.lng(),
    //     });
    //   })
    //   .catch((error) => console.error(error));
  }, [tripDate]);

  // function to handle menu click
  const handleTripPlanningMenuClick = (action: string) => {
    for (let i = 0; i < tripPlanningMenu.length; i++) {
      const element = tripPlanningMenu[i];
      element.stateOfClass = false;
    }

    let index;
    switch (action) {
      case "next":
        index = tripPlanningMenu.findIndex(
          (item) => item.id === data[0].id + 1
        );
        tripPlanningMenu[index].stateOfClass = true;
        break;
      case "prev":
        index = tripPlanningMenu.findIndex(
          (item) => item.id === data[0].id - 1
        );
        tripPlanningMenu[index].stateOfClass = true;
        break;
      default:
        break;
    }

    window.scrollTo(0, 0);
    setTripPlanningMenu([...tripPlanningMenu]);
  };

  return (
    <div>
      {data[0].slug === "trip_explore" ? (
        <TripPlanningExplore
          tripDays={tripDays}
          itineraryData={itineraryData}
          tripPlanningData={tripPlanningData}
          setTripPlanningData={setTripPlanningData}
          handleTripPlanningMenuClick={handleTripPlanningMenuClick}
        />
      ) : data[0].slug === "trip_planning" ? (
        <MainTripPlanning
          tripDays={tripDays}
          itineraryData={itineraryData}
          setItineraryData={setItineraryData}
          tripPlanningData={tripPlanningData}
          setTripPlanningData={setTripPlanningData}
          handleTripPlanningMenuClick={handleTripPlanningMenuClick}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TripPlanning;
