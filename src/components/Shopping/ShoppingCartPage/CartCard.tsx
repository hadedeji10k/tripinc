import { useState } from "react";
import "./ShoppingCartPage.css";
import { ICart } from "../../../api/interfaces";

interface Props {
  item: ICart;
  handleRemove: any;
  addToWishList: any;
  inWishList: boolean;
  removeFromWishList?: any;
}

const CartCard = ({
  item,
  handleRemove,
  addToWishList,
  inWishList,
  removeFromWishList,
}: Props) => {
  return (
    <>
      <div className="cart_card_container">
        <div className="image_container">
          <img src={item.imageUrl} alt="" className="image" />
        </div>
        <div className="card_details_container">
          <div className="details">
            <p className="short_title">{item.itemName}</p>
            {/* <p className="description">
              This part of London is a must see for all visitors…
            </p> */}
            <div className="shopping_select_container">
              <select name="date" id="date">
                <option value="Friday 21st, January">
                  {/* {new Date(item.date)} */}
                  {item.date}
                </option>
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
            <p className="shopping_cart_price">$ {item.totalAmount}</p>
            <div className="shopping_select_container">
              <select name="date" id="date">
                <option>{item.quantity}</option>
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
              <button
                className="shopping_cart_button"
                onClick={() => handleRemove(item.id)}
              >
                Delete
              </button>
              <button
                className="shopping_cart_button"
                onClick={
                  inWishList
                    ? () => removeFromWishList(item.itemId)
                    : () => addToWishList(item.itemId)
                }
              >
                {inWishList ? "Remove from Bucket List" : "Add to Bucket List"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
