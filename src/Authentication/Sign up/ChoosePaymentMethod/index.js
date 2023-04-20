import React, { useState } from "react";
import { Card, Divider, Typography, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./payment.css";
import AddNewCard from "../../../Components/AddNewCardComponent";
import BackArrow from "../../../assets/images/back-w.svg";

function ChoosePaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [newCardDetails, setNewCardDetails] = useState({
    card_number: "",
    expiry_date: "",
    cvc: "",
    cardholder_name: "",
  });

  const navigate = useNavigate();

  const handleSaveNewCardDetails = () => {
    setNewCardDetails({
      card_number: "",
      expiry_date: "",
      cvc: "",
      cardholder_name: "",
    });
    navigate("/signup-billing-address");
  };

  return (
    <div>
      <div className="backArrow" onClick={() => navigate("/sign-up")}>
        <span>
          <img src={BackArrow} alt="backArrow" />
          Back
        </span>
      </div>
      <div className="paymentBox">
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
          <AddNewCard
            newCardDetails={newCardDetails}
            setNewCardDetails={setNewCardDetails}
            handleSaveNewCardDetails={handleSaveNewCardDetails}
          />
        </Card>
      </div>
    </div>
  );
}

export default ChoosePaymentMethod;
