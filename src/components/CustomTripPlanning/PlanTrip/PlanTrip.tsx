import React, { useState, useEffect } from "react";
import "./PlanTrip.css";
import { DatePicker, message } from "antd";
import { GOOGLEAPIKEY } from "../../../utils/constants";
import Autocomplete from "react-google-autocomplete";
import moment from "moment";

const { RangePicker } = DatePicker;

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

interface PlanTripProp {
  tripData: any;
  setTripData: any;
  handleMenuChange: any;
}

const PlanTrip = ({
  tripData,
  setTripData,
  handleMenuChange,
}: PlanTripProp) => {
  const [tripTypeData, setTripTypeData] = useState(tripTypedata);

  const handleLocationChange = (tripLocation: any) => {
    // set trip type
    setTripData({
      ...tripData,
      tripLocation,
    });
  };

  const onDateChange = (date: any) => {
    setTripData({
      ...tripData,
      startDate: new Date(date[0]),
      endDate: new Date(date[1]),
    });
  };

  const handleTripTypeChange = (id: any) => {
    const selectedTripType = tripTypeData.filter(
      (item) => item.id === parseInt(id)
    );

    let numberOfTraveler;
    if (selectedTripType[0].title === "Solo") {
      numberOfTraveler = 1;
    } else if (selectedTripType[0].title === "Partner") {
      numberOfTraveler = 2;
    } else {
      numberOfTraveler = 1;
    }

    // set trip type
    setTripData({
      ...tripData,
      numberOfTraveler,
      tripType: selectedTripType[0].title,
    });
    // change the status of the tripTypeData
    for (let i = 0; i < tripTypeData.length; i++) {
      const element = tripTypeData[i];
      element.stateOfClass = false;
    }
    selectedTripType[0].stateOfClass = true;
    setTripTypeData([...tripTypeData]);
  };

  const handleNumberOfTraveler = (e: any) => {
    e.preventDefault();
    setTripData({
      ...tripData,
      numberOfTraveler: parseInt(e.target.value),
    });
  };

  // handle submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      !tripData.tripType ||
      !tripData.numberOfTraveler ||
      !tripData.startDate ||
      !tripData.endDate ||
      !tripData.tripLocation
    ) {
      return message.error("Error, please make sure you fill all fields.", 3);
    }
    handleMenuChange("next");
  };

  return (
    <div className="plan_trip_container">
      <div className="plan_trip_word">
        <h1 className="plan_trip_header">Plan a new Trip</h1>
        <h3 className="plan_trip_title">Get your suitcases packed!</h3>
      </div>
      <div className="plan_trip">
        <form className="plan_trip_form">
          <div>
            <label className="plan_trip_label">Where to?</label>
            <Autocomplete
              apiKey={GOOGLEAPIKEY}
              onPlaceSelected={(selected: any) => {
                console.log(selected);
                console.log(selected.photos[0].getUrl());
                handleLocationChange(selected.formatted_address);
              }}
              options={{
                types: [],
                fields: ["formatted_address", "photos"],
              }}
              placeholder="Where are you going to?"
              className="plan_trip_input"
              defaultValue={tripData.tripLocation}
            />
          </div>
          <div className="select_container">
            <label className="plan_trip_label">Date</label> <br />
            <RangePicker
              className="trip_date_select"
              onChange={onDateChange}
              size="small"
              defaultValue={[
                moment(tripData.startDate, "YYYY/MM/DD"),
                moment(tripData.endDate, "YYYY/MM/DD"),
              ]}
            />
          </div>
          <br />
          <div>
            <label className="plan_trip_label">
              Will anyone else be joining you?
            </label>
            <div
              style={{ width: "90%" }}
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
                  onClick={() => handleTripTypeChange(item.id)}
                >
                  {item.title}
                </span>
              ))}
            </div>
          </div>
          {tripData.tripType === "Family" || tripData.tripType === "Friends" ? (
            <div id="family_number">
              <label className="plan_trip_label">
                Number of{" "}
                {tripData.tripType === "Family" ? "Family Members" : "Friends"}{" "}
                that will be joining you?
              </label>
              <input
                name="numberOfTraveler"
                className="plan_trip_input"
                type="text"
                placeholder="How many people are you going with?"
                onChange={handleNumberOfTraveler}
                defaultValue={tripData.numberOfTraveler}
              />
            </div>
          ) : null}
          <div className="plan_trip_button_container">
            <button
              className="plan_trip_button"
              type="submit"
              onClick={handleSubmit}
            >
              Next!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanTrip;
