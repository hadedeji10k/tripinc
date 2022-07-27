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
      console.log("true");
      dateNavigationDown.style.display = "none";
      dateNavigationUp.style.display = "none";
    } else {
      console.log("false");
    }

    console.log("dateContainer ClientHeight>>>>", dateContainer?.clientHeight);
    console.log("dateContainer ScrollHeight>>>>", dateContainer?.scrollHeight);
    console.log(
      "dateTagContainer ClientHeight>>>>",
      dateTagContainer?.clientHeight
    );
    console.log(
      "dateTagContainer ScrollHeight>>>>",
      dateTagContainer?.scrollHeight
    );
  });

  return (
    <div
      className="trip_planning_date_tag_container"
      id="trip_planning_date_tag_container"
    >
      {tripDays?.map((item, key) => (
        <div key={key} className="trip_planning_date_tag">
          <p className="trip_planning_date">{item.month.toUpperCase()}</p>
          <p className="trip_planning_date">{item.date}</p>
        </div>
      ))}
    </div>
  );
};

export default DateComponent;
