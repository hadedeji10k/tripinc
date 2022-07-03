import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import CustomerInfoPage from "./CustomerInfoPage/CustomerInfoPage";
import OrderPage from "./OrderPage/OrderPage";
import PaymentPage from "./PaymentPage/PaymentPage";
import OrderSummary from "./OrderSummary/OrderSummary";
import "./Shopping.css";
import { IOrderDetails, IOrderItem } from "../../api/interfaces";
import { localGetUserId } from "../../utils/helpers";
import { getOrderByID } from "../../api";

const menuBarData = [
  {
    id: 1,
    state: true,
    title: "Order View",
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
  const [orderItems, setOrderItems] = useState<IOrderItem[] | any>([]);
  const [orderDetails, setOrderDetails] = useState<IOrderDetails>();
  const [userId] = useState<number | null>(() => localGetUserId());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let data = menuBar.filter((item) => item.state === true);

  const { orderId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getOrderByID(orderId).then((res) => {
      localStorage.setItem("order_items", JSON.stringify(res.data));
      setOrderDetails(res.data);
      setOrderItems(res.data.items);
      setIsLoading(false);
    });
  }, [userId]);

  // const handleNextButton = (id: any) => {
  //   const nextId = Number(id) + 1;
  //   for (let i = 0; i < menuBar.length; i++) {
  //     const element = menuBar[i];
  //     element.state = false;
  //   }
  //   const index = menuBar.findIndex((item) => item.id === parseInt(id));
  //   menuBar[index].state = true;
  //   setMenuBar([...menuBar]);
  // };

  // const handlePrevButton = (id: any) => {
  //   const nextId = Number(id) - 1;
  //   if (nextId >= 1) {
  //     for (let i = 0; i < menuBar.length; i++) {
  //       const element = menuBar[i];
  //       element.state = false;
  //     }
  //     const index = menuBar.findIndex((item) => item.id === nextId);
  //     menuBar[index].state = true;
  //     setMenuBar([...menuBar]);
  //   }
  // };

  const handleClickMenu = (id: any) => {
    for (let i = 0; i < menuBar.length; i++) {
      const element = menuBar[i];
      element.state = false;
    }
    const index = menuBar.findIndex((item) => item.id === parseInt(id));
    menuBar[index].state = true;
    setMenuBar([...menuBar]);
  };

  return (
    <>
      <Spin spinning={isLoading}>
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
                01 Order View &nbsp;&nbsp;{" "}
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
              <OrderPage
                orderItems={orderItems}
                menuBar={menuBar}
                setMenuBar={setMenuBar}
              />
            ) : data[0].id === 2 ? (
              <CustomerInfoPage menuBar={menuBar} setMenuBar={setMenuBar} />
            ) : data[0].id === 3 ? (
              <PaymentPage menuBar={menuBar} setMenuBar={setMenuBar} />
            ) : (
              <></>
            )}
          </div>
          <div className="shopping_page_small_half_container">
            <OrderSummary
              totalAmountOfItems={
                (orderDetails && orderDetails?.totalAmount) || 0
              }
            />
          </div>
        </div>
      </Spin>
    </>
  );
};

export default Shopping;
