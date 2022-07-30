import React, { useState, useEffect, useRef } from "react";
import Autocomplete from "react-google-autocomplete";
import { getAllCategories } from "../../api";
import {
  managePlacesVisited,
  managePlacesWishToVisit,
  managePreference,
} from "../../api/responseHandlers";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import { localGetUserId, symbolHelper } from "../../utils/helpers";
import "./Preferences.css";
import {
  IFormattedCategory,
  IManagePlacesVisited,
  IManagePlacesWishToVisit,
  IManagePreference,
} from "../../api/interfaces";
import { GOOGLEAPIKEY } from "../../utils/constants";

const Preferences: React.FC = () => {
  const inputRef = useRef(null);

  const [preferenceData, setPreferenceData] = useState<IFormattedCategory[]>(
    []
  );
  const [wishToVisit, setWishToVisit] = useState<any[]>([]);
  const [placesBeenToData, setPlacesBeenToData] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = localGetUserId() as number;

  useEffect(() => {
    setIsLoading(true);
    getAllCategories().then((res) => {
      const arrayToPush: any = [];
      // loop through the response categories and push the category name and the icon into the array to be used in the preference data
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];
        const data = {
          id: element.id,
          title: element.name,
          symbol: symbolHelper(element.name),
          stateOfClass: false,
        };
        arrayToPush.push(data);
      }

      setPreferenceData(arrayToPush);

      setIsLoading(false);
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

  // function to handle placesBeenTo click to delete
  const handlePlacesRemove = (action: string, id: any) => {
    let data: any;
    switch (action) {
      case "placesBeenTo":
        data = placesBeenToData.filter((item, key) => key !== parseInt(id));
        setPlacesBeenToData([...data]);
        break;
      case "wishToVisit":
        data = wishToVisit.filter((item, key) => key !== parseInt(id));
        setWishToVisit([...data]);
        break;

      default:
        break;
    }
  };

  const handleOnAutocompleteSelect = (
    action: string,
    data: any,
    extra: any
  ) => {
    let input: any;
    switch (action) {
      case "placesBeenTo":
        input = document.getElementById("places_been_to") as HTMLInputElement;
        setPlacesBeenToData((prev) => {
          let dataExist = prev.filter(
            (item) =>
              item.placeName.toLowerCase() ===
              data.formatted_address.toLowerCase()
          );

          if (dataExist.length > 0) {
            return prev;
          } else {
            return [
              ...prev,
              {
                userId,
                placeName: data.formatted_address,
                longitude: data.geometry.location.toJSON().lng,
                latitude: data.geometry.location.toJSON().lat,
                mapUrl: data.url,
              },
            ];
          }
        });
        input.value = "";

        break;
      case "wishToVisit":
        input = document.getElementById("wish_to_visit") as HTMLInputElement;

        setWishToVisit((prev) => {
          let dataExist = prev.filter(
            (item) =>
              item.placeName.toLowerCase() ===
              data.formatted_address.toLowerCase()
          );

          if (dataExist.length > 0) {
            return prev;
          } else {
            return [
              ...prev,
              {
                userId,
                placeName: data.formatted_address,
                longitude: data.geometry.location.toJSON().lng,
                latitude: data.geometry.location.toJSON().lat,
                mapUrl: data.url,
              },
            ];
          }
        });
        input.value = "";

        break;

      default:
        break;
    }
  };

  // Function to handle save button
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    let preferences = preferenceData
      .filter((item) => item.stateOfClass === true)
      .map((item) => item.id);

    const managePreferenceFormData: IManagePreference = {
      userId,
      areaOfInterestIds: preferences,
    };
    const managePlacesWishToVisitFormData: IManagePlacesWishToVisit = {
      wishToVisitPlaces: wishToVisit,
    };
    const managePlacesVisitedFormData: IManagePlacesVisited = {
      visitedPlaces: placesBeenToData,
    };
    await managePreference(managePreferenceFormData);
    await managePlacesWishToVisit(managePlacesWishToVisitFormData);
    await managePlacesVisited(managePlacesVisitedFormData);

    setTimeout(() => {
      window.location.href = "/#/profile";
    }, 1000);

    setIsLoading(false);
  };

  return (
    <Spin spinning={isLoading} size="large">
      <div className="preferences_container">
        <div className="preferences_word">
          <h1 className="preferences_header">Nice to meet you!</h1>
          <h3 className="preferences_title">
            Tell us a bit more about your adventures.
          </h3>
        </div>

        {/* places been to */}
        <div>
          <label className="preferences_label">
            Where have you been before?
          </label>
          <Autocomplete
            // ref={inputRef}
            apiKey={GOOGLEAPIKEY}
            onPlaceSelected={(selected) => {
              handleOnAutocompleteSelect(
                "placesBeenTo",
                selected,
                placesBeenToData
              );
            }}
            options={{
              types: [],
              fields: ["formatted_address", "place_id", "url", "geometry"],
            }}
            placeholder="Enter the name of the location"
            className="preferences_input"
            id="places_been_to"
          />
        </div>
        <div className="bucket_list_tag_container">
          {placesBeenToData.map((item, key) => (
            // <span key={item.id} className="bucket_list_tag">{item.title}</span>
            <span
              key={key}
              id={key.toString()}
              className="location_tag"
              onClick={() => handlePlacesRemove("placesBeenTo", key)}
            >
              x {item.placeName}
            </span>
          ))}
        </div>

        {/* Bucket List */}

        <div className="bucket_list">
          <label className="preferences_label">
            What’s on your bucket list?{" "}
          </label>
          <Autocomplete
            // ref={inputRef}
            apiKey={GOOGLEAPIKEY}
            onPlaceSelected={(selected: any) => {
              handleOnAutocompleteSelect("wishToVisit", selected, wishToVisit);
            }}
            options={{
              types: [],
              fields: ["formatted_address", "place_id", "url", "geometry"],
            }}
            placeholder="Enter the name of the location"
            className="preferences_input"
            id="wish_to_visit"
          />
        </div>
        <div className="bucket_list_tab">
          <div className="bucket_list_tag_container">
            {wishToVisit.map((item, key) => (
              // <span key={item.id} className="bucket_list_tag">{item.title}</span>
              <span
                key={key}
                id={key.toString()}
                className="location_tag"
                onClick={() => handlePlacesRemove("wishToVisit", key)}
              >
                x {item.placeName}
              </span>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="preferences_tab">
          <label className="preferences_label">
            Describe your travel interests (select as many as you like):
          </label>
          <div className="preferences_tag_container">
            {preferenceData.map((item) => (
              // <span key={item.id} className="preferences_tag">{item.title}</span>
              <span
                key={item.id}
                id={item.id.toString()}
                className={
                  item.stateOfClass
                    ? "preferences_clicked"
                    : "preferences_not_clicked"
                }
                onClick={handlePreferencesClick}
              >
                {item.symbol} {item.title}
              </span>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="preferences_button_container">
          <button className="preferences_button" onClick={handleSubmit}>
            Time to Explore!
          </button>
        </div>
        {/* <SecurityCodeModal showModal={showModal} setShowModal={setShowModal} /> */}
        {/* <div className="have_account">
          <h3>
            Already have an account?{" "}
            <a href="/" className="login_text">
              Login
            </a>
          </h3>
        </div> */}
      </div>
    </Spin>
  );
};

export default Preferences;
