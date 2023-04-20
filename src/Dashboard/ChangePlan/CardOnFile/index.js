import React, { useState } from "react";
import { Card, Divider, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import "./CardOnFile.css";
import ChangePaymentMethod from "../../../Components/PaymentMethod";
import EditAccount from "../EditAccount";
import EditBillingAddress from "../EditBillingAddress";
import AddNewCard from "../../../Components/AddNewCardComponent";
import BackArrow from "../../../assets/images/back-w.svg";
import Lock from "../../../assets/images/secureLock.svg";

export default function CardOnFile() {
  const [newPage, setPage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [changePayment, setChangePayment] = useState("card");
  const [changeCardScreen, setChangeCardScreen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [accountInputValues, setAccountInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [addressInputValues, setAddressInputValues] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });
  const [newCardDetails, setNewCardDetails] = useState({
    card_number: "",
    expiry_date: "",
    cvc: "",
    cardholder_name: "",
  });

  const navigate = useNavigate();

  const handleSaveAccountDetails = () => {
    setAccountInputValues({
      firstName: "",
      lastName: "",
      email: "",
    });
    setChangeCardScreen(false);
  };

  const handleSaveAddressDetails = () => {
    setAddressInputValues({
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    });
    setChangeCardScreen(false);
  };

  const handleSaveNewCardDetails = () => {
    setNewCardDetails({
      card_number: "",
      expiry_date: "",
      cvc: "",
      cardholder_name: "",
    });
    setChangeCardScreen(false);
  };

  const handleAccountClick = () => {
    setChangeCardScreen(true);
    setPage("account");
  };
  const handlePaymentMethod = () => {
    setChangeCardScreen(true);
    setPage("payment-method");
  };
  const handleCardUpdateClick = () => {
    setChangeCardScreen(true);
    setPage("card-update");
  };
  const handleBillingAddressClick = () => {
    setChangeCardScreen(true);
    setPage("billing-address");
  };

  const handlePay = () => {
    setPaymentSuccess(true);
  };

  const handleNavigate = () => {
    setPaymentSuccess(false);
    navigate("/change-plan");
  };

  const handleChangeCard = (page) => {
    switch (page) {
      case "payment-method":
        return (
          <ChangePaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            setChangePayment={setChangePayment}
            setChangeCardScreen={setChangeCardScreen}
          />
        );
      case "account":
        return (
          <EditAccount
            accountInputValues={accountInputValues}
            setAccountInputValues={setAccountInputValues}
            handleSaveAccountDetails={handleSaveAccountDetails}
            setChangeCardScreen={setChangeCardScreen}
          />
        );
      case "card-update":
        return (
          <div className="addCard">
            <AddNewCard
              newCardDetails={newCardDetails}
              setNewCardDetails={setNewCardDetails}
              handleSaveNewCardDetails={handleSaveNewCardDetails}
              setChangeCardScreen={setChangeCardScreen}
            />
          </div>
        );
      case "billing-address":
        return (
          <div className="billingAddress">
            <EditBillingAddress
              addressInputValues={addressInputValues}
              setAddressInputValues={setAddressInputValues}
              handleSaveAddressDetails={handleSaveAddressDetails}
              setChangeCardScreen={setChangeCardScreen}
            />
          </div>
        );
    }
  };

  return (
    <>
      {paymentSuccess ? (
        <div className="SuccessBox">
          <Card>
            <h3>Success!</h3>
            <Divider />
            <p>You have successfully changed your subscription.</p>
            <button color="inherit" className="yBtn" onClick={handleNavigate}>
              Return to My Account
            </button>
          </Card>
        </div>
      ) : (
        <>
          {changeCardScreen ? (
            handleChangeCard(newPage)
          ) : (
            <div>
              <div className="backArrow">
                <Link to={-1}>
                  <img src={BackArrow} /> Back
                </Link>
              </div>
              {changePayment === "card" ? (
                <div className="completeOrder">
                  <Card>
                    <div>
                      <h3>Complete your order</h3>
                      <Divider />
                      <div>
                        <div style={{ display: "flex" }}>
                          <h5>Standard Plan (Yearly)</h5>
                          <h5>$1,512</h5>
                        </div>
                        <div style={{ display: "flex" }}>
                          <p>Prorated Adjustment (Dec. 8 - Jan 1)</p>
                          <p>-$49</p>
                        </div>
                      </div>
                      <div className="leftLine">
                        <h4>Account</h4>
                        <p>John Doe</p>
                        <div style={{ display: "flex" }}>
                          <Typography>cryptobreaky@harkness.io</Typography>
                          <Link onClick={handleAccountClick}>Edit</Link>
                        </div>
                      </div>
                      <div className="leftLine">
                        <h4>Payment Method</h4>
                        <div style={{ display: "flex" }}>
                          <Typography>Debit/Credit Card</Typography>
                          <Link onClick={handlePaymentMethod}>Change</Link>
                        </div>
                      </div>
                      <div className="leftLine">
                        <h4>Card Details</h4>
                        <div style={{ display: "flex" }}>
                          <Typography>Visa ending in 4760</Typography>
                          <Link onClick={handleCardUpdateClick}>Update</Link>
                        </div>
                      </div>
                      <div className="leftLine">
                        <h4>Billing Address</h4>
                        <p>800 Village Walk, STE 180</p>
                        <div style={{ display: "flex" }}>
                          <Typography>Guilford, CT 06437, USA</Typography>
                          <Link onClick={handleBillingAddressClick}>Edit</Link>
                        </div>
                      </div>
                      <p>
                        I agree to <Link to="">Terms of Use</Link> and{" "}
                        <Link to="">Privacy Policy</Link>.
                      </p>
                      <button
                        color="inherit"
                        className="yBtn"
                        onClick={handlePay}
                      >
                        Pay $1,463 & Subscribe
                      </button>
                      <div className="secure">
                        <img src={Lock} />
                        <Typography>Secure Checkout</Typography>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="completeOrder">
                  <Card>
                    <div>
                      <h3>Complete your order</h3>
                      <Divider />
                      <div>
                        <div style={{ display: "flex" }}>
                          <h5>Standard Plan (Yearly)</h5>
                          <h5>$1,512</h5>
                        </div>
                        <div style={{ display: "flex" }}>
                          <p>Prorated Adjustment (Dec. 8 - Jan 1)</p>
                          <p>-$49</p>
                        </div>
                      </div>
                      <div className="leftLine">
                        <h4>Account</h4>
                        <p>John Doe</p>
                        <div style={{ display: "flex" }}>
                          <Typography>cryptobreaky@harkness.io</Typography>
                          <Link onClick={handleAccountClick}>Edit</Link>
                        </div>
                      </div>
                      <div className="leftLine">
                        <h4>Payment Method</h4>
                        <div style={{ display: "flex" }}>
                          <Typography>Crypto</Typography>
                          <Link onClick={handlePaymentMethod}>Change</Link>
                        </div>
                      </div>
                      <p>
                        By completing payment, you agree to{" "}
                        <Link to="">Terms of Use</Link> and{" "}
                        <Link to="">Privacy Policy</Link>.
                      </p>
                      <div style={{ display: "flex" }}>
                        <button color="inherit" className="yBtn">
                          Ethereum
                        </button>
                        <button color="inherit" className="yBtn">
                          Solana
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
