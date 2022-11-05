import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./AccountVerified.css";
import { Spin } from "antd";
import { verifyAccount } from "api";
import { IVerifyAccount } from "api/interfaces";

import "antd/dist/antd.min.css";
import MyGif from "images/success.gif";

const AccountVerified = () => {
  const [accountVerified, setAccountVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("UserId");
  const token = searchParams.get("Token") as string;
  const verificationType = searchParams.get("VerificationType") as string;
  console.log(userId, token, verificationType);

  useEffect(() => {
    setIsLoading(true);
    const formData: IVerifyAccount = {
      userId: parseInt(userId as string),
      token,
      verificationType,
    };

    verifyAccount(formData)
      .then((response) => {
        setAccountVerified(true);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId, token, verificationType]);

  return (
    <Spin spinning={isLoading} size="large">
      <div className="account_verified_container">
        {accountVerified ? (
          <div className="account_verified_word">
            <h1 className="account_verified_header">Success!</h1>
            <img className="success_gif" src={MyGif} alt="hello" />
            <h3 className="account_verified_title">
              Your account has been verified successfully.
            </h3>

            <button
              className="basic_details_button"
              onClick={() => {
                window.location.href = "/#/explore";
              }}
            >
              Explore Now!
            </button>
          </div>
        ) : null}
        {error ? (
          <div className="account_verified_word">
            <h1 className="account_verified_header">Error!</h1>
            <h3 className="account_verified_title">
              Error while trying to verify your account, please try again.
            </h3>

            <button
              className="basic_details_button"
              onClick={() => {
                window.location.href = "/#/profile";
              }}
            >
              Go to Profile!
            </button>
          </div>
        ) : null}
      </div>
    </Spin>
  );
};

export default AccountVerified;
