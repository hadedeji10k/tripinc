import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import "./ShoppingCart.css";
import { ICart } from "../../api/interfaces";
import { updateCart } from "../../api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

interface Props {
  item: ICart;
  handleRemove: any;
  addToWishList: any;
  inWishList: boolean;
  removeFromWishList?: any;
  userId: number | null;
  cartData: any;
  setCartData: any;
}

const CartCard = ({
  item,
  handleRemove,
  addToWishList,
  inWishList,
  removeFromWishList,
  userId,
  cartData,
  setCartData,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleQuantityChange = async (e: any) => {
    if (!userId) {
      Swal.fire({
        title: "Please Login",
        text: "You need to login to update your cart",
        icon: "warning",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          navigate("/sign-in", {
            replace: true,
            state: { from: location.pathname },
          });
        }
      });
    }
    setIsLoading(true);
    console.log(e.target.value);
    const formData = {
      userId,
      items: [
        {
          cartId: item.id,
          quantity: Number(e.target.value),
        },
      ],
    };
    const response = await updateCart(formData);
    if (response.data.status === true && response.status === 200) {
      setCartData(response.data.data);
      localStorage.setItem("cart_data", JSON.stringify(response.data.data));
      setIsLoading(false);
    }
  };

  return (
    <>
      <Spin spinning={isLoading}>
        <div className="cart_card_container">
          <div className="image_container">
            <Link to={`/explore-details/${item.itemId}`}>
              <img src={item.imageUrl} alt="" className="image" />
            </Link>
          </div>
          <div className="card_details_container">
            <div className="details">
              <Link to={`/explore-details/${item.itemId}`}>
                <p className="short_title">{item.itemName}</p>
              </Link>

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
                <select name="date" id="date" onChange={handleQuantityChange}>
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
                  className="shopping_cart_button_remove"
                  onClick={() => handleRemove(item.id)}
                >
                  Delete
                </button>
                <button
                  className={
                    inWishList
                      ? "shopping_cart_button_remove"
                      : "shopping_cart_button"
                  }
                  onClick={
                    inWishList
                      ? () => removeFromWishList(item.itemId)
                      : () => addToWishList(item.itemId)
                  }
                >
                  {inWishList
                    ? "Remove from Bucket List"
                    : "Add to Bucket List"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default CartCard;
