import React from "react";
import "./CartSummary.css";

const CartSummary = () => {
  return (
    <>
      <div className="cart_summary_container">
        <p className="shopping_description">Cart Summary</p>

        <hr className="cart_line" />
        <div className="shopping_cart_price">
          <div className="shopping_price">
            <p>Subtotal</p>
            <p>$455</p>
          </div>
          <div className="shopping_price">
            <p>Service fee</p>
            <p>$455</p>
          </div>
          <div className="total_shopping_price">
            <p>Total</p>
            <p>$455</p>
          </div>
        </div>

        <hr className="cart_line" />
        <p>Have a Voucher?</p>
        <input
          type="text"
          className="shopping_input"
          placeholder="Enter your voucher code here"
        />

        <hr className="cart_line" />
        <button className="shopping_cart_button_to_checkout">
          Proceed to Checkout
        </button>

        <hr className="cart_line" />
        <p>Secure checkout</p>
        <p>Many ways to pay</p>
        <p>Easy Booking Management</p>
      </div>
    </>
  );
};

export default CartSummary;