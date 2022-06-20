/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import "./BucketListPage.css";
import { locationdata } from "../../currentUserData";
// import { attraction } from '../../interfaces';
import Card from "../Cards/TripCard/TripCard";

import { BiSearch } from "react-icons/bi";
import { localGetUserId } from "../../utils/helpers";
import { getUserWishList } from "../../api";
import { IDeal } from "../../api/interfaces";
import { removeFromWishList } from "../../api/responseHandlers";
import Swal from "sweetalert2";

// React component of this page
const BucketListPage = () => {
  // Defining states of this page

  // state to manage location data (to sort out clicked and unclicked location)
  const [locationData, setLocationData] = useState(locationdata);
  // state to manage the attraction data to be mapped into cards (using this in order to manage the attraction data in case it is filtered)
  const [wishListData, setWishListData] = useState<IDeal[]>([]);
  const [initialWishListData, setInitialWishListData] = useState<IDeal[]>([]);
  // state to manage the search result data, so using this when user filter and it get it for the "Result for:" in the page
  const [searchResultField, setSearchResultField] = useState("All");
  // state to manage the search result in the page
  const [inputField, setInputField] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const userId = localGetUserId();

  useEffect(() => {
    setIsLoading(true);
    if (userId) {
      getUserWishList(userId)
        .then((res) => {
          setWishListData(res.data.items);
          setInitialWishListData(res.data.items);
          setIsLoading(false);
        })
        .catch((err) => {
          setWishListData([]);
          setInitialWishListData([]);
          setIsLoading(false);
        });
    }
  }, [userId]);

  useEffect(() => {
    // select the location tags clicked
    let locations = locationData.filter((item) => item.stateOfClass === true);
    // getting the input element
    let input = document.getElementById("input") as HTMLInputElement;
    // if the input value is not null, set the search result field to the input's value
    if (input.value !== "") {
      setSearchResultField(input.value);
    }

    // if the location tag clicked is empty, set the search result field to the "All"
    if (locations.length === 0 && input.value === "") {
      setWishListData(initialWishListData);
      setSearchResultField("All");
    }

    // if the location tag clicked is not empty, set the input field back to empty, i.e since at least one of the location tag has been clicked then the input field should be set to empty
    if (locations.length > 0) {
      setInputField("");
      input.value = "";
    }

    return () => {};
  }, [wishListData, locationData, inputField]);

  // useEffect to manage the prev and next buttons, it determines if there are location tags more than the screen width and hide them (the buttons) if there is no location tags more than the screen width
  // useEffect(() => {
  //   let element = document.getElementById(
  //     "preferences_tag_container"
  //   ) as HTMLElement;
  //   if (
  //     element.clientWidth === element.scrollWidth ||
  //     element.clientWidth > element.scrollWidth
  //   ) {
  //     let prev = document.getElementById("prev") as HTMLElement;
  //     let next = document.getElementById("next") as HTMLElement;
  //     prev.style.display = "none";
  //     next.style.display = "none";
  //   }
  // }, []);

  // function to handle next button scroll of location if there is overflow in the element's data
  // const handleScrollRight = (e: any) => {
  //   let element = document.getElementById(
  //     "preferences_tag_container"
  //   ) as HTMLElement;
  //   element.scrollLeft += 70;
  // };

  // function to handle prev button scroll of location if there is overflow in the element's data
  // const handleScrollLeft = (e: any) => {
  //   let element = document.getElementById(
  //     "preferences_tag_container"
  //   ) as HTMLElement;
  //   element.scrollLeft -= 70;
  // };

  // function to manage the locations button when it is clicked
  const handleLocationsClick = (e: any) => {
    // prevent default so it won't refresh the page
    e.preventDefault();
    // set input field to empty when location is clicked
    setInputField("");
    // console.log(e.target.id)

    // get the id of the location tag clicked
    const id = e.target.id;

    // get the index of the location in the locationData state
    const index = locationData.findIndex((item) => item.id === parseInt(id));
    // change the state of the class of the clicked location tag
    locationData[index].stateOfClass = !locationData[index].stateOfClass;
    // set the location data state to be the current location data
    setLocationData([...locationData]);
    // get all clicked locations
    const clickedLocations = locationData.filter(
      (item) => item.stateOfClass === true
    );
    // console.log(clickedLocations);
    let newData: any = [];
    let searchResultField1: string = "";

    // loop through all clicked locations and filter the attraction data to the clicked locations
    for (let i = 0; i < clickedLocations.length; i++) {
      const element = clickedLocations[i];
      let locations = initialWishListData.filter(
        (item) => item.location === element.title
      );
      // if the location is not undefined, it should push the filtered data into a new array
      if (locations.length >= 1 && locations !== undefined) {
        // newData.push(locations[0]);
        locations.forEach((item) => {
          newData.push(item);
        });
      }

      // set the search result field to the selected location
      if (searchResultField1 === "") {
        searchResultField1 = searchResultField1 + " " + element.title;
      } else {
        searchResultField1 = searchResultField1 + ". " + element.title;
      }
      setSearchResultField(searchResultField1);
    }

    // set the attraction data to the new array
    if (newData.length > 0) {
      setWishListData(newData);
      // clicked
      // console.log(wishListData);
    } else {
      setWishListData([]);
      // console.log(wishListData);
    }
  };

  // function to handle the input data (using this for the onClick of button of the search and onChange of the input)
  const handleInput = (e: any) => {
    // get the input
    let input = document.getElementById("input") as HTMLInputElement;
    // console.log(input.value);

    // filter the original attraction data fetched from external using the input data
    let data = initialWishListData.filter((item) =>
      item.location.toLowerCase().includes(input.value.toLowerCase())
    );
    // if the data is not empty
    if (data.length !== 0) {
      // set the attractiondata to the new data filtered
      setWishListData(data);
      // set the search result to the input value
      // setSearchResultField("input.value");
      // set all locations to false so it won't be filtered
      locationData.forEach((item) => {
        item.stateOfClass = false;
      });
    } else {
      setWishListData([]);
    }
    setSearchResultField(input.value);
    // setWishListData([...data]);
    // console.log(wishListData);
  };

  // use this function to handle when the all button is clicked
  const handleAllClick = (e: any) => {
    // therefore setting the attractiondata to the original data fetched from external
    setWishListData(initialWishListData);
    // set the search result  to ALl
    setSearchResultField("All");
    // set the input field to empty
    setInputField("");
    // using this to shadow mark the input field and set it to empty
    let input = document.getElementById("input") as HTMLInputElement;
    input.value = "";
    // and setting the location tags to false
    locationData.forEach((item) => {
      item.stateOfClass = false;
    });
  };

  const handleLikeButton = async (id: any) => {};

  const handleUnLikeButton = async (id: any) => {
    setIsLoading(true);
    // remove from wishList state
    const data = wishListData.filter((item) => item.id !== id);
    const data2 = initialWishListData.filter((item) => item.id !== id);
    Swal.fire({
      title: "Are you sure you want to remove this from your bucket list?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          // remove from database
          await removeFromWishList(id, userId).then((res) => {
            if (res === true) {
              // set the wishListData to the new data after removing
              setInitialWishListData([...data2]);
              setWishListData([...data]);
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Spin spinning={isLoading}>
        <div className="bucket_list_page_container">
          <div className="bucket_list_page_header">
            <div className="bucket_list_page_header_text">
              <h3 className="bucket_list_page_header_title">Bucket List</h3>
              {/* <p className="bucket_list_page_header_description">
              You can search cities you wish on this page using the search form.
            </p> */}
            </div>
          </div>
          <div className="bucket_list_page_search_container">
            <div className="bucket_list_page_search_form">
              <input
                id="input"
                className="bucket_list_page_search_input"
                type="text"
                placeholder="Search for a city"
                defaultValue={inputField}
                onChange={handleInput}
              />
              <button
                className="bucket_list_page_search_button"
                onClick={handleInput}
              >
                <BiSearch />
              </button>
            </div>
          </div>
          {/* <p>Sort using Location:</p> */}
          <div
            id="preferences_tag_container"
            className="preferences_tag_container"
          >
            {/* <span className="preferences_not_clicked" onClick={handleAllClick}>
              All
            </span> */}
            <br />
            {/* {locationData.map((item) => (
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
            ))} */}
          </div>
          {/* <div className="scroll_button">
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
          </div> */}
          {/* Data to be passed here must be from user's bucket list, i.e the item user liked, so it will have the heart red */}
          {/* <Card data={wishListData} preferencesData={preferencesData} /> */}

          {/* <div className="">
            <p>Search Result for: {searchResultField}</p>
          </div> */}

          {wishListData.length > 0 ? (
            <div className="card">
              {wishListData.map((item) => (
                <div key={item.id}>
                  <Card
                    item={item}
                    liked={true}
                    handleLikeButton={handleLikeButton}
                    handleUnLikeButton={handleUnLikeButton}
                    url={`/explore-details/attraction/${item.id}`}
                  />
                </div>
              ))}
            </div>
          ) : initialWishListData.length > 0 ? (
            <>
              <br />
              <br />
              <h3>No Result</h3>
              <br />
              <span
                id="next"
                className="preferences_clicked"
                onClick={handleAllClick}
              >
                See all
              </span>
            </>
          ) : (
            <>
              <br />
              <br />
              <h3>You have no attraction in bucket list</h3>
              <br />
              <br />
            </>
          )}
        </div>
      </Spin>
    </>
  );
};

export default BucketListPage;
