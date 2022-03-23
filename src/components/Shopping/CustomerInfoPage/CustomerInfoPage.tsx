import React from "react";
import "./CustomerInfoPage.css";
import CartSummary from "../CartSummary/CartSummary";

const CustomerInfoPage = () => {
  return (
    <>
      <div className="customer_info_container">
        <div className="info_container">
          <p className="navigation">
            <span>01 Cart View &nbsp;&nbsp; </span> &gt; &nbsp; 02 Customer Info
            &nbsp;&nbsp; <span> &gt; &nbsp; 03 Payment</span>
          </p>
          <hr className="cart_line" />
          <h3 className="customer_info_title">Customer Info</h3>
          <div>
            <label className="customer_info_label">First Name</label>
            <input
              className="customer_info_input"
              type="text"
              placeholder="Enter First Name"
            />
          </div>
          <div>
            <label className="customer_info_label">Last Name</label>
            <input
              className="customer_info_input"
              type="text"
              placeholder="Enter Last Name"
            />
          </div>
          <div>
            <label className="customer_info_label">Address</label>
            <input
              className="customer_info_input"
              type="text"
              placeholder="Enter your Address"
            />
          </div>
          <div>
            <label className="customer_info_label">Country</label>
            <input
              className="customer_info_input"
              type="text"
              placeholder="Country"
            />
          </div>
          <div>
            <label className="customer_info_label">City</label>
            <input
              className="customer_info_input"
              type="text"
              placeholder="City"
            />
          </div>
          <div>
            <label className="customer_info_label">Postal code</label>
            <input
              className="customer_info_input"
              type="text"
              placeholder="Postal code"
            />
          </div>
          <div>
            <label className="customer_info_label">Phone Number</label>
            <input
              className="customer_info_input"
              type="text"
              placeholder="Phone Number"
            />
          </div>
          <button className="customer_info_button">Proceed to Payment</button>
          <p>
            <a href="#" className="return_to_explore">
              &larr; Return to Exploring
            </a>
          </p>
        </div>
        <CartSummary />
      </div>
    </>
  );
};

export default CustomerInfoPage;
