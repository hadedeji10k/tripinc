import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./AccountPageModal.css";
import { MdClose } from "react-icons/md";
// user dummy data
import { userData } from '../../../../currentUserData'

// interface for this Modal
interface AccountPageModalProp {
  showAccountPageModal: Boolean;
  setShowAccountPageModal: React.Dispatch<React.SetStateAction<Boolean>>;
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
const AccountPageModal = ({ showAccountPageModal, setShowAccountPageModal }: AccountPageModalProp) => {
  // this for checking for mainly when the esc key is pressed to close the modal
  const modalRef = useRef<HTMLDivElement>();

  // animation for the modal to pop up when the modal is clicked
  const animation = useSpring({
    opacity: showAccountPageModal ? 1 : 0,
    transform: showAccountPageModal ? "translateZ(0)" : "translateZ(-100%)",
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
      setShowAccountPageModal(false);
    }
  };

  // function for checking for the esc key press
  const keyPress = useCallback(
    (e: React.KeyboardEvent | any) => {
      if (e.key === "Escape" && showAccountPageModal) {
        setShowAccountPageModal(false);
      }
    },
    [setShowAccountPageModal, showAccountPageModal]
  );

  // useEffect for checking for the esc key press
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [keyPress]);

  const handleContinue = (): void => {
    
  };

  // return the component
  return (
    <>
      {showAccountPageModal ? (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="modal" style={animation}>
            <div className="modal_wrapper">
              <h3 className="profile_modal_header">Edit your Account details</h3>

              <div className="profile_details_container">
                <div className="profile_details_item">
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">Preferred Currency</label>
                    <select name="" id="" defaultValue={userData?.preferredCurrency}>
                      <option value="">USD</option>  
                      <option value="">NGN</option>  
                      <option value="">ZAR</option>  
                    </select>
                    {/* <input
                      className="personal_info_input"
                      type="text"
                      placeholder={userData?.preferredCurrency}
                      defaultValue={userData?.preferredCurrency}
                    /> */}
                  </div>
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">Time Format</label>
                    <select name="" id="" defaultValue={userData?.timeFormat}>
                      <option value="">12 hours</option>  
                      <option value="">24 hours</option>  
                    </select>
                    {/* <input
                      className="personal_info_input"
                      type="text"
                      placeholder={userData?.timeFormat}
                      defaultValue={userData?.timeFormat}
                    /> */}
                  </div>
                </div>
                <div className="profile_details_item">
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">Current Password</label>
                    <input
                      className="personal_info_input"
                      type="password"
                      placeholder={userData?.password}
                      defaultValue={userData?.password}
                    />
                  </div>
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">New Password</label>
                    <input
                      className="personal_info_input"
                      type="password"
                      placeholder='Enter your new password'
                    />
                  </div>
                </div>
            
                <div className="profile_details_item">
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">Confirm Password</label>
                    <input
                      className="personal_info_input"
                      type="password"
                      placeholder='Confirm your new Password'
                    />
                  </div>
                </div>
              </div>
              <div>
                <button className="button" onClick={handleContinue}>
                  Continue
                </button>
              </div>
              <div>
                <MdClose
                  className="close_modal_button"
                  onClick={() => setShowAccountPageModal((prev) => !prev)}
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

export default AccountPageModal;
