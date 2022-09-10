import { useState, useEffect } from "react";
import { Spin } from "antd";
import { getAllCategories, getUserInterests } from "../../../api";
import "./TripInterest.css";
import {
  checkForInterestStateOfClass,
  localGetUserId,
  symbolHelper,
} from "../../../utils/helpers";
import {
  IFormattedCategory,
  IInitiateTripPlanning,
} from "../../../api/interfaces";
import { initiateTripPlanning } from "../../../api/responseHandlers";

const TripInterest = ({ handleMenuChange, tripData, setTripData }) => {
  // testing
  const [preferenceData, setPreferenceData] = useState<IFormattedCategory[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const userId = localGetUserId();

  useEffect(() => {
    setIsLoading(true);
    // loop through the response categories and push the category name and the icon into the array to be used in the preference data

    getUserInterests(userId).then((interestResponse) => {
      // get all categories (interests)
      getAllCategories().then((res) => {
        const arrayToPush: any = [];
        // loop through the response categories and push the category name and the icon into the array to be used in the preference data
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          const data = {
            id: element.id,
            title: element.name,
            symbol: symbolHelper(element.name),
            stateOfClass: checkForInterestStateOfClass(
              interestResponse.data.items,
              element.id
            ),
          };
          arrayToPush.push(data);
        }
        setPreferenceData(arrayToPush);
        setIsLoading(false);
      });
    });
  }, []);

  // function to handle preference click
  const handlePreferencesClick = (e: any) => {
    e.preventDefault();
    // console.log(e.target.id)
    const id = e.target.id;
    const index = preferenceData.findIndex((item) => item.id === parseInt(id));
    preferenceData[index].stateOfClass = !preferenceData[index].stateOfClass;
    // preferenceData[index].class = preferenceData[index].stateOfClass ? 'clicked' : 'not-clicked'
    setPreferenceData([...preferenceData]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const preferences = preferenceData
      .filter((item) => item.stateOfClass === true)
      .map((item) => item.id.toString());
    setTripData({
      ...tripData,
      selectedAreaOfInterest: preferences,
    });

    const formData: IInitiateTripPlanning = {
      userId: userId as number,
      startDestination: tripData.tripLocation,
      endDestination: tripData.tripLocation,
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      budget: tripData.budget,
      travelingPartner: tripData.tripType,
      noOfPartners: tripData.numberOfTraveler,
      interests: preferences,
    };
    console.log(formData);
    await initiateTripPlanning(formData);
    setIsLoading(true);
  };

  return (
    <Spin spinning={isLoading} size="large">
      <div className="trip_interest_container">
        <div className="trip_interest_word">
          <h1 className="trip_interest_header">What floats your boat?</h1>
          <h3 className="trip_interest_title">
            Select the type of interest you would like to experience on this
            trip.
          </h3>
        </div>

        {/* Preferences */}
        <div className="trip_interest_tab">
          <div className="trip_interest_tag_container">
            {preferenceData.map((item) => (
              // <span key={item.id} className="trip_interest_tag">{item.title}</span>
              <span
                key={item.id}
                id={item.id.toString()}
                className={
                  item.stateOfClass
                    ? "trip_interest_clicked"
                    : "trip_interest_not_clicked"
                }
                onClick={handlePreferencesClick}
              >
                {item.symbol} {item.title}
              </span>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="trip_interest_button_container">
          <button className="trip_interest_button" onClick={handleSubmit}>
            Let's go!
          </button>
          <button
            className="trip_interest_button"
            onClick={() => handleMenuChange("prev")}
          >
            Back
          </button>
        </div>
        <div className="trip_interest_other_text_container">
          <h3>
            Not sure where you want to go? No problem we have some ideas.{" "}
            <a href="/" className="trip_interest_other_text">
              Show me!
            </a>
          </h3>
        </div>
      </div>
    </Spin>
  );
};

export default TripInterest;
