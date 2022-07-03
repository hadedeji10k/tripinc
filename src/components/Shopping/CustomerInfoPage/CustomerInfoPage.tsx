import { useState } from "react";
import "./CustomerInfoPage.css";
import { Formik } from "formik";
import { CustomerInfoSchema } from "../../../schema/yupSchema";
import Swal from "sweetalert2";

interface Props {
  menuBar: any;
  setMenuBar: any;
}

const CustomerInfoPage = ({ menuBar, setMenuBar }: Props) => {
  const handleClickMenu = (id: any) => {
    for (let i = 0; i < menuBar.length; i++) {
      const element = menuBar[i];
      element.state = false;
    }
    const index = menuBar.findIndex((item) => item.id === parseInt(id));
    menuBar[index].state = true;
    setMenuBar([...menuBar]);
  };

  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
    city: "",
    country: "",
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // const formData = {
    //   username: data.email,
    //   password: data.password,
    //   channel: "web",
    // };
    console.log(data);

    // success message
    // Swal.fire({
    //   title: "Success!",
    //   text: "You have successfully logged in",
    //   icon: "success",
    //   confirmButtonText: "Ok",
    // }).then((result) => {
    //   if (result.isConfirmed || result.isDenied || result.isDismissed) {
    //     // window.location.href = "/";
    //     // const path = state ? state?.from : "/";
    //     // navigate(path);
    //   }
    // });
    setIsLoading(false);
  };
  return (
    <>
      <div className="customer_info_container">
        <div className="info_container">
          <h3 className="customer_info_title">Customer Info</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={CustomerInfoSchema}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {({ errors, touched, handleSubmit, handleChange, handleBlur }) => (
              //  signin form

              <>
                <form
                  onSubmit={handleSubmit}
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
                    <label className="customer_info_label">Postal code</label>
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
                    <label className="customer_info_label">Phone Number</label>
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
          <button
            onClick={() => handleClickMenu(1)}
            className="customer_info_button"
          >
            Back
          </button>
          <p>
            <a href="/explore" className="return_to_explore">
              &larr; Return to Exploring
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default CustomerInfoPage;
