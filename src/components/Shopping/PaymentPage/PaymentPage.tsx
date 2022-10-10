import StripePayment from "./StripePayment";
import "./PaymentPage.css";
import { IOrderDetails } from "../../../api/interfaces";

interface Props {
  menuBar: any;
  setMenuBar: any;
  orderDetails: IOrderDetails;
  clientSecret: string;
}

const PaymentPage = ({
  menuBar,
  setMenuBar,
  orderDetails,
  clientSecret,
}: Props) => {
  const handleClickMenu = (id: any) => {
    for (let i = 0; i < menuBar.length; i++) {
      const element = menuBar[i];
      element.state = false;
    }
    const index = menuBar.findIndex((item) => item.id === parseInt(id));
    menuBar[index].state = true;
    setMenuBar([...menuBar]);
  };

  return (
    <>
      <div className="payment_page_container">
        <div className="info_container">
          <h3 className="payment_page_title">Payment Portal</h3>
          {/* <div className="saved_contact_info">
            <h3>Pay with: </h3>
            <div>
              <label className="payment_page_label">Saved contact info</label>
              <input
                className="payment_page_input"
                type="text"
                placeholder="Enter First Name"
              />
              <div className="select_container">
                <select name="" id="">
                  <option value="">claire.gifford@tripinc.co </option>
                  <option value="">mark@tripinc.co </option>
                  <option value="">dev@tripinc.co </option>
                </select>
              </div>
            </div>
          </div> */}
          <hr className="cart_line" />
          <div className="card_info_container">
            <div className="card_info_details">
              <p className="payment_card_info_text">Credit Card</p>
            </div>
            <StripePayment
              orderReference={orderDetails.orderReference}
              amount={orderDetails?.totalAmount}
              clientSecret={clientSecret}
            />
          </div>
          <button
            onClick={() => handleClickMenu(1)}
            className="customer_info_button"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
