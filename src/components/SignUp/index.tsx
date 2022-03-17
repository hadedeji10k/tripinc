import React from 'react'
import './Signup.css'
import { FaFacebookF } from 'react-icons/fa'
import { BsGoogle } from 'react-icons/bs'

const Signup = () => {
  return (
      <div className="signup_container">
        <div className="signup_word">
          <h1 className="signup_header">Sign up</h1>
          <h3 className="signup_title">Welcome to Tripinc. All aboard.</h3>
        </div>
        <div className="external_signup_button">
          <button className="signup_google_button" type="submit"><BsGoogle />  Google</button>
          <button className="signup_facebook_button" type="submit">< FaFacebookF/> Facebook</button>
        </div>
        <div className="signup_or">
          <hr className="signup_or_line" />
          <h3 className="signup_or_text">Or continue with email</h3>
        </div>
        <div>
          <form>
            <div>
              <label className="signup_label">First Name</label>
              <input className="signup_input" type="text" placeholder='Enter your first name'/>
            </div>
            <div>
              <label className="signup_label">Last Name</label>
              <input className="signup_input" type="text" placeholder='Enter your last name'/>
            </div>
            <div>
              <label className="signup_label">Email</label>
              <input className="signup_input" type="email" placeholder='Enter your email address'/>
            </div>
            <div>
              <label className="signup_label">Password</label>
              <input className="signup_input" type="password" placeholder='Enter your password'/>
            </div>
            <div>
              <label className="signup_label">Confirm Password</label>
              <input className="signup_input" type="password" placeholder='Confirm your password'/>
            </div>
            <div className="signup_button_container">
              <button className="signup_button" type="submit">Create Profile</button>
            </div>
          </form>
        </div>
        <div className="have_account">
          <h3>Already have an account? <a href="/" className="login_text">Login</a></h3>
        </div>
      </div>
  )
}

export default Signup