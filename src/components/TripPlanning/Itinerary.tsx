import { useState, useEffect } from "react";
import { Tooltip, TimePicker, Select } from "antd";
import "antd/dist/antd.min.css";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";
import { generateItineraryMenuObject, dateSuffix } from "../../utils/helpers";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import { ImCancelCircle } from "react-icons/im";
import { BsFillPencilFill } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
const { Option } = Select;

interface ItineraryProps {
  tripDays: any;
  setTripDays: any;
  itineraryData: any;
  setItineraryData: any;
}

const Itinerary = ({
  tripDays,
  setTripDays,
  itineraryData,
  setItineraryData,
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

  const handleChange = (
    value: { value: string; label: React.ReactNode },
    itineraryDate,
    itemKey
  ) => {
    // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    // get the day's itinerary array
    const itineraryDay = itineraryData[itineraryDate];
    // get the item using the key from the array
    let itemToEdit = itineraryDay[itemKey];
    // change the time
    itemToEdit.numberOfPeople = value;
    // then set the itineraryData to the edited
    setItineraryData({
      ...itineraryData,
      [itineraryDate]: itineraryDay,
    });
  };

  const handleCustomNoteChange = (e, itineraryDate, itemKey) => {
    e.preventDefault();
    // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    // get the day's itinerary array
    const itineraryDay = itineraryData[itineraryDate];
    // get the item using the key from the array
    let itemToEdit = itineraryDay[itemKey];
    // change the time
    itemToEdit.customNote = e.target.value;
    // then set the itineraryData to the edited
    setItineraryData({
      ...itineraryData,
      [itineraryDate]: itineraryDay,
    });
  };

  const handleCustomNote = (itineraryDate, itemKey) => {
    // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    // get the day's itinerary array
    const itineraryDay = itineraryData[itineraryDate];
    // get the item using the key from the array
    let itemToEdit = itineraryDay[itemKey];
    // change the time
    itemToEdit.customNoteStatus = !itemToEdit.customNoteStatus;
    // then set the itineraryData to the edited
    setItineraryData({
      ...itineraryData,
      [itineraryDate]: itineraryDay,
    });
  };

  const handleDelete = (itineraryDate, itemKey) => {
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
        const itineraryDay = itineraryData[itineraryDate];
        const filteredArray = itineraryDay.filter(
          (item, key) => key !== parseInt(itemKey)
        );
        setItineraryData({
          ...itineraryData,
          [itineraryDate]: filteredArray,
        });
      }
    });
  };

  const handleTimeChange = (time, timeString, itineraryDate, itemKey) => {
    // get the day's itinerary array
    const itineraryDay = itineraryData[itineraryDate];
    // get the item using the key from the array
    let itemToEdit = itineraryDay[itemKey];
    // change the time
    itemToEdit.startTime = timeString[0];
    itemToEdit.endTime = timeString[1];
    // then set the itineraryData to the edited
    setItineraryData({
      ...itineraryData,
      [itineraryDate]: itineraryDay,
    });
    console.log("Updated >>>>>>");
    console.log(itineraryData);
  };

  return (
    <div className="w_100">
      {tripMenu &&
        tripMenu.length > 0 &&
        tripMenu.map((item, key) => (
          <div className="m_b_20 w_100" key={key}>
            <div
              className="trip_planning_menu_row"
              onClick={() => handleMenuClick(key)}
              id={item.arrayName}
              data-itinerary-data={tripMenu[key]?.stateOfClass}
            >
              {tripMenu[key]?.stateOfClass ? (
                <span>
                  <IoIosArrowDown className="trip_planning_arrow_drop" />
                </span>
              ) : (
                <span>
                  <IoIosArrowForward className="trip_planning_arrow_drop" />
                </span>
              )}

              <div className="trip_planning_itinerary_menu w_90">
                <h4 className="general_faq_question">
                  <span className="trip_planning_itinerary_menu_date">
                    {item.id}
                  </span>{" "}
                  Day {item.id}
                </h4>
                <h4 className="general_faq_question">{`${item.day}, ${
                  item.date
                }${dateSuffix(item.date)} ${item.month}`}</h4>
              </div>
            </div>

            {/* Map the data in their itinerary array */}
            {tripMenu[key]?.stateOfClass ? (
              itineraryData[item.arrayName].length > 0 ? (
                itineraryData[item.arrayName].map((itinerary, key) => (
                  <div className="itinerary_display_card_container" key={key}>
                    <div className="itinerary_display_card_details row w_100">
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
                                item.arrayName,
                                key
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
                            defaultValue={{ value: "1", label: "The1" }}
                            onChange={(value) =>
                              handleChange(value, item.arrayName, key)
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
                            className="itinerary_display_card_direction_tag"
                            onClick={() =>
                              handleCustomNote(item.arrayName, key)
                            }
                          >
                            <BsFillPencilFill />
                          </span>
                          <span
                            className="itinerary_display_delete_button"
                            onClick={() => handleDelete(item.arrayName, key)}
                          >
                            <ImCancelCircle />
                          </span>
                        </div>
                      </div>
                    </div>
                    {itinerary.customNoteStatus ? (
                      <div className="itinerary_display_custom_note_container row w_100">
                        <input
                          defaultValue={itinerary.customNote}
                          onChange={(e) =>
                            handleCustomNoteChange(e, item.arrayName, key)
                          }
                          className="w_90 basic_details_input"
                          type="text"
                          name=""
                          id=""
                          placeholder="Add custom Note"
                        />
                        <span className="itinerary_display_card_direction_tag w_10">
                          <FaSave />
                        </span>
                      </div>
                    ) : null}
                  </div>
                ))
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
      onChange={handleChange}
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
//       onChange={handleChange}
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
