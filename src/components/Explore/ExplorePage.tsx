/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import "./ExplorePage.css";
import { preferencedata, attractiondata } from "../../currentUserData";
// import { attraction } from "../../interfaces";
import Card from "../TripCard/Card";

import { BiSearch } from "react-icons/bi";

const ExplorePage = () => {
  // Defining states of this page

  // state to manage preference data (to sort out clicked and unclicked preference)
  const [preferenceData, setPreferenceData] = useState(preferencedata);
  // state to manage the attraction data to be mapped into cards (using this in order to manage the attraction data in case it is filtered)
  const [attractionData, setAttractionData] = useState(attractiondata);
  // state to manage the search result data, so using this when user filter and it get it for the "Result for:" in the page
  const [searchResultField, setSearchResultField] = useState("All");
  // state to manage the search result in the page
  const [inputField, setInputField] = useState("");

  // useEffect to manage the prev and next buttons, it determines if there are preferences tags more than the screen width and hide them (the buttons) if there is no preferences tags more than the screen width
  useEffect(() => {
    let element = document.getElementById(
      "preferences_tag_container"
    ) as HTMLElement;
    if (
      element.clientWidth === element.scrollWidth ||
      element.clientWidth > element.scrollWidth
    ) {
      let prev = document.getElementById("prev") as HTMLElement;
      let next = document.getElementById("next") as HTMLElement;
      prev.style.display = "none";
      next.style.display = "none";
    }
  }, []);

  // function to handle next button scroll of preferences if there is overflow in the element's data
  const handleScrollRight = (e: any) => {
    let element = document.getElementById(
      "preferences_tag_container"
    ) as HTMLElement;
    element.scrollLeft += 70;
  };

  // function to handle prev button scroll of preferences if there is overflow in the element's data
  const handleScrollLeft = (e: any) => {
    let element = document.getElementById(
      "preferences_tag_container"
    ) as HTMLElement;
    element.scrollLeft -= 70;
  };

  // function to manage the preference button when it is clicked
  const handlePreferencesClick = (e: any) => {
    // prevent default so it won't refresh the page
    e.preventDefault();
    // set input field to empty when preference is clicked
    setInputField("");
    // console.log(e.target.id)

    // get the id of the preference tag clicked
    const id = e.target.id;

    // get the index of the preference in the preferenceData state
    const index = preferenceData.findIndex((item) => item.id === parseInt(id));
    // change the state of the class of the clicked preference tag
    preferenceData[index].stateOfClass = !preferenceData[index].stateOfClass;
    // set the preference data state to be the current preference data
    setPreferenceData([...preferenceData]);
    // get all clicked preferences
    const clickedPreferences = preferenceData.filter(
      (item) => item.stateOfClass === true
    );
    // console.log(clickedPreferences);
    let newData: any = [];
    let searchResultField1: string = "";

    // loop through all clicked preferences and filter the attraction data to the clicked preferences
    for (let i = 0; i < clickedPreferences.length; i++) {
      const element = clickedPreferences[i];
      let preferences = attractiondata.filter(
        (item) => item.category === element.title
      );
      // if the preference is not undefined, it should push the filtered data into a new array
      if (preferences.length >= 1 && preferences !== undefined) {
        // newData.push(preferences[0]);
        preferences.forEach((item) => {
          newData.push(item);
        });
      }
      // set the search result field to the selected preference
      if (searchResultField1 === "") {
        searchResultField1 = searchResultField1 + " " + element.title;
      } else {
        searchResultField1 = searchResultField1 + ". " + element.title;
      }
      setSearchResultField(searchResultField1);
    }

    // set the attraction data to the new array
    if (newData) {
      setAttractionData(newData);
      // clicked
      // console.log(attractionData);
    }
  };

  // function to handle the input data (using this for the onClick of button of the search and onChange of the input)
  const handleInput = (e: any) => {
    // get the input
    let input = document.getElementById("input") as HTMLInputElement;
    // console.log(input.value);

    // filter the original attraction data fetched from external using the input data
    let data = attractiondata.filter((item) =>
      item.location.toLowerCase().includes(input.value.toLowerCase())
    );
    // if the data is not empty
    if (data.length !== 0) {
      // set the attractiondata to the new data filtered
      setAttractionData(data);
      // set the search result to the input value
      // setSearchResultField("input.value");
      // set all preferences to false so it won't be filtered
      preferenceData.forEach((item) => {
        item.stateOfClass = false;
      });
    } else {
      setAttractionData([]);
    }
    setSearchResultField(input.value);
    // setAttractionData([...data]);
    // console.log(attractionData);
  };

  // use this function to handle when the "all" button is clicked
  const handleAllClick = (e: any) => {
    // therefore setting the attractiondata to the original data fetched from external
    setAttractionData(attractiondata);
    // set the search result  to ALl
    setSearchResultField("All");
    // set the input field to empty
    setInputField("");
    // using this to shadow mark the input field and set it to empty
    let input = document.getElementById("input") as HTMLInputElement;
    input.value = "";
    // and setting the preference tags to false
    preferenceData.forEach((item) => {
      item.stateOfClass = false;
    });
  };

  useEffect(() => {
    // select the preference tags clicked
    let preferences = preferenceData.filter(
      (item) => item.stateOfClass === true
    );
    // getting the input element
    let input = document.getElementById("input") as HTMLInputElement;
    // if the input value is not null, set the search result field to the input's value
    if (input.value !== "") {
      setSearchResultField(input.value);
    }

    // if the preference tag clicked is empty, set the search result field to the "All"
    if (preferences.length === 0 && input.value === "") {
      setAttractionData(attractiondata);
      setSearchResultField("All");
    }

    // if the preference tag clicked is not empty, set the input field back to empty, i.e since at least one of the preference tag has been clicked then the input field should be set to empty
    if (preferences.length > 0) {
      setInputField("");
      input.value = "";
    }

    console.log(attractionData);
    return () => {};
  }, [attractionData, preferenceData, inputField]);

  // attractionData.map((item) => {
  //     item.reviews?.map((item) => {
  //         review += item.rating
  //     })
  // })

  return (
    <>
      <div className="explore_page_container">
        <div className="explore_page_header">
          {/* <img className="explore_page_header_image" src="https://images.unsplash.com/photo-1596889157941-d2651f70a4f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRvdXJpc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" /> */}
          <div className="explore_page_header_text">
            <h3 className="explore_page_header_title">Explore Cities!</h3>
            <p className="explore_page_header_description">
              You can search cities you wish on this page using the search form.
            </p>
          </div>
        </div>
        <div className="explore_page_search_container">
          <div className="explore_page_search_form">
            <input
              id="input"
              className="explore_page_search_input"
              type="text"
              placeholder="Search for a city"
              defaultValue={inputField}
              onChange={handleInput}
            />
            <input
              className="date_input"
              type="date"
              name=""
              id=""
              defaultValue="No dates"
            />
            <select className="explorer_page_select" name="" id="">
              <option value="">Solo trip</option>
              <option value="">Family trip</option>
              <option value="">Friend trip</option>
            </select>
            <button
              className="explore_page_search_button"
              onClick={handleInput}
            >
              <BiSearch />
            </button>
          </div>
        </div>
        <p>Sort using preferences:</p>
        <div
          id="preferences_tag_container"
          className="preferences_tag_container"
        >
          <span className="preferences_not_clicked" onClick={handleAllClick}>
            All
          </span>
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
              {item.title}
            </span>
          ))}
        </div>
        <div className="scroll_button">
          <span
            id="prev"
            className="navigation_button"
            onClick={handleScrollLeft}
          >
            Prev
          </span>
          <span
            id="next"
            className="navigation_button"
            onClick={handleScrollRight}
          >
            Next
          </span>
        </div>
        <div className="">
          <p>Search Result for: {searchResultField}</p>
        </div>
        {/* <Card data={attractionData} /> */}
        {attractionData.length > 0 ? (
          <div className="card">
            {attractionData.map((item) => (
              <Card
                image={item.image}
                title={item.title}
                description={item.description}
                price={item.price}
                reviews={item.reviews}
                liked={item.liked}
              />
            ))}
          </div>
        ) : (
          <>
            <br />
            <br />
            <h3>No search Result</h3>
            <br />
            <span
              id="next"
              className="preferences_clicked"
              onClick={handleAllClick}
            >
              See all
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default ExplorePage;
