import { useState } from "react";
import "./BankingPage.css";

const BankingPage = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="banking_page">
        <div className="banking_page_container">
          <div className="billing_information">
            <div className="banking_header_container">
              <h3 className="banking_page_header">Billing Information</h3>
              {show ? (
                <button className="banking_page_button">
                  Change billing info
                </button>
              ) : null}
              {!show ? (
                <button className="banking_page_button">
                  Add billing info
                </button>
              ) : null}
            </div>
            {show ? (
              <div className="billing_details_container">
                <div className="billing_details_container_row">
                  <div className="billing_details_row_title">
                    <p className="banking_details_title">COUNTRY</p>
                  </div>
                  <div className="billing_details_row">
                    <p className="banking_details_title">Nigeria</p>
                  </div>
                </div>
                <div className="billing_details_container_row">
                  <div className="billing_details_row_title">
                    <p className="banking_details_title">ADDRESS</p>
                  </div>
                  <div className="billing_details_row">
                    <p className="banking_details_title">
                      4 Park Drive, Port Elizabeth
                    </p>
                  </div>
                </div>
                <div className="billing_details_container_row">
                  <div className="billing_details_row_title">
                    <p className="banking_details_title">STATE</p>
                  </div>
                  <div className="billing_details_row">
                    <p className="banking_details_title">Abuja</p>
                  </div>
                </div>
                <div className="billing_details_container_row">
                  <div className="billing_details_row_title">
                    <p className="banking_details_title">ZIP/POSTAL CODE</p>
                  </div>
                  <div className="billing_details_row">
                    <p className="banking_details_title">600001</p>
                  </div>
                </div>
                <div className="billing_details_container_row">
                  <div className="billing_details_row_title">
                    <p className="banking_details_title">NAME</p>
                  </div>
                  <div className="billing_details_row">
                    <p className="banking_details_title">Adedeji Yusuf</p>
                  </div>
                </div>
                <div className="billing_details_container_row">
                  <div className="billing_details_row_title">
                    <p className="banking_details_title">EMAIL ADDRESS</p>
                  </div>
                  <div className="billing_details_row">
                    <p className="banking_details_title">
                      adedejiyusuf26@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
            {show ? (
              <button className="banking_page_button_small_screen">
                Change billing info
              </button>
            ) : null}
            {!show ? (
              <button className="banking_page_button_small_screen">
                Add billing info
              </button>
            ) : null}

            <hr className="banking_line" />
          </div>
          <div className="billing_information">
            <div className="banking_header_container">
              <h3 className="banking_page_header">Payment Information</h3>
              <button className="banking_page_button">
                Update payment info
              </button>
            </div>
            <div className="billing_details_container">
              <div className="billing_details_container_row">
                <div className="billing_details_row_title">
                  <p className="banking_details_title">PAYMENT METHOD</p>
                </div>
                <div className="billing_details_row">
                  <p className="banking_details_title">
                    Visa Ending in *************1960
                  </p>
                </div>
              </div>
              <div className="billing_details_container_row">
                <div className="billing_details_row_title">
                  <p className="banking_details_title">ADDED</p>
                </div>
                <div className="billing_details_row">
                  <p className="banking_details_title">Jan 10, 2021</p>
                </div>
              </div>
              <div className="billing_details_container_row">
                <div className="billing_details_row_title">
                  <p className="banking_details_title">EXPIRES</p>
                </div>
                <div className="billing_details_row">
                  <p className="banking_details_title">12 / 15</p>
                </div>
              </div>
            </div>
            <button className="banking_page_button_small_screen">
              Update payment info
            </button>
            <hr className="banking_line" />
          </div>
          <div className="banking_page_button_add_container">
            <button className="banking_page_button_add">
              Add new payment method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingPage;
