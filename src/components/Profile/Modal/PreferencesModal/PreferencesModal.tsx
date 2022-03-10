import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./PreferencesModal.css";
import { MdClose } from "react-icons/md";

// interface for this Modal
interface PreferencesModalProp {
  showPreferencesModal: Boolean;
  setShowPreferencesModal: React.Dispatch<React.SetStateAction<Boolean>>;
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

// preferences dummy userData
const preferencedata = [
    {
      id: 1,
      title: '🎢 Adventure',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 2,
      title: '🎨 Arts & Galleries',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 3,
      title: '🏝 Beach',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 4,
      title: '🍹 Food & Drinks',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 5,
      title: '🏝 Shopping',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 6,
      title: '🏛 History & Culture',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 7,
      title: '⛩ Iconic Architecture',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 8,
      title: '⚽️ Sporting Attractions',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 9,
      title: '🏵 Wellness & Spa',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 10,
      title: '🌲 Outdoors & Nature',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 11,
      title: '🎷 Nightlife',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 12,
      title: '🗽 Tourist Attractions',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 13,
      title: '🎬 Film',
      stateOfClass: false,
      class: 'clicked'
    }
  ]
  
  const placesdata = [
    {
      id: 1,
      title: 'Nigeria',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 2,
      title: 'Barcelona',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 3,
      title: 'America',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 4,
      title: 'London',
      stateOfClass: false,
      class: 'clicked'
    }
  ]  
  
