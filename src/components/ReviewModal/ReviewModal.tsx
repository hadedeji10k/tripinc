import React, { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components';
import './ReviewModal.css'
import { MdClose } from 'react-icons/md'
import { FiStar } from 'react-icons/fi'

// interface for ReviewModal
interface ReviewModalProp {
  showReviewModal: Boolean,
  setShowReviewModal: React.Dispatch<React.SetStateAction<Boolean>>
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
`

// component for the ReviewModal
const ReviewModal = ({showReviewModal, setShowReviewModal}: ReviewModalProp) => {

  // attraction name and city name variable, will be retrieved from props
  let attractionName = 'Explore the backstreets with a historian', cityName = 'London'

  // this for checking for mainly when the esc key is pressed to close the modal
  const modalRef = useRef<HTMLDivElement>();

  // animation for the modal to pop up when the modal is clicked
  const animation = useSpring({
    opacity: showReviewModal ? 1 : 0,
    transform: showReviewModal ? 'translateZ(0)' : 'translateZ(-100%)',
    config: { 
      // mass: 1, 
      // tension: 300, 
      // friction: 20, 
      duration: 800 
    }
  });

  // function for closing the modal
  const closeModal = (e: React.FormEvent): void => {
    e.preventDefault();
    if (modalRef.current === e.target) {
      setShowReviewModal(false);
    }
  }

  // function for checking for the esc key press
  const keyPress = useCallback((e: React.KeyboardEvent | any) => {
    if (e.key === 'Escape' && showReviewModal) {
      setShowReviewModal(false);
    }
  }, [setShowReviewModal, showReviewModal])

  // useEffect for checking for the esc key press
  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => {
      document.removeEventListener('keydown', keyPress);
    }
  }, [keyPress])

  // return the ReviewModal
  return (
    <>
    { showReviewModal ? 
      (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="modal" style={animation}>
            <div className="modal_wrapper">
              <h3 className="header">👍 👎</h3>
              <h3 className="header">Rate it</h3>
              <p className="title">How was your experience yesterday with {attractionName}? Leave a review so others can find the best experiences in {cityName}.</p>
              <div className="stars">
                <span className="star">
                  <FiStar />
                </span>
                <span className="star">
                  <FiStar />
                </span>
                <span className="star">
                  <FiStar />
                </span>
                <span className="star">
                  <FiStar />
                </span>
                <span className="star">
                  <FiStar />
                </span>
              </div>
              <div className="comment">
              <input className="basic_details_input" type="text" placeholder='Share your thoughts'/>
              </div>
              <div>
                <button className="button">Continue</button>
              </div>
              <div>
                <MdClose className="close_modal_button" onClick={() => setShowReviewModal(prev => !prev)} />
              </div>
            </div>
          </animated.div>
        {/* </div> */}
        </Background>
      ) : null
    }
  </>
  )
}

export default ReviewModal