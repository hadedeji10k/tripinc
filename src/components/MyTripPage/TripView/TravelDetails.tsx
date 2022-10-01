import { useFormik } from "formik";
import { useState } from "react";
// import { DatePicker, TimePicker } from "antd";
import "antd/dist/antd.min.css";
// import moment from "moment";
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
  const [showAddDetails, setShowAddDetails] = useState<boolean>(false);
  const [showAddFlightDetails, setShowAddFlightDetails] =
    useState<boolean>(false);
  // const [showAddStayDetails, setShowAddStayDetails] = useState<boolean>(false);

  const [availableFlightsOpen, setAvailableFlightsOpen] =
    useState<boolean>(false);

  const initialValues = {
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

  // const flightClick = (e: any) => {
  //   if (e === "cancel") {
  //     Swal.fire({
  //       title: "Warning!",
  //       text: "Are you sure you want to cancel all your changes?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, cancel!",
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         setShowAddDetails((prev) => !prev);
  //         setShowAddFlightDetails((prev) => !prev);
  //       }
  //     });
  //   } else {
  //     setShowAddDetails((prev) => !prev);
  //     setShowAddFlightDetails((prev) => !prev);
  //   }
  // };

  const addFlight = (data: any) => {
    // customize date and time
    const date = new Date(data.arrivalDate),
      day = date.getDate(),
      month = monthNames[date.getMonth()],
      timeCombo = `${day} ${month}, ${data.arrivalTime[0]} - ${data.arrivalTime[1]}`,
      time = {
        day,
        month,
        time1: data.arrivalTime[0],
        time2: data.arrivalTime[1],
      };

    const newFlight = {
      flightName: data.flightName,
      airportName: data.airportName,
      time,
      timeCombo,
    };
    const prevArray = travelDetails?.flights as any;

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
      addFlight(values);
    },
  });

  return (
    <div style={{ width: "100%" }}>
      <div className="">
        {/* {!showAddDetails ? (
          <div className="travel_details_menu_container">
            <div className="travel_details_tag" onClick={flightClick}>
              <span className="travel_details_add">+</span>
              Flights
            </div>
            <div className="travel_details_tag">
              <span className="travel_details_add">+</span>
              Stay
            </div>
            <div className="travel_details_tag">
          <span className="travel_details_add">+</span>
          Rental Car
        </div>
          </div>
        ) : null} */}

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
                  <div className="flights">
                    <div className="flight_details_large_row">
                      <p className="flight_title">{flight.flightName}</p>
                      <p className="flight_description">{flight.airportName}</p>
                      <p className="flight_date">
                        <BsCalendarCheck /> {flight.timeCombo}
                        {/* <BsCalendarCheck /> Jan 24, 1e6:00 - 18:00 */}
                      </p>
                    </div>
                    <div className="flight_details_small_row">
                      <span className="flight_details_edit">
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
        ) : (
          <h3>No flight details available in this trip</h3>
        )}
      </div>
    </div>
  );
};

export default TravelDetails;
