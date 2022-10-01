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
// import { exportFromApi } from "../../../utils/helpers";

interface Props {
  orderItems: IOrderItem[];
  menuBar: any;
  setMenuBar: any;
  isOrderPending: boolean;
  userInfo: any;
  orderDetails: IOrderDetails;
  setClientSecret: any;
}

const OrderPage = ({
  orderItems,
  menuBar,
  setMenuBar,
  isOrderPending,
  userInfo,
  orderDetails,
  setClientSecret,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  // state for download type
  // const [exportType, setExportType] = useState("csv");

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

  // const handleExportOrder = async () => {
  //   setIsLoading(true);

  //   // const inputOptions = new Promise((resolve) => {
  //   //   setTimeout(() => {
  //   //     resolve({
  //   //       csv: "CSV",
  //   //       excel: "EXCEL",
  //   //     });
  //   //   }, 100);
  //   // });

  //   // Swal.fire({
  //   //   title: "Select Export type",
  //   //   input: "radio",
  //   //   inputOptions: inputOptions,
  //   //   inputValidator: (value) => {
  //   //     if (!value) {
  //   //       return "You need to choose something!";
  //   //     } else {
  //   //       return "";
  //   //     }
  //   //   },
  //   // })
  //   //   .then(({ value }) => {
  //   //     console.log(value);
  //   //     if (value) {
  //   //       setExportType(value);
  //   setExportType("csv");
  //   const query = `Status=${orderDetails?.status}&exportType=${exportType}`;
  //   exportOrder(query)
  //     .then((result) => {
  //       const extension =
  //         exportType === "csv"
  //           ? "csv"
  //           : exportType === "excel"
  //           ? "xlsx"
  //           : "csv";
  //       const mimeType =
  //         extension === "csv"
  //           ? "text/csv"
  //           : extension === "xlsx"
  //           ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //           : "application/json";
  //       const fileName = "Orders-" + new Date().getTime() + `.${extension}`;
  //       exportFromApi(fileName, result.data, mimeType);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  //   // }
  //   // })
  //   // .catch(() => {
  //   //   setIsLoading(false);
  //   // });

  //   // // Get user export type, but for now, it's csv
  //   // if (selectedExportType) {
  //   //   setExportType(selectedExportType);
  //   // } else {
  //   //   setExportType("csv");
  //   // }

  //   // const status = isPaymentCompleted ? "Completed" : "Pending";
  //   // const query = `Status=${status}&exportType=${exportType}`;
  //   // exportOrder(query)
  //   //   .then((result) => {
  //   //     const extension =
  //   //       exportType === "csv"
  //   //         ? "csv"
  //   //         : exportType === "excel"
  //   //         ? "xlsx"
  //   //         : "csv";
  //   //     const mimeType =
  //   //       extension === "csv"
  //   //         ? "text/csv"
  //   //         : extension === "xlsx"
  //   //         ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //   //         : "application/json";
  //   //     const fileName = "Orders-" + new Date().getTime() + `.${extension}`;
  //   //     exportFromApi(fileName, result.data, mimeType);
  //   //   })
  //   //   .finally(() => {
  //   //     setIsLoading(false);
  //   //   });
  // };

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
          {isOrderPending ? (
            <button
              onClick={() => handleSubmitForm()}
              className="customer_info_button"
            >
              Proceed
            </button>
          ) : null}

          {/* <button className="customer_info_button" onClick={handleExportOrder}>
            Export Order
          </button> */}

          <div className="order_payment_status_tab w_80 center app_row">
            <p className="medium_title">Order Status:</p>
            <p className="medium_title">{orderDetails?.status}</p>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default OrderPage;
