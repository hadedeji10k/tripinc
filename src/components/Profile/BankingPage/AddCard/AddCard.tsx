import React from "react";
import "./AddCard.css";

const AddCard = () => {
  return (
    <div>
      <div className="add_card_page">
        <div className="add_card_page_container">
          <h3 className="add_card_page_header">
            Please select the payment method you would like to use
          </h3>
          <div className="add_card_page_card_container">
            <div className="card_header_container">
              <div className="add_card_title">Credit Card</div>
              <div className="add_card_logo">
                <span>Logo</span>
              </div>
            </div>
            <p className="add_card_sub_title">
              Safe money transfer using your bank account. Visa, Maestro,
              Discover, American Express.
            </p>

            <div>
              <label className="add_card_label">card number</label>
              <input
                className="add_card_input"
                type="text"
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div>
              <label className="add_card_label">card holder Name</label>
              <input
                className="add_card_input"
                type="text"
                placeholder="Claire Gifford"
              />
            </div>
            <div className="exp_large">
              <label className="add_card_label">expiration date</label>
              <input
                className="add_card_input_exp"
                type="number"
                placeholder="03"
              />
              <span className="add_card_input_exp_sep"> / </span>
              <input
                className="add_card_input_exp"
                type="number"
                placeholder="22"
              />
              <span className="add_card_date">MM/YY</span>
            </div>
            {/* this for small screen */}
            <div className="exp_small">
              <label className="add_card_label">expiration date</label>
              <input
                className="add_card_input_exp"
                type="number"
                placeholder="03"
              />
              <span className="add_card_date"> MM </span>{" "}
              <p className="add_p_block"></p>
              <input
                className="add_card_input_exp"
                type="number"
                placeholder="22"
              />
              <span className="add_card_date">YY</span>
            </div>
            {/*  */}
            <div>
              <label className="add_card_label">Card Security Code (CSV)</label>
              <input
                className="add_card_input_csv"
                type="text"
                placeholder="000"
              />
            </div>
            <div className="basic_details_button_container">
              <button className="basic_details_button" type="submit">
                Next!
              </button>
              <p className="add_card_text">
                You will not be charge until items are checked out and
                authorisation has been given by you the card holder.{" "}
              </p>
            </div>
          </div>
          <p className="add_card_return">Return to Settings</p>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
