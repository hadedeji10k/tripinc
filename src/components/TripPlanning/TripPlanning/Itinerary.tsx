import { useState, useEffect } from "react";
import { Tooltip, TimePicker, Select, message } from "antd";
import "antd/dist/antd.min.css";
import moment from "moment";
import Autocomplete from "react-google-autocomplete";
import { MdLocationOn } from "react-icons/md";
import {
  generateItineraryMenuObject,
  dateSuffix,
} from "../../../utils/helpers";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import { ImCancelCircle } from "react-icons/im";
import { BsFillPencilFill, BsFillPlusCircleFill } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { ITripPlanningItineraryDay } from "../../../api/interfaces";
import { GOOGLEAPIKEY } from "../../../utils/constants";
import axios from "axios";
import { differenceInMinutes } from "date-fns";
const { Option } = Select;

interface ItineraryProps {
  tripDays: any;
  itineraryData: ITripPlanningItineraryDay[];
  setItineraryData: any;
  setTripPlanningData: any;
  tripPlanningData: any;
}

const Itinerary = ({
  tripDays,
  itineraryData,
  setItineraryData,
  tripPlanningData,
  setTripPlanningData,
}: ItineraryProps) => {
  const [tripMenu, setTripMenu] = useState<any[]>([]);
  const [addCustomEvent, setAddCustomEvent] = useState(false);
  const [addCustomEventDetails, setAddCustomEventDetails] = useState({
    eventName: "",
    eventPlace: "",
    eventTime: [],
    eventTimeString: [],
    eventLocation: { lat: 0, lng: 0 },
    eventPlaceImage: "",
  });

  useEffect(() => {
    const result = generateItineraryMenuObject(tripDays);
    setTripMenu(result);

    axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=false&key=AIzaSyDnyZ4kOYvlHECURxnQVGrWUKiq4qzvikw"
      )
      .then((res) => {
        console.log(res.data);
      });
  }, [tripDays]);

  const handleCustomEventDetails = (name: string, value: any) => {
    setAddCustomEventDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // function to handle faqs click
  const handleMenuClick = (id: any) => {
    let prevState = tripMenu[id].stateOfClass;
    for (let i = 0; i < tripMenu.length; i++) {
      tripMenu[i].stateOfClass = false;
    }
    tripMenu[id].stateOfClass = !prevState;
    setTripMenu([...tripMenu]);
    setAddCustomEvent(false);
  };

  const handleNumberOfPeopleChange = (
    type: string,
    value,
    tripDayKey,
    itineraryKey
  ) => {
    // { value: "lucy", key: "lucy", label: "Lucy (101)" }

    if (type === "attraction") {
      // get the day's itinerary array
      const itineraryDay = itineraryData[tripDayKey];
      // get the item using the key from the array
      let itemToEdit = itineraryDay.itineraries[itineraryKey];

      // get the previous numberOfPeople, then deduct the amount from spentBudget and add it again with the current numberOfPeople
      // calculate the amount
      const amountToDeduct = itemToEdit.item.price * itemToEdit.numberOfPeople;
      const amountToAdd = itemToEdit.item.price * parseInt(value);
      if (
        tripPlanningData.spentBudget + amountToAdd - amountToDeduct >
        tripPlanningData.budget
      ) {
        setItineraryData([...itineraryData]);
        return Swal.fire({
          title: "Error!",
          text: "Number of people cannot be changed, your budget is running low. Try increasing your budget, and try again.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      setTripPlanningData({
        ...tripPlanningData,
        spentBudget:
          tripPlanningData.spentBudget + amountToAdd - amountToDeduct,
      });
      // change the numberOfPeople
      itemToEdit.numberOfPeople = parseInt(value);
      setItineraryData([...itineraryData]);
    } else if (type === "customEvent") {
      // get the day's itinerary array
      const itineraryDay = itineraryData[tripDayKey];
      // get the item using the key from the array
      let itemToEdit = itineraryDay.customEvents[itineraryKey];
      // change the numberOfPeople
      itemToEdit.numberOfPeople = parseInt(value);
      setItineraryData([...itineraryData]);
    } else {
      return;
    }
  };

  const handleCustomNoteChange = (
    type: string,
    e,
    tripDayKey,
    itineraryKey
  ) => {
    e.preventDefault();
    if (type === "attraction") {
      // get the day's itinerary array
      const itineraryDay = itineraryData[tripDayKey];
      // get the item using the key from the array
      let itemToEdit = itineraryDay.itineraries[itineraryKey];
      // change the time
      itemToEdit.customNote = e.target.value;
      setItineraryData([...itineraryData]);
    } else if (type === "customEvent") {
      // get the day's itinerary array
      const itineraryDay = itineraryData[tripDayKey];
      // get the item using the key from the array
      let itemToEdit = itineraryDay.customEvents[itineraryKey];
      // change the time
      itemToEdit.customNote = e.target.value;
      setItineraryData([...itineraryData]);
    } else {
      return;
    }
  };

  const handleCustomNote = (type: string, tripDayKey, itineraryKey) => {
    if (type === "attraction") {
      // get the day's itinerary array
      const itineraryDay = itineraryData[tripDayKey];
      // get the item using the key from the array
      let itemToEdit = itineraryDay.itineraries[itineraryKey];
      // change the note status
      itemToEdit.customNoteStatus = !itemToEdit.customNoteStatus;
      setItineraryData([...itineraryData]);
    } else if (type === "customEvent") {
      // get the day's itinerary array
      const itineraryDay = itineraryData[tripDayKey];
      // get the item using the key from the array
      let itemToEdit = itineraryDay.customEvents[itineraryKey];
      // change the note status
      itemToEdit.customNoteStatus = !itemToEdit.customNoteStatus;
      setItineraryData([...itineraryData]);
    } else {
      return;
    }
  };

  const handleDelete = (type: string, tripDayKey, key) => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to remove this from your itinerary list?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (type === "attraction") {
          const itineraryDay = itineraryData[tripDayKey];

          // find the item to remove and number of people to remove the price from spentBudget
          const selectedItemToDelete = itineraryDay.itineraries[key];
          const amountToDeduct =
            selectedItemToDelete.numberOfPeople *
            selectedItemToDelete.item.price;
          setTripPlanningData({
            ...tripPlanningData,
            spentBudget: tripPlanningData.spentBudget - amountToDeduct,
          });

          // filter the data and save
          const diff = itineraryDay.itineraries.filter(
            (item, index) => index !== parseInt(key)
          );
          itineraryDay.itineraries = diff;
          setItineraryData([...itineraryData]);
        } else if (type === "customEvent") {
          const itineraryDay = itineraryData[tripDayKey];
          // filter the data and save
          const diff = itineraryDay.customEvents.filter(
            (item, index) => index !== parseInt(key)
          );
          itineraryDay.customEvents = diff;
          setItineraryData([...itineraryData]);
        } else {
          return;
        }
      }
    });
  };

  const handleTimeChange = (
    type: string,
    time,
    timeString,
    tripDayKey,
    key
  ) => {
    if (type === "attraction") {
      // get the day's itinerary array
      const itineraryDay = itineraryData[tripDayKey];
      // get the item using the key from the array
      let itemToEdit = itineraryDay.itineraries[key];
      // change the time
      itemToEdit.startTime = timeString[0];
      itemToEdit.endTime = timeString[1];
    } else if (type === "customEvent") {
      // get the day's itinerary array
      const itineraryDay = itineraryData[tripDayKey];
      // get the item using the key from the array
      let itemToEdit = itineraryDay.customEvents[key];
      // change the time
      itemToEdit.startTime = timeString[0];
      itemToEdit.endTime = timeString[1];
    } else {
      return;
    }
  };

  const addCustomEventDetailsToItinerary = (tripDayKey: number) => {
    if (addCustomEventDetails.eventName.length === 0) {
      return message.error(
        "Error, please make sure you type an event name.",
        3
      );
    }
    if (addCustomEventDetails.eventPlace.length === 0) {
      return message.error("Error, please make sure you select a location.", 3);
    }
    if (addCustomEventDetails.eventTime.length === 0) {
      return message.error("Error, please make sure you select a time.", 3);
    }

    const itineraryDay = itineraryData[tripDayKey];

    const itemToAdd = {
      eventName: addCustomEventDetails.eventName,
      location: addCustomEventDetails.eventPlace,
      date: new Date(itineraryDay.date),
      time: addCustomEventDetails.eventTimeString[0],
      city: addCustomEventDetails.eventPlace,
      country: addCustomEventDetails.eventPlace,
      longitude: addCustomEventDetails.eventLocation.lng,
      latitude: addCustomEventDetails.eventLocation.lat,
      postalCode: "",
      expectedDuration: differenceInMinutes(
        addCustomEventDetails.eventTime[1],
        addCustomEventDetails.eventTime[0]
      ),
      eventImage: addCustomEventDetails.eventPlaceImage,
    };

    itineraryDay.customEvents.push({
      item: itemToAdd,
      customNote: "",
      startTime: addCustomEventDetails.eventTimeString[0],
      endTime: addCustomEventDetails.eventTimeString[1],
      numberOfPeople: tripPlanningData.numberOfTraveler,
      customNoteStatus: false,
      mapColor: tripPlanningData.tripDaysColors[tripDayKey],
    });

    // on successful, display success message
    Swal.fire({
      title: "Success!",
      text: "You have successfully added custom event.",
      icon: "success",
      confirmButtonText: "Ok",
    });

    setAddCustomEvent(false);
    setAddCustomEventDetails({
      eventName: "",
      eventPlace: "",
      eventTime: [],
      eventTimeString: [],
      eventLocation: { lat: 0, lng: 0 },
      eventPlaceImage: "",
    });
  };

  return (
    <div className="w_100">
      {tripMenu &&
        tripMenu.length > 0 &&
        tripMenu.map((item, tripDayKey) => (
          <div className="m_b_20 w_100" key={tripDayKey}>
            <div
              className="itinerary_day_column"
              onClick={() => handleMenuClick(tripDayKey)}
              id={item.arrayName}
              data-itinerary-data={tripMenu[tripDayKey]?.stateOfClass}
            >
              <div className="trip_planning_menu_row">
                {tripMenu[tripDayKey]?.stateOfClass ? (
                  <span>
                    <IoIosArrowDown className="trip_planning_arrow_drop" />
                  </span>
                ) : (
                  <span>
                    <IoIosArrowForward className="trip_planning_arrow_drop" />
                  </span>
                )}

                <div className="trip_planning_itinerary_menu w_90">
                  <h4 className="medium_title">
                    <span className="trip_planning_itinerary_menu_date">
                      {item.id}
                    </span>{" "}
                    Day {item.id}
                  </h4>
                  <h4 className="medium_title">{`${item.day}, ${
                    item.date
                  }${dateSuffix(item.date)} ${item.month}`}</h4>
                </div>
              </div>

              {/* Check if the item is not open and display the number of attraction in it, i.e when it is open, it hides it */}
              {!tripMenu[tripDayKey]?.stateOfClass ? (
                <div className="trip_planning_itinerary_menu w_90">
                  <p className="small_title">
                    {itineraryData[tripDayKey].itineraries.length} attraction
                    {itineraryData[tripDayKey].itineraries.length > 1
                      ? "s"
                      : ""}{" "}
                    added, {itineraryData[tripDayKey].customEvents.length}{" "}
                    custom event
                    {itineraryData[tripDayKey].customEvents.length > 1
                      ? "s"
                      : ""}{" "}
                    added
                  </p>
                </div>
              ) : null}
            </div>

            {/* Map the data in their itinerary array, first chacking the stateOfClass then display the itineraries */}
            {tripMenu[tripDayKey]?.stateOfClass ? (
              <>
                {/* Attractions display */}
                <div>
                  {itineraryData[tripDayKey].itineraries.length > 0 ? (
                    itineraryData[tripDayKey].itineraries.map(
                      (itinerary, itineraryKey) => (
                        <div
                          className="itinerary_display_card_container"
                          key={itineraryKey}
                        >
                          <div className="itinerary_display_card_details app_row w_100">
                            <div className="itinerary_display_card_image">
                              <img
                                style={{
                                  width: "100%",
                                  height: "100px",
                                }}
                                src={itinerary.item.imageUrl}
                                alt=""
                              />
                            </div>
                            <div className="itinerary_display_card_info">
                              <p className="itinerary_display_card_title">
                                {itinerary.item.title}
                              </p>
                              <p className="itinerary_display_card_desc">
                                {itinerary.item.description.slice(0, 100)}...
                              </p>
                              <div className="itinerary_display_card_info_row">
                                <Tooltip
                                  placement="top"
                                  title={
                                    itinerary.item?.location
                                      ? itinerary.item.location
                                      : itinerary.item.city
                                  }
                                >
                                  <span className="itinerary_display_card_direction_tag">
                                    <MdLocationOn />
                                  </span>
                                </Tooltip>
                                <TimePicker.RangePicker
                                  className="itinerary_display_card_time"
                                  onChange={(time, timeString) =>
                                    handleTimeChange(
                                      "attraction",
                                      time,
                                      timeString,
                                      tripDayKey,
                                      itineraryKey
                                    )
                                  }
                                  defaultValue={[
                                    moment(
                                      itinerary.startTime !== ""
                                        ? itinerary.startTime
                                        : "09:00:00",
                                      "HH:mm:ss"
                                    ),
                                    moment(
                                      itinerary.endTime !== ""
                                        ? itinerary.endTime
                                        : "09:00:00",
                                      "HH:mm:ss"
                                    ),
                                  ]}
                                />
                                <Select
                                  defaultValue={{
                                    value: itinerary.numberOfPeople,
                                    label: itinerary.numberOfPeople,
                                  }}
                                  onChange={(value) =>
                                    handleNumberOfPeopleChange(
                                      "attraction",
                                      value,
                                      tripDayKey,
                                      itineraryKey
                                    )
                                  }
                                  className="itinerary_display_card_select"
                                >
                                  <Option value="1">1</Option>
                                  <Option value="2">2</Option>
                                  <Option value="3">3</Option>
                                  <Option value="4">4</Option>
                                  <Option value="5">5</Option>
                                  <Option value="6">6</Option>
                                  <Option value="7">7</Option>
                                  <Option value="8">8</Option>
                                  <Option value="9">9</Option>
                                  <Option value="10">10</Option>
                                </Select>
                                <span
                                  className="itinerary_display_card_direction_tag m_l_10"
                                  onClick={() =>
                                    handleCustomNote(
                                      "attraction",
                                      tripDayKey,
                                      itineraryKey
                                    )
                                  }
                                >
                                  <BsFillPencilFill />
                                </span>
                                <span
                                  className="itinerary_display_delete_button"
                                  onClick={() =>
                                    handleDelete(
                                      "attraction",
                                      tripDayKey,
                                      itineraryKey
                                    )
                                  }
                                >
                                  <ImCancelCircle />
                                </span>
                              </div>
                            </div>
                          </div>
                          {itinerary.customNoteStatus ? (
                            <div
                              className="w_100 d-flex flex-row align-items-center mt-2"
                              key={itineraryKey}
                            >
                              <input
                                defaultValue={itinerary.customNote}
                                onChange={(e) =>
                                  handleCustomNoteChange(
                                    "attraction",
                                    e,
                                    tripDayKey,
                                    itineraryKey
                                  )
                                }
                                className="w_90 custom_input m_5 m_r_10"
                                type="text"
                                name=""
                                id=""
                                placeholder="Add custom Note"
                              />
                              <span
                                className="itinerary_display_card_direction_tag w_10"
                                onClick={() =>
                                  handleCustomNote(
                                    "attraction",
                                    tripDayKey,
                                    itineraryKey
                                  )
                                }
                              >
                                <FaSave />
                              </span>
                            </div>
                          ) : null}
                        </div>
                      )
                    )
                  ) : (
                    <div className="itinerary_display_no_card_container">
                      <h3 className="fs-5">You have no Item on this day</h3>
                    </div>
                  )}
                </div>

                <div className="mb-4 mt-5">
                  <h4 className="fs-6 text-center fw-bold">Custom Events</h4>
                </div>

                {/* Custom Events display */}
                <div>
                  {itineraryData[tripDayKey].customEvents.length > 0 ? (
                    itineraryData[tripDayKey].customEvents.map(
                      (customEvent, customEventKey) => (
                        <div
                          className="itinerary_display_card_container"
                          key={customEventKey}
                        >
                          <div className="itinerary_display_card_details app_row w_100">
                            <div className="itinerary_display_card_image">
                              <img
                                style={{
                                  width: "100%",
                                  height: "100px",
                                }}
                                src={customEvent.item.eventImage}
                                alt=""
                              />
                            </div>
                            <div className="itinerary_display_card_info">
                              <p className="itinerary_display_card_title">
                                {customEvent.item.eventName}
                              </p>
                              {/* <p className="itinerary_display_card_desc">
                                  {customEvent.item.description.slice(0, 100)}...
                                </p> */}
                              <div className="itinerary_display_card_info_row">
                                <Tooltip
                                  placement="top"
                                  title={
                                    customEvent.item?.location
                                      ? customEvent.item.location
                                      : customEvent.item.city
                                  }
                                >
                                  <span className="itinerary_display_card_direction_tag">
                                    <MdLocationOn />
                                  </span>
                                </Tooltip>
                                <TimePicker.RangePicker
                                  className="itinerary_display_card_time"
                                  onChange={(time, timeString) =>
                                    handleTimeChange(
                                      "customEvent",
                                      time,
                                      timeString,
                                      tripDayKey,
                                      customEventKey
                                    )
                                  }
                                  defaultValue={[
                                    moment(
                                      customEvent.startTime !== ""
                                        ? customEvent.startTime
                                        : "09:00:00",
                                      "HH:mm:ss"
                                    ),
                                    moment(
                                      customEvent.endTime !== ""
                                        ? customEvent.endTime
                                        : "09:00:00",
                                      "HH:mm:ss"
                                    ),
                                  ]}
                                />
                                <Select
                                  defaultValue={{
                                    value: customEvent.numberOfPeople,
                                    label: customEvent.numberOfPeople,
                                  }}
                                  onChange={(value) =>
                                    handleNumberOfPeopleChange(
                                      "customEvent",
                                      value,
                                      tripDayKey,
                                      customEventKey
                                    )
                                  }
                                  className="itinerary_display_card_select"
                                >
                                  <Option value="1">1</Option>
                                  <Option value="2">2</Option>
                                  <Option value="3">3</Option>
                                  <Option value="4">4</Option>
                                  <Option value="5">5</Option>
                                  <Option value="6">6</Option>
                                  <Option value="7">7</Option>
                                  <Option value="8">8</Option>
                                  <Option value="9">9</Option>
                                  <Option value="10">10</Option>
                                </Select>
                                <span
                                  className="itinerary_display_card_direction_tag m_l_10"
                                  onClick={() =>
                                    handleCustomNote(
                                      "customEvent",
                                      tripDayKey,
                                      customEventKey
                                    )
                                  }
                                >
                                  <BsFillPencilFill />
                                </span>
                                <span
                                  className="itinerary_display_delete_button"
                                  onClick={() =>
                                    handleDelete(
                                      "customEvent",
                                      tripDayKey,
                                      customEventKey
                                    )
                                  }
                                >
                                  <ImCancelCircle />
                                </span>
                              </div>
                            </div>
                          </div>
                          {customEvent.customNoteStatus ? (
                            <div
                              className="w_100 d-flex flex-row align-items-center mt-2"
                              key={customEventKey}
                            >
                              <input
                                defaultValue={customEvent.customNote}
                                onChange={(e) =>
                                  handleCustomNoteChange(
                                    "customEvent",
                                    e,
                                    tripDayKey,
                                    customEventKey
                                  )
                                }
                                className="w_90 custom_input m_5 m_r_10"
                                type="text"
                                name=""
                                id=""
                                placeholder="Add custom Note"
                              />
                              <span
                                className="itinerary_display_card_direction_tag w_10"
                                onClick={() =>
                                  handleCustomNote(
                                    "customEvent",
                                    tripDayKey,
                                    customEventKey
                                  )
                                }
                              >
                                <FaSave />
                              </span>
                            </div>
                          ) : null}
                        </div>
                      )
                    )
                  ) : (
                    <div className="itinerary_display_no_card_container mb-4">
                      <h3 className="fs-6">
                        You have no custom events on this day
                      </h3>
                    </div>
                  )}
                </div>

                {/* Add Custom Event */}
                <div>
                  {addCustomEvent ? (
                    <div className="w-100">
                      <div className="">
                        <input
                          defaultValue=""
                          onChange={(e) => {
                            handleCustomEventDetails(
                              "eventName",
                              e.target.value
                            );
                          }}
                          className="w-100 custom_input m_5 m_r_10"
                          type="text"
                          name=""
                          id=""
                          placeholder="Event Name"
                        />
                      </div>
                      <div className="w_100 d-flex flex-row flex-wrap gap-3 gap-sm-0 flex-sm-nowrap align-items-center my-3">
                        <div className="m_r_5 col-sm-6 col-12 col-xl-6">
                          <Autocomplete
                            apiKey={GOOGLEAPIKEY}
                            onPlaceSelected={(selected: any) => {
                              console.log(selected);
                              handleCustomEventDetails(
                                "eventPlace",
                                selected.formatted_address
                              );
                              handleCustomEventDetails("eventLocation", {
                                lat: selected.geometry.location.lat(),
                                lng: selected.geometry.location.lng(),
                              });
                              handleCustomEventDetails(
                                "eventPlaceImage",
                                selected.photos[0].getUrl()
                              );
                            }}
                            options={{
                              types: [],
                              fields: ["All"],
                            }}
                            placeholder="Event Location"
                            className="custom_input w-100 mb-0 mt-0"
                            id="country_input"
                          />
                        </div>
                        <div className="col-sm-6 col-12 col-xl-6">
                          <TimePicker.RangePicker
                            className="itinerary_display_card_time w-100 mb-0"
                            onChange={(time, timeString) => {
                              handleCustomEventDetails("eventTime", time);
                              handleCustomEventDetails(
                                "eventTimeString",
                                timeString
                              );
                            }}
                            defaultValue={[
                              moment("09:00:00", "HH:mm:ss"),
                              moment("09:00:00", "HH:mm:ss"),
                            ]}
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          className="custom_button"
                          onClick={() =>
                            addCustomEventDetailsToItinerary(tripDayKey)
                          }
                        >
                          Add
                        </button>
                        <button
                          className="custom_button bg-danger"
                          onClick={() => setAddCustomEvent(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="text-center mt-3 mb-5"
                      onClick={() => setAddCustomEvent(true)}
                    >
                      <h4 className="fs-6">
                        <BsFillPlusCircleFill className="plus_icon" /> Add
                        custom Event
                      </h4>
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        ))}

      {/* <Autocomplete
        apiKey={GOOGLEAPIKEY}
        onPlaceSelected={(selected: any) => {
          console.log(selected);
        }}
        options={{
          types: [],
          fields: ["formatted_address"],
        }}
        placeholder="Where do you live?"
        className="custom_input w-100 mb-0 mt-0 d-none"
        id="load_api"
      /> */}
    </div>
  );
};

export default Itinerary;

/* <div className="itinerary_display_card_container">
<div className="itinerary_display_card_image">
  <img
    style={{
      width: "100%",
      height: "100px",
    }}
    src="https://images.pexels.com/photos/12987389/pexels-photo-12987389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    alt=""
  />
</div>
<div className="itinerary_display_card_info">
  <p className="itinerary_display_card_title">{getExplore.title}</p>
  <p className="itinerary_display_card_desc">{getExplore.description}</p>
  <div className="itinerary_display_card_info_row">
    <Tooltip placement="top" title="Direction">
      <span className="itinerary_display_card_direction_tag">
        <MdLocationOn />
      </span>
    </Tooltip>
    <TimePicker
      className="itinerary_display_card_time"
      defaultValue={moment("09:00:00", "HH:mm:ss")}
    />
    <Select
      labelInValue
      defaultValue={{ value: "1", label: "1" }}
      onChange={handleNumberOfPeopleChange}
    >
      <Option value="1">1</Option>
      <Option value="2">2</Option>
      <Option value="3">3</Option>
      <Option value="4">4</Option>
      <Option value="5">5</Option>
      <Option value="6">6</Option>
      <Option value="7">7</Option>
      <Option value="8">8</Option>
      <Option value="9">9</Option>
      <Option value="10">10</Option>
    </Select>
  </div>
</div>
</div> */

// <div className="itinerary_display_card_container">
// <div className="itinerary_display_card_image">
//   <img
//     style={{
//       width: "100%",
//       height: "100px",
//     }}
//     src={item.imageUrl}
//     alt=""
//   />
// </div>
// <div className="itinerary_display_card_info">
//   <p className="itinerary_display_card_title">{item.title}</p>
//   <p className="itinerary_display_card_desc">
//     {item.description.slice(0, 100)}...
//   </p>
//   <div className="itinerary_display_card_info_row">
//     <Tooltip placement="top" title="Direction">
//       <span className="itinerary_display_card_direction_tag">
//         <MdLocationOn />
//       </span>
//     </Tooltip>
//     <TimePicker
//       className="itinerary_display_card_time"
//       defaultValue={moment("09:00:00", "HH:mm:ss")}
//     />
//     <Select
//       labelInValue
//       defaultValue={{ value: "1", label: "1" }}
//       onChange={handleNumberOfPeopleChange}
//     >
//       <Option value="1">1</Option>
//       <Option value="2">2</Option>
//       <Option value="3">3</Option>
//       <Option value="4">4</Option>
//       <Option value="5">5</Option>
//       <Option value="6">6</Option>
//       <Option value="7">7</Option>
//       <Option value="8">8</Option>
//       <Option value="9">9</Option>
//       <Option value="10">10</Option>
//     </Select>
//   </div>
// </div>
// </div>
