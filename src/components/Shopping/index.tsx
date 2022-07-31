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
import { getUserByID } from "../../api/index";

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
  const [userInfo, setUserInfo] = useState<number | null>(() =>
    localGetUserId()
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // state to check if payment has been made
  const [isPaymentCompleted, setIsPaymentCompleted] = useState<boolean>(false);

  // state to set customer information
  // const [customerInfo, setCustomerInfo] = useState<any>({});

  // initialize the payment
  const [clientSecret, setClientSecret] = useState("");

  let data = menuBar.filter((item) => item.state === true);

  const { orderId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getOrderByID(orderId).then((res) => {
      setOrderDetails(res.data);
      setIsPaymentCompleted(false);
      // setIsPaymentCompleted(
      //   res.data.status.toLowerCase() === "completed" ? true : false
      // );
      setOrderItems(res.data.items);
      getUserByID(userId as any).then((res) => {
        setUserInfo(res.data);
        setIsLoading(false);
      });
    });
  }, [userId, orderId]);

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
              >
                01 Order View &nbsp;&nbsp;{" "}
              </span>{" "}
              {/* don't show if payment is already made */}
              {!isPaymentCompleted ? (
                <>
                  {/* <span
                    className={
                      data[0].id === 2
                        ? "shopping_active"
                        : "shopping_not_active"
                    }
                  >
                    {" "}
                    &gt; &nbsp; 02 Customer Info &nbsp;&nbsp;{" "}
                  </span>{" "} */}
                  <span
                    className={
                      data[0].id === 3
                        ? "shopping_active"
                        : "shopping_not_active"
                    }
                  >
                    {" "}
                    &gt; &nbsp; 02 Payment
                  </span>
                </>
              ) : null}
            </p>

            <hr className="cart_line" />

            {data[0].id === 1 ? (
              <OrderPage
                orderItems={orderItems}
                menuBar={menuBar}
                setMenuBar={setMenuBar}
                isPaymentCompleted={isPaymentCompleted}
                userInfo={userInfo}
                orderDetails={orderDetails as any}
                setClientSecret={setClientSecret}
              />
            ) : data[0].id === 2 ? (
              <CustomerInfoPage
                menuBar={menuBar}
                setMenuBar={setMenuBar}
                userInfo={userInfo}
                orderDetails={orderDetails as any}
                setClientSecret={setClientSecret}
              />
            ) : data[0].id === 3 ? (
              <PaymentPage
                menuBar={menuBar}
                setMenuBar={setMenuBar}
                orderDetails={orderDetails as any}
                clientSecret={clientSecret}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="shopping_page_small_half_container">
            <OrderSummary
              totalAmountOfItems={
                (orderDetails && orderDetails?.totalAmount) || 0
              }
              isPaymentCompleted={isPaymentCompleted}
            />
          </div>
        </div>
      </Spin>
    </>
  );
};

export default Shopping;
