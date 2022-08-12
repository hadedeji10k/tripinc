import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import Autocomplete from "react-google-autocomplete";
import styled from "styled-components";
import "./PreferencesModal.css";
import { MdClose } from "react-icons/md";
import { localGetUserId } from "../../../../utils/helpers";
import { GOOGLEAPIKEY } from "../../../../utils/constants";
import Swal from "sweetalert2";
import {
  IManagePlacesVisited,
  IManagePlacesWishToVisit,
  IManagePreference,
  IManageUserInterests,
} from "../../../../api/interfaces";
import {
  managePlacesVisited,
  managePlacesWishToVisit,
  manageUserInterests,
} from "../../../../api";

// interface for this Modal
interface PreferencesModalProp {
  showPreferencesModal: Boolean;
  setShowPreferencesModal: React.Dispatch<React.SetStateAction<Boolean>>;
  userPreference: any;
  interestData: any;
  setInterestData: any;
  placesVisited: any;
  setPlacesVisited: any;
  wishToVisitPlaces: any;
  setWishToVisitPlaces: any;
}

// Styled component for background
const Background: any = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  top: 0;
  transition: all 0.3s ease-in-out;
`;

// Component for security Modal
const PreferencesModal = ({
  showPreferencesModal,
  setShowPreferencesModal,
  userPreference,
  interestData,
  setInterestData,
  placesVisited,
  setPlacesVisited,
  wishToVisitPlaces,
  setWishToVisitPlaces,
}: PreferencesModalProp) => {
  const [removedInterest, setRemovedInterest] = useState<any[]>([]);
  const [interestClone, setInterestClone] = useState<any[]>([]);
  const [placesVisitedClone, setPlacesVisitedClone] = useState<any[]>([]);
  const [wishToVisitPlacesClone, setWishToVisitPlacesClone] = useState<any[]>(
    []
  );

  useEffect(() => {
    setWishToVisitPlacesClone(wishToVisitPlaces);
    setPlacesVisitedClone(placesVisited);
    setInterestClone(interestData.map((a) => ({ ...a })));
  }, [wishToVisitPlaces, placesVisited, interestData]);

  const userId = localGetUserId() as number;

  // this for checking for mainly when the esc key is pressed to close the modal
  const modalRef = useRef<HTMLDivElement>();

  // animation for the modal to pop up when the modal is clicked
  const animation = useSpring({
    opacity: showPreferencesModal ? 1 : 0,
    transform: showPreferencesModal ? "translateZ(0)" : "translateZ(-100%)",
    config: {
      // mass: 1,
      // tension: 300,
      // friction: 20,
      duration: 800,
    },
  });

  // function for closing the modal
  const closeModal = (e: React.FormEvent): void => {
    e.preventDefault();
    if (modalRef.current === e.target) {
      Swal.fire({
        title: "Warning!",
        text: "Are you sure you want to quit your changes?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setWishToVisitPlacesClone(wishToVisitPlaces);
          setPlacesVisitedClone(placesVisited);
          setInterestClone(interestData.map((a) => ({ ...a })));
          setShowPreferencesModal(false);
        }
      });
    }
  };

  // function for closing the modal using button
  const handleCloseModal = (e: React.FormEvent): void => {
    e.preventDefault();
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to quit your changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setWishToVisitPlacesClone(wishToVisitPlaces);
        setPlacesVisitedClone(placesVisited);
        setInterestClone(interestData.map((a) => ({ ...a })));
        setShowPreferencesModal(false);
      }
    });
  };

  // function for checking for the esc key press
  const keyPress = useCallback(
    (e: React.KeyboardEvent | any) => {
      if (e.key === "Escape" && showPreferencesModal) {
        Swal.fire({
          title: "Warning!",
          text: "Are you sure you want to quit your changes?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes!",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        }).then(async (result) => {
          if (result.isConfirmed) {
            setWishToVisitPlacesClone(wishToVisitPlaces);
            setPlacesVisitedClone(placesVisited);
            setInterestClone(interestData.map((a) => ({ ...a })));
            setShowPreferencesModal(false);
          }
        });
      }
    },
    [
      setShowPreferencesModal,
      showPreferencesModal,
      wishToVisitPlaces,
      placesVisited,
      interestData,
    ]
  );

  // useEffect for checking for the esc key press
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [keyPress]);

  //   Modal prefereces handles

  // function to handle preference click
  const handlePreferencesClick = (e: any) => {
    e.preventDefault();
    // console.log(e.target.id)
    const id = e.target.id;
    const index = interestClone.findIndex((item) => item.id === parseInt(id));
    // change the state of the interest data object which is the formatted category (clone)
    interestClone[index].stateOfClass = !interestClone[index].stateOfClass;
    setInterestClone([...interestClone]);
  };

  // function to handle remove of places
  const handlePlacesRemove = (action: string, id: any) => {
    let data: any;
    switch (action) {
      case "placesVisited":
        data = placesVisitedClone.filter((item, key) => key !== parseInt(id));
        setPlacesVisitedClone([...data]);
        break;
      case "wishToVisitPlaces":
        data = wishToVisitPlacesClone.filter(
          (item, key) => key !== parseInt(id)
        );
        setWishToVisitPlacesClone([...data]);
        break;

      default:
        break;
    }
  };

  const handleOnAutocompleteSelect = (action: string, data: any) => {
    let input: any;
    switch (action) {
      case "placesVisited":
        input = document.getElementById("places_been_to") as HTMLInputElement;
        setPlacesVisitedClone((prev) => {
          let dataExist = prev.filter(
            (item) =>
              item.placeName.toLowerCase() ===
              data.formatted_address.toLowerCase()
          );

          if (dataExist.length > 0) {
            return prev;
          } else {
            return [
              ...prev,
              {
                userId,
                placeName: data.formatted_address,
                longitude: data.geometry.location.toJSON().lng,
                latitude: data.geometry.location.toJSON().lat,
                mapUrl: data.url,
                visitCount: 0,
                postCode: "",
                country: "",
                city: "",
              },
            ];
          }
        });
        input.value = "";

        break;
      case "wishToVisitPlaces":
        input = document.getElementById("wish_to_visit") as HTMLInputElement;
        setWishToVisitPlacesClone((prev) => {
          let dataExist = prev.filter(
            (item) =>
              item.placeName.toLowerCase() ===
              data.formatted_address.toLowerCase()
          );

          if (dataExist.length > 0) {
            return prev;
          } else {
            return [
              ...prev,
              {
                userId,
                placeName: data.formatted_address,
                longitude: data.geometry.location.toJSON().lng,
                latitude: data.geometry.location.toJSON().lat,
                mapUrl: data.url,
                visitCount: 0,
                postCode: "",
                country: "",
                city: "",
              },
            ];
          }
        });
        input.value = "";

        break;

      default:
        break;
    }
  };

  // Function to handle save button
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let preferences = interestClone
      .filter((item) => item.stateOfClass === true)
      .map((item) => item.id);

    const managePreferenceFormData: IManageUserInterests = {
      userId,
      areaOfInterestIds: preferences,
    };
    const managePlacesWishToVisitFormData: IManagePlacesWishToVisit = {
      userId,
      wishToVisitPlaces: wishToVisitPlacesClone,
    };
    const managePlacesVisitedFormData: IManagePlacesVisited = {
      userId,
      visitedPlaces: placesVisitedClone,
    };

    await managePlacesWishToVisit(managePlacesWishToVisitFormData);
    await managePlacesVisited(managePlacesVisitedFormData);
    await manageUserInterests(managePreferenceFormData);

    Swal.fire({
      title: "Success!",
      text: "You have successfully updated your profile.",
      icon: "success",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed || result.isDenied || result.isDismissed) {
        window.location.reload();
      }
    });
  };

  // return the component
  return (
    <>
      {showPreferencesModal ? (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="modal" style={animation}>
            <div className="preferences_modal_wrapper">
              <h3 className="preferences_modal_header">
                Edit your Preferences details
              </h3>
              <br />
              {/* Start */}

              <div className="preferences_modal_container">
                {/* places been to */}
                <div>
                  <label className="preferences_modal_label">
                    Where have you been before?
                  </label>
                  <Autocomplete
                    apiKey={GOOGLEAPIKEY}
                    onPlaceSelected={(selected) => {
                      handleOnAutocompleteSelect("placesVisited", selected);
                    }}
                    options={{
                      types: [],
                      fields: [
                        "formatted_address",
                        "place_id",
                        "url",
                        "geometry",
                      ],
                    }}
                    placeholder="Enter the name of the location"
                    className="preferences_modal_input"
                    id="places_been_to"
                  />
                </div>
                <div className="preferences_modal_bucket_list_tag_container">
                  {placesVisitedClone.map((item, key) => (
                    <span
                      key={key}
                      id={key.toString()}
                      className="preferences_modal_location_tag"
                      onClick={() => handlePlacesRemove("placesVisited", key)}
                    >
                      x {item.placeName}
                    </span>
                  ))}
                </div>

                {/* Bucket List */}

                <div className="preferences_modal_bucket_list">
                  <label className="preferences_modal_label">
                    What’s on your bucket list?{" "}
                  </label>
                  <Autocomplete
                    apiKey={GOOGLEAPIKEY}
                    onPlaceSelected={(selected: any) => {
                      handleOnAutocompleteSelect("wishToVisitPlaces", selected);
                    }}
                    options={{
                      types: [],
                      fields: [
                        "formatted_address",
                        "place_id",
                        "url",
                        "geometry",
                      ],
                    }}
                    placeholder="Enter the name of the location"
                    className="preferences_modal_input"
                    id="wish_to_visit"
                  />
                </div>
                <div className="preferences_modal_bucket_list_tab">
                  <div className="preferences_modal_bucket_list_tag_container">
                    {wishToVisitPlacesClone.map((item, key) => (
                      // <span key={item.id} className="bucket_list_tag">{item.title}</span>

                      <span
                        key={key}
                        id={key.toString()}
                        className="preferences_modal_location_tag"
                        onClick={() =>
                          handlePlacesRemove("wishToVisitPlaces", key)
                        }
                      >
                        x {item.placeName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preferences */}
                <div className="preferences_modal_preferences_tab">
                  <label className="preferences_modal_label">
                    Describe your travel interests (select as many as you like):
                  </label>
                  <div className="preferences_modal_preferences_tag_container">
                    {interestClone.map((item) => (
                      // <span key={item.id} className="preferences_tag">{item.title}</span>
                      <span
                        key={item.id}
                        id={item.id.toString()}
                        className={
                          item.stateOfClass
                            ? "preferences_clicked"
                            : "preferences_not_clicked"
                        }
                        onClick={handlePreferencesClick}
                      >
                        {item.symbol} {item.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <div className="preferences_button_container">
                  <button className="preferences_button" onClick={handleSubmit}>
                    Save
                  </button>
                </div>
              </div>

              {/* Close */}

              <MdClose
                className="close_modal_button"
                onClick={handleCloseModal}
              />
            </div>
          </animated.div>
          {/* </div> */}
        </Background>
      ) : null}
    </>
  );
};

export default PreferencesModal;
