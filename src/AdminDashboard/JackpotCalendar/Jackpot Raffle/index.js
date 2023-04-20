import {
  Button,
  Card,
  Divider,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./jackpotRaffle.css";
import {
  calendargetApiCall,
  calendarPostApiCall,
  removeFromScheduleApi,
} from "../../../ApiCalls";
import { formValidations } from "../../../Action";
import CustomInputFeild from "../../../Components/CustomInputField";
import BackArrow from "../../../assets/images/back-w.svg";
import AuthContext from "../../../Components/Store/Auth-context";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";
import ModalComponent from "../../../Components/CalendarAddPop";
import WarningDiv from "../../../Components/WarningDiv";
import LoadingOverlay from "../../../Components/LoadingOverlay";

function JackpotRaffle() {
  //Values from AuthContext
  const { adminData, handleUnAuthorizedError, navigateServerErrorPage } =
    useContext(AuthContext);

  const [showPopup, setShowPopup] = useState(false);
  const [videoFile, setVideoFile] = useState();
  const [id, setId] = useState("");
  const [apiError, setApiError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [videoEdited, setVideoEdited] = useState(false);

  const location = useLocation();
  const { date, day } = location.state;
  const navigate = useNavigate();

  const [accountInputValues, setAccountInputValues] = useState({
    date: date,
    time: "",
    total_amount: "",
    no_of_winners: "",
    grand_prize: "",
    runner_up_price: "",
    announcement_video: "",
    status: false,
  });
  const [isFieldDisabled, setIsFieldDisabled] = useState({
    time: false,
    total_amount: false,
    no_of_winners: false,
    grand_prize: false,
    runner_up_price: false,
  });

  const [errors, setErrors] = useState({
    date: "",
    time: "",
    total_amount: "",
    no_of_winners: "",
    grand_prize: "",
    runner_up_price: "",
  });

  const adminToken = adminData?.access;
  const header = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const validateInput = (fieldName, value) => {
    switch (fieldName) {
      case "time":
        if (!value) {
          setErrors({ ...errors, time: "Time is required" });
          return false;
        }
        setErrors({ ...errors, time: "" });
        return true;
      case "total_amount":
        if (!value) {
          setErrors({ ...errors, total_amount: "Total amount is required" });
          return false;
        }
        if (isNaN(value)) {
          setErrors({
            ...errors,
            total_amount: "Total amount must be a number",
          });
          return false;
        }
        if (value <= 0) {
          setErrors({
            ...errors,
            total_amount: "Total amount must be greater than 0",
          });
          return false;
        }
        setErrors({ ...errors, total_amount: "" });
        return true;
      case "no_of_winners":
        if (!value) {
          setErrors({
            ...errors,
            no_of_winners: "Number of winners is required",
          });
          return false;
        }

        if (isNaN(value)) {
          setErrors({
            ...errors,
            no_of_winners: "Number of winners must be a number",
          });
          return false;
        }
        if (value <= 0) {
          setErrors({
            ...errors,
            no_of_winners: "Number of winners must be greater than 0",
          });
          return false;
        }

        setErrors({ ...errors, no_of_winners: "" });
        return true;
      case "grand_prize":
        if (!value) {
          setErrors({ ...errors, grand_prize: "Grand prize is required" });
          return false;
        }
        if (isNaN(value)) {
          setErrors({ ...errors, grand_prize: "Grand prize must be a number" });
          return false;
        }
        if (value <= 0) {
          setErrors({ ...errors, grand_prize: "Value must be greater than 0" });
          return false;
        }
        setErrors({ ...errors, grand_prize: "" });
        return true;
      case "runner_up_price":
        if (!value) {
          setErrors({
            ...errors,
            runner_up_price: "Runner up price is required",
          });
          return false;
        }
        if (isNaN(value)) {
          setErrors({
            ...errors,
            runner_up_price: "Runner up price must be a number",
          });
          return false;
        }
        if (value <= 0) {
          setErrors({
            ...errors,
            runner_up_price: "Value must be greater than 0",
          });
          return false;
        }
        setErrors({ ...errors, runner_up_price: "" });
        return true;
      default:
        return true;
    }
  };

  const inputRef = useRef({});
  const onSelectFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoEdited(true);
    }
    setVideoFile(file.name);
    if (file) {
      setAccountInputValues((prevState) => ({
        ...prevState,
        announcement_video: file,
      }));
    }
  };

  const handleDisabledFields = (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (
      accountInputValues.time ||
      accountInputValues.total_amount ||
      accountInputValues.no_of_winners ||
      accountInputValues.grand_prize ||
      accountInputValues.runner_up_price
    ) {
      setIsFieldDisabled((prevState) => ({
        ...prevState,
        [name]: !prevState[name],
      }));
    } else {
      formValidations(
        accountInputValues,
        [
          "time",
          "total_amount",
          "no_of_winners",
          "grand_prize",
          "runner_up_price",
        ],
        inputRef
      );
    }
  };

  const handleInputChange = (e) => {
    setApiError("");
    setAccountInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    validateInput(e.target.name, e.target.value);
  };

  useEffect(() => {
    if (!loading) {
      setInitialLoading(true);
    }
    calendargetApiCall(
      date,
      header,
      (res) => {
        setAccountInputValues((prevState) => ({
          ...prevState,
          time: res.data[0].time,
          total_amount: res.data[0].total_amount,
          no_of_winners: res.data[0].no_of_winners,
          grand_prize: res.data[0].grand_prize,
          runner_up_price: res.data[0].runner_up_price,
          announcement_video: res.data[0].announcement_video,
          status: res.data[0].status,
        }));
        setVideoFile(res.data[0].announcement_video);
        setId(res.data[0].id);
        setIsFieldDisabled((prevState) => ({
          ...prevState,
          time: true,
          total_amount: true,
          no_of_winners: true,
          grand_prize: true,
          runner_up_price: true,
        }));
        setInitialLoading(false);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        setInitialLoading(false);
        handleUnAuthorizedError(err);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, loading]);

  const submitHandler = () => {
    if (
      accountInputValues.time &&
      accountInputValues.total_amount &&
      accountInputValues.no_of_winners &&
      accountInputValues.grand_prize &&
      accountInputValues.runner_up_price &&
      isFormValid()
    ) {
      setLoading(true);
      setApiError("");
      if (adminData) {
        let updatedValues = { ...accountInputValues };
        delete updatedValues.status;
        if (!videoEdited) {
          delete updatedValues.announcement_video;
        }
        setAccountInputValues(updatedValues);
        calendarPostApiCall(
          header,
          updatedValues,
          id,
          (res) => {
            setSuccess(true);
            setLoading(false);
          },
          (err) => {
            navigateServerErrorPage(err?.response?.status);
            handleUnAuthorizedError(err);
            const obj = err.response.data;
            setLoading(false);
            setApiError(Object.values(obj)[0]);
            setSuccess(false);
          }
        );
      }
    } else {
      formValidations(
        accountInputValues,
        [
          "time",
          "total_amount",
          "no_of_winners",
          "grand_prize",
          "runner_up_price",
        ],
        inputRef
      );
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

  const removeFromShedule = () => {
    setShowPopup(false);
    setInitialLoading(true);
    removeFromScheduleApi(
      id,
      header,
      (res) => {
        // setShowPopup(false);
        setSuccess(true);
        navigate("/admin-dashboard");
        setInitialLoading(false);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        const obj = err.response.data.detail;
        setDeleteError(Object.values(obj));
        setInitialLoading(false);
        handleUnAuthorizedError(err);
        // setShowPopup(false);
      }
    );
  };

  return (
    <>
      {initialLoading && <LoadingOverlay />}
      <div className="jackpotRaffleDiv">
        <div className="backArrow" onClick={() => navigate("/admin-dashboard")}>
          <span>
            <img src={BackArrow} alt="" />
            Back
          </span>
        </div>
        <Card className="jackpotRaffleBox">
          <Typography variant="h3">Schedule Jackpot Raffle</Typography>
          <Typography variant="h6">{day}</Typography>
          <Divider />
          <CustomInputFeild
            label="Time[EST]"
            id="time"
            name="time"
            type="time"
            onChange={handleInputChange}
            value={accountInputValues.time}
            disabled={isFieldDisabled.time}
            inputRef={(ref) => (inputRef.current.time = ref)}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {accountInputValues.status === "upcoming" ? (
                    <Button
                      variant="contained"
                      name="time"
                      onClick={handleDisabledFields}
                    >
                      {isFieldDisabled["time"] ? "Edit" : "Save"}
                    </Button>
                  ) : accountInputValues.status === false ? (
                    <Button
                      variant="contained"
                      name="time"
                      onClick={handleDisabledFields}
                    >
                      {isFieldDisabled["time"] ? "Edit" : "Save"}
                    </Button>
                  ) : (
                    ""
                  )}
                </InputAdornment>
              ),
            }}
          />
          {errors.time && <span>{errors.time}</span>}
          <CustomInputFeild
            label="Total Amount[USDC]"
            id="amount"
            name="total_amount"
            type="text"
            onChange={handleInputChange}
            value={accountInputValues.total_amount}
            disabled={isFieldDisabled.total_amount}
            inputRef={(ref) => (inputRef.current.total_amount = ref)}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {accountInputValues.status === "upcoming" ? (
                    <Button
                      variant="contained"
                      name="total_amount"
                      onClick={handleDisabledFields}
                    >
                      {isFieldDisabled["total_amount"] ? "Edit" : "Save"}
                    </Button>
                  ) : accountInputValues.status === false ? (
                    <Button
                      variant="contained"
                      name="total_amount"
                      onClick={handleDisabledFields}
                    >
                      {isFieldDisabled["total_amount"] ? "Edit" : "Save"}
                    </Button>
                  ) : (
                    ""
                  )}
                </InputAdornment>
              ),
            }}
          />
          {errors.total_amount && <span>{errors.total_amount}</span>}
          <CustomInputFeild
            label="Number of Winners"
            name="no_of_winners"
            type="text"
            onChange={handleInputChange}
            value={accountInputValues.no_of_winners}
            disabled={isFieldDisabled.no_of_winners}
            inputRef={(ref) => (inputRef.current.no_of_winners = ref)}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {accountInputValues.status === "upcoming" ? (
                    <Button
                      variant="contained"
                      name="no_of_winners"
                      onClick={handleDisabledFields}
                    >
                      {isFieldDisabled["no_of_winners"] ? "Edit" : "Save"}
                    </Button>
                  ) : accountInputValues.status === false ? (
                    <Button
                      variant="contained"
                      name="no_of_winners"
                      onClick={handleDisabledFields}
                    >
                      {isFieldDisabled["no_of_winners"] ? "Edit" : "Save"}
                    </Button>
                  ) : (
                    ""
                  )}
                </InputAdornment>
              ),
            }}
          />
          {errors.no_of_winners && <span>{errors.no_of_winners}</span>}
          <CustomInputFeild
            label="Grand Prize[USDC]"
            name="grand_prize"
            type="text"
            onChange={handleInputChange}
            value={accountInputValues.grand_prize}
            disabled={isFieldDisabled.grand_prize}
            inputRef={(ref) => (inputRef.current.grand_prize = ref)}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {accountInputValues.status === "upcoming" ? (
                    <Button
                      variant="contained"
                      name="grand_prize"
                      onClick={handleDisabledFields}
                    >
                      {isFieldDisabled["grand_prize"] ? "Edit" : "Save"}
                    </Button>
                  ) : accountInputValues.status === false ? (
                    <Button
                      variant="contained"
                      name="grand_prize"
                      onClick={handleDisabledFields}
                    >
                      {isFieldDisabled["grand_prize"] ? "Edit" : "Save"}
                    </Button>
                  ) : (
                    ""
                  )}
                </InputAdornment>
              ),
            }}
          />
          {errors.grand_prize && <span>{errors.grand_prize}</span>}
          <CustomInputFeild
            label="Runner-up Prize[USDC]"
            name="runner_up_price"
            type="text"
            onChange={handleInputChange}
            value={accountInputValues.runner_up_price}
            disabled={isFieldDisabled.runner_up_price}
            inputRef={(ref) => (inputRef.current.runner_up_price = ref)}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {accountInputValues.status === "upcoming" ? (
                    <Button
                      variant="contained"
                      name="runner_up_price"
                      onClick={handleDisabledFields}
                    >
                      {isFieldDisabled["runner_up_price"] ? "Edit" : "Save"}
                    </Button>
                  ) : accountInputValues.status === false ? (
                    <Button
                      variant="contained"
                      name="runner_up_price"
                      onClick={handleDisabledFields}
                    >
                      {isFieldDisabled["runner_up_price"] ? "Edit" : "Save"}
                    </Button>
                  ) : (
                    ""
                  )}
                </InputAdornment>
              ),
            }}
          />
          {errors.runner_up_price && <span>{errors.runner_up_price}</span>}
          <div>
            <label>Announcement Video</label>
            <p>
              <span>{videoFile}</span>
              {accountInputValues.status === "upcoming" ||
              accountInputValues.status === false ||
              loading ? (
                <Button variant="outlined" component="label">
                  Upload File
                  <input
                    type="file"
                    accept="video/*"
                    name="file"
                    onChange={onSelectFile}
                    hidden
                  />
                </Button>
              ) : (
                ""
              )}
            </p>
            <p className="error">{apiError && apiError}</p>
          </div>
          {accountInputValues.status === "upcoming" ||
          accountInputValues.status === undefined ||
          accountInputValues.status === false ||
          loading ? (
            <button className="yBtn" onClick={submitHandler} disabled={loading}>
              {loading ? <LoadingSpinner /> : "Save"}
            </button>
          ) : (
            ""
          )}
          {/* </form>  */}
          <p className="error">{deleteError && deleteError}</p>
          <div className="winnerLinks">
            {accountInputValues.status === "upcoming" ? (
              <div onClick={() => setShowPopup(true)}>
                <p style={{ textDecoration: "underline", cursor: "pointer" }}>
                  Remove From Schedule
                </p>
              </div>
            ) : (
              ""
            )}

            {(accountInputValues.status === "upcoming" ||
              accountInputValues.status === "in-progress") && (
              <div>
                <Typography
                  onClick={() =>
                    navigate(
                      `/select-winners${
                        accountInputValues.no_of_winners
                          ? "?no_of_winners=" + accountInputValues.no_of_winners
                          : ""
                      }${id ? `&id=${id}` : ""}${date ? `&date=${date}` : ""}`,
                      {
                        state: { day: day },
                      }
                    )
                  }
                >
                  Select Winners
                </Typography>
              </div>
            )}
          </div>
        </Card>
        <>
          <ModalComponent
            modalOpen={showPopup}
            handleClose={() => setShowPopup(false)}
            className="DelAccountPop"
            modalValue={
              <WarningDiv
                warningIcon={true}
                header="Do you want to remove this event?"
                description={
                  <>
                    <div className="twobtns">
                      <button
                        onClick={removeFromShedule}
                        className="yBtn"
                        disabled={initialLoading}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setShowPopup(false)}
                        className="whiteBtn"
                      >
                        No
                      </button>
                    </div>
                  </>
                }
              />
            }
          />
        </>
      </div>
    </>
  );
}

export default JackpotRaffle;
