import React, { useState, useEffect } from "react";
import { getAllCategories } from "../../api";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import { symbolHelper } from "../../utils/helpers";
import "./Preferences.css";
import { IFormattedCategory } from "../../api/interfaces";

const Preferences: React.FC = () => {
  const [preferenceData, setPreferenceData] = useState<IFormattedCategory[]>(
    []
  );
  const [placesData, setPlacesData] = useState<any[]>([]);
  const [placesBeenToData, setPlacesBeenToData] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
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

  // function to handle places click to delete
  const handlePlacesClick = (e: any) => {
    e.preventDefault();
    const id = e.target.id;
    let data = placesData.filter((item) => item.id !== parseInt(id));
    setPlacesData([...data]);
    console.log(placesData);
  };

  // function to handle typing of places tag
  const handlePlacesChange = (e: any) => {
    e.preventDefault();
    // console.log(e.keyCode)
    // get the input data
    let inputData = e.target.value.toString();
    // get the input element and add an event listener
    let input = document.getElementById("places") as HTMLInputElement;
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        let newPlacesData = placesData.filter(
          (item) => item.title === inputData
        );

        if (newPlacesData.length > 0) {
          input.value = "";
          return;
        } else {
          let id = placesData.length + 1;
          setPlacesData([
            ...placesData,
            { id, title: inputData, stateOfClass: false, class: "clicked" },
          ]);
        }
        input.value = "";
      }
    });
  };

  // function to handle placesBeenTo click to delete
  const handlePlacesBeenToClick = (e: any) => {
    e.preventDefault();
    const id = e.target.id;
    let data = placesBeenToData.filter((item) => item.id !== parseInt(id));
    setPlacesBeenToData([...data]);
    console.log(placesBeenToData);
  };

  // function to handle typing of placesBeenTo tag
  const handlePlacesBeenToChange = (e: any) => {
    e.preventDefault();
    // console.log(e.keyCode)
    let inputData = e.target.value.toString();
    let input = document.getElementById("placesBeenTo") as HTMLInputElement;
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        let newPlacesBeenToData = placesBeenToData.filter(
          (item) => item.title === inputData
        );

        if (newPlacesBeenToData.length > 0) {
          input.value = "";
          return;
        } else {
          let id = placesBeenToData.length + 1;
          setPlacesBeenToData([
            ...placesBeenToData,
            { id, title: inputData, stateOfClass: false, class: "clicked" },
          ]);
        }

        input.value = "";
      }
    });
  };

  // Function to handle save button
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(placesData);
    console.log(placesBeenToData);
    let preferences = preferenceData.filter(
      (item) => item.stateOfClass === true
    );

    console.log(preferences);
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
          <input
            id="placesBeenTo"
            className="preferences_input"
            type="text"
            placeholder="Enter the name of the location"
            onChange={handlePlacesBeenToChange}
          />
        </div>
        <div className="bucket_list_tag_container">
          {placesBeenToData.map((item) => (
            // <span key={item.id} className="bucket_list_tag">{item.title}</span>
            <span
              key={item.id}
              id={item.id.toString()}
              className="location_tag"
              onClick={handlePlacesBeenToClick}
            >
              x {item.title}
            </span>
          ))}
        </div>

        {/* Bucket List */}

        <div className="bucket_list">
          <label className="preferences_label">
            What’s on your bucket list?{" "}
          </label>
          <input
            id="places"
            className="preferences_input"
            type="text"
            placeholder="Enter your preferred location"
            onChange={handlePlacesChange}
          />
        </div>
        <div className="bucket_list_tab">
          <div className="bucket_list_tag_container">
            {placesData.map((item) => (
              // <span key={item.id} className="bucket_list_tag">{item.title}</span>
              <span
                key={item.id}
                id={item.id.toString()}
                className="location_tag"
                onClick={handlePlacesClick}
              >
                x {item.title}
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
