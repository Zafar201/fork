import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, InputLabel, TextField } from "@mui/material";

import "./pricing.css";
import { requestDemoApiCall } from "../../ApiCalls";
import { capitalizeFirstLetter } from "../../Action";
import AuthContext from "../../Components/Store/Auth-context";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";

function AlphaPricing() {
  const { navigateServerErrorPage } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [requestDemoStatus, setRequestDemeStatus] = useState({});
  const [inputValues, setInputValues] = useState({
    name: "",
    project: "",
    email: "",
  });
  const [inputErrors, setInputErrors] = useState({
    emailError: "",
    nameError: "",
    projectError: "",
  });

  const navigate = useNavigate();
  const inputRef = useRef({});

  const handleInputChange = (e) => {
    setInputErrors({
      emailError: "",
      nameError: "",
      projectError: "",
    });
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const InputError = (
    <span>
      Email Address <b>*</b>Error: Enter Valid Email
    </span>
  );

  const formValidation = () => {
    if (inputValues.name === "") {
      inputRef.current.name.focus();
    } else if (inputValues.project === "") {
      inputRef.current.project.focus();
    } else if (inputValues.email === "") {
      inputRef.current.email.focus();
    } else if (!isEmail(inputValues.email)) {
      inputRef.current.email.focus();
      setInputErrors((prevstate) => ({
        ...prevstate,
        emailError: InputError,
      }));
    }
  };

  const handleLogin = () => {
    setIsLoading(true);
    requestDemoApiCall(
      inputValues,
      (res) => {
        setRequestDemeStatus(res.status);
        setIsLoading(false);
        setInputValues({
          name: "",
          project: "",
          email: "",
        });
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        if (err.response?.data?.email) {
          setInputErrors((prevstate) => ({
            ...prevstate,
            emailError: capitalizeFirstLetter(err.response?.data?.email[0]),
          }));
        }
        if (err.response?.data?.name) {
          setInputErrors((prevstate) => ({
            ...prevstate,
            nameError: capitalizeFirstLetter(err.response?.data?.name[0]),
          }));
        }
        if (err.response?.data?.project) {
          setInputErrors((prevstate) => ({
            ...prevstate,
            projectError: capitalizeFirstLetter(err.response?.data?.project[0]),
          }));
        }
        setIsLoading(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputValues.name &&
      inputValues.project &&
      inputValues.email &&
      isEmail(inputValues.email)
    ) {
      handleLogin();
    } else {
      formValidation();
    }
  };

  useEffect(() => {
    if (requestDemoStatus === 201) {
      navigate("/demo-success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestDemoStatus]);

  return (
    <div>
      <div className="pricing">
        <div className="pricingLeft">
          <h3>REQUEST A DEMO</h3>
          <h1>
            Pricing that suits
            <br />
            communities of any size.
          </h1>
          <p>
            We’ll walk you through our features, pricing, and
            <br />
            onboarding process. Please note that Jackpot is <br />
            currently in Alpha and not yet available for other <br />
            communities.
          </p>
        </div>
        <div className="pricingRight">
          <Card>
            <form onSubmit={handleSubmit}>
              <InputLabel className={inputErrors.nameError ? "invalid" : ""}>
                {inputErrors.nameError === ""
                  ? "Name / Pseudonym"
                  : inputErrors.nameError}
              </InputLabel>
              <TextField
                name="name"
                type="text"
                placeholder="Name/Pseudonym"
                onChange={handleInputChange}
                value={inputValues.name}
                inputRef={(ref) => (inputRef.current.name = ref)}
              />
              <InputLabel className={inputErrors.projectError ? "invalid" : ""}>
                {inputErrors.projectError === ""
                  ? "Project Name"
                  : inputErrors.projectError}
              </InputLabel>
              <TextField
                name="project"
                type="text"
                placeholder="Project Name"
                onChange={handleInputChange}
                value={inputValues.project}
                inputRef={(ref) => (inputRef.current.project = ref)}
              />
              <InputLabel className={inputErrors.emailError ? "invalid" : ""}>
                {inputErrors.emailError === ""
                  ? "Email Address"
                  : inputErrors.emailError}
              </InputLabel>
              <TextField
                name="email"
                type="text"
                placeholder="Email Address"
                onChange={handleInputChange}
                value={inputValues.email}
                inputRef={(ref) => (inputRef.current.email = ref)}
              />
              <button color="inherit" className="yBtn" disabled={isLoading}>
                {isLoading ? <LoadingSpinner /> : "Request Demo"}
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default AlphaPricing;
