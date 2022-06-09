import { useState } from "react";
import OtpInput from "react-otp-input";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./VerifyAccount.css";
import { localGetUserId } from "../../utils/helpers";
import { verifyAccount } from "../../api/responseHandlers";

const VerifyAccount = () => {
  const [otp, setOtp] = useState<string>("");
  const [hideOtp, setHideOtp] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = localGetUserId();

  const handleChange = (otp) => {
    console.log(otp);
    setOtp(otp);
  };

  const handleOtpHide = (e) => {
    e.preventDefault();
    // console.log(otp);
    setHideOtp((prev) => !prev);
  };

  const handleContinue = async () => {
    setIsLoading(true);
    const formData = {
      userId,
      token: otp,
      verificationType: "Email",
    };
    console.log(formData);
    await verifyAccount(formData);
    setIsLoading(false);
  };

  return (
    <Spin spinning={isLoading}>
      <div className="verify_account_page_container">
        <div className="verify_account_word">
          <h1 className="verify_account_header">Verify your account</h1>
          <h3 className="verify_account_title">
            Kindly enter the code sent to your email to verify your account
          </h3>
        </div>
        <br />
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          isInputSecure={hideOtp}
          inputStyle="inputStyle"
          shouldAutoFocus={true}
          placeholder={hideOtp ? "******" : "123456"}
        />
        {hideOtp ? (
          <p className="code_eyes_icon" onClick={handleOtpHide}>
            <AiFillEye />
          </p>
        ) : (
          <p className="code_eyes_icon" onClick={handleOtpHide}>
            <AiFillEyeInvisible />
          </p>
        )}
        <br />
        <div>
          <button className="verify_account_button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </Spin>
  );
};

export default VerifyAccount;
