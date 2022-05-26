import React from "react";
import "./WalletPage.css";

const WalletPage = () => {
  return (
    <div>
      <div className="wallet_page">
        <div className="wallet_page_container">
          <div className="wallet_header_container">
            <h3 className="wallet_page_header">Your Wallet</h3>
          </div>
          <div className="wallet_container">
            <div className="available_credit">
              <div className="wallet_input_container">
                <label className="wallet_label">💎 Available Credit</label>
                <input
                  className="wallet_input"
                  type="text"
                  disabled
                  placeholder="$0"
                />
                <button className="wallet_page_button">Go Explore!</button>
              </div>
            </div>
            <div className="redeem_credit">
              <div className="wallet_input_container">
                <label className="wallet_label">
                  🎁 Redeem a gift card / Voucher Code
                </label>
                <input
                  className="wallet_input"
                  type="text"
                  placeholder="Enter Voucher Code"
                />
                <button className="wallet_page_button_two">Redeem</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
