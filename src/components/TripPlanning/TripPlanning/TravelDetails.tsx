import { useFormik } from "formik";
import { useState } from "react";
import { DatePicker, TimePicker } from "antd";
import "antd/dist/antd.min.css";
import moment from "moment";
import { AddFlightSchema } from "../../../schema/yupSchema";
import Swal from "sweetalert2";
import { ITravelDetails } from "../../../api/interfaces";
import { MdModeEditOutline } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { BsCalendarCheck } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { monthNames } from "../../../utils/constants";

interface Props {
  travelDetails: ITravelDetails;
  setTravelDetails: any;
}

const TravelDetails = ({ travelDetails, setTravelDetails }: Props) => {
  const [showAddDetails, setShowAddDetails] = useState<boolean>(true);
  const [showAddFlightDetails, setShowAddFlightDetails] =
    useState<boolean>(false);
  const [showEditFlightDetails, setShowEditFlightDetails] =
    useState<boolean>(false);
  const [flightToEdit, setFlightToEdit] = useState({
    id: 0,
    flightName: "",
    airportName: "",
    arrivalTime: "",
    arrivalDate: "",
  });
  // const [showAddStayDetails, setShowAddStayDetails] = useState<boolean>(false);

  const [availableFlightsOpen, setAvailableFlightsOpen] =
    useState<boolean>(false);

  let initialValues = {
    flightName: "",
    airportName: "",
    arrivalTime: "",
    arrivalDate: "",
  };

  // const onSubmit = async (data: any) => {
  //   console.log(data);
  // };

  // const onChange = (time, timeString) => {
  //   console.log(time, timeString);
  // };

  const editFlight = (id: number) => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to edit your flight details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Edit!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const selectedFlight = travelDetails.flights.filter(
          (item, index) => index === id
        );
        console.log({
          id,
          flightName: selectedFlight[0].flightName,
          airportName: selectedFlight[0].airportName,
          arrivalTime: selectedFlight[0].time,
          arrivalDate: selectedFlight[0].date,
        });

        setFlightToEdit({
          id,
          flightName: selectedFlight[0].flightName,
          airportName: selectedFlight[0].airportName,
          arrivalTime: selectedFlight[0].time,
          arrivalDate: selectedFlight[0].date,
        });
        setAvailableFlightsOpen(false);
        setShowEditFlightDetails(true);
        setShowAddDetails(false);
      }
    });
  };

  const flightClick = (action?: any, type?: string) => {
    if (action === "cancel") {
      if (type === "add") {
        Swal.fire({
          title: "Warning!",
          text: "Are you sure you want to cancel all your changes?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, cancel!",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        }).then(async (result) => {
          if (result.isConfirmed) {
            setShowAddDetails((prev) => !prev);
            setShowAddFlightDetails((prev) => !prev);
          }
        });
      } else if (type === "edit") {
        Swal.fire({
          title: "Warning!",
          text: "Are you sure you want to cancel all your changes?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, cancel!",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        }).then(async (result) => {
          if (result.isConfirmed) {
            setShowEditFlightDetails((prev) => !prev);
            setShowAddDetails((prev) => !prev);
          }
        });
      }
    } else {
      setShowAddDetails((prev) => !prev);
      setShowAddFlightDetails((prev) => !prev);
    }
  };

  const addFlight = (data: any, type: string) => {
    // customize date and time

    if (type === "add") {
      const date = new Date(data.arrivalDate),
        day = date.getDate(),
        month = monthNames[date.getMonth()],
        timeCombo = `${day} ${month}, ${data.arrivalTime}`,
        dateDetails = {
          day,
          month,
          arrivalTime: data.arrivalTime,
        };

      const newFlight = {
        flightName: data.flightName,
        airportName: data.airportName,
        dateDetails,
        timeCombo,
        date: data.arrivalDate,
        time: data.arrivalTime,
      };

      const prevArray = travelDetails?.flights;

      setTravelDetails({
        ...travelDetails,
        flights: [...prevArray, newFlight],
      });

      Swal.fire({
        title: "Success!",
        text: "Flight details added successfully",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          setShowAddDetails((prev) => !prev);
          setShowAddFlightDetails((prev) => !prev);
        }
      });
    } else if (type === "edit") {
      const date = new Date(
          data.arrivalDate ? data.arrivalDate : flightToEdit.arrivalDate
        ),
        day = date.getDate(),
        month = monthNames[date.getMonth()],
        timeCombo = `${day} ${month}, ${
          data.arrivalTime ? data.arrivalTime : flightToEdit.arrivalTime
        }`,
        dateDetails = {
          day,
          month,
          arrivalTime: data.arrivalTime
            ? data.arrivalTime
            : flightToEdit.arrivalTime,
        };

      const newFlight = {
        flightName: data.flightName ? data.flightName : flightToEdit.flightName,
        airportName: data.airportName
          ? data.airportName
          : flightToEdit.airportName,
        dateDetails,
        timeCombo,
        date: data.arrivalDate ? data.arrivalDate : flightToEdit.arrivalDate,
        time: data.arrivalTime ? data.arrivalTime : flightToEdit.arrivalTime,
      };

      const prevArray = travelDetails?.flights.filter(
        (item, index) => index !== Number(data.id)
      );

      setTravelDetails({
        ...travelDetails,
        flights: [...prevArray, newFlight],
      });

      Swal.fire({
        title: "Success!",
        text: "Flight details edited successfully",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          setShowEditFlightDetails(false);
          setShowAddDetails((prev) => !prev);
        }
      });
      setFlightToEdit({
        id: 0,
        flightName: "",
        airportName: "",
        arrivalTime: "",
        arrivalDate: "",
      });
    }
  };

  const handleDeleteFlight = (id: any) => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to delete this flight details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const travelDetailsArr = travelDetails.flights?.filter(
          (item, key) => key !== id
        );
        setTravelDetails({
          ...travelDetails,
          flights: travelDetailsArr,
        });
      }
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: AddFlightSchema,
    onSubmit: (values) => {
      addFlight(values, "add");
    },
  });

  const editFormik = useFormik({
    initialValues: flightToEdit,
    onSubmit: (values) => {
      addFlight(values, "edit");
    },
  });

  return (
    <div style={{ width: "100%" }}>
      <div className="">
        {showAddDetails ? (
          <div className="travel_details_menu_container">
            <div className="travel_details_tag" onClick={flightClick}>
              <span className="travel_details_add">+</span>
              Flights
            </div>
            <div className="travel_details_tag">
              <span className="travel_details_add">+</span>
              Stay
            </div>
            {/* <div className="travel_details_tag">
          <span className="travel_details_add">+</span>
          Rental Car
        </div> */}
          </div>
        ) : null}

        {/* Add flight form */}
        {showAddFlightDetails ? (
          <>
            {/* Formik */}

            <form
              onSubmit={formik.handleSubmit}
              autoComplete="off"
              className="sign_in_form w_100 align-items-start"
            >
              <div className="w_100">
                <label className="signin_label">Name Of Flight</label>
                <input
                  name="flightName"
                  className="signin_input w_80"
                  type="text"
                  placeholder="Enter the name of the flight"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.flightName && formik.touched.flightName ? (
                  <p className="red_alert">{formik.errors.flightName}</p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Name Of Airport</label>
                <input
                  name="airportName"
                  className="signin_input w_80"
                  type="text"
                  placeholder="Enter the name of the Airport"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.airportName && formik.touched.airportName ? (
                  <p className="red_alert">{formik.errors.airportName}</p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Time of Arrival</label>

                <TimePicker
                  style={{ display: "inline-flex" }}
                  className="signin_input m_b_15 w_80 travel_details_time_picker"
                  onChange={(time, timeString) => {
                    console.log(time, timeString);
                    formik.setFieldValue("arrivalTime", timeString);
                  }}
                  name="arrivalTime"
                  defaultValue={moment("00:00:00", "HH:mm:ss")}
                />
                {formik.errors.arrivalTime && formik.touched.arrivalTime ? (
                  <p className="red_alert">{formik.errors.arrivalTime}</p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Date of Arrival</label>
                <DatePicker
                  className="signin_input w_80 travel_details_time_picker"
                  onChange={(date, dateString) =>
                    formik.setFieldValue("arrivalDate", dateString)
                  }
                  name="arrivalDate"
                  defaultValue={moment()}
                />
                {formik.errors.arrivalDate && formik.touched.arrivalDate ? (
                  <p className="red_alert">{formik.errors.arrivalDate}</p>
                ) : null}
              </div>

              <div className="travel_details_button_container">
                <button className="signin_button me-3" type="submit">
                  Add flight
                </button>
                <span
                  className="signin_button bg-danger text-center"
                  onClick={() => flightClick("cancel", "add")}
                >
                  Cancel
                </span>
              </div>
            </form>
          </>
        ) : null}
        {/* End of Add Flight Form */}

        {/* Edit flight form */}
        {showEditFlightDetails ? (
          <>
            {/* Formik */}
            <form
              onSubmit={editFormik.handleSubmit}
              autoComplete="off"
              className="sign_in_form w_100 align-items-start"
            >
              <div className="w_100">
                <label className="signin_label">Name Of Flight</label>
                <input
                  name="flightName"
                  className="signin_input w_80"
                  type="text"
                  placeholder="Enter the name of the flight"
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  defaultValue={flightToEdit.flightName}
                />
                {editFormik.errors.flightName &&
                editFormik.touched.flightName ? (
                  <p className="red_alert">{editFormik.errors.flightName}</p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Name Of Airport</label>
                <input
                  name="airportName"
                  className="signin_input w_80"
                  type="text"
                  placeholder="Enter the name of the Airport"
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  defaultValue={flightToEdit.airportName}
                />
                {editFormik.errors.airportName &&
                editFormik.touched.airportName ? (
                  <p className="red_alert">{editFormik.errors.airportName}</p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Time of Arrival</label>

                <TimePicker
                  style={{ display: "inline-flex" }}
                  className="signin_input m_b_15 w_80 travel_details_time_picker"
                  onChange={(time, timeString) => {
                    console.log(time, timeString);
                    editFormik.setFieldValue("arrivalTime", timeString);
                  }}
                  name="arrivalTime"
                  defaultValue={moment(flightToEdit.arrivalTime, "HH:mm:ss")}
                />
                {editFormik.errors.arrivalTime &&
                editFormik.touched.arrivalTime ? (
                  <p className="red_alert">{editFormik.errors.arrivalTime}</p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Date of Arrival</label>
                <DatePicker
                  className="signin_input w_80 travel_details_time_picker"
                  onChange={(date, dateString) =>
                    editFormik.setFieldValue("arrivalDate", dateString)
                  }
                  name="arrivalDate"
                  defaultValue={moment(flightToEdit.arrivalDate)}
                />
                {editFormik.errors.arrivalDate &&
                editFormik.touched.arrivalDate ? (
                  <p className="red_alert">{editFormik.errors.arrivalDate}</p>
                ) : null}
              </div>

              <div className="travel_details_button_container">
                <button className="signin_button me-3" type="submit">
                  Edit flight
                </button>
                <span
                  className="signin_button bg-danger text-center"
                  onClick={() => flightClick("cancel", "edit")}
                >
                  Cancel edit
                </span>
              </div>
            </form>
          </>
        ) : null}
        {/* End of Edit Flight Form */}

        {/* Display available flights*/}
        {travelDetails.flights && travelDetails.flights.length > 0 ? (
          <div className="available_flights_container">
            <div>
              <div
                className="trip_planning_menu_row m_b_10"
                onClick={() => setAvailableFlightsOpen((prev) => !prev)}
              >
                {availableFlightsOpen ? (
                  <span>
                    <IoIosArrowDown className="trip_planning_arrow_drop" />
                  </span>
                ) : (
                  <span>
                    <IoIosArrowForward className="trip_planning_arrow_drop" />
                  </span>
                )}

                <h4 className="general_faq_question">Flights</h4>
              </div>
            </div>
            {availableFlightsOpen
              ? travelDetails.flights.map((flight, key) => (
                  <div className="flights" key={key}>
                    <div className="flight_details_large_row">
                      <p className="flight_title">{flight.flightName}</p>
                      <p className="flight_description">{flight.airportName}</p>
                      <p className="flight_date">
                        <BsCalendarCheck /> {flight.timeCombo}
                        {/* <BsCalendarCheck /> Jan 24, 1e6:00 - 18:00 */}
                      </p>
                    </div>
                    <div className="flight_details_small_row">
                      <span
                        onClick={() => editFlight(key)}
                        className="flight_details_edit"
                      >
                        <MdModeEditOutline />
                      </span>
                      <span
                        className="flight_details_delete"
                        onClick={() => handleDeleteFlight(key)}
                      >
                        <GrClose />
                      </span>
                    </div>
                  </div>
                ))
              : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TravelDetails;
