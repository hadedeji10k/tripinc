import "./OrderSummary.css";
interface Props {
  totalAmountOfItems: number;
  isOrderPending: boolean;
}
const OrderSummary = ({ totalAmountOfItems, isOrderPending }: Props) => {
  const serviceFee = false ? 200 : 0;

  return (
    <>
      <div className="cart_summary_container">
        <p className="shopping_description">Order Summary</p>

        <hr className="cart_line" />
        <div className="shopping_cart_price">
          <div className="shopping_price">
            <p>Subtotal</p>
            <p>${totalAmountOfItems}</p>
          </div>
          <div className="shopping_price">
            <p>Service fee</p>
            <p>${serviceFee}</p>
          </div>
          <div className="total_shopping_price">
            <p>Total</p>
            <p>${serviceFee + totalAmountOfItems}</p>
          </div>
        </div>

        {/* hide redeem voucher if order payment has been made */}
        {isOrderPending ? (
          <>
            <hr className="cart_line" />
            <p>Have a Voucher?</p>
            <input
              type="text"
              className="shopping_input"
              placeholder="Enter your voucher code here"
            />

            <button className="order_summary_button_to_redeem">
              Redeem Voucher
            </button>
          </>
        ) : null}

        <hr className="cart_line" />
        <p>Secure checkout</p>
        <p>Many ways to pay</p>
        <p>Easy Booking Management</p>
      </div>
    </>
  );
};

export default OrderSummary;
