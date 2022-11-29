import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "../../TripPlanning/TripMapPlanning/Marker";
import { GOOGLEAPIKEY } from "../../../utils/constants";
// import { geocodeByAddress } from "react-google-places-autocomplete";
import { ITripPlanningItineraryDay } from "../../../api/interfaces";

interface Prop {
  itineraryData: ITripPlanningItineraryDay[];
  tripPlanningData: any;
}

const TripMapView = ({ itineraryData, tripPlanningData }: Prop) => {
  // const [showItinerary, setShowItinerary] = useState<boolean>(true);
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
    let newPlace: any = [];
    itineraryData.map((itinerary: ITripPlanningItineraryDay) => {
      itinerary.itineraries.map((item: any) => {
        const toBeAdded = {
          id: newPlace.length + 1,
          name: item.item.title,
          position: {
            lat: item.item.latitude.toString(),
            lng: item.item.longitude.toString(),
          },
          color: item.mapColor,
        };
        newPlace.push(toBeAdded);
      });
    });
    console.log(newPlace);
    setPlaces(newPlace);
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
    if (places.length > 0) {
      // Get bounds by our places
      const bounds = getMapBounds(map, maps, places);
      // Fit map to bounds
      map.fitBounds(bounds);
      // Bind the resize listener
      bindResizeListener(map, maps, bounds);
    }
  };

  return (
    <div className="w_100">
      <div className="explore_details_image_container">
        <div className="explore_details_image">
          <>
            {places.length > 0 ? (
              <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLEAPIKEY }}
                defaultZoom={8}
                defaultCenter={{
                  lat: places[0].position.lat.toString(),
                  lng: places[0].position.lng.toString(),
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
                  lat={tripPlanningData.tripLocationPosition.lat as any}
                  lng={tripPlanningData.tripLocationPosition.lng as any}
                />
              </GoogleMapReact>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default TripMapView;
