import React, { useState } from "react";
import "./Footer.css";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import { Formik } from "formik";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { signUpToNewsLetter } from "../../api/responseHandlers";
import { newsLetterSchema } from "../../schema/yupSchema";

const Footer = () => {
  // state for loading of newsletter
  const [isFooterNewsLetterLoading, setIsFooterNewsLetterLoading] =
    useState<boolean>(false);

  // function to handle newsletter subscription
  const handleNewsletterSubmit = async (values: any) => {
    setIsFooterNewsLetterLoading(true);
    console.log(values);
    const { email } = values;
    const formData = {
      email,
    };
    await signUpToNewsLetter(formData);
    setIsFooterNewsLetterLoading(false);
  };

  const initialValues = {
    email: "",
  };

  return (
    <div className="footer">
      <div className="footer_menu">
        <div className="footer_item">
          <div className="footer_item_menu">
            <p>
              <a href="/">Press</a>
            </p>
            <p>
              <a href="/">About us</a>
            </p>
            <p>
              <a href="/">Help Center</a>
            </p>
          </div>
          <div className="footer_item_menu">
            <p>
              <a href="/">What we do</a>
            </p>
            <p>
              <a href="/">Our Team</a>
            </p>
            <p>
              <a href="/">Refer a friend</a>
            </p>
          </div>
          <div className="footer_item_menu">
            <p>
              Keep your finger on the pulse! 🔥 &nbsp; Sign up for our
              newsletter
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={newsLetterSchema}
              onSubmit={(values) => {
                handleNewsletterSubmit(values);
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

                <form onSubmit={handleSubmit} autoComplete="off">
                  <input
                    name="email"
                    id="newsletter-input"
                    type="email"
                    className="input"
                    placeholder="Enter your email address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p className="red_alert">{errors.email}</p>
                  ) : null}

                  <Spin spinning={isFooterNewsLetterLoading}>
                    <button className="button" type="submit">
                      Submit
                    </button>
                  </Spin>
                </form>

                // End of signup form
              )}
            </Formik>
          </div>
        </div>
        <hr className="line" />
        <div className="footer_item">
          <div className="footer_item_menu">
            <p className="brand_name">
              <a href="/">TripInc</a>
            </p>
          </div>
          <div className="footer_item_menu">
            <p>
              Stay Connected &nbsp; &nbsp;{" "}
              <a href="/">
                <BsFacebook />
              </a>{" "}
              &nbsp; &nbsp;{" "}
              <a href="/">
                <BsTwitter />
              </a>{" "}
              &nbsp; &nbsp;{" "}
              <a href="/">
                <BsInstagram />
              </a>{" "}
            </p>
          </div>
        </div>
        <p className="footer_all_right">
          TripInc © {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
