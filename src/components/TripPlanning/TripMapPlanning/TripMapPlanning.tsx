import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { GOOGLEAPIKEY } from "../../../utils/constants";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Itinerary from "../TripPlanning/Itinerary";

// import { geocodeByAddress } from "react-google-places-autocomplete";
import { ITripPlanningItineraryDay } from "../../../api/interfaces";

interface Prop {
  handleTripPlanningMenuClick: any;
  handleMainTripPlanningMenuClick: any;
  tripDays: any;
  itineraryData: ITripPlanningItineraryDay[];
  setItineraryData: any;
  tripPlanningData: any;
  setTripPlanningData: any;
}

const TripMapPlanning = ({
  handleTripPlanningMenuClick,
  handleMainTripPlanningMenuClick,
  tripDays,
  itineraryData,
  setItineraryData,
  tripPlanningData,
  setTripPlanningData,
}: Prop) => {
  const [showItinerary, setShowItinerary] = useState<boolean>(true);
  const [places, setPlaces] = useState<any>([]);

  // useEffect(() => {
  //   geocodeByAddress("Ikeja, Nigeria")
  //     .then((results) => {
  //       // setDefaultLocation({
  //       //   lat: results[0].geometry.location.lat(),
  //       //   lng: results[0].geometry.location.lng(),
  //       // });
  //       console.log({
  //         lat: results[0].geometry.location.lat(),
  //         lng: results[0].geometry.location.lng(),
  //       });
  //       console.log("Location reset", defaultLocation);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  useEffect(() => {
    console.time("From UseEffect");
    let newPlace: any = [];
    itineraryData.map((itinerary: any) => {
      itinerary.itineraries.map((item: any) => {
        const toBeAdded = {
          id: newPlace.length + 1,
          name: item.item.title,
          position: { lat: item.item.latitude, lng: item.item.longitude },
          color: item.mapColor,
        };
        newPlace.push(toBeAdded);
      });
    });
    console.log("Place selected", newPlace);
    setPlaces(newPlace);
    console.timeEnd("From UseEffect");
  }, [itineraryData]);

  // Return map bounds based on list of places
  const getMapBounds = (map, maps, places) => {
    let bounds: any;
    if (places.length > 0) {
      bounds = new maps.LatLngBounds();

      places.forEach((place) => {
        bounds.extend(new maps.LatLng(place.position.lat, place.position.lng));
      });
    } else {
      bounds = new maps.LatLngBounds();

      bounds.extend(
        new maps.LatLng(
          tripPlanningData.tripLocationPosition.lat,
          tripPlanningData.tripLocationPosition.lng
        )
      );
    }
    return bounds;
  };

  // Re-center map when resizing the window
  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, "idle", () => {
      maps.event.addDomListener(window, "resize", () => {
        map.fitBounds(bounds);
      });
    });
  };

  // testing google
  const apiIsLoaded = (map, maps, places) => {
    console.time("From Api");
    if (places.length > 0) {
      console.log("Places is more than zero places");
      // Get bounds by our places
      const bounds = getMapBounds(map, maps, places);
      // Fit map to bounds
      map.fitBounds(bounds);
      // Bind the resize listener
      bindResizeListener(map, maps, bounds);
    } else {
      console.log("Places is zero");
    }
    console.timeEnd("From Api");
  };

  // const options = {
  //   minZoom: 10,
  // };

  return (
    <div className="w_100">
      <div className="explore_details_image_container">
        <div className="explore_details_image">
          <>
            {places.length > 0 ? (
              <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLEAPIKEY, libraries: ["places"] }}
                defaultZoom={8}
                defaultCenter={{
                  lat: places[0].position.lat,
                  lng: places[0].position.lng,
                }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) =>
                  apiIsLoaded(map, maps, places)
                }
              >
                {places.map((place) => (
                  <Marker
                    key={place?.id}
                    text={place?.name}
                    color={place?.color}
                    lat={place?.position.lat.toString()}
                    lng={place?.position.lng.toString()}
                  />
                ))}
              </GoogleMapReact>
            ) : (
              <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLEAPIKEY }}
                defaultCenter={tripPlanningData.tripLocationPosition}
                defaultZoom={8}
              >
                <Marker
                  key={1}
                  text={""}
                  lat={tripPlanningData.tripLocationPosition.lat.toString()}
                  lng={tripPlanningData.tripLocationPosition.lng.toString()}
                  options={{ collisionBehavior: "REQUIRED" }}
                />
              </GoogleMapReact>
            )}
          </>
        </div>
      </div>
      <div className="trip_planning_menu_container m_t_50">
        <div
          className="trip_planning_menu_row"
          onClick={() => setShowItinerary(!showItinerary)}
          id="itinerary_data"
          data-itinerary-menu-status={showItinerary}
        >
          {showItinerary ? (
            <span>
              <IoIosArrowDown className="trip_planning_arrow_drop" />
            </span>
          ) : (
            <span>
              <IoIosArrowForward className="trip_planning_arrow_drop" />
            </span>
          )}

          <h4 className="general_faq_question">Itinerary</h4>
        </div>
        <div className="trip_planning_budget_container">
          {showItinerary ? (
            <>
              <Itinerary
                tripDays={tripDays}
                itineraryData={itineraryData}
                setItineraryData={setItineraryData}
                tripPlanningData={tripPlanningData}
                setTripPlanningData={setTripPlanningData}
              />
            </>
          ) : (
            ""
          )}
        </div>
        <hr className="general_faq_line" style={{ margin: "5px 0 15px" }} />
      </div>
      <div className="scroll_button">
        <button
          className={"explore_navigation_button_active"}
          onClick={() => handleTripPlanningMenuClick("prev")}
        >
          Go back
        </button>
        <button
          className={"explore_navigation_button_active"}
          onClick={() => handleMainTripPlanningMenuClick("next")}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default TripMapPlanning;
