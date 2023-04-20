import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Divider,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  winnersCreateApiCall,
  winnersListApiCall,
  EditwinnersListApiCall,
} from "../../../ApiCalls";
import BackArrow from "../../../assets/images/blackArrow.svg";
import AuthContext from "../../../Components/Store/Auth-context";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";
import LoadingOverlay from "../../../Components/LoadingOverlay";

function AddWinners() {
  //Values from AuthContext
  const { adminData, handleUnAuthorizedError, navigateServerErrorPage } =
    useContext(AuthContext);

  const [hide, setHide] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const id = searchParams.get("id");
  const { day } = location.state;
  const no_of_winners = searchParams.get("no_of_winners");
  const navigate = useNavigate();

  const [winners, setWinners] = useState(
    Array.from({ length: no_of_winners }, () => ({
      name: "",
      prize_amount: "",
      etherscan_url: "",
    }))
  );
  const [isFieldDisabled, setIsFieldDisabled] = useState(
    Array.from({ length: no_of_winners }, () => ({
      name: true,
      prize_amount: true,
      etherscan_url: true,
    }))
  );

  const validate = () => {
    let newErrors = {};
    let firstInvalidField = null;
    winners.forEach((winner, index) => {
      if (!winner.name) {
        newErrors[`name-${index}`] = "Name is required";
        if (!firstInvalidField) {
          firstInvalidField = `name-${index}`;
        }
      }
      if (!winner.prize_amount) {
        newErrors[`prize-${index}`] = "Prize is required";
        if (!firstInvalidField) {
          firstInvalidField = `prize-${index}`;
        }
      } else if (isNaN(winner.prize_amount)) {
        newErrors[`prize-${index}`] = "Prize must be number";
        if (!firstInvalidField) {
          firstInvalidField = `prize-${index}`;
        }
      }
      if (!winner.etherscan_url) {
        delete newErrors[`url-${index}`];
      } else {
        /* eslint-disable no-useless-escape */
        const regex =
          /^(http(s?):\/\/)([\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+)$/;
        if (!regex.test(winner.etherscan_url)) {
          newErrors[`url-${index}`] = "Invalid URL format";
          if (!firstInvalidField) {
            firstInvalidField = `url-${index}`;
          }
        }
      }
    });
    setErrors(newErrors);
    if (firstInvalidField) {
      document.getElementById(firstInvalidField).focus();
    }
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const adminToken = adminData?.access;
    const header = {
      headers: {
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    setInitialLoading(true);
    winnersListApiCall(
      parseInt(id),
      header,
      (res) => {
        if (res?.data !== "No Winner List") {
          setWinners(res?.data);
          setHide(true);
        }
        setInitialLoading(false);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        setInitialLoading(false);
        handleUnAuthorizedError(err);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  // const addWinner = () => {
  //   let obj = { name: "", prize_amount: "", etherscan_url: "" };
  //   setWinnersDetails([...winnersDetails, obj]);
  //   let field = {
  //     name: true,
  //     prize_amount: true,
  //     etherscan_url: true,
  //   };
  //   setIsFieldDisabled([...isFieldDisabled, field]);
  // };

  // const removeWinner = (name, row) => {
  //   let data = [...winnersDetails];
  //   data.splice(row, 1);
  //   setWinnersDetails(data);
  //   let fieldStatus = isFieldDisabled.filter((field, index) => index !== row);
  //   setIsFieldDisabled(fieldStatus);
  // };

  const handleDisabledFields = (e, row, id) => {
    e.preventDefault();
    const { name } = e.target;
    if (e.target.textContent !== "Edit") {
      editWinners(id, name, row);
    }
    let updatedObjects = isFieldDisabled.map((object, i) => {
      if (i === row) object[name] = !object[name];
      return object;
    });
    setIsFieldDisabled(updatedObjects);
  };

  const handleInputChange = (event, index) => {
    setErrors({});
    const updatedWinners = [...winners];
    updatedWinners[index][event.target.name] = event.target.value;
    setWinners(updatedWinners);
  };

  const editWinners = (id, name, row) => {
    let winnerDetail = { [name]: winners[row][name] };
    if (adminData) {
      const adminToken = adminData?.access;
      const header = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "multipart/form-data",
        },
      };
      EditwinnersListApiCall(
        parseInt(id),
        winnerDetail,
        header,
        (res) => {
          setSuccess(true);
          setLoading(false);
        },
        (err) => {
          navigateServerErrorPage(err?.response?.status);
          handleUnAuthorizedError(err);
          const obj = err.response.data;
          setApiError(Object.values(obj)[0]);
          setLoading(false);
        }
      );
    }
  };

  const submitHandler = () => {
    if (validate()) {
      setLoading(true);
      setApiError("");
      if (adminData) {
        const adminToken = adminData?.access;
        const header = {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        };
        winnersCreateApiCall(
          parseInt(id),
          winners,
          header,
          (res) => {
            setSuccess(true);
            setLoading(false);
          },
          (err) => {
            navigateServerErrorPage(err?.response?.status);
            handleUnAuthorizedError(err);
            const obj = err.response.data;
            setApiError(Object.values(obj)[0]);
            setLoading(false);
          }
        );
      }
    }
  };

  return (
    <>
      {initialLoading && <LoadingOverlay />}
      <div className="addWinnerBox">
        <Card>
          <Typography variant="h3">
            <img
              src={BackArrow}
              alt=""
              onClick={() => navigate("/admin-dashboard")}
            />
            Add Winners
          </Typography>
          <Typography variant="h6">{day}</Typography>
          <Divider />
          {winners &&
            winners?.map((winner, index) => {
              return (
                <div>
                  <Toolbar>
                    <Typography key={index + 1}>Winner #{index + 1}</Typography>
                  </Toolbar>
                  <TextField
                    id={`name-${index}`}
                    name="name"
                    placeholder="Name"
                    value={winner.name}
                    onChange={(e) => handleInputChange(e, index)}
                    // onBlur={validate}
                    disabled={hide ? isFieldDisabled[index].name : false}
                    // disabled={hide}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {hide && (
                            <Button
                              name="name"
                              onClick={(e) =>
                                handleDisabledFields(e, index, winner.id)
                              }
                            >
                              {isFieldDisabled[index].name ? "Edit" : "Save"}
                            </Button>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors[`name-${index}`] && (
                    <span>{errors[`name-${index}`]}</span>
                  )}{" "}
                  <TextField
                    id={`prize-${index}`}
                    // id="prize_amount"
                    name="prize_amount"
                    placeholder="Prize Amount"
                    onChange={(e) => handleInputChange(e, index)}
                    value={winner.prize_amount}
                    disabled={
                      hide ? isFieldDisabled[index].prize_amount : false
                    }
                    // disabled={hide}
                    // onBlur={validate}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {hide && (
                            <Button
                              name="prize_amount"
                              onClick={(e) =>
                                handleDisabledFields(e, index, winner.id)
                              }
                            >
                              {isFieldDisabled[index].prize_amount
                                ? "Edit"
                                : "Save"}
                            </Button>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors[`prize-${index}`] && (
                    <span>{errors[`prize-${index}`]}</span>
                  )}
                  <TextField
                    id={`url-${index}`}
                    // id="etherscan_url"
                    name="etherscan_url"
                    placeholder="Etherscan URL"
                    onChange={(e) => handleInputChange(e, index)}
                    value={winner.etherscan_url}
                    // onBlur={validate}
                    disabled={
                      hide ? isFieldDisabled[index].etherscan_url : false
                    }
                    // disabled={hide}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {hide && (
                            <Button
                              name="etherscan_url"
                              onClick={(e) =>
                                handleDisabledFields(e, index, winner.id)
                              }
                            >
                              {isFieldDisabled[index].etherscan_url
                                ? "Edit"
                                : "Save"}
                            </Button>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors[`url-${index}`] && (
                    <span>{errors[`url-${index}`]}</span>
                  )}
                </div>
              );
            })}
          <p className="error">{apiError && apiError}</p>
          {!hide ? (
            <button
              disabled={loading}
              onClick={submitHandler}
              color="inherit"
              className="yBtn"
            >
              {loading ? <LoadingSpinner /> : "Save"}
            </button>
          ) : (
            ""
          )}
        </Card>
      </div>
    </>
  );
}
export default AddWinners;
