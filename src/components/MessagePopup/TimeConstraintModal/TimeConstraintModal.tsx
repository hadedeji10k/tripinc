import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./TimeConstraintModal.css";
import { MdClose } from "react-icons/md";

// interface for TimeConstraintModal
interface ReviewModalProp {
  showReviewModal: Boolean;
  setShowReviewModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

// styled component for the TimeConstraintModal
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

// component for the TimeConstraintModal
const TimeConstraintModal = ({
  showReviewModal,
  setShowReviewModal,
}: ReviewModalProp) => {
  // to check if the checkbox is clicked
  const [checkbox, setCheckbox] = useState<boolean>(false);

  // this for checking for mainly when the esc key is pressed to close the modal
  const modalRef = useRef<HTMLDivElement>();

  // animation for the modal to pop up when the modal is clicked
  const animation = useSpring({
    opacity: showReviewModal ? 1 : 0,
    transform: showReviewModal ? "translateZ(0)" : "translateZ(-100%)",
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
      setShowReviewModal(false);
    }
  };

  // function for checking for the esc key press
  const keyPress = useCallback(
    (e: React.KeyboardEvent | any) => {
      if (e.key === "Escape" && showReviewModal) {
        setShowReviewModal(false);
      }
    },
    [setShowReviewModal, showReviewModal]
  );

  // useEffect for checking for the esc key press
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [keyPress]);

  // func to handle the custom checkbox, the inpu checkbox not working in modal, so had to use custom one
  const handleCheckBox = (e: any) => {
    e.preventDefault();
    let element = document.getElementById("checkbox_box") as HTMLDivElement;
    setCheckbox(!checkbox);
    if (checkbox) {
      element.style.background = "";
      element.innerHTML = "";
    } else {
      element.style.background = "#353945";
      element.style.color = "#fff";
      let str = "&nbsp;&nbsp;&nbsp;✔";
      element.innerHTML = str;
    }
  };

  // return the TimeConstraintModal
  return (
    <>
      {showReviewModal ? (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="z_modal" style={animation}>
            <div className="modal_wrapper">
              <h3 className="header">⌛ </h3>
              <h3 className="header">Ain’t nobody got time for that</h3>
              <p className="title">
                It looks like you might be cutting it a bit fine with your
                travel time between [attraction 1] and [attraction 2].
                <br />
                <br />
                We’d hate for you to miss you reservation if you get stuck in
                bad traffic.
              </p>
              <div>
                <button className="button">Back</button>
              </div>
              <div className="password_box">
                <span className="remember_me" onClick={handleCheckBox}>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      className="checkbox_input"
                      id="checkbox_input"
                    />
                    <div className="checkbox_box" id="checkbox_box"></div>
                    Remember Me
                  </label>
                </span>
              </div>
              <div>
                <MdClose
                  className="close_modal_button"
                  onClick={() => setShowReviewModal((prev) => !prev)}
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

export default TimeConstraintModal;
