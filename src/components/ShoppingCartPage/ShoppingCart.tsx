import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ShoppingCart.css";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import CartCard from "./CartCard";
import { ICart } from "../../api/interfaces";
import {
  addToWishList,
  removeFromCart,
  removeFromWishList,
} from "../../api/responseHandlers";
import Swal from "sweetalert2";
import { getAttractionByID, getUserWishList } from "../../api";

interface Props {
  cartData: ICart[];
  setCartData: any;
  userId: any;
}

const ShoppingCart = ({ cartData, setCartData, userId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wishList, setWishList] = useState<any[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    if (userId) {
      getUserWishList(userId)
        .then((res) => {
          setWishList(res.data.items);
        })
        .catch((err) => {
          setWishList([]);
        });
    }
    setIsLoading(false);
  }, [userId]);

  const handleRemove = async (id) => {
    setIsLoading(true);
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
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to remove this from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await removeFromCart(id);
          if (response === true) {
            const newCartData = cartData.filter(
              (item) => Number(item.id) !== Number(id)
            );
            setCartData([...newCartData]);
            setIsLoading(false);
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLikeButton = async (id: any) => {
    console.log(wishList);
    setIsLoading(true);
    const attractionData = await (await getAttractionByID(id)).data;
    const formData = {
      userId,
      itemId: attractionData.id,
      itemType: attractionData.itemType,
      provider: attractionData.provider,
      tripId: attractionData.tourId,
    };

    const response = await addToWishList(formData);
    if (response === true) {
      setWishList([...wishList, attractionData]);
    }
    setIsLoading(false);
  };

  const handleUnLikeButton = async (id: any) => {
    setIsLoading(true);
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to remove this from your bucket list?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          // remove from database
          await removeFromWishList(id, userId).then((res) => {
            if (res === true) {
              // set the wishListData to the new data after removing
              const data = wishList.filter(
                (item) => item.id.toString() !== id.toString()
              );
              setWishList([...data]);
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLike = (a: any) => {
    let returnState: boolean = false;
    if (wishList.length > 0) {
      let index = wishList.find((item) => item?.id === a.itemId);
      if (index) {
        returnState = true;
      } else {
        returnState = false;
      }
    }
    return returnState;
  };

  return (
    <>
      <Spin spinning={isLoading}>
        <div className="cart_container">
          <h3 className="shopping_cart_title">Shopping Cart</h3>
          {cartData.length > 0 ? (
            cartData.map((item) => (
              <div key={item.id}>
                <CartCard
                  item={item}
                  handleRemove={handleRemove}
                  addToWishList={handleLikeButton}
                  inWishList={handleLike(item)}
                  removeFromWishList={handleUnLikeButton}
                  userId={userId}
                  cartData={cartData}
                  setCartData={setCartData}
                />
              </div>
            ))
          ) : (
            <div>
              <br />
              <br />
              <br />
              <p>No items in cart</p>
              <br />
              <br />
              <br />
            </div>
          )}
        </div>
      </Spin>
    </>
  );
};

export default ShoppingCart;
