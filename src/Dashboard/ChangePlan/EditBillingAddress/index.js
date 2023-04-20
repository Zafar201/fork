import React, { useRef } from "react";
import { Card, Divider, InputLabel, TextField, MenuItem } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { formValidations } from "../../../Action";

export default function EditBillingAddress({
  addressInputValues,
  setAddressInputValues,
  handleSaveAddressDetails,
  setChangeCardScreen,
  navigatePreviousPage,
}) {
  const inputRef = useRef({});
  const location = useLocation();

  const handleChange = (e) => {
    setAddressInputValues({
      ...addressInputValues,
      [e.target.name]: e.target.value,
    });
  };

  const formValidation = () => {
    formValidations(
      addressInputValues,
      ["line1", "city", "state", "zipcode", "country"],
      inputRef
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      addressInputValues.line1 &&
      addressInputValues.city &&
      addressInputValues.state &&
      addressInputValues.zipcode &&
      addressInputValues.country
    ) {
      handleSaveAddressDetails();
    } else {
      formValidation();
    }
  };

  const hanndleNavigatePreviousPage = () => {
    if (location.pathname === "/signup-billing-address") {
      navigatePreviousPage("add-billing-address");
    }
  };

  return (
    <Card>
      <div>
        {location.pathname !== "/signup-billing-address" ? (
          <>
            <h3>
              <KeyboardBackspaceIcon
                onClick={() => setChangeCardScreen(false)}
              />
              Editing billing address
            </h3>
          </>
        ) : (
          <h3>Enter Billing Address</h3>
        )}
        <Divider />
        {location.pathname === "/card-on-file" && <h4>Billing</h4>}
        <form onSubmit={handleSubmit}>
          <div>
            <InputLabel>Street Address</InputLabel>
            <TextField
              name="line1"
              placeholder="Line 1"
              value={addressInputValues.line1}
              onChange={handleChange}
              inputRef={(ref) => (inputRef.current.line1 = ref)}
            />
            <TextField
              name="line2"
              placeholder="Line 2 (optional)"
              value={addressInputValues.line2}
              onChange={handleChange}
              //   inputRef={(ref) => inputRef.current.line2 === ref}
            />
            <div style={{ display: "flex" }} className="citystate">
              <div>
                <InputLabel>City</InputLabel>
                <TextField
                  name="city"
                  placeholder="City"
                  value={addressInputValues.city}
                  onChange={handleChange}
                  inputRef={(ref) => (inputRef.current.city = ref)}
                />
              </div>
              <div>
                <InputLabel>State</InputLabel>
                <TextField
                  name="state"
                  placeholder="State"
                  value={addressInputValues.state}
                  onChange={handleChange}
                  inputRef={(ref) => (inputRef.current.state = ref)}
                />
              </div>
            </div>
            <div style={{ display: "flex" }} className="zipcountry">
              <div>
                <InputLabel>Zip Code</InputLabel>
                <TextField
                  name="zipcode"
                  placeholder="Zip Code"
                  value={addressInputValues.zipcode}
                  onChange={handleChange}
                  inputRef={(ref) => (inputRef.current.zipcode = ref)}
                />
              </div>
              <div>
                <TextField
                  select
                  name="country"
                  placeholder="Country"
                  label="Country"
                  value={addressInputValues.country}
                  onChange={handleChange}
                  inputRef={(ref) => (inputRef.current.country = ref)}
                >
                  <MenuItem value={"United States"}>United States</MenuItem>
                  <MenuItem value={"India"}>India</MenuItem>
                  <MenuItem value={"Canada"}>Canada</MenuItem>
                </TextField>
              </div>
            </div>
          </div>
          <button
            type="submit"
            color="inherit"
            className="yBtn"
            onClick={hanndleNavigatePreviousPage}
          >
            {location.pathname !== "/signup-billing-address"
              ? "Save"
              : "Save Billing Address"}
          </button>
        </form>
      </div>
    </Card>
  );
}

EditBillingAddress.propTypes = {
  addressInputValues: PropTypes.object.isRequired,
  setAddressInputValues: PropTypes.func.isRequired,
  handleSaveAddressDetails: PropTypes.func.isRequired,
  setChangeCardScreen: PropTypes.any,
  navigatePreviousPage: PropTypes.any,
};
