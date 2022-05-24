import React, { useRef, useState, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./CartModal.css";
import { MdClose } from "react-icons/md";
// import { FiStar } from "react-icons/fi";

// interface for CartModal
interface CartModalProp {
  showCartModal: Boolean;
  setShowCartModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

// styled component for the CartModal
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

// component for the CartModal
const CartModal = ({ showCartModal, setShowCartModal }: CartModalProp) => {
  const [price, setPrice] = useState<Number>(0);

  // this for checking for mainly when the esc key is pressed to close the modal
  const modalRef = useRef<HTMLDivElement>();

  // animation for the modal to pop up when the modal is clicked
  const animation = useSpring({
    opacity: showCartModal ? 1 : 0,
    transform: showCartModal ? "translateZ(0)" : "translateZ(-100%)",
    config: {
      // mass: 1,
      // tension: 300,
      // friction: 20,
      duration: 800,
    },
  });

  const handlePeople = (e: React.FormEvent): void => {
    let peopleSelect = document.getElementById("people") as HTMLSelectElement;
    let people = peopleSelect?.value;
    let price = parseInt(people) * 300;
    setPrice(price);
  };
  const submitData = (e: React.FormEvent): void => {
    let dateSelect = document.getElementById("date") as HTMLSelectElement;
    let date = dateSelect?.value;
    let timeSelect = document.getElementById("time") as HTMLSelectElement;
    let time = timeSelect?.value;
    let peopleSelect = document.getElementById("people") as HTMLSelectElement;
    let people = peopleSelect?.value;
    console.log(date, time, people);
  };
  // function for closing the modal
  const closeModal = (e: React.FormEvent): void => {
    e.preventDefault();
    if (modalRef.current === e.target) {
      setShowCartModal(false);
    }
  };

  // function for checking for the esc key press
  const keyPress = useCallback(
    (e: React.KeyboardEvent | any) => {
      if (e.key === "Escape" && showCartModal) {
        setShowCartModal(false);
      }
    },
    [setShowCartModal, showCartModal]
  );

  // useEffect for checking for the esc key press
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [keyPress]);

  // return the CartModal
  return (
    <>
      {showCartModal ? (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="modal" style={animation}>
            <div className="cart_modal_wrapper">
              <h3 className="cart_modal_header">
                $300 <small className="small">/ person</small>
              </h3>
              <div className="cart_select_container">
                <select name="date" id="date">
                  <option value="Friday 21st, January">
                    Friday 21st, January
                  </option>
                  <option value="Saturday 22nd, January">
                    Saturday 22nd, January
                  </option>
                  <option value="Sunday 23rd, January">
                    Sunday 23rd, January
                  </option>
                </select>
              </div>
              <div className="cart_select_container">
                <select name="people" id="people" onClick={handlePeople}>
                  <option value="0">0 adult</option>
                  <option value="1">1 adult</option>
                  <option value="2">2 adults</option>
                  <option value="3">3 adults</option>
                  <option value="4">4 adults</option>
                  <option value="5">5 adults</option>
                  <option value="6">6 adults</option>
                  <option value="7">7 adults</option>
                  <option value="8">8 adults</option>
                  <option value="9">9 adults</option>
                  <option value="10">10 adults</option>
                </select>
              </div>
              <div className="cart_select_container">
                <select name="time" id="time">
                  <option value="12:00 - 16:00">12:00 - 16:00</option>
                  <option value="13:00 - 19:00">13:00 - 19:00</option>
                  <option value="11:00 - 13:00">11:00 - 13:00</option>
                </select>
              </div>
              <div>
                <button className="button" onClick={submitData}>
                  Continue
                </button>
              </div>

              <hr className="cart_line" />

              <div className="price">
                <p>Total</p>
                <p>{price.toString()}</p>
              </div>

              <div>
                <p className="details">
                  No money will be charged at this step. Reserve now and pay
                  later!
                </p>
              </div>

              <div className="details">
                <p>
                  <a href="/">Report this activity.</a>
                </p>
              </div>

              <div>
                <MdClose
                  className="close_modal_button"
                  onClick={() => setShowCartModal((prev) => !prev)}
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

export default CartModal;
