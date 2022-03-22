import React from "react";
import "./ShoppingCartPage.css";
import image from "../../../images/location.png";

const CartCard = () => {
  return (
    <>
      <div className="cart_card_container">
        <div className="image_container">
          <img src={image} alt="" className="image" />
        </div>
        <div className="card_details_container">
          <div className="details">
            <p className="short_title">London's Amazing Palaces & Parliament</p>
            <p className="description">
              This part of London is a must see for all visitors…
            </p>
            <div className="select_container">
              <select name="date" id="date">
                <option value="Friday 21st, January">
                  Friday 21st, January
                </option>
                <option value="Saturday 22nd, January">
                  Saturday 22nd, January
                </option>
                <option value="Sunday 23rd, January">
                  Sunday 23rd, January
                </option>
              </select>
            </div>
          </div>
          <div className="side_details">
            <p className="price">£ 50 /p</p>
            <div className="select_container">
              <select name="date" id="date">
                <option value="1">Qty: 1</option>
                <option value="2">Qty: 2</option>
                <option value="4">Qty: 4</option>
                <option value="5">Qty: 5</option>
                <option value="6">Qty: 6</option>
                <option value="7">Qty: 7</option>
                <option value="8">Qty: 8</option>
                <option value="9">Qty: 9</option>
                <option value="10">Qty: 10</option>
              </select>
            </div>
            <div className="">
              <button className="shopping_cart_button">Delete</button>
              <button className="shopping_cart_button">
                Add to Bucket List
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
