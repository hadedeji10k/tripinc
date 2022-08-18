import { useState } from "react";
import SetBudget from "./SetBudget/SetBudget";
import PlanTrip from "./PlanTrip/PlanTrip";
import TripInterest from "./TripInterest/TripInterest";

const menuBarData = [
  {
    id: 1,
    state: true,
    title: "Plan a trip",
    slug: "plan_a_trip",
  },
  {
    id: 2,
    state: false,
    title: "Set budget",
    slug: "set_budget",
  },
  {
    id: 3,
    state: false,
    title: "What floats your boat",
    slug: "trip_interests",
  },
  {
    id: 4,
    state: false,
    title: "Plan your Trip",
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
};

const CustomTripPlanning = () => {
  const [menuBar, setMenuBar] = useState(menuBarData);
  const [tripData, setTripData] = useState(initialTripData);

  let data = menuBar.filter((item) => item.state === true);

  const handleMenuChange = (action: string) => {
    for (let i = 0; i < menuBar.length; i++) {
      const element = menuBar[i];
      element.state = false;
    }

    let index;
    switch (action) {
      case "next":
        index = menuBar.findIndex((item) => item.id === data[0].id + 1);
        menuBar[index].state = true;
        break;
      case "prev":
        index = menuBar.findIndex((item) => item.id === data[0].id - 1);
        menuBar[index].state = true;
        break;
      default:
        break;
    }
    setMenuBar([...menuBar]);
  };

  return (
    <div>
      {data[0].slug === "plan_a_trip" ? (
        <PlanTrip
          tripData={tripData}
          setTripData={setTripData}
          handleMenuChange={handleMenuChange}
        />
      ) : data[0].slug === "set_budget" ? (
        <SetBudget
          tripData={tripData}
          setTripData={setTripData}
          handleMenuChange={handleMenuChange}
        />
      ) : data[0].slug === "trip_interests" ? (
        <TripInterest
          tripData={tripData}
          setTripData={setTripData}
          handleMenuChange={handleMenuChange}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustomTripPlanning;
