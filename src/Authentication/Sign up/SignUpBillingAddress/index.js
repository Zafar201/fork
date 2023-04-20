import React, { useState } from "react";
import { Divider, Card, Typography, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./Billing.css";
import BackArrow from "../../../assets/images/back-w.svg";
import EditBillingAddress from "../../../Dashboard/ChangePlan/EditBillingAddress";

export default function SignUpBillingAddress() {
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [continuePayment, setContinuePayment] = useState(false);
  const [selectPayment, setSelectPayment] = useState(false);
  const [previousPage, setPreviousPage] = useState("");
  const [addressInputValues, setAddressInputValues] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const navigate = useNavigate();
  localStorage.setItem("successView", selectPayment);

  const handleSaveAddressDetails = () => {
    setAddressInputValues({
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    });
    setConfirmPayment(true);
  };

  const handleSubscribe = () => {
    setSubscription(true);
    setPreviousPage("subscripe");
  };

  const handleContinuePayment = () => {
    setContinuePayment(true);
    setPreviousPage("choose-payment1");
  };

  const handleSelectpayment = () => {
    setSelectPayment(true);
    setPreviousPage("choose-payment2");
  };

  const handleNavigateAccountSetup = () => {
    navigate("/account-setup");
  };

  const choosePaymentMethodInitialView = (
    <div className="ChoosePayBox-1">
      <Card>
        <h3>Choose payment method</h3>
        <p>
          Subscription: Pro Plan (6 Months, 10% discount)
          <br /> $269 x 6 = $1,614
        </p>
        <Divider />
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="toggleBtn"
        >
          <Typography
            onClick={() => setPaymentMethod(false)}
            style={{ color: paymentMethod === false ? "black" : "grey" }}
          >
            Card
          </Typography>
          <Switch
            name="payment"
            checked={paymentMethod}
            onClick={() => setPaymentMethod(!paymentMethod)}
          />
          <Typography
            onClick={() => setPaymentMethod(true)}
            style={{ color: paymentMethod === true ? "black" : "grey" }}
          >
            Crypto
          </Typography>
        </div>
        <div>
          {paymentMethod && (
            <p>
              <span>IMPORTANT NOTICE: All</span> crypto subscriptions require
              <br />
              manual renewal. If you do not manually renew your
              <br />
              account it will automatically be deactivated at the
              <br /> start of your next billing cycle.
            </p>
          )}
        </div>
        <button
          color="inherit"
          className="yBtn"
          onClick={handleContinuePayment}
        >
          Continue
        </button>
      </Card>
    </div>
  );

  const choosePaymentCryptoMethodView = (
    <div className="ChoosePayBox-2">
      <Card>
        <h3>Choose payment method</h3>
        <p>
          Subscription: Pro Plan (6 Months, 10% discount)
          <br /> $269 x 6 = $1,614
        </p>
        <Divider />
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="toggleBtn"
        >
          <Typography
            onClick={() => setPaymentMethod(false)}
            style={{ color: paymentMethod === false ? "black" : "grey" }}
          >
            Card
          </Typography>
          <Switch
            name="payment"
            checked={paymentMethod}
            onClick={() => setPaymentMethod(!paymentMethod)}
          />
          <Typography
            onClick={() => setPaymentMethod(true)}
            style={{ color: paymentMethod === true ? "black" : "grey" }}
          >
            Crypto
          </Typography>
        </div>
        <div className="selectBTns">
          <p>Select Blockchain:</p>
          <button
            color="inherit"
            className="yBtn"
            onClick={handleSelectpayment}
          >
            Ethereum
          </button>
          <button
            color="inherit"
            className="yBtn"
            onClick={handleSelectpayment}
          >
            Solana
          </button>
        </div>
      </Card>
    </div>
  );

  const paymentSeccessView = (
    <div className="SuccessPayBox">
      <Card>
        <h3>Success!</h3>
        <Divider />
        <p>
          You have successfully subscribed to the Pro plan and
          <br /> have unlocked <span>150</span> seats for your community.
        </p>
        <p>
          Let’s finish your account setup. This should take less
          <br /> than 5 minutes to complete.
        </p>
        <button
          color="inherit"
          className="yBtn"
          onClick={handleNavigateAccountSetup}
        >
          Complete Account Setup
        </button>
      </Card>
    </div>
  );

  const handleNavigatePreviouspage = () => {
    switch (previousPage) {
      case "":
        navigate("/choose-payment-method");
        break;
      case "add-billing-address":
        setConfirmPayment(false);
        setPreviousPage("");
        break;
      case "subscripe":
        setSubscription(false);
        setPreviousPage("add-billing-address");
        break;
      case "choose-payment1":
        setContinuePayment(false);
        setPreviousPage("subscripe");
        break;
      case "choose-payment2":
        setSelectPayment(false);
        setPreviousPage("choose-payment1");
        break;
    }
  };

  return (
    <div>
      {previousPage === "choose-payment2" ? (
        ""
      ) : (
        <div className="backArrow" onClick={handleNavigatePreviouspage}>
          <span>
            {" "}
            <img src={BackArrow} />
            Back
          </span>
        </div>
      )}
      {subscription ? (
        <>
          {continuePayment ? (
            <div>
              {selectPayment
                ? paymentSeccessView
                : choosePaymentCryptoMethodView}
            </div>
          ) : (
            choosePaymentMethodInitialView
          )}
        </>
      ) : (
        <>
          {confirmPayment ? (
            <div className="ConfirmPayBox">
              <Card>
                <h3>Confirm Payment</h3>
                <Divider />
                <button
                  color="inherit"
                  className="yBtn"
                  onClick={handleSubscribe}
                >
                  Pay $1,614 & Subscribe
                </button>
              </Card>
            </div>
          ) : (
            <div className="BillAddressBox">
              <EditBillingAddress
                addressInputValues={addressInputValues}
                setAddressInputValues={setAddressInputValues}
                handleSaveAddressDetails={handleSaveAddressDetails}
                navigatePreviousPage={setPreviousPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
