import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./ProfileModal.css";
import { MdClose } from "react-icons/md";
// user dummy data
// import { userData } from "../../../../currentUserData";
import { IUserProfile, IUpdateProfile } from "../../../../api/interfaces";
import { updateUser } from "../../../../api/responseHandlers";
import Swal from "sweetalert2";

// interface for this Modal
interface ProfileModalProp {
  showProfileModal: Boolean;
  setShowProfileModal: React.Dispatch<React.SetStateAction<Boolean>>;
  userProfile: IUserProfile;
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
const ProfileModal = ({
  showProfileModal,
  setShowProfileModal,
  userProfile,
}: ProfileModalProp) => {
  // this for checking for mainly when the esc key is pressed to close the modal
  const modalRef = useRef<HTMLDivElement>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  // const handleContinue = (): void => {};

  const onClick = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const firstName = (
      document.getElementById("first_name") as HTMLInputElement
    )?.value;
    const lastName = (document.getElementById("last_name") as HTMLInputElement)
      ?.value;
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const country = (document.getElementById("country") as HTMLInputElement)
      ?.value;
    const city = (document.getElementById("city") as HTMLInputElement)?.value;
    const postCode = (
      document.getElementById("postal_code") as HTMLInputElement
    )?.value;
    const phoneNumber = (
      document.getElementById("phone_number") as HTMLInputElement
    )?.value;

    const formData: IUpdateProfile = {
      userId: userProfile?.id,
      firstName,
      lastName,
      email,
      country,
      city,
      postCode,
      phoneNumber,
    };

    console.log(formData);
    await updateUser(formData);
    setIsLoading(false);
  };

  // return the component
  return (
    <>
      {isLoading ? Swal.showLoading() : null}

      {showProfileModal ? (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="modal" style={animation}>
            <div className="profile_modal_wrapper">
              <h3 className="profile_modal_header">
                Edit your profile details
              </h3>

              <div className="profile_details_container">
                <div className="profile_details_item">
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">First Name</label>
                    <input
                      id="first_name"
                      className="profile_personal_info_input"
                      type="text"
                      placeholder={userProfile?.firstName}
                      defaultValue={userProfile?.firstName}
                    />
                  </div>
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">Last Name</label>
                    <input
                      id="last_name"
                      className="profile_personal_info_input"
                      type="text"
                      placeholder={userProfile?.lastName}
                      defaultValue={userProfile?.lastName}
                    />
                  </div>
                </div>
                <div className="profile_details_item">
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">Email Address</label>
                    <input
                      id="email"
                      className="profile_personal_info_input"
                      type="text"
                      placeholder={userProfile?.email}
                      defaultValue={userProfile?.email}
                    />
                  </div>
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">Country</label>
                    <input
                      id="country"
                      className="profile_personal_info_input"
                      type="text"
                      placeholder={userProfile?.country}
                      defaultValue={userProfile?.country}
                    />
                  </div>
                </div>

                <div className="profile_details_item">
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">City</label>
                    <input
                      id="city"
                      className="profile_personal_info_input"
                      type="text"
                      placeholder={userProfile?.city}
                      defaultValue={userProfile?.city}
                    />
                  </div>
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">Postal Code</label>
                    <input
                      id="postal_code"
                      className="profile_personal_info_input"
                      type="text"
                      placeholder={userProfile?.postCode}
                      defaultValue={userProfile?.postCode}
                    />
                  </div>
                </div>
                <div className="profile_details_item">
                  <div className="profile_details_item_row">
                    <label className="personal_info_label">Phone Number</label>
                    <input
                      id="phone_number"
                      className="profile_personal_info_input"
                      type="tel"
                      placeholder={userProfile?.phoneNumber}
                      defaultValue={userProfile?.phoneNumber}
                    />
                  </div>
                </div>
              </div>
              <div>
                <button className="button" onClick={onClick}>
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
