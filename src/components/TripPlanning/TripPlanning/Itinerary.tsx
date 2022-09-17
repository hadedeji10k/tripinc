import { useState, useEffect } from "react";
import { Tooltip, TimePicker, Select } from "antd";
import "antd/dist/antd.min.css";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";
import {
  generateItineraryMenuObject,
  dateSuffix,
} from "../../../utils/helpers";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import { ImCancelCircle } from "react-icons/im";
import { BsFillPencilFill } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { ITripPlanningItineraryDay } from "../../../api/interfaces";
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

  useEffect(() => {
    const result = generateItineraryMenuObject(tripDays);
    setTripMenu(result);
  }, [tripDays]);

  // function to handle faqs click
  const handleMenuClick = (id: any) => {
    let prevState = tripMenu[id].stateOfClass;
    for (let i = 0; i < tripMenu.length; i++) {
      tripMenu[i].stateOfClass = false;
    }
    tripMenu[id].stateOfClass = !prevState;
    setTripMenu([...tripMenu]);
  };

  const handleNumberOfPeopleChange = (value, tripDayKey, itineraryKey) => {
    // { value: "lucy", key: "lucy", label: "Lucy (101)" }
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
        text: "Number of people cannot be changed, you budget is running low. Try increasing your budget, and try again.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    setTripPlanningData({
      ...tripPlanningData,
      spentBudget: tripPlanningData.spentBudget + amountToAdd - amountToDeduct,
    });
    // change the numberOfPeople
    itemToEdit.numberOfPeople = value;
    setItineraryData([...itineraryData]);
  };

  const handleCustomNoteChange = (e, tripDayKey, itineraryKey) => {
    e.preventDefault();
    // get the day's itinerary array
    const itineraryDay = itineraryData[tripDayKey];
    // get the item using the key from the array
    let itemToEdit = itineraryDay.itineraries[itineraryKey];
    // change the time
    itemToEdit.customNote = e.target.value;
    setItineraryData([...itineraryData]);
    console.log(itineraryData);
  };

  const handleCustomNote = (tripDayKey, itineraryKey) => {
    // get the day's itinerary array
    const itineraryDay = itineraryData[tripDayKey];
    // get the item using the key from the array
    let itemToEdit = itineraryDay.itineraries[itineraryKey];
    // change the note status
    itemToEdit.customNoteStatus = !itemToEdit.customNoteStatus;
    setItineraryData([...itineraryData]);
    console.log(itineraryData);
  };

  const handleDelete = (tripDayKey, itineraryKey) => {
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
        const itineraryDay = itineraryData[tripDayKey];

        // find the item to remove and number of people to remove the price from spentBudget
        const selectedItemToDelete = itineraryDay.itineraries[itineraryKey];
        const amountToDeduct =
          selectedItemToDelete.numberOfPeople * selectedItemToDelete.item.price;
        setTripPlanningData({
          ...tripPlanningData,
          spentBudget: tripPlanningData.spentBudget - amountToDeduct,
        });

        // filter the data and save
        const diff = itineraryDay.itineraries.filter(
          (item, key) => key !== parseInt(itineraryKey)
        );
        itineraryDay.itineraries = diff;
        setItineraryData([...itineraryData]);
      }
    });
  };

  const handleTimeChange = (time, timeString, tripDayKey, itineraryKey) => {
    // get the day's itinerary array
    const itineraryDay = itineraryData[tripDayKey];
    // get the item using the key from the array
    let itemToEdit = itineraryDay.itineraries[itineraryKey];
    // change the time
    itemToEdit.startTime = timeString[0];
    itemToEdit.endTime = timeString[1];
    console.log(itineraryData);
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
                    added
                  </p>
                </div>
              ) : null}
            </div>

            {/* Map the data in their itinerary array, first chacking the stateOfClass then display the itineraries */}
            {tripMenu[tripDayKey]?.stateOfClass ? (
              itineraryData[tripDayKey].itineraries.length > 0 ? (
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
                                handleCustomNote(tripDayKey, itineraryKey)
                              }
                            >
                              <BsFillPencilFill />
                            </span>
                            <span
                              className="itinerary_display_delete_button"
                              onClick={() =>
                                handleDelete(tripDayKey, itineraryKey)
                              }
                            >
                              <ImCancelCircle />
                            </span>
                          </div>
                        </div>
                      </div>
                      {itinerary.customNoteStatus ? (
                        <div
                          className="itinerary_display_custom_note_container app_row w_100"
                          key={itineraryKey}
                        >
                          <input
                            defaultValue={itinerary.customNote}
                            onChange={(e) =>
                              handleCustomNoteChange(
                                e,
                                tripDayKey,
                                itineraryKey
                              )
                            }
                            className="w_90 basic_details_input m_5"
                            type="text"
                            name=""
                            id=""
                            placeholder="Add custom Note"
                          />
                          <span
                            className="itinerary_display_card_direction_tag w_10"
                            onClick={() =>
                              handleCustomNote(tripDayKey, itineraryKey)
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
                  <h3>You have no Item on this day</h3>
                </div>
              )
            ) : null}
          </div>
        ))}
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
