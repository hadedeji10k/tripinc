import React, { useState } from 'react'
// import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import SecurityCodeModal from '../SecurityCodeModal/SecurityCodeModal';

import './BasicDetails.css'

const BasicDetails: React.FC = () => {

  const [showModal, setShowModal] = useState<Boolean>(false);

  const toggleShowModal = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowModal(!showModal);
  }

  return (
      <div className="basic_details_container">
        <div className="basic_details_word">
          <h1 className="basic_details_header">Basic Details</h1>
          <h3 className="basic_details_title">It’s all in the details.</h3>
        </div>
        <div>
          <form onSubmit= {toggleShowModal}>
            <div>
              <label className="basic_details_label">Phone Number</label>
              <input className="basic_details_input" type="text" placeholder='Phone Number'/>
            </div>
            <div>
              <label className="basic_details_label">Country of Origin</label>
              <input className="basic_details_input" type="text" placeholder='Select Country'/>
            </div>
            <div>
              <label className="basic_details_label">City of Origin</label>
              <input className="basic_details_input" type="text" placeholder='Enter city of Origin'/>
            </div>
            <div className="basic_details_line">
                <hr className="basic_details_or_line" />
            </div>
            <div>
              <label className="basic_details_label">Create Password</label>
              <input className="basic_details_input" type="password" placeholder='Enter your password'/>
            </div>
            <div>
              <label className="basic_details_label">Confirm Password</label>
              <input className="basic_details_input" type="password" placeholder='Confirm your password'/>
            </div>
            <div className="basic_details_button_container">
              <button className="basic_details_button" type="submit">Next!</button>
            </div>
          </form>
        </div>
        <SecurityCodeModal showModal={showModal} setShowModal={setShowModal} />
        <div className="have_account">
          <h3>Already have an account? <a href="/" className="login_text">Login</a></h3>
        </div>
      </div>
  )
}

export default BasicDetails