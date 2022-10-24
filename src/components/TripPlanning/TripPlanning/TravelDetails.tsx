import { useFormik } from "formik";
import { useState } from "react";
import { DatePicker, TimePicker } from "antd";
import "antd/dist/antd.min.css";
import moment from "moment";
import { AddFlightSchema, AddStaySchema } from "../../../schema/yupSchema";
import Swal from "sweetalert2";
import { ITravelDetails } from "../../../api/interfaces";
import { MdModeEditOutline } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { BsCalendarCheck } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { monthNames } from "../../../utils/constants";
// import AddPlaceOfStay from "../../MessagePopup/AddPlaceOfPlace/AddPlaceOfStay";

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
  const [showAddStayDetails, setShowAddStayDetails] = useState<boolean>(false);
  const [showEditStayDetails, setShowEditStayDetails] =
    useState<boolean>(false);
  const [flightToEdit, setFlightToEdit] = useState({
    id: 0,
    flightName: "",
    airportName: "",
    arrivalTime: "",
    arrivalDate: "",
  });
  const [stayToEdit, setStayToEdit] = useState({
    id: 0,
    stayLocation: "",
    stayName: "",
    time: "",
    date: "",
  });
  // const [showAddStayDetails, setShowAddStayDetails] = useState<boolean>(false);

  const [availableFlightsOpen, setAvailableFlightsOpen] =
    useState<boolean>(false);
  const [availableStaysOpen, setAvailableStaysOpen] = useState<boolean>(false);

  const flightInitialValues = {
    flightName: "",
    airportName: "",
    arrivalTime: "",
    arrivalDate: "",
  };

  const stayInitialValues = {
    stayLocation: "",
    stayName: "",
    time: "",
    date: "",
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

      const editedFlight = {
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
        flights: [...prevArray, editedFlight],
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

        setFlightToEdit({
          id,
          flightName: selectedFlight[0].flightName,
          airportName: selectedFlight[0].airportName,
          arrivalTime: selectedFlight[0].time,
          arrivalDate: selectedFlight[0].date,
        });
        setAvailableFlightsOpen(false);
        setAvailableStaysOpen(false);
        setShowEditFlightDetails(true);
        setShowAddDetails(false);
      }
    });
  };

  const handleDeleteFlight = (id: any) => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to delete this flight details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
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

  const stayClick = (action?: any, type?: string) => {
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
            setShowAddStayDetails((prev) => !prev);
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
            setShowEditStayDetails((prev) => !prev);
            setShowAddDetails((prev) => !prev);
          }
        });
      }
    } else {
      setShowAddDetails((prev) => !prev);
      setShowAddStayDetails((prev) => !prev);
    }
  };

  const addStay = (data: any, type: string) => {
    // customize date and time

    if (type === "add") {
      const date = new Date(data.date),
        day = date.getDate(),
        month = monthNames[date.getMonth()],
        timeCombo = `${day} ${month}, ${data.time}`,
        dateDetails = {
          day,
          month,
          timeOfStay: data.time,
        };

      const newStay = {
        stayLocation: data.stayLocation,
        stayName: data.stayName,
        dateDetails,
        timeCombo,
        date: data.date,
        time: data.time,
      };

      const prevArray = travelDetails?.stays;

      setTravelDetails({
        ...travelDetails,
        stays: [...prevArray, newStay],
      });

      Swal.fire({
        title: "Success!",
        text: "Stay details added successfully",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          setShowAddDetails((prev) => !prev);
          setShowAddStayDetails((prev) => !prev);
        }
      });
    } else if (type === "edit") {
      const date = new Date(data.date ? data.date : stayToEdit.date),
        day = date.getDate(),
        month = monthNames[date.getMonth()],
        timeCombo = `${day} ${month}, ${
          data.timeOfStay ? data.timeOfStay : stayToEdit.time
        }`,
        dateDetails = {
          day,
          month,
          time: data.time ? data.time : stayToEdit.time,
        };

      const editedStay = {
        stayLocation: data.stayLocation
          ? data.stayLocation
          : stayToEdit.stayLocation,
        stayName: data.stayName ? data.stayName : stayToEdit.stayName,
        dateDetails,
        timeCombo,
        date: data.date ? data.date : stayToEdit.date,
        time: data.time ? data.time : stayToEdit.time,
      };

      const prevArray = travelDetails?.stays.filter(
        (item, index) => index !== Number(data.id)
      );

      setTravelDetails({
        ...travelDetails,
        stays: [...prevArray, editedStay],
      });

      Swal.fire({
        title: "Success!",
        text: "Stay details edited successfully",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          setShowEditStayDetails(false);
          setShowAddDetails((prev) => !prev);
        }
      });
      setStayToEdit({
        id: 0,
        stayLocation: "",
        stayName: "",
        time: "",
        date: "",
      });
    }
  };

  const editStay = (id: number) => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to edit your stay details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Edit!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const selectedStay = travelDetails.stays.filter(
          (item, index) => index === id
        );

        setStayToEdit({
          id,
          stayLocation: selectedStay[0].stayLocation,
          stayName: selectedStay[0].stayName,
          time: selectedStay[0].time,
          date: selectedStay[0].date,
        });
        setAvailableFlightsOpen(false);
        setAvailableStaysOpen(false);
        setShowEditStayDetails(true);
        setShowAddDetails(false);
      }
    });
  };

  const handleDeleteStay = (id: any) => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to delete this stay details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const stayDetailsArray = travelDetails.stays?.filter(
          (item, key) => key !== id
        );
        setTravelDetails({
          ...travelDetails,
          stays: stayDetailsArray,
        });
      }
    });
  };

  const AddFlightFormik = useFormik({
    initialValues: flightInitialValues,
    validationSchema: AddFlightSchema,
    onSubmit: (values) => {
      addFlight(values, "add");
    },
  });

  const EditFlightFormik = useFormik({
    initialValues: flightToEdit,
    onSubmit: (values) => {
      addFlight(values, "edit");
    },
  });

  const AddStayFormik = useFormik({
    initialValues: stayInitialValues,
    validationSchema: AddStaySchema,
    onSubmit: (values) => {
      addStay(values, "add");
    },
  });

  const EditStayFormik = useFormik({
    initialValues: stayToEdit,
    onSubmit: (values) => {
      addStay(values, "edit");
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
            <div className="travel_details_tag" onClick={stayClick}>
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
              onSubmit={AddFlightFormik.handleSubmit}
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
                  onChange={AddFlightFormik.handleChange}
                  onBlur={AddFlightFormik.handleBlur}
                />
                {AddFlightFormik.errors.flightName &&
                AddFlightFormik.touched.flightName ? (
                  <p className="red_alert">
                    {AddFlightFormik.errors.flightName}
                  </p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Name Of Airport</label>
                <input
                  name="airportName"
                  className="signin_input w_80"
                  type="text"
                  placeholder="Enter the name of the Airport"
                  onChange={AddFlightFormik.handleChange}
                  onBlur={AddFlightFormik.handleBlur}
                />
                {AddFlightFormik.errors.airportName &&
                AddFlightFormik.touched.airportName ? (
                  <p className="red_alert">
                    {AddFlightFormik.errors.airportName}
                  </p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Time of Arrival</label>

                <TimePicker
                  style={{ display: "inline-flex" }}
                  className="signin_input m_b_15 w_80 travel_details_time_picker"
                  onChange={(time, timeString) => {
                    console.log(time, timeString);
                    AddFlightFormik.setFieldValue("arrivalTime", timeString);
                  }}
                  name="arrivalTime"
                  defaultValue={moment("00:00:00", "HH:mm:ss")}
                />
                {AddFlightFormik.errors.arrivalTime &&
                AddFlightFormik.touched.arrivalTime ? (
                  <p className="red_alert">
                    {AddFlightFormik.errors.arrivalTime}
                  </p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Date of Arrival</label>
                <DatePicker
                  className="signin_input w_80 travel_details_time_picker"
                  onChange={(date, dateString) =>
                    AddFlightFormik.setFieldValue("arrivalDate", dateString)
                  }
                  name="arrivalDate"
                  defaultValue={moment()}
                />
                {AddFlightFormik.errors.arrivalDate &&
                AddFlightFormik.touched.arrivalDate ? (
                  <p className="red_alert">
                    {AddFlightFormik.errors.arrivalDate}
                  </p>
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
              onSubmit={EditFlightFormik.handleSubmit}
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
                  onChange={EditFlightFormik.handleChange}
                  onBlur={EditFlightFormik.handleBlur}
                  defaultValue={flightToEdit.flightName}
                />
                {EditFlightFormik.errors.flightName &&
                EditFlightFormik.touched.flightName ? (
                  <p className="red_alert">
                    {EditFlightFormik.errors.flightName}
                  </p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Name Of Airport</label>
                <input
                  name="airportName"
                  className="signin_input w_80"
                  type="text"
                  placeholder="Enter the name of the Airport"
                  onChange={EditFlightFormik.handleChange}
                  onBlur={EditFlightFormik.handleBlur}
                  defaultValue={flightToEdit.airportName}
                />
                {EditFlightFormik.errors.airportName &&
                EditFlightFormik.touched.airportName ? (
                  <p className="red_alert">
                    {EditFlightFormik.errors.airportName}
                  </p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Time of Arrival</label>

                <TimePicker
                  style={{ display: "inline-flex" }}
                  className="signin_input m_b_15 w_80 travel_details_time_picker"
                  onChange={(time, timeString) => {
                    console.log(time, timeString);
                    EditFlightFormik.setFieldValue("arrivalTime", timeString);
                  }}
                  name="arrivalTime"
                  defaultValue={moment(flightToEdit.arrivalTime, "HH:mm:ss")}
                />
                {EditFlightFormik.errors.arrivalTime &&
                EditFlightFormik.touched.arrivalTime ? (
                  <p className="red_alert">
                    {EditFlightFormik.errors.arrivalTime}
                  </p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Date of Arrival</label>
                <DatePicker
                  className="signin_input w_80 travel_details_time_picker"
                  onChange={(date, dateString) =>
                    EditFlightFormik.setFieldValue("arrivalDate", dateString)
                  }
                  name="arrivalDate"
                  defaultValue={moment(flightToEdit.arrivalDate)}
                />
                {EditFlightFormik.errors.arrivalDate &&
                EditFlightFormik.touched.arrivalDate ? (
                  <p className="red_alert">
                    {EditFlightFormik.errors.arrivalDate}
                  </p>
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

        {/* Add Stay form */}
        {showAddStayDetails ? (
          <>
            {/* Formik */}
            <form
              onSubmit={AddStayFormik.handleSubmit}
              autoComplete="off"
              className="sign_in_form w_100 align-items-start"
            >
              <div className="w_100">
                <label className="signin_label">Location Name</label>
                <input
                  name="stayLocation"
                  className="signin_input w_80"
                  type="text"
                  placeholder="Enter location name"
                  onChange={AddStayFormik.handleChange}
                  onBlur={AddStayFormik.handleBlur}
                />
                {AddStayFormik.errors.stayLocation &&
                AddStayFormik.touched.stayLocation ? (
                  <p className="red_alert">
                    {AddStayFormik.errors.stayLocation}
                  </p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Name Of Stay</label>
                <input
                  name="stayName"
                  className="signin_input w_80"
                  type="text"
                  placeholder="Enter the name of the Stay"
                  onChange={AddStayFormik.handleChange}
                  onBlur={AddStayFormik.handleBlur}
                />
                {AddStayFormik.errors.stayName &&
                AddStayFormik.touched.stayName ? (
                  <p className="red_alert">{AddStayFormik.errors.stayName}</p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Time of Stay</label>

                <TimePicker
                  style={{ display: "inline-flex" }}
                  className="signin_input m_b_15 w_80 travel_details_time_picker"
                  onChange={(time, timeString) => {
                    console.log(time, timeString);
                    AddStayFormik.setFieldValue("time", timeString);
                  }}
                  name="time"
                  defaultValue={moment("00:00:00", "HH:mm:ss")}
                />
                {AddStayFormik.errors.time && AddStayFormik.touched.time ? (
                  <p className="red_alert">{AddStayFormik.errors.time}</p>
                ) : null}
              </div>
              <div className="w_100">
                <label className="signin_label">Date of Stay</label>
                <DatePicker
                  className="signin_input w_80 travel_details_time_picker"
                  onChange={(date, dateString) =>
                    AddStayFormik.setFieldValue("date", dateString)
                  }
                  name="date"
                  defaultValue={moment()}
                />
                {AddStayFormik.errors.date && AddStayFormik.touched.date ? (
                  <p className="red_alert">{AddStayFormik.errors.date}</p>
                ) : null}
              </div>

              <div className="travel_details_button_container">
                <button className="signin_button me-3" type="submit">
                  Add Stay
                </button>
                <span
                  className="signin_button bg-danger text-center"
                  onClick={() => stayClick("cancel", "add")}
                >
                  Cancel
                </span>
              </div>
            </form>
          </>
        ) : null}
        {/* End of Add Stay Form */}

        {/* Edit Stay form */}
        {showEditStayDetails ? (
          <form
            onSubmit={EditStayFormik.handleSubmit}
            autoComplete="off"
            className="sign_in_form w_100 align-items-start"
          >
            <div className="w_100">
              <label className="signin_label">Location Name</label>
              <input
                name="stayLocation"
                className="signin_input w_80"
                type="text"
                placeholder="Enter location name"
                onChange={EditStayFormik.handleChange}
                onBlur={EditStayFormik.handleBlur}
                defaultValue={stayToEdit.stayLocation}
              />
              {EditStayFormik.errors.stayLocation &&
              EditStayFormik.touched.stayLocation ? (
                <p className="red_alert">
                  {EditStayFormik.errors.stayLocation}
                </p>
              ) : null}
            </div>
            <div className="w_100">
              <label className="signin_label">Name Of Stay</label>
              <input
                name="stayName"
                className="signin_input w_80"
                type="text"
                placeholder="Enter the name of the Stay"
                onChange={EditStayFormik.handleChange}
                onBlur={EditStayFormik.handleBlur}
                defaultValue={stayToEdit.stayName}
              />
              {EditStayFormik.errors.stayName &&
              EditStayFormik.touched.stayName ? (
                <p className="red_alert">{EditStayFormik.errors.stayName}</p>
              ) : null}
            </div>
            <div className="w_100">
              <label className="signin_label">Time of Stay</label>

              <TimePicker
                style={{ display: "inline-flex" }}
                className="signin_input m_b_15 w_80 travel_details_time_picker"
                onChange={(time, timeString) => {
                  console.log(time, timeString);
                  EditStayFormik.setFieldValue("time", timeString);
                }}
                name="time"
                defaultValue={moment(stayToEdit.time, "HH:mm:ss")}
              />
              {EditStayFormik.errors.time && EditStayFormik.touched.time ? (
                <p className="red_alert">{EditStayFormik.errors.time}</p>
              ) : null}
            </div>
            <div className="w_100">
              <label className="signin_label">Date of Stay</label>
              <DatePicker
                className="signin_input w_80 travel_details_time_picker"
                onChange={(date, dateString) =>
                  EditStayFormik.setFieldValue("date", dateString)
                }
                name="date"
                defaultValue={moment(stayToEdit.date)}
              />
              {EditStayFormik.errors.date && EditStayFormik.touched.date ? (
                <p className="red_alert">{EditStayFormik.errors.date}</p>
              ) : null}
            </div>

            <div className="travel_details_button_container">
              <button className="signin_button me-3" type="submit">
                Edit flight
              </button>
              <span
                className="signin_button bg-danger text-center"
                onClick={() => stayClick("cancel", "edit")}
              >
                Cancel edit
              </span>
            </div>
          </form>
        ) : null}
        {/* End of Edit Stay Form */}

        {/* Display available flights */}
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
        {/* End of Display available flights */}

        {/* Display available stays */}
        {travelDetails.stays && travelDetails.stays.length > 0 ? (
          <div className="available_flights_container">
            <div>
              <div
                className="trip_planning_menu_row m_b_10"
                onClick={() => setAvailableStaysOpen((prev) => !prev)}
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

                <h4 className="general_faq_question">Stays</h4>
              </div>
            </div>
            {availableStaysOpen
              ? travelDetails.stays.map((stay, key) => (
                  <div className="flights" key={key}>
                    <div className="flight_details_large_row">
                      <p className="flight_title">{stay.stayName}</p>
                      <p className="flight_description">{stay.stayLocation}</p>
                      <p className="flight_date">
                        <BsCalendarCheck /> {stay.timeCombo}
                        {/* <BsCalendarCheck /> Jan 24, 1e6:00 - 18:00 */}
                      </p>
                    </div>
                    <div className="flight_details_small_row">
                      <span
                        onClick={() => editStay(key)}
                        className="flight_details_edit"
                      >
                        <MdModeEditOutline />
                      </span>
                      <span
                        className="flight_details_delete"
                        onClick={() => handleDeleteStay(key)}
                      >
                        <GrClose />
                      </span>
                    </div>
                  </div>
                ))
              : null}
          </div>
        ) : null}
        {/* End of Display available stays */}
      </div>
      {/* <AddPlaceOfStay
        showModal={showAddStayDetails}
        setShowModal={setShowAddStayDetails}
      /> */}
    </div>
  );
};

export default TravelDetails;
