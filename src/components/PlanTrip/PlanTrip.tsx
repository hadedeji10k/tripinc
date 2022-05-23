import React, { useState, useEffect } from "react";
import "./PlanTrip.css";
// import { locationdata, attractiondata } from "../../currentUserData";

const tripTypedata = [
  {
    id: 1,
    title: "Solo",
    stateOfClass: false,
  },
  {
    id: 2,
    title: "Partner",
    stateOfClass: false,
  },
  {
    id: 3,
    title: "Family",
    stateOfClass: false,
  },
  {
    id: 4,
    title: "Friends",
    stateOfClass: false,
  },
];

const BasicDetails: React.FC = () => {
  const initialFormData = {
    location: "",
    date: "",
    tripType: "",
    numberOfTraveler: 0,
  };
  // state to manage location data (to sort out clicked and unclicked location)
  const [tripTypeData, setLocationData] = useState(tripTypedata);
  const [tripType, setTripType] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  // function to manage the tripTypes button when it is clicked
  const handleLocationsClick = (e: any) => {
    // prevent default so it won't refresh the page
    e.preventDefault();
    // set input field to empty when location is clicked

    // get the id of the location tag clicked
    const id = e.target.id;

    // get the index of the location in the tripTypeData state
    const index = tripTypeData.findIndex((item) => item.id === parseInt(id));

    for (let i = 0; i < tripTypeData.length; i++) {
      tripTypeData[i].stateOfClass = tripTypeData[i].stateOfClass = false;
    }

    // change the state of the class of the clicked location tag
    tripTypeData[index].stateOfClass = !tripTypeData[index].stateOfClass;

    // set the location data state to be the current location data
    setLocationData([...tripTypeData]);

    // set the trip type to the type clicked
    setTripType(tripTypeData[index].title);

    //  set trip type in form
    setFormData({
      ...formData,
      tripType: tripTypeData[index].title.toLowerCase(),
    });

    // console.log(clickedLocations);
  };

  useEffect(() => {
    // console.log(tripType);
    let familyDiv = document.getElementById("family_number") as HTMLDivElement;
    if (tripType === "Family") {
      // family_number
      familyDiv.style.display = "block";
      // let familyInput = document.getElementById(
      //   "family_input"
      // ) as HTMLInputElement;
    } else {
      familyDiv.style.display = "none";
    }
    console.log(formData);
  }, [tripType, formData]);

  // handle input change
  const handleChange = (e: any) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit
  const submit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="plan_trip_container">
      <div className="plan_trip_word">
        <h1 className="plan_trip_header">Plan a new Trip</h1>
        <h3 className="plan_trip_title">Get your suitcases packed!</h3>
      </div>
      <div className="plan_trip">
        <form>
          <div>
            <label className="plan_trip_label">Where to?</label>
            <input
              name="location"
              className="plan_trip_input"
              type="text"
              placeholder="Where are you going to?"
              onChange={handleChange}
            />
          </div>
          <div className="select_container">
            <label className="plan_trip_label">Date</label> <br />
            <select
              name="date"
              id="time"
              onChange={handleChange}
              onSelect={handleChange}
            >
              <option value="12:00 - 16:00">12:00 - 16:00</option>
              <option value="13:00 - 19:00">13:00 - 19:00</option>
              <option value="11:00 - 13:00">11:00 - 13:00</option>
            </select>
          </div>
          <br />
          <div>
            <label className="plan_trip_label">
              Will anyone else be joining you?
            </label>
            <div
              id="preferences_tag_container"
              className="preferences_tag_container"
            >
              <br />
              {tripTypeData.map((item) => (
                // <span key={item.id} className="preferences_tag">{item.title}</span>
                <span
                  key={item.id}
                  id={item.id.toString()}
                  className={
                    item.stateOfClass
                      ? "preferences_clicked"
                      : "preferences_not_clicked"
                  }
                  onClick={handleLocationsClick}
                >
                  {item.title}
                </span>
              ))}
            </div>
          </div>
          <div id="family_number">
            <label className="plan_trip_label">
              Number of Family Members will be joining you?
            </label>
            <input
              name="numberOfTraveler"
              className="plan_trip_input"
              type="text"
              placeholder="Where are you going to?"
              onChange={handleChange}
            />
          </div>
          <div className="plan_trip_button_container">
            <button className="plan_trip_button" type="submit" onClick={submit}>
              Next!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicDetails;
