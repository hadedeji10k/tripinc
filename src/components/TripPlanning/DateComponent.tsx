import { useEffect } from "react";
import "./TripPlanning.css";

interface DateComponentProps {
  tripDays: any;
}

const DateComponent = ({ tripDays }: DateComponentProps) => {
  const dateContainer = document.getElementById(
    "trip_planning_date_container"
  ) as HTMLElement;

  const dateTagContainer = document.getElementById(
    "trip_planning_date_tag_container"
  ) as HTMLElement;

  const dateNavigationUp = document.getElementById(
    "trip_planning_date_navigation_up"
  ) as HTMLElement;

  const dateNavigationDown = document.getElementById(
    "trip_planning_date_navigation_down"
  ) as HTMLElement;

  useEffect(() => {
    if (dateTagContainer?.scrollHeight <= dateContainer?.scrollHeight) {
      dateNavigationDown.style.display = "none";
      dateNavigationUp.style.display = "none";
    }
  }, [dateTagContainer?.scrollHeight, dateContainer?.scrollHeight]);

  const moveToDate = (id: string) => {
    const testing = document.getElementById("itinerary_data") as HTMLElement;

    if ((testing.dataset.itineraryMenuStatus as string) === "false") {
      testing.click();
    }
    setTimeout(() => {
      const testingItineraryData = document.getElementById(id) as HTMLElement;
      if ((testingItineraryData.dataset.itineraryData as string) === "false") {
        testingItineraryData.click();
      }
      testingItineraryData.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200);
  };

  return (
    <div
      className="trip_planning_date_tag_container"
      id="trip_planning_date_tag_container"
    >
      {tripDays?.map((item, key) => (
        <div
          key={key}
          className="trip_planning_date_tag"
          onClick={() => moveToDate(`${item.month} ${item.date}`)}
        >
          <p className="trip_planning_date">{item.month.toUpperCase()}</p>
          <p className="trip_planning_date">{item.date}</p>
        </div>
      ))}
    </div>
  );
};

export default DateComponent;
