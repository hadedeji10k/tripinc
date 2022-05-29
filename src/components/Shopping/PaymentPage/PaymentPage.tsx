import "./PaymentPage.css";

const PaymentPage = () => {
  const atmCardHandle = (event: any): any => {
    event.preventDefault();
    if (event.target.value.length === 4) {
      event.target.defaultValue = `${event.target.value}  `;
    }
    if (event.target.value.length === 10) {
      event.target.value = `${event.target.value}  `;
    }
    if (event.target.value.length === 16) {
      event.target.value = `${event.target.value}  `;
    }
  };

  return (
    <>
      <div className="payment_page_container">
        <div className="info_container">
          <h3 className="payment_page_title">Payment Portal</h3>
          <div className="saved_contact_info">
            <h3>Pay with: </h3>
            <div>
              <label className="payment_page_label">Saved contact info</label>
              {/* <input
                className="payment_page_input"
                type="text"
                placeholder="Enter First Name"
              /> */}
              <div className="select_container">
                <select name="" id="">
                  <option value="">claire.gifford@tripinc.co </option>
                  <option value="">mark@tripinc.co </option>
                  <option value="">dev@tripinc.co </option>
                </select>
              </div>
            </div>
          </div>
          <hr className="cart_line" />
          <div className="card_info_container">
            <div className="card_info_details">
              <p>Credit Card</p>
              <small>
                Safe money transfer using your bank account. Visa, Maestro,
                Discover, American Express.
              </small>
            </div>
            <div>
              <label className="payment_page_label">Card Number</label>
              <input
                className="payment_page_input"
                onChange={atmCardHandle}
                type="text"
                placeholder="Enter Card Number"
              />
            </div>
            <div>
              <label className="payment_page_label">Card Holder Name</label>
              <input
                className="payment_page_input"
                type="text"
                placeholder="Enter Card Holder Name"
              />
            </div>
            <div>
              <label className="payment_page_label">Expiration Date</label>
              <input
                className="payment_page_input"
                type="text"
                placeholder="Expiration Date"
              />
            </div>
            <div>
              <label className="payment_page_label">CVC</label>
              <input
                className="payment_page_input"
                type="text"
                placeholder="CVC"
              />
            </div>
          </div>
          <button className="payment_page_button">Proceed to Payment</button>
          <p>
            <a href="#" className="return_to_explore">
              &larr; Return to Exploring
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
