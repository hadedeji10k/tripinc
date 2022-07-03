import "./OrderPage.css";
import { IOrderItem } from "../../../api/interfaces";
import { Link } from "react-router-dom";
import { currencySymbolHelper } from "../../../utils/helpers";

interface Props {
  item: IOrderItem;
}

const OrderCard = ({ item }: Props) => {
  return (
    <>
      <div className="cart_card_container">
        <div className="order_image_container">
          <Link to={`/explore-details/attraction/${item.itemId}`}>
            <img src={item.imageUrl} alt="" className="image" />
          </Link>
        </div>
        <div className="order_card_details_container">
          <div className="order_card_details">
            <Link to={`/explore-details/attraction/${item.itemId}`}>
              <p className="short_title">{item.itemName}</p>
            </Link>
          </div>
          <div className="order_card_details">
            <p className="order_cart_price">
              Unit Price: {currencySymbolHelper(item.currency)}
              {item.unitPrice}
            </p>
            <p className="order_cart_price">
              Total Price: {currencySymbolHelper(item.currency)}
              {item.totalAmount}
            </p>
            <p className="order_cart_price">Quantity: {item.quantity}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
