import React, { useRef, useState, useEffect } from "react";
import { Card, InputLabel, TextField } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function EditAccount({
  accountInputValues,
  setAccountInputValues,
  handleSaveAccountDetails,
  setChangeCardScreen,
}) {
  const [inputErrors, setInputErrors] = useState({
    emailError: "",
  });
  const inputRef = useRef({});

  const handleChange = (e) => {
    setAccountInputValues({
      ...accountInputValues,
      [e.target.name]: e.target.value,
    });
  };

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const formValidation = () => {
    if (accountInputValues.firstName === "") {
      inputRef.current.firstName.focus();
    } else if (accountInputValues.lastName === "") {
      inputRef.current.lastName.focus();
    } else if (accountInputValues.email === "") {
      inputRef.current.email.focus();
    } else if (!isEmail(accountInputValues.email)) {
      inputRef.current.email.focus();
      setInputErrors({
        emailError: "Email Address * Error: Enter Valid Email",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      accountInputValues.firstName &&
      accountInputValues.lastName &&
      accountInputValues.email &&
      isEmail(accountInputValues.email)
    ) {
      handleSaveAccountDetails();
    } else {
      formValidation();
    }
  };

  useEffect(() => {
    if (isEmail(accountInputValues.email)) {
      setInputErrors({
        emailError: "",
      });
    }
  }, [accountInputValues.email]);

  return (
    <div className="editAddress">
      <Card>
        <div>
          <h3>
            <KeyboardBackspaceIcon onClick={() => setChangeCardScreen(false)} />
            Editing account details
          </h3>
          <hr />
          <h4>Account</h4>
          <form onSubmit={handleSubmit}>
            <div className="names">
              <div>
                <InputLabel>First Name</InputLabel>
                <TextField
                  name="firstName"
                  value={accountInputValues.firstName}
                  onChange={handleChange}
                  inputRef={(ref) => (inputRef.current.firstName = ref)}
                />
              </div>
              <div>
                <InputLabel>Last Name</InputLabel>
                <TextField
                  name="lastName"
                  value={accountInputValues.lastName}
                  onChange={handleChange}
                  inputRef={(ref) => (inputRef.current.lastName = ref)}
                />
              </div>
            </div>
            <div>
              <InputLabel>Email</InputLabel>
              <TextField
                name="email"
                value={accountInputValues.email}
                onChange={handleChange}
                inputRef={(ref) => (inputRef.current.email = ref)}
              />
              {inputErrors["emailError"] && inputErrors["emailError"]}
            </div>
            <button type="submit" color="inherit" className="yBtn">
              Save
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}
