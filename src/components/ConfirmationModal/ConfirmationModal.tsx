import React, { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components';
import './ConfirmationModal.css'
import { MdClose } from 'react-icons/md'

// interface for ConfirmationModal
interface ConfirmationModalProp {
  showModal: Boolean,
  setShowModal: React.Dispatch<React.SetStateAction<Boolean>>
}

// styled component for the ConfirmationModal
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

// component for the ConfirmationModal
const ConfirmationModal = ({showModal, setShowModal}: ConfirmationModalProp) => {

  // this for checking for mainly when the esc key is pressed to close the modal
  const modalRef = useRef<HTMLDivElement>();

  // animation for the modal to pop up when the modal is clicked
  const animation = useSpring({
    opacity: showModal ? 1 : 0,
    transform: showModal ? 'translateZ(0)' : 'translateZ(-100%)',
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
      setShowModal(false);
    }
  }

  // function for checking for the esc key press
  const keyPress = useCallback((e: React.KeyboardEvent | any) => {
    if (e.key === 'Escape' && showModal) {
      setShowModal(false);
    }
  }, [setShowModal, showModal])

  // useEffect for checking for the esc key press
  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => {
      document.removeEventListener('keydown', keyPress);
    }
  }, [keyPress])

  // return the ConfirmationModal
  return (
    <>
    { showModal ? 
      (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="modal" style={animation}>
            <div className="modal_wrapper">
              <h3 className="header">Let’s confirm it’s really you</h3>
              <p className="title">Help us secure your account. Please complete the verifications below.</p>
              <div className="radio_content">
                <input type="radio" /> Get the code by text message (SMS) at +1 234 567 890
              </div>
              <hr className="line" />
              <div className="radio_content">
                <input type="radio" /> Get the code by email claireg•••••••@gm•••.com
              </div>
              <div>
                <button className="button">Continue</button>
              </div>
              <div>
                <MdClose className="close_modal_button" onClick={() => setShowModal(prev => !prev)} />
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

export default ConfirmationModal