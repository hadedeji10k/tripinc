import { useState, useEffect } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import "./PaymentPage.css";
import { stripeTestKey, stripeLiveKey } from "../../../utils/constants";

const stripePromise = loadStripe(stripeTestKey);
// const stripePromise = loadStripe(
//   stripeLiveKey
// );

const StripePayment = ({ orderReference, amount, clientSecret }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // using this useEffect to load the stripe payment element, it takes time to load and no state to track the loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const options = {
    clientSecret,
    appearance: {},
  };

  return (
    <>
      <Spin spinning={isLoading} size="large">
        {clientSecret && orderReference && amount ? (
          <div className="payment_page_container">
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm orderReference={orderReference} amount={amount} />
            </Elements>
          </div>
        ) : null}
      </Spin>
    </>
  );
};

const CheckoutForm = ({ orderReference, amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#/successful-payment`;

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: url,
      },
      redirect: "if_required",
    });

    if (response.error && response.error.message) {
      setErrorMessage(response.error.message);
    } else {
      console.log(response);
      if (response.paymentIntent?.status.toLowerCase() === "succeeded") {
        window.location.href = "/#/successful-payment";
      }
    }
    setIsLoading(false);
  };

  return (
    <Spin spinning={isLoading} size="large">
      <div className="checkout_payment_page">
        <h3 className="payment_checkout_header">
          You are currently making payment for an order{" "}
        </h3>
        <p className="payment_checkout_text">
          Reference Number: {orderReference}
        </p>
        <form className="payment_page_form" onSubmit={handleSubmit}>
          <PaymentElement />
          <button
            className="signin_button m_t_20 payment_button"
            disabled={!stripe}
          >
            Submit
          </button>
          {/* Show error message */}
          {errorMessage && <div className="red_alert">{errorMessage}</div>}
        </form>
      </div>
    </Spin>
  );
};

export default StripePayment;
