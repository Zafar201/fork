import React, { useRef } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Divider, TextField, Card } from "@mui/material";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { formValidations } from "../../Action";

export default function AddNewCard({
  newCardDetails,
  setNewCardDetails,
  handleSaveNewCardDetails,
  setChangeCardScreen,
}) {
  const inputRef = useRef({});
  const location = useLocation();

  const handleChange = (e) => {
    setNewCardDetails({ ...newCardDetails, [e.target.name]: e.target.value });
  };

  const formValidation = () => {
    formValidations(
      newCardDetails,
      ["card_number", "expiry_date", "cvc", "cardholder_name"],
      inputRef
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newCardDetails?.card_number &&
      newCardDetails?.expiry_date &&
      newCardDetails?.cvc &&
      newCardDetails?.cardholder_name
    ) {
      handleSaveNewCardDetails();
    } else {
      formValidation();
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        {location.pathname !== "/choose-payment-method" && (
          <>
            <h3>
              <KeyboardBackspaceIcon
                onClick={() => setChangeCardScreen(false)}
              />
              Add new card
            </h3>
            <Divider />
          </>
        )}
        <TextField
          name="card_number"
          variant="outlined"
          label="Card Number"
          placeholder="0000 0000 0000 0000"
          onChange={handleChange}
          inputRef={(ref) => (inputRef.current.card_number = ref)}
        />
        <div style={{ display: "flex" }} className="cardDetailsRow">
          <TextField
            name="expiry_date"
            variant="outlined"
            label="Expiry Date"
            placeholder="MM / YY"
            onChange={handleChange}
            inputRef={(ref) => (inputRef.current.expiry_date = ref)}
          />
          <TextField
            name="cvc"
            variant="outlined"
            label="CVC/CVV"
            placeholder="..."
            onChange={handleChange}
            inputRef={(ref) => (inputRef.current.cvc = ref)}
          />
        </div>
        <TextField
          name="cardholder_name"
          variant="outlined"
          label="Cardholder Name"
          placeholder="Enter cardholder’s full name"
          onChange={handleChange}
          inputRef={(ref) => (inputRef.current.cardholder_name = ref)}
        />
        <button type="submit" color="inherit" className="yBtn">
          {location.pathname !== "/choose-payment-method"
            ? "Save"
            : "Save Card"}
        </button>
      </form>
    </Card>
  );
}

AddNewCard.propTypes = {
  newCardDetails: PropTypes.object.isRequired,
  setNewCardDetails: PropTypes.func.isRequired,
  handleSaveNewCardDetails: PropTypes.func.isRequired,
  setChangeCardScreen: PropTypes.any,
};
