import { useState, useEffect } from "react";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import ShoppingCart from "./ShoppingCart";
import CartSummary from "./CartSummary/CartSummary";
import { getUserCart } from "../../api";
import { ICart } from "../../api/interfaces";
import { localGetUserId } from "../../utils/helpers";

const ShoppingCartPage = () => {
  const [cartData, setCartData] = useState<ICart[]>([]);
  const [userId] = useState<number | null>(() => localGetUserId());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getUserCart(userId).then((res) => {
      localStorage.setItem("cart_data", JSON.stringify(res.data));
      setCartData(res.data);
      setIsLoading(false);
    });
  }, [userId]);

  const totalAmountOfItems = () => {
    const amountArray = cartData.map((item) => {
      return item.totalAmount;
    });

    const sum = amountArray.reduce((a, b) => a + b, 0);
    return sum;
  };

  return (
    <Spin spinning={isLoading} size="large">
      <div className="shopping_page_container">
        <div className="shopping_page_big_half_container">
          <ShoppingCart
            cartData={cartData}
            setCartData={setCartData}
            userId={userId}
          />
        </div>
        <div className="shopping_page_small_half_container">
          <CartSummary
            totalAmountOfItems={cartData && totalAmountOfItems()}
            itemsInCart={cartData.length > 0 ? true : false}
            setIsLoading={setIsLoading}
            userId={userId}
          />
        </div>
      </div>
    </Spin>
  );
};

export default ShoppingCartPage;
