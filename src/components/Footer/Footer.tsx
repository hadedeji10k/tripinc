import React from 'react'
import './Footer.css'
import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs'

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer_menu">
            <div className="footer_item">
                <div className="footer_item_menu">
                    <p><a href="/">Press</a></p>
                    <p><a href="/">About us</a></p>
                    <p><a href="/">Help Center</a></p>
                </div>
                <div className="footer_item_menu">
                    <p><a href="/">What we do</a></p>
                    <p><a href="/">Our Team</a></p>
                    <p><a href="/">Refer a friend</a></p>
                </div>
                <div className="footer_item_menu">
                    <p>Keep your finger on the pulse! 🔥 &nbsp; Sign up for our newsletter</p>
                    <input type="text" />
                </div>
            </div>
            <hr className="line" />
            <div className="footer_item">
                <div className="footer_item_menu">
                    <p className="brand_name"><a href="/">TripInc</a></p>
                    
                </div>
                <div className="footer_item_menu">
                    <p>Stay Connected &nbsp; &nbsp; <a href="/"><BsFacebook /></a> &nbsp; &nbsp; <a href="/"><BsTwitter /></a> &nbsp; &nbsp; <a href="/"><BsInstagram /></a> </p>
                </div>
            </div>
            <p className="footer_all_right">TripInc © {new Date().getFullYear()}. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer