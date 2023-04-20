import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

import "./Account.css";
import { accountSetupAPiCall } from "../../../ApiCalls";
import AuthContext from "../../../Components/Store/Auth-context";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";

function AccountSetup() {
  const { navigateServerErrorPage } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [apiError, setApiError] = useState("");

  const inputRef = useRef({});
  const navigate = useNavigate();

  const handlechange = (e) => {
    setApiError("");
    setUserName(e.target.value);
  };

  const formValidation = () => {
    if (username === "") {
      inputRef.current.username.focus();
    }
  };

  const handleSubmit = () => {
    if (username) {
      const data = { username: username.trim() };
      setIsLoading(true);
      accountSetupAPiCall(
        parseInt(localStorage.getItem("userId")),
        data,
        (res) => {
          setIsLoading(false);
          setUserName("");
          navigate("/community-profile");
        },
        (err) => {
          navigateServerErrorPage(err?.response?.status);
          setIsLoading(false);
          if (err?.response?.data?.detail) {
            setApiError(err.response.data.detail);
          } else {
            setApiError(err.response.data.username[0]);
          }
        }
      );
    } else {
      formValidation();
    }
  };

  return (
    <div className="AccountBox">
      <Card elevation={5}>
        <CardContent>
          <Typography variant="h4">Account Information</Typography>
          <Typography variant="h6">
            This information will be private.
          </Typography>
          <Divider />
          <Typography variant="h5">Your Name/Pseudonym</Typography>
          <TextField
            variant="outlined"
            name="username"
            value={username}
            onChange={handlechange}
            inputRef={(ref) => (inputRef.current.username = ref)}
          />
          <Typography className="error">{apiError && apiError}</Typography>
          <button className="yBtn" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Continue"}
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
export default AccountSetup;
