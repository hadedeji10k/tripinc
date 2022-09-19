import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./ReviewModal.css";
import { MdClose } from "react-icons/md";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { message, Rate, Spin } from "antd";
import { localGetUserFullName } from "../../../utils/helpers";
import { IAddReview } from "../../../api/interfaces";
import { addReview } from "../../../api/responseHandlers";

// interface for ReviewModal
interface ReviewModalProp {
  showReviewModal: boolean;
  setShowReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  attractionId: any;
  attractionName: any;
  attractionCity: any;
  userId: any;
}

// styled component for the ReviewModal
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

// component for the ReviewModal
const ReviewModal = ({
  showReviewModal,
  setShowReviewModal,
  attractionId,
  attractionName,
  attractionCity,
  userId,
}: ReviewModalProp) => {
  const [userRating, setUserRating] = useState<number>(0);
  const [userReview, setUserReview] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const ratingChanged = (newRating) => {
    setUserRating(newRating);
  };

  const handleReviewTextChange = (e) => {
    setUserReview(e.target.value);
  };

  const handleReviewSubmit = async (e) => {
    setIsLoading(true);
    if (userRating === 0) {
      setIsLoading(false);

      return message.error(
        "Error, please make sure you select rating star.",
        3
      );
    }
    const formData: IAddReview = {
      userId,
      fullName: localGetUserFullName(),
      attractionId: Number(attractionId),
      rating: userRating,
      comment: userReview,
    };
    await addReview(formData).then((res) => {
      if (res !== true) {
        setIsLoading(false);
      }
    });
  };

  const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  // return the ReviewModal
  return (
    <>
      {showReviewModal ? (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="z_modal" style={animation}>
            <div className="modal_wrapper">
              <h3 className="header">👍 👎</h3>
              <h3 className="header">Rate it</h3>
              <p className="title">
                How was your experience with {attractionName}? Leave a review so
                others can find the best experiences in {attractionCity}.
              </p>
              <div className="stars">
                <Rate
                  style={{ fontSize: "25px" }}
                  defaultValue={4}
                  character={({ index }: { index: number }) =>
                    customIcons[index + 1]
                  }
                  onChange={ratingChanged}
                />
              </div>
              <div className="comment">
                <textarea
                  onChange={handleReviewTextChange}
                  style={{
                    resize: "none",
                    width: "80%",
                    height: "100px",
                    borderRadius: "5px",
                    border: "2px solid gray",
                  }}
                ></textarea>
              </div>
              <div>
                <Spin spinning={isLoading}>
                  <button className="button" onClick={handleReviewSubmit}>
                    Continue
                  </button>
                </Spin>
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

export default ReviewModal;
