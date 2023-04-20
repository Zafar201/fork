import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Card,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import BackArrow from "../../assets/images/back-w.svg";
import { formValidations } from "../../Action";
import AuthContext from "../../Components/Store/Auth-context";
import LoadingOverlay from "../../Components/LoadingOverlay";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
import {
  alphaSettingAddWinners,
  alphaSettingGetWinners,
  removeAlphaEventApiCall,
} from "../../ApiCalls";

export default function AlphaSetting() {
  // const date = new Date("1/3/2023");
  // const defaultValue = date.toLocaleDateString("en-CA");
  const { navigateServerErrorPage } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [initialLoader, setInitialloader] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [accountInputValues, setAccountInputValues] = useState({
    id: 0,
    start_date: "",
    start_time: "",
    next_give_away: "",
    next_give_away_amount: "",
    previous_winners: " ",
  });
  const [isFieldDisabled, setIsFieldDisabled] = useState({
    start_date: true,
    start_time: true,
    next_give_away: true,
    next_give_away_amount: true,
    previous_winners: true,
  });

  const [errors, setErrors] = useState({
    start_date: "",
    start_time: "",
    next_give_away: "",
    next_give_away_amount: "",
    previous_winners: "",
    twitter_url: "",
  });

  const inputRef = useRef({});
  const navigate = useNavigate();

  const userToken = localStorage.getItem("AdminAccess");
  const header = {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const handleDisabledFields = (e) => {
    e.preventDefault();
    const { name } = e.target;
    setIsFieldDisabled((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const validateInput = (fieldName, value) => {
    switch (fieldName) {
      case "start_date":
        if (!value) {
          setErrors({ ...errors, start_date: "Start date is required" });
          return false;
        }
        setErrors({ ...errors, start_date: "" });
        return true;
      case "start_time":
        if (!value) {
          setErrors({ ...errors, start_time: "Start time is required" });
          return false;
        }
        setErrors({ ...errors, start_time: "" });
        return true;
      case "next_give_away":
        if (!value) {
          setErrors({
            ...errors,
            next_give_away: "Next give away is required",
          });
          return false;
        }
        if (isNaN(value)) {
          setErrors({
            ...errors,
            next_give_away: "Next give away must be a number",
          });
          return false;
        }
        if (value <= 0) {
          setErrors({
            ...errors,
            next_give_away: "Next give away must be greater than 0",
          });
          return false;
        }
        setErrors({ ...errors, next_give_away: "" });
        return true;
      case "next_give_away_amount":
        if (!value) {
          setErrors({
            ...errors,
            next_give_away_amount: "Next give away amount is required",
          });
          return false;
        }
        if (isNaN(value)) {
          setErrors({
            ...errors,
            next_give_away_amount: "Next give away amount must be a number",
          });
          return false;
        }
        if (value <= 0) {
          setErrors({
            ...errors,
            next_give_away_amount:
              "Next give away amount must be greater than 0",
          });
          return false;
        }
        setErrors({ ...errors, next_give_away_amount: "" });
        return true;
      default:
        return true;
    }
  };

  const isFormValid = () => {
    for (const key in errors) {
      if (errors[key].length > 0) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setInitialloader(true);
    alphaSettingGetWinners(
      (response) => {
        setAccountInputValues({
          id: response?.data[0]?.id,
          start_date: response?.data[0]?.start_date,
          start_time: response?.data[0]?.start_time,
          next_give_away: response?.data[0]?.next_give_away,
          next_give_away_amount: response?.data[0]?.next_give_away_amount,
          previous_winners: response?.data[0]?.previous_winners,
        });
        setInitialloader(false);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        setInitialloader(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMessage]);

  const handleInputChange = (e) => {
    setSuccessMessage("");
    setErrors({
      start_date: "",
      start_time: "",
      next_give_away: "",
      next_give_away_amount: "",
      previous_winners: "",
      twitter_url: "",
    });
    setAccountInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    validateInput(e.target.name, e.target.value);
  };

  const postWinners = () => {
    if (
      accountInputValues.start_time &&
      accountInputValues.next_give_away &&
      accountInputValues.next_give_away_amount &&
      isFormValid()
    ) {
      setLoading(true);
      alphaSettingAddWinners(
        accountInputValues,
        header,
        (response) => {
          setLoading(false);
          setSuccessMessage("Updated successfully");
        },
        (error) => {
          navigateServerErrorPage(error?.response?.status);
          setErrors({
            ...errors,
            twitter_url: error?.response?.data?.previous_winners[0],
          });
          setLoading(false);
        }
      );
    } else {
      formValidations(
        accountInputValues,
        ["start_time", "next_give_away", "next_give_away_amount"],
        inputRef
      );
    }
  };

  const handleRemoveEvent = () => {
    setInitialloader(true);
    removeAlphaEventApiCall(
      accountInputValues?.id,
      header,
      (res) => {
        console.log(res);
        navigate("/admin-dashboard");
        setInitialloader(false);
      },
      (err) => {
        console.log(err);
        setInitialloader(false);
      }
    );
  };

  return (
    <>
      {initialLoader && <LoadingOverlay />}
      <div className="backArrow" onClick={() => navigate("/admin-dashboard")}>
        <span>
          <img src={BackArrow} alt="backArrow" />
          Back
        </span>
      </div>
      <div>
        <Card className="jackpotRaffleBox alpha">
          <Typography variant="h3">Alpha Settings</Typography>
          <Divider />
          <Typography variant="subtitle1">Alpha Start Date</Typography>
          <TextField
            name="start_date"
            type="date"
            required
            onChange={handleInputChange}
            value={accountInputValues.start_date}
            disabled={isFieldDisabled.start_date}
            inputRef={(ref) => (inputRef.current.start_date = ref)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <button
                    variant="contained"
                    name="start_date"
                    onClick={handleDisabledFields}
                    sx={{ textTransform: "none" }}
                  >
                    {isFieldDisabled["start_date"] ? "Edit" : "Save"}
                  </button>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="subtitle1">Alpha Start Time [EST]</Typography>
          <TextField
            name="start_time"
            type="time"
            required
            onChange={handleInputChange}
            value={accountInputValues.start_time}
            disabled={isFieldDisabled.start_time}
            inputRef={(ref) => (inputRef.current.start_time = ref)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <button
                    variant="contained"
                    name="start_time"
                    onClick={handleDisabledFields}
                    sx={{ textTransform: "none" }}
                  >
                    {isFieldDisabled["start_time"] ? "Edit" : "Save"}
                  </button>
                </InputAdornment>
              ),
            }}
          />

          {errors.start_time && <span>{errors.start_time}</span>}

          <Typography variant="subtitle1">Next Giveaway [Followers]</Typography>
          <TextField
            name="next_give_away"
            type="text"
            onChange={handleInputChange}
            value={accountInputValues.next_give_away}
            disabled={isFieldDisabled.next_give_away}
            inputRef={(ref) => (inputRef.current.next_give_away = ref)}
            InputProps={{
              inputProps: { min: 0 },
              endAdornment: (
                <InputAdornment position="end">
                  <button
                    variant="contained"
                    name="next_give_away"
                    onClick={handleDisabledFields}
                    sx={{ textTransform: "none" }}
                  >
                    {isFieldDisabled["next_give_away"] ? "Edit" : "Save"}
                  </button>
                </InputAdornment>
              ),
            }}
          />

          {errors.next_give_away && <span>{errors.next_give_away}</span>}

          <Typography variant="subtitle1">
            Next Giveaway Amount [USDC]
          </Typography>
          <TextField
            name="next_give_away_amount"
            type="text"
            onChange={handleInputChange}
            value={accountInputValues.next_give_away_amount}
            disabled={isFieldDisabled.next_give_away_amount}
            inputRef={(ref) => (inputRef.current.next_give_away_amount = ref)}
            InputProps={{
              inputProps: { min: 0 },
              endAdornment: (
                <InputAdornment position="end">
                  <button
                    variant="contained"
                    name="next_give_away_amount"
                    onClick={handleDisabledFields}
                    sx={{ textTransform: "none" }}
                  >
                    {isFieldDisabled["next_give_away_amount"] ? "Edit" : "Save"}
                  </button>
                </InputAdornment>
              ),
            }}
          />

          {errors.next_give_away_amount && (
            <span>{errors.next_give_away_amount}</span>
          )}

          <Typography variant="subtitle1">Previous Winners [URL]</Typography>
          <TextField
            name="previous_winners"
            type="text"
            onChange={handleInputChange}
            value={accountInputValues.previous_winners}
            disabled={isFieldDisabled.previous_winners}
            inputRef={(ref) => (inputRef.current.previous_winners = ref)}
            InputProps={{
              inputProps: { min: 0 },
              endAdornment: (
                <InputAdornment position="end">
                  <button
                    variant="contained"
                    name="previous_winners"
                    onClick={handleDisabledFields}
                    sx={{ textTransform: "none" }}
                  >
                    {isFieldDisabled["previous_winners"] ? "Edit" : "Save"}
                  </button>
                </InputAdornment>
              ),
            }}
          />
          {successMessage && <span>{successMessage}</span>}
          {errors.twitter_url && (
            <span style={{ color: "red" }}>{errors.twitter_url}</span>
          )}
          <button className="yBtn " onClick={postWinners} disabled={loading}>
            {loading ? <LoadingSpinner /> : "Update"}
          </button>
          {accountInputValues?.id !== undefined && (
            <Link onClick={handleRemoveEvent} style={{ color: "black" }}>
              Remove Event
            </Link>
          )}
        </Card>
      </div>
    </>
  );
}
