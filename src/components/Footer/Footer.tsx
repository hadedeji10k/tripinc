import React, { useState } from "react";
import "./Footer.css";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import { Formik } from "formik";
import { BsFacebook, BsLinkedin, BsInstagram } from "react-icons/bs";
import { signUpToNewsLetter } from "../../api/responseHandlers";
import { newsLetterSchema } from "../../schema/yupSchema";
import LogoWhite from "../../images/logo-tripinc-white.svg";

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
            {/* <p className="footer_item_menu_name">
              <a className="footer_item_link" href="/">
                Press
              </a>
            </p> */}
            <p className="footer_item_menu_name">
              <a className="footer_item_link" href="/#/about-us">
                About us
              </a>
            </p>
            <p className="footer_item_menu_name">
              <a className="footer_item_link" href="/#/contact-us">
                Help Center
              </a>
            </p>
          </div>
          <div className="footer_item_menu">
            <p className="footer_item_menu_name">
              <a className="footer_item_link" href="/#/about-us">
                What we do
              </a>
            </p>
            <p className="footer_item_menu_name">
              <a className="footer_item_link" href="/#/about-us">
                Our Team
              </a>
            </p>
            <p className="footer_item_menu_name">
              <a className="footer_item_link" href="/#/about-us">
                Refer a friend
              </a>
            </p>
          </div>
          <div className="footer_item_menu">
            <p className="footer_item_menu_name">
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
                    className="footer_newsletter_input"
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
              <a className="footer_item_link" href="/">
                <img src={LogoWhite} alt="TripInc's logo" />
              </a>
            </p>
          </div>
          <div className="footer_item_menu">
            <p className="footer_item_menu_name">
              Stay Connected &nbsp; &nbsp;{" "}
              <a
                className="footer_item_link"
                href="https://www.facebook.com/TripInc.co/"
                target="_blank"
              >
                <BsFacebook />
              </a>{" "}
              &nbsp; &nbsp;{" "}
              <a
                className="footer_item_link"
                href=" https://www.linkedin.com/company/trip-incorporated/"
                target="_blank"
              >
                <BsLinkedin />
              </a>{" "}
              &nbsp; &nbsp;{" "}
              <a
                className="footer_item_link"
                href="https://www.instagram.com/tripincorporated/"
                target="_blank"
              >
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
