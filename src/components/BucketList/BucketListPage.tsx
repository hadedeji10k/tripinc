/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import "./BucketListPage.css";
import { BiSearch } from "react-icons/bi";
import {
  localGetUserId,
  generateBucketListTripDateArray,
} from "../../utils/helpers";
import { getUserTrips, getUserWishListAsAttraction } from "../../api";
import {
  IWishListData,
  IPagination,
  ITripPlanningData,
} from "../../api/interfaces";
import { removeFromWishList } from "../../api/responseHandlers";
import Swal from "sweetalert2";
import BucketListCard from "../Cards/BucketListCard/BucketListCard";

// React component of this page
const BucketListPage = () => {
  // Defining states of this page

  // state to manage the attraction data to be mapped into cards (using this in order to manage the attraction data in case it is filtered)
  const [wishListData, setWishListData] = useState<IWishListData[]>([]);
  const [initialWishListData, setInitialWishListData] = useState<
    IWishListData[]
  >([]);

  // trip data to book from bucket list
  const [tripData, setTripData] = useState<ITripPlanningData[]>([]);

  const [pagination, setPagination] = useState<IPagination | any>();

  // state to manage the search result data, so using this when user filter and it get it for the "Result for:" in the page
  const [searchResultField, setSearchResultField] = useState("All");
  // state to manage the search result in the page
  const [inputField, setInputField] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const userId = localGetUserId();

  useEffect(() => {
    setIsLoading(true);
    if (userId) {
      getUserWishListAsAttraction(userId)
        .then((res) => {
          setWishListData(res.data.items ? res.data.items : []);
          setInitialWishListData(res.data.items ? res.data.items : []);

          setPagination({
            hasNext: res.data.hasNext,
            hasPrevious: res.data.hasPrevious,
            currentPage: res.data.currentPage,
            pageSize: res.data.pageSize,
            totalPages: res.data.totalPages,
            totalCount: res.data.totalCount,
          });

          getUserTrips(userId, "Status=true&PageSize=10").then((result) => {
            setTripData(result.data.items);
            // // create empty array to store the results after looping
            // let emptyArray: IWishListData[] = [];
            // // loop through the items on bucketList
            // for (let i = 0; i < res.data.items.length; i++) {
            //   // get the element from the bucket
            //   const wishListElement: IWishListData = res.data.items[i];
            //   // create an empty dropdown array for an item in bucketList
            //   let dropDownMenu: any = [];
            //   // loop through the items in the trips
            //   for (let k = 0; k < result.data.items.length; k++) {
            //     // get an element of a trip
            //     const tripElement: ITripPlanningData = result.data.items[k];
            //     // check if the location of the trip and the location of the bucket item matches
            //     if (
            //       wishListElement.location
            //         .toLowerCase()
            //         .includes(tripElement.startDestination.toLowerCase())
            //     ) {
            //       // if it matches, create a new array of the days in the trip
            //       const generatedDay = generateBucketListTripDateArray(
            //         tripElement.startDate,
            //         tripElement.endDate
            //       );
            //       // create an object to add to the bucket item dropDownMenu
            //       let obj = {
            //         label: tripElement.startDestination,
            //         children: generatedDay,
            //       };
            //       dropDownMenu.push(obj);
            //     }
            //   }
            //   // assign the dropDownMenu generated to the bucket list item dropdown
            //   wishListElement.dropDown = dropDownMenu;
            //   // push the bucket item into the bucket lists
            //   emptyArray.push(wishListElement);
            // }
            // // set them into the state
            // setWishListData(emptyArray);
            // setInitialWishListData(emptyArray);
            setIsLoading(false);
          });
        })
        .catch((err) => {
          setWishListData([]);
          setInitialWishListData([]);
          setIsLoading(false);
        });
    }
  }, [userId]);

  useEffect(() => {
    // if the input value is not null, set the search result field to the input's value
    if (inputField !== "") {
      setSearchResultField(inputField);
    } else {
      setSearchResultField("All");
    }

    return () => {};
  }, [inputField]);

  useEffect(() => {
    // create empty array to store the results after looping
    let emptyArray: IWishListData[] = [];
    // loop through the items on bucketList
    for (let i = 0; i < initialWishListData.length; i++) {
      // get the element from the bucket
      const wishListElement: IWishListData = initialWishListData[i];
      // create an empty dropdown array for an item in bucketList
      let dropDownMenu: any = [];
      // loop through the items in the trips
      for (let k = 0; k < tripData.length; k++) {
        // get an element of a trip
        const tripElement: ITripPlanningData = tripData[k];
        // check if the location of the trip and the location of the bucket item matches
        if (
          wishListElement.location
            .toLowerCase()
            .includes(tripElement.startDestination.toLowerCase())
        ) {
          // if it matches, create a new array of the days in the trip
          const generatedDay = generateBucketListTripDateArray(
            wishListElement.id,
            tripElement.id,
            tripElement.noOfPartners,
            tripElement.startDate,
            tripElement.endDate
          );
          // create an object to add to the bucket item dropDownMenu
          let obj = {
            label: tripElement.startDestination,
            children: generatedDay,
          };
          dropDownMenu.push(obj);
        }
      }
      // assign the dropDownMenu generated to the bucket list item dropdown
      wishListElement.dropDown = dropDownMenu;
      // push the bucket item into the bucket lists
      emptyArray.push(wishListElement);
    }
    // set them into the state
    setWishListData(emptyArray);
    // setInitialWishListData(emptyArray);
  }, [initialWishListData, tripData]);

  useEffect(() => {
    // filter the original attraction data fetched from external using the input data
    let data = initialWishListData.filter(
      (item) =>
        item.location.toLowerCase().includes(inputField.toLowerCase()) ||
        item.title.toLowerCase().includes(inputField.toLowerCase())
    );
    // if the data is not empty
    if (data.length !== 0) {
      // set the attractiondata to the new data filtered
      setWishListData(data);
    } else {
      setWishListData([]);
    }
  }, [inputField, initialWishListData]);

  // function to handle the input data (using this for the onClick of button of the search and onChange of the input)
  const handleInput = (e: any) => {
    // get the input
    let input = document.getElementById("input") as HTMLInputElement;
    setSearchResultField(input.value);
    setInputField(input.value);
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
  };

  const handleLikeButton = async (id: any) => {};

  const handleUnLikeButton = async (id: any) => {
    setIsLoading(true);
    // remove from wishList state
    const data = wishListData.filter((item) => item.id !== id);
    const data2 = initialWishListData.filter((item) => item.id !== id);
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to remove this from your bucket list?",
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

  const handlePaginationPrev = async () => {
    setIsLoading(true);
    const query = `PageNumber=${pagination?.currentPage - 1}&PageSize=${
      pagination?.pageSize
    }`;
    await getUserWishListAsAttraction(userId, query).then((res) => {
      setInitialWishListData(res.data.items);

      setPagination({
        hasNext: res.data.hasNext,
        hasPrevious: res.data.hasPrevious,
        currentPage: res.data.currentPage,
        pageSize: res.data.pageSize,
        totalPages: res.data.totalPages,
        totalCount: res.data.totalCount,
      });
    });
    setIsLoading(false);
  };

  const handlePaginationNext = async () => {
    setIsLoading(true);
    const query = `PageNumber=${pagination?.currentPage + 1}&PageSize=${
      pagination?.pageSize
    }`;
    await getUserWishListAsAttraction(userId, query).then((res) => {
      setInitialWishListData(res.data.items);

      setPagination({
        hasNext: res.data.hasNext,
        hasPrevious: res.data.hasPrevious,
        currentPage: res.data.currentPage,
        pageSize: res.data.pageSize,
        totalPages: res.data.totalPages,
        totalCount: res.data.totalCount,
      });
    });
    setIsLoading(false);
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

          <div className="">
            <p>Search Result for: {searchResultField}</p>
          </div>
          {searchResultField.toLowerCase() !== "all" ? (
            <span
              className="preferences_clicked m_b_20"
              onClick={handleAllClick}
            >
              See all
            </span>
          ) : null}

          {wishListData.length > 0 ? (
            <div className="featured_card">
              {wishListData.map((item) => (
                <div key={`${item.id}${item.itemType}`}>
                  <BucketListCard
                    item={item}
                    liked={true}
                    handleLikeButton={handleLikeButton}
                    handleUnLikeButton={handleUnLikeButton}
                    url={
                      item.itemType.toLowerCase() === "attraction"
                        ? `/explore-details/attraction/${item.id}`
                        : item.itemType.toLowerCase() === "tour" &&
                          item.tourId !== 0
                        ? `/explore-details/tour/${item.tourId}`
                        : `/explore-details/attraction/${item.id}`
                    }
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
            </>
          ) : (
            <>
              <br />
              <br />
              <h3>
                Nothing here to show. Your bookmarked attractions will appear
                here.
              </h3>
              <br />
              <br />
            </>
          )}
          <div className="pagination_row">
            <span>
              Page {pagination?.currentPage} of {pagination?.totalPages}
            </span>
            <span>
              {(pagination?.currentPage - 1) * pagination?.pageSize + 1} -
              {pagination?.hasNext
                ? pagination?.pageSize * pagination?.currentPage
                : pagination?.totalCount}
            </span>
          </div>
          <div className="scroll_button">
            {pagination?.hasPrevious ? (
              <button
                className={
                  pagination?.hasPrevious
                    ? "custom_button"
                    : "explore_navigation_button"
                }
                onClick={handlePaginationPrev}
                disabled={!pagination?.hasPrevious}
              >
                Prev
              </button>
            ) : null}
            {pagination?.hasNext ? (
              <button
                className={
                  pagination?.hasNext
                    ? "custom_button"
                    : "explore_navigation_button"
                }
                onClick={handlePaginationNext}
                disabled={!pagination?.hasNext}
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      </Spin>
    </>
  );
};

export default BucketListPage;
