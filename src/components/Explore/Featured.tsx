/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import "./ExplorePage.css";
// import { preferencedata, attractiondata } from "../../currentUserData";
// import { attraction } from '../../interfaces';
import Card from "../Cards/TripCard/TripCard";

import { BiSearch } from "react-icons/bi";
import { getAllCategories, getAllDeals, getUserWishList } from "../../api";
import { IDeal, IFormattedCategory, IPagination } from "../../api/interfaces";
import { localGetUserId, symbolHelper } from "../../utils/helpers";
import { addToWishList, removeFromWishList } from "../../api/responseHandlers";
// import { FaLessThanEqual } from "react-icons/fa";

// function useQuery() {
//   const { search } = useLocation();

//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }

const Featured = ({ handleMove }) => {
  // use query to get the search
  // const query = useQuery();
  // get the current search category name

  const userId = localGetUserId();

  const { catNameParam } = useParams();
  const { cityParam } = useParams();

  // Defining states of this page
  const [isLoading, setIsLoading] = useState(false);
  // state to manage preference data (to sort out clicked and unclicked preference)
  const [preferenceData, setPreferenceData] = useState<IFormattedCategory[]>(
    []
  );
  const [wishList, setWishList] = useState<any[]>([]);
  // state to manage the attraction data to be mapped into cards (using this in order to manage the attraction data in case it is filtered)
  const [initialAttractionData, setInitialAttractionData] = useState<IDeal[]>(
    []
  );
  const [attractionData, setAttractionData] = useState<IDeal[]>([]);
  // state to manage pagination
  const [pagination, setPagination] = useState<IPagination | any>();
  // state to manage the search result data, so using this when user filter and it get it for the "Result for:" in the page
  const [searchResultField, setSearchResultField] = useState("All");
  const [categorySearchResultField, setCategorySearchResultField] =
    useState("");

  // state to manage the search input in the page
  const [inputField, setInputField] = useState("");

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

    if (cityParam) {
      setInputField(cityParam);
    }

    getAllDeals().then((res) => {
      setAttractionData(res.data.items);
      setInitialAttractionData(res.data.items);

      setPagination({
        hasNext: res.data.hasNext,
        hasPrevious: res.data.hasPrevious,
        currentPage: res.data.currentPage,
        pageSize: res.data.pageSize,
        totalPages: res.data.totalPages,
        totalCount: res.data.totalCount,
      });
    });

    // get all categories as preferenceData
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
      // if there is catNameParam, therefore, the state of the category is clicked
      if (catNameParam) {
        const index = arrayToPush.findIndex(
          (x) => x.title.toLowerCase() === catNameParam.toLowerCase()
        );
        arrayToPush[index].stateOfClass = true;
        // setSearchResultField(catNameParam);
      }
      // set the preference data
      setPreferenceData(arrayToPush);

      setIsLoading(false);
    });
  }, [catNameParam, userId, cityParam]);

  // useEffect to set preference data when the user click on the preference
  useEffect(() => {
    // select the preference tags clicked
    let preferences = preferenceData.filter(
      (item) => item.stateOfClass === true
    );

    if (preferences.length > 0) {
      // if the preference tag clicked is not empty, set the search result field to the preference tag clicked
      let preferencesText = "";
      for (let i = 0; i < preferences.length; i++) {
        preferencesText += `${preferences[i].title}, `;
      }
      setCategorySearchResultField(preferencesText);
    }

    // if the input value is not null and preferences is clicked, set the search result field to the input's value and preferences
    if (inputField !== "" && preferences.length > 0) {
      setSearchResultField(`${inputField} -> ${categorySearchResultField}`);
    } else if (inputField !== "" && preferences.length === 0) {
      setSearchResultField(inputField);
    } else if (inputField === "" && preferences.length > 0) {
      setSearchResultField(categorySearchResultField);
    } else {
      setSearchResultField("All");
      setCategorySearchResultField("");
      setAttractionData(initialAttractionData);
    }

    // if the preference tag clicked is empty, set the search result field to the "All"
    if (preferences.length === 0 && inputField === "") {
      setSearchResultField("All");
      setCategorySearchResultField("");
      setAttractionData(initialAttractionData);
    }

    if (preferences.length > 0 && inputField !== "") {
      const filteredArray: any = [];
      // loop through all clicked preferences and filter the attraction data to the clicked preferences
      for (let i = 0; i < preferences.length; i++) {
        const element = preferences[i];
        const catArray: any = [];
        // loop through the current attractions
        for (let index = 0; index < initialAttractionData.length; index++) {
          // get one attraction
          const attraction = initialAttractionData[index];
          // get the categories of the attraction
          const data = attraction?.categories.filter(
            (catItem) => catItem.name === element.title
          );
          // if category selected matches any of the categories of the attraction, push the attraction id to the catArray
          if (data.length > 0) {
            catArray.push(attraction.id);
          }
        }
        // loop through the catArray and filter the result with the attraction id
        for (let i = 0; i < catArray.length; i++) {
          const element = catArray[i];
          const filtered = initialAttractionData.filter(
            (item) => item.id === element
          );
          // push the result into the preferences array
          let insideArray = false;
          filteredArray.forEach((element) => {
            if (element.id === filtered[0].id) insideArray = true;
          });
          if (!insideArray) {
            filteredArray.push(filtered[0]);
          }
        }
      }
      let data = filteredArray.filter((item) =>
        item.location.toLowerCase().includes(inputField.toLowerCase())
      );
      setAttractionData(data);
    } else if (preferences.length > 0 && inputField === "") {
      const filteredArray: any = [];
      // loop through all clicked preferences and filter the attraction data to the clicked preferences
      for (let i = 0; i < preferences.length; i++) {
        const element = preferences[i];
        const catArray: any = [];
        // loop through the current attractions
        for (let index = 0; index < initialAttractionData.length; index++) {
          // get one attraction
          const attraction = initialAttractionData[index];
          // get the categories of the attraction
          const data = attraction?.categories.filter(
            (catItem) => catItem.name === element.title
          );
          // if category selected matches any of the categories of the attraction, push the attraction id to the catArray
          if (data.length > 0) {
            catArray.push(attraction.id);
          }
        }
        // loop through the catArray and filter the result with the attraction id
        for (let i = 0; i < catArray.length; i++) {
          const element = catArray[i];
          const filtered = initialAttractionData.filter(
            (item) => item.id === element
          );
          // push the result into the preferences array
          let insideArray = false;
          filteredArray.forEach((element) => {
            if (element.id === filtered[0].id) insideArray = true;
          });
          if (!insideArray) {
            filteredArray.push(filtered[0]);
          }
        }
      }
      setAttractionData(filteredArray);
    } else if (preferences.length === 0 && inputField !== "") {
      let data = initialAttractionData.filter((item) =>
        item.location.toLowerCase().includes(inputField.toLowerCase())
      );
      setAttractionData(data);
    } else if (preferences.length === 0 && inputField === "") {
      setAttractionData(initialAttractionData);
    }

    return () => {};
  }, [
    preferenceData,
    inputField,
    initialAttractionData,
    categorySearchResultField,
  ]);

  // useEffect to manage the prev and next buttons, it determines if there are preferences tags more than the screen width and hide them (the buttons) if there is no preferences tags more than the screen width

  /* 
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
  */

  // function to manage the preference button when it is clicked
  const handlePreferencesClick = (e: any) => {
    // prevent default so it won't refresh the page
    e.preventDefault();

    // get the id of the preference tag clicked
    const id = e.target.id;

    // get the index of the preference in the preferenceData state
    const index = preferenceData.findIndex((item) => item.id === parseInt(id));
    // change the state of the class of the clicked preference tag
    preferenceData[index].stateOfClass = !preferenceData[index].stateOfClass;
    // set the preference data state to be the current preference data
    setPreferenceData([...preferenceData]);
  };

  // function to handle the input data (using this for the onClick of button of the search and onChange of the input)
  const handleInput = (e: any) => {
    // get the input
    let input = document.getElementById("input") as HTMLInputElement;
    setInputField(input.value);
  };

  // use this function to handle when the "all" button is clicked
  const handleAllClick = (e: any) => {
    // therefore setting the attractiondata to the original data fetched from external
    setAttractionData(initialAttractionData);
    // set the search result  to ALl
    setSearchResultField("All");
    // set the input field to empty
    setInputField("");
    setCategorySearchResultField("");
    // using this to shadow mark the input field and set it to empty
    let input = document.getElementById("input") as HTMLInputElement;
    input.value = "";
    // and setting the preference tags to false
    preferenceData.forEach((item) => {
      item.stateOfClass = false;
    });
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
    const data = attractionData.filter((item) => item.id === id);
    console.log(data);
    const formData = {
      userId,
      itemId: data[0].id,
      itemType: data[0].itemType,
      provider: data[0].provider,
    };

    console.log(formData);

    const response = await addToWishList(formData);
    if (response === true) {
      setWishList([...wishList, data[0]]);
    }
    setIsLoading(false);
  };

  const handleUnLikeButton = async (id: any) => {
    setIsLoading(true);

    const data = attractionData.filter((item) => item.id === id);
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
    const query = `PageNumber=${pagination?.currentPage - 1}&PageSize=${
      pagination?.pageSize
    }`;
    await getAllDeals(query).then((res) => {
      setInitialAttractionData(res.data.items);

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
    await getAllDeals(query).then((res) => {
      setInitialAttractionData(res.data.items);

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
                className="explore_page_search_featured_input"
                type="text"
                placeholder="Search for a city"
                defaultValue={inputField}
                onChange={handleInput}
              />
              {/* <input
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
              </select> */}
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
                {item.symbol} {item.title}
              </span>
            ))}
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
          <div className="">
            <p>Search Result for: {searchResultField}</p>
          </div>
          {/* <Card data={attractionData} /> */}
          {attractionData ? (
            attractionData.length > 0 ? (
              <div className="featured_card">
                {attractionData.map((item) => (
                  <div key={item.id}>
                    <Spin spinning={isLoading}>
                      <Card
                        item={item}
                        liked={handleLike(item)}
                        handleLikeButton={handleLikeButton}
                        handleUnLikeButton={handleUnLikeButton}
                        url={`/explore-details/attraction/${item.id}`}
                      />
                    </Spin>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {isLoading ? (
                  <>
                    <br />
                    <br />
                    <h3>
                      Please check our popular destinations for more attraction
                      you may like.
                    </h3>
                    <br />
                    <span
                      id="next"
                      className="preferences_clicked m_b_20"
                      onClick={handleAllClick}
                    >
                      See all Featured
                    </span>
                    <span
                      id="next"
                      className="preferences_clicked"
                      onClick={() => handleMove(2)}
                    >
                      Move to Popular
                    </span>
                  </>
                ) : null}
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

export default Featured;