  const placesBeenTodata = [
    {
      id: 1,
      title: 'Nigeria',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 2,
      title: 'Barcelona',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 3,
      title: 'America',
      stateOfClass: false,
      class: 'clicked'
    },
    {
      id: 4,
      title: 'London',
      stateOfClass: false,
      class: 'clicked'
    }
  ]

// Component for security Modal
const PreferencesModal = ({
  showPreferencesModal,
  setShowPreferencesModal,
}: PreferencesModalProp) => {

    // states for the preferences data
    const [preferenceData, setPreferenceData] = useState(preferencedata)
  const [placesData, setPlacesData] = useState(placesdata)
  const [placesBeenToData, setPlacesBeenToData] = useState(placesBeenTodata)

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
      setShowPreferencesModal(false);
    }
  };

  // function for checking for the esc key press
  const keyPress = useCallback(
    (e: React.KeyboardEvent | any) => {
      if (e.key === "Escape" && showPreferencesModal) {
        setShowPreferencesModal(false);
      }
    },
    [setShowPreferencesModal, showPreferencesModal]
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
    e.preventDefault()
    // console.log(e.target.id)
    const id = e.target.id
    const index = preferenceData.findIndex(item => item.id === parseInt(id))
    preferenceData[index].stateOfClass = !preferenceData[index].stateOfClass
    // preferenceData[index].class = preferenceData[index].stateOfClass ? 'clicked' : 'not-clicked'
    setPreferenceData([...preferenceData])
  }

  // function to handle places click
  const handlePlacesClick = (e: any) => {
    e.preventDefault()
    const id = e.target.id
    let data = placesData.filter(item => item.id !== parseInt(id))
    setPlacesData([...data])
    console.log(placesData)
  }

  // function to handle typing of places tag
  const handlePlacesChange = (e: any) => {
    e.preventDefault();
    // console.log(e.keyCode)
    let inputData = e.target.value.toString()
    let input = document.getElementById('places') as HTMLInputElement
    input.addEventListener("keydown", function(event) {
        if(event.key === 'Enter') {
          let newPlacesData = placesData.filter(item => item.title !== inputData)
          // console.log(placesData)
          setPlacesData([...newPlacesData])

          if(newPlacesData.length !== placesData.length) {
            // console.log(inputData)
            // console.log(id)
            let lastElement = newPlacesData[newPlacesData.length - 1]
            let id = lastElement.id + 1 
              setPlacesData([...newPlacesData, {id, title: inputData, stateOfClass: false, class: 'clicked'}])
          } else {
            let lastElement = newPlacesData[newPlacesData.length - 1]
            let id = lastElement.id + 1
            setPlacesData([...newPlacesData, {id, title: inputData, stateOfClass: false, class: 'clicked'}])
          }
          console.log(placesData)
          input.value = ''
        }
    });
  }

  // function to handle placesBeenTo click
  const handlePlacesBeenToClick = (e: any) => {
    e.preventDefault()
    const id = e.target.id
    let data = placesBeenToData.filter(item => item.id !== parseInt(id))
    setPlacesBeenToData([...data])
    console.log(placesBeenToData)
  }

  // function to handle typing of placesBeenTo tag
  const handlePlacesBeenToChange = (e: any) => {
    e.preventDefault();
    // console.log(e.keyCode)
    let inputData = e.target.value.toString()
    let input = document.getElementById('placesBeenTo') as HTMLInputElement
    input.addEventListener("keydown", function(event) {
        if(event.key === 'Enter') {
          let newPlacesBeenToData = placesBeenToData.filter(item => item.title !== inputData)
          // console.log(PlacesBeenToData)
          setPlacesBeenToData([...newPlacesBeenToData])

          if(newPlacesBeenToData.length !== placesBeenToData.length) {
            // console.log(inputData)
            // console.log(id)
            let lastElement = newPlacesBeenToData[newPlacesBeenToData.length - 1]
            let id = lastElement.id + 1 
              setPlacesBeenToData([...newPlacesBeenToData, {id, title: inputData, stateOfClass: false, class: 'clicked'}])
          } else {
            let lastElement = newPlacesBeenToData[newPlacesBeenToData.length - 1]
            let id = lastElement.id + 1
            setPlacesBeenToData([...newPlacesBeenToData, {id, title: inputData, stateOfClass: false, class: 'clicked'}])
          }
          console.log(placesBeenToData)
          input.value = ''
        }
    });
  }
  
  // Function to handle save button
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(placesData)
    console.log(placesBeenToData)
    let preferences = preferenceData.filter(item => item.stateOfClass === true)

    console.log(preferences)
  }

  // return the component
  return (
    <>
      {showPreferencesModal ? (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="modal" style={animation}>
            <div className="modal_wrapper">
              <h3 className="profile_modal_header">
                Edit your Preferences details
              </h3>
                <br />
              {/* Start */}

              <div className="preferences_container">

                {/* places been to */}
                <div>
                  <label className="preferences_label">
                    Where have you been before?
                  </label>
                  <input
                    id="placesBeenTo"
                    className="preferences_input"
                    type="text"
                    placeholder="Enter the name of the location"
                    onChange={handlePlacesBeenToChange}
                  />
                </div>
                <div className="bucket_list_tag_container">
                  {placesBeenToData.map((item) => (
                    // <span key={item.id} className="bucket_list_tag">{item.title}</span>
                    <span
                      key={item.id}
                      id={item.id.toString()}
                      className="location_tag"
                      onClick={handlePlacesBeenToClick}
                    >
                      x {item.title}
                    </span>
                  ))}
                </div>

                {/* Bucket List */}

                <div className="bucket_list">
                  <label className="preferences_label">
                    What’s on your bucket list?{" "}
                  </label>
                  <input
                    id="places"
                    className="preferences_input"
                    type="text"
                    placeholder="Enter your preferred location"
                    onChange={handlePlacesChange}
                  />
                </div>
                <div className="bucket_list_tab">
                  <div className="bucket_list_tag_container">
                    {placesData.map((item) => (
                      // <span key={item.id} className="bucket_list_tag">{item.title}</span>
                      <span
                        key={item.id}
                        id={item.id.toString()}
                        className="location_tag"
                        onClick={handlePlacesClick}
                      >
                        x {item.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preferences */}
                <div className="preferences_tab">
                  <label className="preferences_label">
                    Describe your travel interests (select as many as you like):
                  </label>
                  <div className="preferences_tag_container">
                    {preferenceData.map((item) => (
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
                        {item.title}
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
                onClick={() => setShowPreferencesModal((prev) => !prev)}
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
