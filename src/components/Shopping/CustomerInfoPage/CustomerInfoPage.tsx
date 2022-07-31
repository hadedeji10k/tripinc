import { useState } from "react";
import "./CustomerInfoPage.css";
import { Formik } from "formik";
import { CustomerInfoSchema } from "../../../schema/yupSchema";
import Swal from "sweetalert2";
import type { RadioChangeEvent } from "antd";
import { Radio, Spin } from "antd";
import "antd/dist/antd.min.css";
import { initiatePayment } from "../../../api/index";
import { IInitiatePayment, IOrderDetails } from "../../../api/interfaces";

interface Props {
  menuBar: any;
  setMenuBar: any;
  userInfo: any;
  orderDetails: IOrderDetails;
  setClientSecret: any;
}

const CustomerInfoPage = ({
  menuBar,
  setMenuBar,
  userInfo,
  orderDetails,
  setClientSecret,
}: Props) => {
  const [radioValue, setRadioValue] = useState("profileInfo");
  // const [addNewCustomerInfo, setAddNewCustomerInfo] = useState<boolean>(false);

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

  const initialValues = {
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
    city: "",
    country: "",
  };

  const radioOptions = [
    { label: "Profile Info", value: "profileInfo" },
    { label: "Existing Customer Info", value: "exInfo" },
    { label: "Add new Customer Info", value: "newInfo" },
  ];

  const onRadioChange = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio4 checked", value);
    setRadioValue(value);
  };

  const handleSubmitForm = async (action: string, data?: any) => {
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
    <Spin spinning={isLoading} size="large">
      <div className="customer_info_container">
        <h3 className="customer_info_title">Customer Info</h3>
        <Radio.Group
          options={radioOptions}
          onChange={onRadioChange}
          value={radioValue}
          optionType="button"
          buttonStyle="solid"
          className="m_b_10 m_t_5"
        />
        <div className="info_container">
          {radioValue === "exInfo" ? (
            <>
              <form
                onSubmit={(e: any) => {
                  e.preventDefault();
                  handleSubmitForm("profileInfo");
                }}
                autoComplete="off"
                className="sign_in_form"
              >
                <div>
                  <label className="customer_info_label">First Name</label>
                  <input
                    name="firstName"
                    className="customer_info_input"
                    type="text"
                    placeholder="Enter First Name"
                    value={userInfo.firstName ? userInfo.firstName : "N/A"}
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="customer_info_label">Last Name</label>
                  <input
                    name="lastName"
                    className="customer_info_input"
                    type="text"
                    placeholder="Enter Last Name"
                    value={userInfo.lastName ? userInfo.lastName : "N/A"}
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="customer_info_label">Address</label>
                  <input
                    name="address"
                    className="customer_info_input"
                    type="text"
                    placeholder="Enter your Address"
                    value={
                      userInfo.addressLine1 ? userInfo.addressLine1 : "N/A"
                    }
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="customer_info_label">Country</label>
                  <input
                    name="country"
                    className="customer_info_input"
                    type="text"
                    placeholder="Country"
                    value={userInfo.country ? userInfo.country : "N/A"}
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="customer_info_label">City</label>
                  <input
                    name="city"
                    className="customer_info_input"
                    type="text"
                    placeholder="City"
                    value={userInfo.city ? userInfo.city : "N/A"}
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="customer_info_label">Postal code</label>
                  <input
                    name="postalCode"
                    className="customer_info_input"
                    type="text"
                    placeholder="Postal code"
                    value={userInfo.postCode ? userInfo.postCode : "N/A"}
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="customer_info_label">Phone Number</label>
                  <input
                    name="phoneNumber"
                    className="customer_info_input"
                    type="text"
                    placeholder="Phone Number"
                    value={userInfo.phoneNumber ? userInfo.phoneNumber : "N/A"}
                    disabled={true}
                  />
                </div>
                <button type="submit" className="customer_info_button">
                  Proceed to Payment
                </button>
              </form>
            </>
          ) : radioValue === "newInfo" ? (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={CustomerInfoSchema}
                onSubmit={(values) => {
                  handleSubmitForm("newInfo", values);
                }}
              >
                {({
                  errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  handleBlur,
                }) => (
                  //  signin form

                  <>
                    <form
                      onSubmit={handleSubmit}
                      autoComplete="off"
                      className="sign_in_form"
                    >
                      <div>
                        <label className="customer_info_label">
                          First Name
                        </label>
                        <input
                          name="firstName"
                          className="customer_info_input"
                          type="text"
                          placeholder="Enter First Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.firstName && touched.firstName ? (
                          <p className="red_alert">{errors.firstName}</p>
                        ) : null}
                      </div>
                      <div>
                        <label className="customer_info_label">Last Name</label>
                        <input
                          name="lastName"
                          className="customer_info_input"
                          type="text"
                          placeholder="Enter Last Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.lastName && touched.lastName ? (
                          <p className="red_alert">{errors.lastName}</p>
                        ) : null}
                      </div>
                      <div>
                        <label className="customer_info_label">Address</label>
                        <input
                          name="address"
                          className="customer_info_input"
                          type="text"
                          placeholder="Enter your Address"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.address && touched.address ? (
                          <p className="red_alert">{errors.address}</p>
                        ) : null}
                      </div>
                      <div>
                        <label className="customer_info_label">Country</label>
                        <input
                          name="country"
                          className="customer_info_input"
                          type="text"
                          placeholder="Country"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.country && touched.country ? (
                          <p className="red_alert">{errors.country}</p>
                        ) : null}
                      </div>
                      <div>
                        <label className="customer_info_label">City</label>
                        <input
                          name="city"
                          className="customer_info_input"
                          type="text"
                          placeholder="City"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.city && touched.city ? (
                          <p className="red_alert">{errors.city}</p>
                        ) : null}
                      </div>
                      <div>
                        <label className="customer_info_label">
                          Postal code
                        </label>
                        <input
                          name="postalCode"
                          className="customer_info_input"
                          type="text"
                          placeholder="Postal code"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.postalCode && touched.postalCode ? (
                          <p className="red_alert">{errors.postalCode}</p>
                        ) : null}
                      </div>
                      <div>
                        <label className="customer_info_label">
                          Phone Number
                        </label>
                        <input
                          name="phoneNumber"
                          className="customer_info_input"
                          type="text"
                          placeholder="Phone Number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.phoneNumber && touched.phoneNumber ? (
                          <p className="red_alert">{errors.phoneNumber}</p>
                        ) : null}
                      </div>
                      <button type="submit" className="customer_info_button">
                        Proceed to Payment
                      </button>
                    </form>
                  </>

                  // End of signup form
                )}
              </Formik>
            </>
          ) : radioValue === "profileInfo" ? (
            <>
              <form
                onSubmit={(e: any) => {
                  e.preventDefault();
                  handleSubmitForm("profileInfo");
                }}
                autoComplete="off"
                className="sign_in_form"
              >
                <div>
                  <label className="customer_info_label">First Name</label>
                  <input
                    name="firstName"
                    className="customer_info_input"
                    type="text"
                    placeholder="Enter First Name"
                    value={userInfo.firstName ? userInfo.firstName : "N/A"}
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="customer_info_label">Last Name</label>
                  <input
                    name="lastName"
                    className="customer_info_input"
                    type="text"
                    placeholder="Enter Last Name"
                    value={userInfo.lastName ? userInfo.lastName : "N/A"}
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="customer_info_label">Address</label>
                  <input
                    name="address"
                    className="customer_info_input"
                    type="text"
                    placeholder="Enter your Address"
                    value={
                      userInfo.addressLine1 ? userInfo.addressLine1 : "N/A"
                    }
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="customer_info_label">Country</label>
                  <input
                    name="country"
                    className="customer_info_input"
                    type="text"
                    placeholder="Country"
                    value={userInfo.country ? userInfo.country : "N/A"}
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="customer_info_label">City</label>
                  <input
                    name="city"
                    className="customer_info_input"
                    type="text"
                    placeholder="City"
                    value={userInfo.city ? userInfo.city : "N/A"}
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="customer_info_label">Postal code</label>
                  <input
                    name="postalCode"
                    className="customer_info_input"
                    type="text"
                    placeholder="Postal code"
                    value={userInfo.postCode ? userInfo.postCode : "N/A"}
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="customer_info_label">Phone Number</label>
                  <input
                    name="phoneNumber"
                    className="customer_info_input"
                    type="text"
                    placeholder="Phone Number"
                    value={userInfo.phoneNumber ? userInfo.phoneNumber : "N/A"}
                    disabled={true}
                  />
                </div>
                <button type="submit" className="customer_info_button">
                  Proceed to Payment
                </button>
              </form>
            </>
          ) : null}

          <button
            onClick={() => handleClickMenu(1)}
            className="customer_info_button"
          >
            Back
          </button>
        </div>
      </div>
    </Spin>
  );
};

export default CustomerInfoPage;
