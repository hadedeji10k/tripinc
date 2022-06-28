/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { Spin, DatePicker, Radio, Space, Select } from "antd";
import "antd/dist/antd.min.css";
import "./ExplorePage.css";
// import { preferencedata, tourData } from "../../currentUserData";
// import { attraction } from '../../interfaces';
import Card from "../Cards/TripCard/TripCard";

import { BiSearch } from "react-icons/bi";
import {
  getAllCategories,
  getAllDeals,
  getAllTours,
  getUserWishList,
} from "../../api";
import {
  ICategory,
  IDeal,
  IFormattedCategory,
  IPagination,
} from "../../api/interfaces";
import { localGetUserId, symbolHelper } from "../../utils/helpers";
import { addToWishList, removeFromWishList } from "../../api/responseHandlers";
import { FaLessThanEqual } from "react-icons/fa";
import moment from "moment";

const { RangePicker } = DatePicker;

const ThirdParty = () => {
  // use query to get the search
  // const query = useQuery();
  // get the current search category name

  const userId = localGetUserId();

  // Defining states of this page
  const [isLoading, setIsLoading] = useState(false);
  // state to manage preference data (to sort out clicked and unclicked preference)
  const [preferenceData, setPreferenceData] = useState<ICategory[]>([]);
  const [wishList, setWishList] = useState<any[]>([]);
  const [tourData, setTourData] = useState<IDeal[]>([]);
  // state to manage pagination
  const [pagination, setPagination] = useState<IPagination | any>();
  // state to manage the search result data, so using this when user filter and it get it for the "Result for:" in the page
  const [searchResultField, setSearchResultField] = useState("All");
  const [categorySearchResultField, setCategorySearchResultField] =
    useState("");

  // state to manage the search input in the page
  const [inputField, setInputField] = useState("");
  const [dateInput, setDateInput] = useState<Date[] | any>([]);
  const [category, setCategory] = useState<any>([]);

  // set query
  const [currentQuery, setCurrentQuery] = useState("");

  // useEffect to get the attraction data and category as preferenceData
  useEffect(() => {
    setIsLoading(true);

    if (userId) {
      getUserWishList(userId)
        .then((res) => {
          setWishList(res.data.items);
        })
        .catch((err) => {
          setWishList([]);
        });
    }

    // get all categories as preferenceData
    getAllCategories().then((res) => {
      setPreferenceData(res.data);
    });

    getAllTours().then((res) => {
      setTourData(res.data.items);
      setPagination({
        hasNext: res.data.hasNext,
        hasPrevious: res.data.hasPrevious,
        currentPage: res.data.currentPage,
        pageSize: res.data.pageSize,
        totalPages: res.data.totalPages,
        totalCount: res.data.totalCount,
      });
      setIsLoading(false);
    });
  }, [userId]);

  // useEffect to set preference data when the user click on the preference
  // useEffect(() => {
  //   // select the preference tags clicked
  //   let preferences = preferenceData.filter(
  //     (item) => item.stateOfClass === true
  //   );

  //   if (preferences.length > 0) {
  //     // if the preference tag clicked is not empty, set the search result field to the preference tag clicked
  //     let preferencesText = "";
  //     for (let i = 0; i < preferences.length; i++) {
  //       preferencesText += `${preferences[i].title}, `;
  //     }
  //     setCategorySearchResultField(preferencesText);
  //   }

  //   // if the input value is not null and preferences is clicked, set the search result field to the input's value and preferences
  //   if (inputField !== "" && preferences.length > 0) {
  //     setSearchResultField(`${inputField} -> ${categorySearchResultField}`);
  //   } else if (inputField !== "" && preferences.length === 0) {
  //     setSearchResultField(inputField);
  //   } else if (inputField === "" && preferences.length > 0) {
  //     setSearchResultField(categorySearchResultField);
  //   } else {
  //     setSearchResultField("All");
  //     setCategorySearchResultField("");
  //     setTourData(initialtourData);
  //   }

  //   // if the preference tag clicked is empty, set the search result field to the "All"
  //   if (preferences.length === 0 && inputField === "") {
  //     setSearchResultField("All");
  //     setCategorySearchResultField("");
  //     setTourData(initialtourData);
  //   }

  //   if (preferences.length > 0 && inputField !== "") {
  //     const filteredArray: any = [];
  //     // loop through all clicked preferences and filter the attraction data to the clicked preferences
  //     for (let i = 0; i < preferences.length; i++) {
  //       const element = preferences[i];
  //       const catArray: any = [];
  //       // loop through the current attractions
  //       for (let index = 0; index < initialtourData.length; index++) {
  //         // get one attraction
  //         const attraction = initialtourData[index];
  //         // get the categories of the attraction
  //         const data = attraction?.categories.filter(
  //           (catItem) => catItem.name === element.title
  //         );
  //         // if category selected matches any of the categories of the attraction, push the attraction id to the catArray
  //         if (data.length > 0) {
  //           catArray.push(attraction.id);
  //         }
  //       }
  //       // loop through the catArray and filter the result with the attraction id
  //       for (let i = 0; i < catArray.length; i++) {
  //         const element = catArray[i];
  //         const filtered = initialtourData.filter(
  //           (item) => item.id === element
  //         );
  //         // push the result into the preferences array
  //         let insideArray = false;
  //         filteredArray.forEach((element) => {
  //           if (element.id === filtered[0].id) insideArray = true;
  //         });
  //         if (!insideArray) {
  //           filteredArray.push(filtered[0]);
  //         }
  //       }
  //     }
  //     let data = filteredArray.filter((item) =>
  //       item.location.toLowerCase().includes(inputField.toLowerCase())
  //     );
  //     setTourData(data);
  //   } else if (preferences.length > 0 && inputField === "") {
  //     const filteredArray: any = [];
  //     // loop through all clicked preferences and filter the attraction data to the clicked preferences
  //     for (let i = 0; i < preferences.length; i++) {
  //       const element = preferences[i];
  //       const catArray: any = [];
  //       // loop through the current attractions
  //       for (let index = 0; index < initialtourData.length; index++) {
  //         // get one attraction
  //         const attraction = initialtourData[index];
  //         // get the categories of the attraction
  //         const data = attraction?.categories.filter(
  //           (catItem) => catItem.name === element.title
  //         );
  //         // if category selected matches any of the categories of the attraction, push the attraction id to the catArray
  //         if (data.length > 0) {
  //           catArray.push(attraction.id);
  //         }
  //       }
  //       // loop through the catArray and filter the result with the attraction id
  //       for (let i = 0; i < catArray.length; i++) {
  //         const element = catArray[i];
  //         const filtered = initialtourData.filter(
  //           (item) => item.id === element
  //         );
  //         // push the result into the preferences array
  //         let insideArray = false;
  //         filteredArray.forEach((element) => {
  //           if (element.id === filtered[0].id) insideArray = true;
  //         });
  //         if (!insideArray) {
  //           filteredArray.push(filtered[0]);
  //         }
  //       }
  //     }
  //     setTourData(filteredArray);
  //   } else if (preferences.length === 0 && inputField !== "") {
  //     let data = initialtourData.filter((item) =>
  //       item.location.toLowerCase().includes(inputField.toLowerCase())
  //     );
  //     setTourData(data);
  //   } else if (preferences.length === 0 && inputField === "") {
  //     setTourData(initialtourData);
  //   }

  //   return () => {};
  // }, [
  //   preferenceData,
  //   inputField,
  //   initialtourData,
  //   categorySearchResultField,
  // ]);

  // function to manage the preference button when it is clicked
  // const handlePreferencesClick = (e: any) => {
  //   // prevent default so it won't refresh the page
  //   e.preventDefault();

  //   // get the id of the preference tag clicked
  //   const id = e.target.id;

  //   // get the index of the preference in the preferenceData state
  //   const index = preferenceData.findIndex((item) => item.id === parseInt(id));
  //   // change the state of the class of the clicked preference tag
  //   preferenceData[index].stateOfClass = !preferenceData[index].stateOfClass;
  //   // set the preference data state to be the current preference data
  //   setPreferenceData([...preferenceData]);
  // };

  // function to handle the input data (using this for the onClick of button of the search and onChange of the input)
  const handleInput = (e: any) => {
    // get the input
    let input = document.getElementById("input") as HTMLInputElement;
    setInputField(input.value);
  };

  // function to handle date change
  const onDateChange = (date: any) => {
    setDateInput(date);
  };

  // function to handle category change
  const handleCategoryClick = (e: any) => {
    setCategory(e.target.value);
  };

  const handleCategoryChange = (value: any) => {
    setCategory(value);
  };

  // function to handle the search button
  const handleSearchButton = async (e: any) => {
    setIsLoading(true);
    // prevent default so it won't refresh the page
    e.preventDefault();

    // get category data and create a query for it
    let categoryQuery = "";
    if (category.length > 0) {
      category.map((item) => {
        categoryQuery = categoryQuery + `&Interests=${item}`;
      });
    } else {
      categoryQuery = "";
    }

    // get the date data and create a query for it
    let dateQuery: string = "";
    if (dateInput.length >= 1) {
      dateQuery = `StartDate=${moment(
        dateInput[0]
      ).toISOString()}&EndDate=${moment(dateInput[1]).toISOString()}`;
    } else if (dateInput.length === 0) {
      dateQuery = `StartDate=${moment(dateInput[0]).toISOString()}`;
    } else {
      dateQuery = "";
    }

    let inputQuery: string = "";
    if (inputField.length > 0) {
      inputQuery = `&Location=${inputField}`;
    } else {
      inputQuery = "";
    }

    // query
    const query = `${dateQuery}${categoryQuery}${inputQuery}`;

    await getAllTours(query).then((res) => {
      setTourData(res.data.items);
      setPagination({
        hasNext: res.data.hasNext,
        hasPrevious: res.data.hasPrevious,
        currentPage: res.data.currentPage,
        pageSize: res.data.pageSize,
        totalPages: res.data.totalPages,
        totalCount: res.data.totalCount,
      });
      setCurrentQuery(query);
    });

    setIsLoading(false);
  };

  const handleLike = (a: any) => {
    let returnState: boolean = false;
    if (wishList && wishList.length > 0) {
      let index = wishList.find(
        (item) =>
          item?.itemId === a.id &&
          item?.itemType.toLowerCase() === a.itemType.toLowerCase() &&
          item?.provider.toLowerCase() === a.provider.toLowerCase()
      );
      if (index) {
        returnState = true;
      } else {
        returnState = false;
      }
    }
    return returnState;
  };

  const handleLikeButton = async (id: any) => {
    setIsLoading(true);
    const data = tourData.filter((item) => item.id === id);
    const formData = {
      userId,
      itemId: data[0].id,
      itemType: data[0].itemType,
      provider: data[0].provider,
    };
    const response = await addToWishList(formData);
    if (response === true) {
      setWishList([...wishList, data[0]]);
    }
    setIsLoading(false);
  };

  const handleUnLikeButton = async (id: any) => {
    setIsLoading(true);

    const data = tourData.filter((item) => item.id === id);
    const wishListData = wishList.filter((item) => item.id !== id);

    // remove from database, if successful, remove from state
    const response = await removeFromWishList(data[0].id, userId);
    if (response === true) {
      setWishList([...wishListData]);
    }
    setIsLoading(false);
  };

  const handlePaginationPrev = async () => {
    setIsLoading(true);
    const query = `${currentQuery}PageNumber=${
      pagination?.currentPage - 1
    }&PageSize=${pagination?.pageSize}`;
    await getAllTours(query).then((res) => {
      setTourData(res.data.items);

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
    const query = `${currentQuery}PageNumber=${
      pagination?.currentPage + 1
    }&PageSize=${pagination?.pageSize}`;
    await getAllTours(query).then((res) => {
      setTourData(res.data.items);

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
        <div className="explore_page_container">
          <div className="explore_page_search_container">
            <div className="explore_page_search_featured_form">
              <input
                id="input"
                className="explore_page_search_third_input"
                type="text"
                placeholder="Search for a city"
                defaultValue={inputField}
                onChange={handleInput}
              />
              <span className="third_party_date_picker">
                <RangePicker onChange={onDateChange} size="small" />
              </span>

              {/* <select
                className="explorer_page_third_party_select"
                onClick={handleCategoryClick}
                onChange={handleCategoryClick}
              >
                <option value="">Choose category</option>
                {preferenceData.map((data) => (
                  <option key={data.id} value={data.name}>
                    {data.name}
                  </option>
                ))}
              </select> */}
              <Select
                mode="tags"
                className="explorer_page_third_party_select"
                size="small"
                placeholder="Please select"
                // defaultValue={['a10', 'c12']}
                onChange={handleCategoryChange}
              >
                {preferenceData.map((data) => (
                  <option key={data.id} value={data.name}>
                    {data.name}
                  </option>
                ))}
              </Select>
              <button
                className="explore_page_search_button"
                onClick={handleSearchButton}
              >
                <BiSearch />
              </button>
            </div>
          </div>

          <div className="">
            <p>Search Result for: {searchResultField}</p>
          </div>
          {/* <Card data={tourData} /> */}
          {tourData ? (
            tourData.length > 0 ? (
              <div className="featured_card">
                {tourData.map((item) => (
                  <div key={item.id}>
                    <Spin spinning={isLoading}>
                      <Card
                        item={item}
                        liked={handleLike(item)}
                        handleLikeButton={handleLikeButton}
                        handleUnLikeButton={handleUnLikeButton}
                        url={`/explore-details/tour/${item.tourId}`}
                      />
                    </Spin>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <br />
                <br />
                <h3>No search Result</h3>
                <br />
              </>
            )
          ) : null}

          <div className="explore_page_number">
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
            <button
              className={
                pagination?.hasPrevious
                  ? "explore_navigation_button_active"
                  : "explore_navigation_button"
              }
              onClick={handlePaginationPrev}
              disabled={!pagination?.hasPrevious}
            >
              Prev
            </button>
            <button
              className={
                pagination?.hasNext
                  ? "explore_navigation_button_active"
                  : "explore_navigation_button"
              }
              onClick={handlePaginationNext}
              disabled={!pagination?.hasNext}
            >
              Next
            </button>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default ThirdParty;
