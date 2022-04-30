import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./SecurityCodeModal.css";
import { MdClose } from "react-icons/md";

// interface for this Modal
interface SecurityCodeModalProp {
  showModal: Boolean;
  setShowModal: React.Dispatch<React.SetStateAction<Boolean>>;
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
const SecurityCodeModal = ({
  showModal,
  setShowModal,
}: SecurityCodeModalProp) => {
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

  // function for checking the inputs for code, one for each input, and moves to the next input
  const handleCodeInput = (e) => {
    let { value } = e.target;
    if (value.length === 1) {
      // setShowModal(false);
      if (e.target.id === "code1") {
        document.getElementById("code2")?.focus();
      } else if (e.target.id === "code2") {
        document.getElementById("code3")?.focus();
      } else if (e.target.id === "code3") {
        document.getElementById("code4")?.focus();
      }
    } else if (value.length > 1) {
      console.log(value[0]);
      value = value[0];
    }
    console.log(e.key);
  };

  const handleContinue = (): void => {
    let inputCode1 = document.getElementById("code1") as HTMLInputElement;
    let inputCode2 = document.getElementById("code2") as HTMLInputElement;
    let inputCode3 = document.getElementById("code3") as HTMLInputElement;
    let inputCode4 = document.getElementById("code4") as HTMLInputElement;
    let code1 = inputCode1?.value;
    let code2 = inputCode2?.value;
    let code3 = inputCode3?.value;
    let code4 = inputCode4?.value;
    if (code1 && code2 && code3 && code4) {
      console.log(code1 + code2 + code3 + code4);
      // setShowModal(false);
    }
  };

  // return the component
  return (
    <>
      {showModal ? (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="modal" style={animation}>
            <div className="modal_wrapper">
              <h3 className="header">Enter your Security Code</h3>
              <p className="title">We texted your code to +1 234 567 890</p>
              <div className="input_content">
                <input
                  type="number"
                  id="code1"
                  className="code_input"
                  autoComplete="off"
                  maxLength={2}
                  autoFocus
                  onChange={handleCodeInput}
                />
                <input
                  type="number"
                  id="code2"
                  className="code_input"
                  autoComplete="off"
                  onChange={handleCodeInput}
                />
                <input
                  type="number"
                  id="code3"
                  className="code_input"
                  autoComplete="off"
                  onChange={handleCodeInput}
                />
                <input
                  type="number"
                  id="code4"
                  className="code_input"
                  autoComplete="off"
                  onChange={handleCodeInput}
                />
              </div>
              <div>
                <button className="button" onClick={handleContinue}>
                  Continue
                </button>
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

export default SecurityCodeModal;
