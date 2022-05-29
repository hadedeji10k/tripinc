import { useState, useEffect } from "react";
import CustomerInfoPage from "./CustomerInfoPage/CustomerInfoPage";
import ShoppingCartPage from "./ShoppingCartPage/ShoppingCartPage";
import PaymentPage from "./PaymentPage/PaymentPage";
import CartSummary from "./CartSummary/CartSummary";
import "./Shopping.css";
import { ICart } from "../../api/interfaces";
import { localGetUserId } from "../../utils/helpers";
import { getUserCart } from "../../api";

const menuBarData = [
  {
    id: 1,
    state: true,
    title: "Cart View",
  },
  {
    id: 2,
    state: false,
    title: "Customer Info",
  },
  {
    id: 3,
    state: false,
    title: "Payment",
  },
];

const Shopping = () => {
  const [menuBar, setMenuBar] = useState(menuBarData);
  const [cartData, setCartData] = useState<ICart[]>([]);
  let data = menuBar.filter((item) => item.state === true);
  const [userId, setUserId] = useState<number | null>(() => localGetUserId());

  useEffect(() => {
    getUserCart(userId).then((res) => {
      setCartData(res.data);
    });
  }, [userId]);

  const handleNextButton = (id: any) => {
    const nextId = Number(id) + 1;
    for (let i = 0; i < menuBar.length; i++) {
      const element = menuBar[i];
      element.state = false;
    }
    const index = menuBar.findIndex((item) => item.id === parseInt(id));
    menuBar[index].state = true;
    setMenuBar([...menuBar]);
  };

  const handlePrevButton = (id: any) => {
    const nextId = Number(id) - 1;
    if (nextId >= 1) {
      for (let i = 0; i < menuBar.length; i++) {
        const element = menuBar[i];
        element.state = false;
      }
      const index = menuBar.findIndex((item) => item.id === nextId);
      menuBar[index].state = true;
      setMenuBar([...menuBar]);
    }
  };

  const handleClickMenu = (id: any) => {
    for (let i = 0; i < menuBar.length; i++) {
      const element = menuBar[i];
      element.state = false;
    }
    const index = menuBar.findIndex((item) => item.id === parseInt(id));
    menuBar[index].state = true;
    setMenuBar([...menuBar]);
  };

  const totalAmountOfItems = () => {
    const amountArray = cartData.map((item) => {
      return item.totalAmount;
    });

    const sum = amountArray.reduce((a, b) => a + b, 0);
    return sum;
  };

  return (
    <>
      <div className="shopping_page_container">
        <div className="shopping_page_big_half_container">
          <p className="navigation">
            <span
              className={
                data[0].id === 1 ? "shopping_active" : "shopping_not_active"
              }
              onClick={() => {
                handleClickMenu(1);
              }}
            >
              01 Cart View &nbsp;&nbsp;{" "}
            </span>{" "}
            <span
              className={
                data[0].id === 2 ? "shopping_active" : "shopping_not_active"
              }
              onClick={() => {
                handleClickMenu(2);
              }}
            >
              {" "}
              &gt; &nbsp; 02 Customer Info &nbsp;&nbsp;{" "}
            </span>{" "}
            <span
              className={
                data[0].id === 3 ? "shopping_active" : "shopping_not_active"
              }
              onClick={() => {
                handleClickMenu(3);
              }}
            >
              {" "}
              &gt; &nbsp; 03 Payment
            </span>
          </p>
          <hr className="cart_line" />
          {data[0].id === 1 ? (
            <ShoppingCartPage
              cartData={cartData}
              setCartData={setCartData}
              userId={userId}
            />
          ) : data[0].id === 2 ? (
            <CustomerInfoPage />
          ) : data[0].id === 3 ? (
            <PaymentPage />
          ) : (
            <></>
          )}
        </div>
        <div className="shopping_page_small_half_container">
          <CartSummary
            totalAmountOfItems={totalAmountOfItems()}
            itemsInCart={cartData.length > 0 ? true : false}
          />
        </div>
      </div>
    </>
  );
};

export default Shopping;
