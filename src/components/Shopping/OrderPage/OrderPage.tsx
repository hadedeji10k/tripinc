import { useState } from "react";
import "./OrderPage.css";
import OrderCard from "./OrderCard";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import {
  IOrderItem,
  IInitiatePayment,
  IOrderDetails,
} from "../../../api/interfaces";
import { initiatePayment } from "../../../api/index";
import Swal from "sweetalert2";

interface Props {
  orderItems: IOrderItem[];
  menuBar: any;
  setMenuBar: any;
  isPaymentCompleted: boolean;
  userInfo: any;
  orderDetails: IOrderDetails;
  setClientSecret: any;
}

const OrderPage = ({
  orderItems,
  menuBar,
  setMenuBar,
  isPaymentCompleted,
  userInfo,
  orderDetails,
  setClientSecret,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClickMenu = (id: any) => {
    for (let i = 0; i < menuBar.length; i++) {
      const element = menuBar[i];
      element.state = false;
    }
    const index = menuBar.findIndex((item) => item.id === parseInt(id));
    menuBar[index].state = true;
    setMenuBar([...menuBar]);
  };

  const handleSubmitForm = async (action?: string, data?: any) => {
    setIsLoading(true);
    // let userDetails: any = {};

    // if (action === "profileInfo") {
    //   const {
    //     firstName,
    //     lastName,
    //     addressLine1,
    //     addressLine2,
    //     postCode: postalCode,
    //     phoneNumber,
    //     city,
    //     country,
    //   } = userInfo;
    //   userDetails = {
    //     firstName,
    //     lastName,
    //     addressLine1,
    //     addressLine2,
    //     postalCode,
    //     phoneNumber,
    //     city,
    //     country,
    //   };
    // } else if (action === "exInfo") {
    // } else if (action === "newInfo") {
    //   const {
    //     firstName,
    //     lastName,
    //     addressLine1,
    //     addressLine2,
    //     postCode: postalCode,
    //     phoneNumber,
    //     city,
    //     country,
    //   } = data;
    //   userDetails = {
    //     firstName,
    //     lastName,
    //     addressLine1,
    //     addressLine2,
    //     postalCode,
    //     phoneNumber,
    //     city,
    //     country,
    //   };
    // } else {
    //   userDetails = {};
    // }

    const formData: IInitiatePayment = {
      userId: userInfo?.id,
      orderId: orderDetails?.id,
      paymentProvider: "stripe",
    };

    await initiatePayment(formData)
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "You have successfully initialized your payment.",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed || result.isDenied || result.isDismissed) {
            setClientSecret(res.data.data.clientSecret);
            handleClickMenu(3);
            setIsLoading(false);
          }
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Error encountered while trying to initialize your payment, please try again.",
          icon: "error",
        });
        setIsLoading(false);
      });
  };

  return (
    <>
      <Spin spinning={isLoading} size="large">
        <div className="cart_container">
          <h3 className="shopping_cart_title">Order View</h3>
          <p className="order_note">Note: Orders are not editable</p>
          {orderItems.length > 0
            ? orderItems.map((item) => (
                <div key={item.id}>
                  <OrderCard item={item} />
                </div>
              ))
            : null}
          {/* : (
            <div>
              <br />
              <br />
              <br />
              <p>No item in this order</p>
              <br />
              <br />
              <br />
            </div>
          ) */}

          {/* hide the proceed if payment has already been made */}
          {!isPaymentCompleted ? (
            <button
              onClick={() => handleSubmitForm()}
              className="customer_info_button"
            >
              Proceed
            </button>
          ) : // <button
          //   onClick={() => handleClickMenu(2)}
          //   className="customer_info_button"
          // >
          //   Proceed
          // </button>
          null}
        </div>
      </Spin>
    </>
  );
};

export default OrderPage;
