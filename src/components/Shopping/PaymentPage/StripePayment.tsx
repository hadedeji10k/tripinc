import { useState } from "react";
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
import Swal from "sweetalert2";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//   "pk_test_51LQ9eVARtos1qH9ZsqQMHqCQFw8W2J7YKU7rVYWFRAa5sJkvZ0YqGogcFo3fRu8yQTBeBEbK4rr3mEk03mcC6NWE00odqvBQ4h"
// );
const stripePromise = loadStripe(
  "pk_live_51Hno6bEaoi4RnNazs45MLoj4JO0hM0EHJXbZzF3GqNlyAg0AbC8IWO1BgTiiPDaMISd2fUEQs7yQf2zu0kJmGLal009uRr36BD"
);

const StripePayment = ({ orderReference, amount, clientSecret }) => {
  //   const { orderReference, amount, clientSecret } = useParams();
  console.log(orderReference, amount, clientSecret);

  const options = {
    // passing the client secret obtained in step 2
    clientSecret,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
    <>
      {clientSecret && orderReference && amount ? (
        <div className="payment_page_container">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm orderReference={orderReference} amount={amount} />
          </Elements>
        </div>
      ) : null}
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

    Swal.fire({
      title: "Warning!",
      text: "Do you want to continue with the billing details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        // We don't want to let default form submission happen here,
        // which would refresh the page.

        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }

        const { error } = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          confirmParams: {
            return_url: "https://example.com/order/123/complete",
          },
        });

        if (error && error.message) {
          // This point will only be reached if there is an immediate error when
          // confirming the payment. Show error to your customer (for example, payment
          // details incomplete)
          setErrorMessage(error.message);
        } else {
          // Your customer will be redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer will be redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
        }
        setIsLoading(false);
      }
    });
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
