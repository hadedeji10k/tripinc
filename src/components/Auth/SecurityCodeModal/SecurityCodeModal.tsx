import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./SecurityCodeModal.css";
import { MdClose } from "react-icons/md";
import OtpInput from "react-otp-input";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import { verifyAccount } from "../../../api/responseHandlers";
import { localGetUserId } from "../../../utils/helpers";

// interface for this Modal
interface SecurityCodeModalProp {
  showSecurityModal: Boolean;
  setShowSecurityModal: React.Dispatch<React.SetStateAction<Boolean>>;
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
  showSecurityModal,
  setShowSecurityModal,
}: SecurityCodeModalProp) => {
  const [otp, setOtp] = useState<string>("");
  const [otpErrorMessage, setOtpErrorMessage] = useState<string>("");
  const [hideOtp, setHideOtp] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = localGetUserId() as number;

  // this for checking for mainly when the esc key is pressed to close the modal
  const modalRef = useRef<HTMLDivElement>();

  // animation for the modal to pop up when the modal is clicked
  const animation = useSpring({
    opacity: showSecurityModal ? 1 : 0,
    transform: showSecurityModal ? "translateZ(0)" : "translateZ(-100%)",
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
      setShowSecurityModal(false);
      window.location.href = "/#/preferences";
    }
  };

  // function for checking for the esc key press
  const keyPress = useCallback(
    (e: React.KeyboardEvent | any) => {
      if (e.key === "Escape" && showSecurityModal) {
        setShowSecurityModal(false);
        window.location.href = "/#/preferences";
      }
    },
    [setShowSecurityModal, showSecurityModal]
  );

  // useEffect for checking for the esc key press
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [keyPress]);

  const handleChange = (otp) => {
    console.log(otp);
    setOtp(otp);
  };

  const handleOtpHide = (e) => {
    e.preventDefault();
    // console.log(otp);
    setHideOtp((prev) => !prev);
  };

  const handleContinue = async () => {
    if (otp.length !== 6) {
      setOtpErrorMessage("Invalid OTP, Please enter the OTP numbers correctly");
    } else {
      console.log(otp);
      setIsLoading(true);
      const formData = {
        userId,
        token: otp,
        verificationType: "Email",
      };

      await verifyAccount(formData)
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  // return the component
  return (
    <Spin spinning={isLoading} size="large">
      {showSecurityModal ? (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="z_modal" style={animation}>
            <div className="security_modal_wrapper">
              <h3 className="header">Enter your Security Code</h3>
              <p className="title">We texted your code to +1 234 567 890</p>
              <div className="input_content">
                <OtpInput
                  value={otp}
                  onChange={handleChange}
                  numInputs={6}
                  isInputSecure={hideOtp}
                  inputStyle="inputStyle"
                  shouldAutoFocus={true}
                  placeholder={hideOtp ? "******" : "123456"}
                />
              </div>
              <p className="red_alert m_t_5 m_b_5">
                {otpErrorMessage.length > 0 && otpErrorMessage}
              </p>
              {hideOtp ? (
                <p className="code_eyes_icon" onClick={handleOtpHide}>
                  <AiFillEye />
                </p>
              ) : (
                <p className="code_eyes_icon" onClick={handleOtpHide}>
                  <AiFillEyeInvisible />
                </p>
              )}
              <br />
              <div>
                <button className="button" onClick={handleContinue}>
                  Continue
                </button>
              </div>
              <div>
                <MdClose
                  className="close_modal_button"
                  onClick={() => {
                    setShowSecurityModal((prev) => !prev);
                    window.location.href = "/#/preferences";
                  }}
                />
              </div>
            </div>
          </animated.div>
          {/* </div> */}
        </Background>
      ) : null}
    </Spin>
  );
};

export default SecurityCodeModal;
