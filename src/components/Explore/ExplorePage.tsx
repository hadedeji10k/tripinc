/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import "./ExplorePage.css";
// import { preferencedata, attractiondata } from "../../currentUserData";
// import { attraction } from "../../interfaces";
import Card from "../Cards/TripCard/TripCard";

import { BiSearch } from "react-icons/bi";
import { getAllCategories, getAllDeals, getUserWishList } from "../../api";
import { IDeal, IFormattedCategory } from "../../api/interfaces";
import { localGetUserId, symbolHelper } from "../../utils/helpers";
import { addToWishList, removeFromWishList } from "../../api/responseHandlers";
import { FaLessThanEqual } from "react-icons/fa";
import Featured from "./Featured";
import ThirdParty from "./ThirdParty";

const menuBarData = [
  {
    id: 1,
    state: true,
    title: "Featured",
    slug: "featured",
  },
  {
    id: 2,
    state: false,
    title: "Third Party",
    slug: "third_party",
  },
];

const ExplorePage = () => {
  // use query to get the search
  // const query = useQuery();
  // get the current search category name

  const [menuBar, setMenuBar] = useState(menuBarData);

  let data = menuBar.filter((item) => item.state === true);

  const userId = localGetUserId();

  const { catNameParam } = useParams();
  const { cityParam } = useParams();

  // Defining states of this page
  const [isLoading, setIsLoading] = useState(false);
  // state to manage preference data (to sort out clicked and unclicked preference)
  const [preferenceData, setPreferenceData] = useState<IFormattedCategory[]>(
    []
  );

  useEffect(() => {}, []);

  // useEffect to get the attraction data and category as preferenceData
  // useEffect(() => {
  //   setIsLoading(true);

  //   // get all categories as preferenceData
  //   getAllCategories().then((res) => {
  //     const arrayTopush: any = [];
  //     // loop through the response categories and push the category name and the icon into the array to be used in the preference data
  //     for (let i = 0; i < res.data.length; i++) {
  //       const element = res.data[i];
  //       const data = {
  //         id: element.id,
  //         title: element.name,
  //         symbol: symbolHelper(element.name),
  //         stateOfClass: false,
  //       };
  //       arrayTopush.push(data);
  //     }
  //     // if there is catName, therefore, the state of the category is clicked
  //     if (catNameParam) {
  //       const index = arrayTopush.findIndex(
  //         (x) => x.title.toLowerCase() === catNameParam.toLowerCase()
  //       );
  //       arrayTopush[index].stateOfClass = true;
  //     }
  //     // set the preference data
  //     setPreferenceData(arrayTopush);
  //   });
  //   setIsLoading(false);
  // }, [catNameParam, userId, cityParam]);

  const handleInput = () => {};

  const handle = (id: any) => {
    // const id = e.target.id;
    const index = menuBar.findIndex((item) => item.id === id);
    // const index = menuBar.findIndex((item) => item.id === parseInt(id));
    for (let i = 0; i < menuBar.length; i++) {
      menuBar[i].state = false;
    }
    menuBar[index].state = !menuBar[index].state;
    // menuBar[index].class = menuBar[index].stateOfClass ? 'clicked' : 'not-clicked'
    setMenuBar([...menuBar]);
  };

  return (
    <>
      <Spin spinning={isLoading}>
        <div className="explore_page_container">
          <div className="explore_page_header">
            {/* <img className="explore_page_header_image" src="https://images.unsplash.com/photo-1596889157941-d2651f70a4f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRvdXJpc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" /> */}
            <div className="explore_page_header_text">
              <h3 className="explore_page_header_title">Explore Cities!</h3>
              <p className="explore_page_header_description">
                You can search cities you wish on this page using the search
                form.
              </p>
            </div>
          </div>
          <div className="explore_tab_menu">
            {menuBar.map((item) => (
              <span
                key={item.id}
                className={
                  data[0].id === item.id
                    ? "explore_tab_menu_title_active"
                    : "explore_tab_menu_title"
                }
                onClick={() => handle(item.id)}
              >
                {item.title}
              </span>
            ))}
          </div>
          <div>
            {data[0].id === 1 ? (
              <Featured />
            ) : data[0].id === 2 ? (
              <ThirdParty />
            ) : null}
          </div>
        </div>
      </Spin>
    </>
  );
};

export default ExplorePage;
