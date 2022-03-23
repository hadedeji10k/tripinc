import React from "react";
import "./ShoppingCartPage.css";
import CartCard from "./CartCard";
import CartSummary from "../CartSummary/CartSummary";

const ShoppingCartPage = () => {
  return (
    <>
      <div className="shopping_cart_container">
        <div className="cart_container">
          <p className="navigation">
            01 Cart View &nbsp;&nbsp; &gt; &nbsp;
            <span> 02 Customer Info &nbsp;&nbsp; &gt; &nbsp; 03 Payment</span>
          </p>
          <hr className="cart_line" />
          <h3 className="shopping_cart_title">Shopping Cart</h3>
          <CartCard />
          <CartCard />
        </div>
        <CartSummary />
      </div>
    </>
  );
};

export default ShoppingCartPage;
