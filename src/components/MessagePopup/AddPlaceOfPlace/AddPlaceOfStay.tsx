import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./AddPlaceOfStay.css";
import { MdClose } from "react-icons/md";
import { BsGoogle } from "react-icons/bs";

// interface for AddPlaceOfStay
interface ModalProp {
  showModal: Boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// styled component for the AddPlaceOfStay
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

// component for the AddPlaceOfStay
const AddPlaceOfStay = ({ showModal, setShowModal }: ModalProp) => {
  // this for checking for mainly when the esc key is pressed to close the modal
  const modalRef = useRef<HTMLDivElement>();

  // animation for the modal to pop up when the modal is clicked
  const animation = useSpring({
    opacity: showModal ? 1 : 0,
    transform: showModal ? "translateZ(0)" : "translateZ(-100%)",
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
      setShowModal(false);
    }
  };

  // function for checking for the esc key press
  const keyPress = useCallback(
    (e: React.KeyboardEvent | any) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  // useEffect for checking for the esc key press
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [keyPress]);

  // return the AddPlaceOfStay
  return (
    <>
      {showModal ? (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="z_modal" style={animation}>
            <div className="modal_wrapper">
              <h3 className="header">🛏️🏡🛖</h3>
              <h3 className="header">Add place of stay</h3>
              <p className="title">
                Automatically import your accommodation details by connecting
                your Gmail. Or search for an address manually.
              </p>
              <div className="place_external_signin_button">
                <button className="place_signin_google_button" type="submit">
                  <BsGoogle /> Google
                </button>
                <button className="place_signin_facebook_button" type="submit">
                  Search Address
                </button>
              </div>
              <div>
                <button className="add_place_of_stay_button">Back</button>
              </div>
              <div>
                <MdClose
                  className="close_modal_button"
                  onClick={() => setShowModal((prev) => !prev)}
                />
              </div>
            </div>
          </animated.div>
          {/* </div> */}
        </Background>
      ) : null}
    </>
  );
};

export default AddPlaceOfStay;
