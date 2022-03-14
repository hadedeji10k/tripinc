import React, { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components';
import './ErrorMessageModal.css'
import { MdClose } from 'react-icons/md'

// interface for ErrorMessageModal
interface ErrorMessageModalProp {
  showErrorMessageModal: Boolean,
  setShowErrorMessageModal: React.Dispatch<React.SetStateAction<Boolean>>
}

// styled component for the ErrorMessageModal
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

// component for the ErrorMessageModal
const ErrorMessageModal = ({showErrorMessageModal, setShowErrorMessageModal}: ErrorMessageModalProp) => {

  // this for checking for mainly when the esc key is pressed to close the modal
  const modalRef = useRef<HTMLDivElement>();

  // animation for the modal to pop up when the modal is clicked
  const animation = useSpring({
    opacity: showErrorMessageModal ? 1 : 0,
    transform: showErrorMessageModal ? 'translateZ(0)' : 'translateZ(-100%)',
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
      setShowErrorMessageModal(false);
    }
  }

  // function for checking for the esc key press
  const keyPress = useCallback((e: React.KeyboardEvent | any) => {
    if (e.key === 'Escape' && showErrorMessageModal) {
      setShowErrorMessageModal(false);
    }
  }, [setShowErrorMessageModal, showErrorMessageModal])

  // useEffect for checking for the esc key press
  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => {
      document.removeEventListener('keydown', keyPress);
    }
  }, [keyPress])

  // return the ErrorMessageModal
  return (
    <>
    { showErrorMessageModal ? 
      (
        // <div className="background">
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div className="modal" style={animation}>
            <div className="error_message_modal_wrapper">
              <h3 className="message_title">💔</h3>
              <p className="message_header">Ooops!</p>
              <p>Sorry it seems the bank card enter does not work. </p>
              <p>Please try a diffrent card or one of our other payment menthods!</p>
              <br />
              <div>
                <button className="button">Continue</button>
              </div>
              <div>
                <MdClose className="close_modal_button" onClick={() => setShowErrorMessageModal(prev => !prev)} />
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

export default ErrorMessageModal