import React from 'react'
import './Signin.css'
import { FaFacebookF } from 'react-icons/fa'
import { BsGoogle } from 'react-icons/bs'

const Signin = () => {
  return (
      <div className="signin_container">
        <div className="signin_word">
          <h1 className="signin_header">Log in</h1>
          <h3 className="signin_title">Let’s get you back to planning!</h3>
        </div>
        <div className="external_signin_button">
          <button className="signin_google_button" type="submit"><BsGoogle />  Google</button>
          <button className="signin_facebook_button" type="submit">< FaFacebookF/> Facebook</button>
        </div>
        <div className="signin_or">
          <hr className="signin_or_line" />
          <h3 className="signin_or_text">Or continue with email</h3>
        </div>
        <div>
          <form>
            <div>
              <label className="signin_label">Email</label>
              <input className="signin_input" type="email" placeholder='Enter your email address'/>
            </div>
            <div>
              <label className="signin_label">Password</label>
              <input className="signin_input" type="password" placeholder='Enter your password'/>
            </div>
            <div className="password_box">
                <span className="remember_me">
                    <label className="checkbox">
                        <input type="checkbox" className="checkbox_input" /> 
                        <div className="checkbox_box"></div>
                        Remember Me
                    </label>
                </span>
                <span className="forgot_password"><a href="/">I forgot my password!</a></span>
            </div>
            <div className="signin_button_container">
              <button className="signin_button" type="submit">Let's go!</button>
            </div>
          </form>
        </div>
        <div className="have_account">
          <h3>Don’t have an account? <a href="/" className="login_text">Sign up here.</a></h3>
        </div>
      </div>
  )
}

export default Signin