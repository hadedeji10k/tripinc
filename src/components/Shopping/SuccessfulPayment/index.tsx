import "./SuccessfulPayment.css";
import MyGif from "../../../images/success.gif";

const SuccessfulPayment = () => {
  return (
    <div className="successful_payment_container">
      <div className="successful_payment_word">
        <h1 className="successful_payment_header">Success!</h1>
        <img className="success_gif" src={MyGif} alt="hello" />
        <h3 className="successful_payment_title">
          Your payment has been successfully received
        </h3>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
