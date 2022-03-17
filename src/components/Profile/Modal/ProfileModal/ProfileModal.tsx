import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./ProfileModal.css";
import { MdClose } from "react-icons/md";
// user dummy data
import { userData } from '../../../../currentUserData'

// interface for this Modal
interface ProfileModalProp {
  showProfileModal: Boolean;
  setShowProfileModal: React.Dispatch<React.SetStateAction<Boolean>>;
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
const ProfileModal = ({ showProfileModal, setShowProfileModal }: ProfileModalProp) => {
  // this for checking for mainly when the esc key is pressed to close the modal
  const modalRef = useRef<HTMLDivElement>();

  // animation for the modal to pop up when the modal is clicked
  const animation = useSpring({
    opacity: showProfileModal ? 1 : 0,
    transform: showProfileModal ? "translateZ(0)" : "translateZ(-100%)",
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
      setShowProfileModal(false);
    }
  };

  // function for checking for the esc key press
  const keyPress = useCallback(
    (e: React.KeyboardEvent | any) => {
      if (e.key === "Escape" && showProfileModal) {
        setShowProfileModal(false);
      }
    },
    [setShowProfileModal, showProfileModal]
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
      {showProfileModal ? (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="modal" style={animation}>
            <div className="modal_wrapper">
              <h3 className="profile_modal_header">Edit your profile details</h3>

              <div className="profile_details_container">
                <div className="profile_details_item">
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">First Name</label>
                    <input
                      className="personal_info_input"
                      type="text"
                      placeholder={userData?.firstName}
                      defaultValue={userData?.firstName}
                    />
                  </div>
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">Last Name</label>
                    <input
                      className="personal_info_input"
                      type="text"
                      placeholder={userData?.lastName}
                      defaultValue={userData?.lastName}
                    />
                  </div>
                </div>
                <div className="profile_details_item">
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">Email Address</label>
                    <input
                      className="personal_info_input"
                      type="text"
                      placeholder={userData?.email}
                      defaultValue={userData?.email}
                    />
                  </div>
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">Country</label>
                    <input
                      className="personal_info_input"
                      type="text"
                      placeholder={userData?.country}
                      defaultValue={userData?.country}
                    />
                  </div>
                </div>
            
                <div className="profile_details_item">
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">City</label>
                    <input
                      className="personal_info_input"
                      type="text"
                      placeholder={userData?.city}
                      defaultValue={userData?.city}
                    />
                  </div>
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">Postal Code</label>
                    <input
                      className="personal_info_input"
                      type="text"
                      placeholder={userData?.postalCode}
                      defaultValue={userData?.postalCode}
                    />
                  </div>
                </div>
                <div className="profile_details_item">
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">Phone Number</label>
                    <input
                      className="personal_info_input"
                      type="tel"
                      placeholder={userData?.phone}
                      defaultValue={userData?.phone}
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
                  onClick={() => setShowProfileModal((prev) => !prev)}
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

export default ProfileModal;
