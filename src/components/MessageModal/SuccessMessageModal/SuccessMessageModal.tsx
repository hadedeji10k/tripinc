import React, { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components';
import './SuccessMessageModal.css'
import { MdClose } from 'react-icons/md'

// interface for SuccessMessageModal
interface ShowSuccessMessageModalProp {
  showSuccessMessageModal: Boolean,
  setShowSuccessMessageModal: React.Dispatch<React.SetStateAction<Boolean>>
}

// styled component for the SuccessMessageModal
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

// component for the SuccessMessageModal
const SuccessMessageModal = ({showSuccessMessageModal, setShowSuccessMessageModal}: ShowSuccessMessageModalProp) => {

  // this for checking for mainly when the esc key is pressed to close the modal
  const modalRef = useRef<HTMLDivElement>();

  // animation for the modal to pop up when the modal is clicked
  const animation = useSpring({
    opacity: showSuccessMessageModal ? 1 : 0,
    transform: showSuccessMessageModal ? 'translateZ(0)' : 'translateZ(-100%)',
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
      setShowSuccessMessageModal(false);
    }
  }

  // function for checking for the esc key press
  const keyPress = useCallback((e: React.KeyboardEvent | any) => {
    if (e.key === 'Escape' && showSuccessMessageModal) {
      setShowSuccessMessageModal(false);
    }
  }, [setShowSuccessMessageModal, showSuccessMessageModal])

  // useEffect for checking for the esc key press
  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => {
      document.removeEventListener('keydown', keyPress);
    }
  }, [keyPress])

  // return the SuccessMessageModal
  return (
    <>
    { showSuccessMessageModal ? 
      (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="z_modal" style={animation}>
            <div className="success_message_modal_wrapper">
              <h3 className="message_title">✈️</h3>
              <p className="message_header">Oh Yes!</p>
              <p className="">Your booking has been made with TripInc. You will recive a confirmation shortly with your booking details. You can view your bookings under your Profile &gt; Bookings.</p>
              <div>
                <button className="button">Back to my Trip</button>
              </div>
              <br />
              <p>Or</p>
              <br />
              <div>
                <button className="button">Keep Exploring!</button>
              </div>
              <div>
                <MdClose className="close_modal_button" onClick={() => setShowSuccessMessageModal(prev => !prev)} />
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

export default SuccessMessageModal