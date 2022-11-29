import { useState, useEffect } from "react";
import { Spin } from "antd";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { TiLocationArrowOutline } from "react-icons/ti";
import { getAllDeals } from "../../../api";
import { localGetUserId } from "../../../utils/helpers";
import { IDeal, IPagination, ITripPlanningData } from "../../../api/interfaces";
import { BiSearch } from "react-icons/bi";
import Card from "../../Cards/AttractionCard/AttractionCard";

const menudata = [
  {
    id: 1,
    stateOfClass: true,
    title: "Approved",
    slug: "approved",
  },
  {
    id: 2,
    stateOfClass: false,
    title: "Pending",
    slug: "pending",
  },
];

const AmbassadorAttraction = () => {
  // set the menudata to a state to manage the menu
  const [menuData, setMenuData] = useState(menudata);
  //   get the dummy data and set the attraction data
  const [attractionData, setAttractionData] = useState<IDeal[]>([]);
  const [initialAttractionData, setInitialAttractionData] = useState<IDeal[]>(
    []
  );
  //   using this to set the current data to filter the data
  const [currentData, setCurrentData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [pagination, setPagination] = useState<IPagination | any>();

  const userId = localGetUserId();

  useEffect(() => {
    // getting the current title from the menu
    const data = menuData.filter((item) => item.stateOfClass === true);
    // setting the current data to the current title
    setCurrentData(data[0].title);
  }, [currentData, menuData]);

  useEffect(() => {
    setIsLoading(true);

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
      setIsLoading(false);
    });
  }, []);

  // function to manage the trips button when it is clicked
  const handleLocationsClick = (e: any, action: string) => {
    // prevent default so it won't refresh the page
    e.preventDefault();
    let index;
    switch (action) {
      case "click":
        // get the id of the location tag clicked
        const id = e.target.id;

        // get the index of the location in the locationData state
        index = menuData.findIndex((item) => item.id === parseInt(id));
        break;
      case "select":
        const value = e.target.value;

        // get the index of the location in the locationData state
        index = menuData.findIndex((item) => item.title === value);
        break;
      default:
        break;
    }

    for (let i = 0; i < menuData.length; i++) {
      menuData[i].stateOfClass = false;
    }

    // change the state of the class of the clicked location tag
    menuData[index].stateOfClass = !menuData[index].stateOfClass;
    // set the location data state to be the current location data
    setMenuData([...menuData]);
    setCurrentData(menuData[index].title);
  };

  const handleInput = (e: any) => {
    if (e.target.value.length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
    const filtered = initialAttractionData.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAttractionData(filtered);
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

  const handleAllClick = (e: any) => {
    // therefore setting the attractiondata to the original data fetched from external
    setAttractionData(initialAttractionData);
  };

  // when working on this uncomment line 38 - 41 inside useEffect
  return (
    <Spin spinning={isLoading} size="large">
      <div className="trip_page">
        <div className="trip_page_container">
          <div className="search_container w_90">
            <TiLocationArrowOutline className="w_5 trip_search_icon" />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search with title..."
              className="w_85 trip_search_input"
              onChange={handleInput}
            />
            <span className="w_5">
              <button
                className="explore_page_search_button"
                onClick={handleInput}
              >
                <BiSearch />
              </button>
            </span>
          </div>
          <div className="header_container">
            <h3 className="trip_page_header">My Attractions</h3>
          </div>
          <div className="navigation_container">
            <div className="trips_button_container">
              {menuData.map((item) => (
                <span
                  onClick={(e) => handleLocationsClick(e, "click")}
                  className={
                    item.stateOfClass
                      ? "trips_button_clicked nav_menu_trips"
                      : "trips_button_not_clicked nav_menu_trips"
                  }
                  key={item.id.toString()}
                  id={item.id.toString()}
                >
                  {item.title}
                </span>
              ))}

              {/* Mobile device select */}
              <div className="trips_select_container">
                <select
                  name=""
                  id="select_input"
                  defaultValue={currentData}
                  onClick={(e) => handleLocationsClick(e, "select")}
                >
                  {menuData.map((item) => (
                    <option
                      key={item.id.toString()}
                      id={item.id.toString()}
                      value={item.title}
                    >
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="plan_new_trip">
              <a href="/#/ambassador/attractions/new">
                <span className="plan_new_trip_text">
                  <BsFillPlusCircleFill className="plus_icon" />
                  Create a new attraction
                </span>
              </a>
            </div>
          </div>
          <div className="my_trip_container">
            {attractionData ? (
              attractionData.length > 0 ? (
                <div className="featured_card">
                  {attractionData.map((item) => (
                    <div key={item.id}>
                      <Spin spinning={isLoading}>
                        <Card
                          item={item}
                          ambassador={true}
                          url={`/explore-details/attraction/${item.id}`}
                        />
                      </Spin>
                    </div>
                  ))}
                </div>
              ) : null
            ) : null}

            {isSearching ? (
              <button
                onClick={() => {
                  setAttractionData(initialAttractionData);
                  setIsSearching(false);
                }}
              >
                All
              </button>
            ) : null}
          </div>
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
      </div>
    </Spin>
  );
};

export default AmbassadorAttraction;
