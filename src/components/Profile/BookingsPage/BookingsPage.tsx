import React from "react";
import "./BookingsPage.css";
// import { attractiondata } from "../../../currentUserData";
// import UpcomingTripCard from "../../Cards/UpcomingTripCard/UpcomingTripCard";
// import PastTripCard from "../../Cards/PastTripCard/PastTripCard";

const BookingsPage = () => {
  return (
    <div>
      <div className="bookings_page">
        <div className="bookings_page_container">
          <div className="upcoming_trip_container">
            <h3 className="booking_page_header">Upcoming Trips</h3>
            {/* <h3>BookingsPage</h3> */}
            {/* {attractiondata.length > 0 ? (
              <div className="card">
                {attractiondata.slice(0, 0).map((item) => (
                  <UpcomingTripCard
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    reviews={item.reviews}
                    liked={item.liked}
                  />
                ))}
              </div>
            ) : ( */}
            <>
              <br />
              <br />
              <h3>No Upcoming Trips</h3>
              <br />
            </>
            {/* )} */}
          </div>
          <div className="past_trip_container">
            <h3 className="booking_page_header">Past Trips</h3>
            {/* <h3>BookingsPage</h3> */}
            {/* {attractiondata.length > 0 ? (
              <div className="card">
                {attractiondata.slice(0, 0).map((item) => (
                  <PastTripCard
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    reviews={item.reviews}
                    liked={item.liked}
                  />
                ))}
              </div>
            ) : ( */}
            <>
              <br />
              <br />
              <h3>No Past Trips</h3>
              <br />
            </>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
