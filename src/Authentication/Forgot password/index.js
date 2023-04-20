import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Link, TextField, Typography, Card } from "@mui/material";
import PropTypes from "prop-types";

import backImg from "../../assets/images/back.svg";
import { forgotPasswordEmailVerificationApiCall } from "../../ApiCalls";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
import AuthContext from "../../Components/Store/Auth-context";

function ForgotPassword({ setSignInPage }) {
  const { navigateServerErrorPage } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [apiCallError, setApiCallError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsPage = searchParams.get("tab");
  const searchParamsToken = searchParams.get("token");

  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();

  const handleChange = (e) => {
    setApiCallError("");
    setEmail(e.target.value);
  };

  const formValidation = () => {
    if (email === "") {
      inputRef.current.focus();
    }
  };

  const handleSendEmail = () => {
    setIsLoading(true);
    const data = { email: email.trim() };
    forgotPasswordEmailVerificationApiCall(
      data,
      (response) => {
        setSendEmail(true);
        setIsLoading(false);
        setEmail("");
      },
      (error) => {
        navigateServerErrorPage(error?.response?.status);
        setIsLoading(false);
        setApiCallError(error.response.data.email[0]);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      handleSendEmail();
    } else {
      formValidation();
    }
  };

  const handleNavigate = () => {
    if (location.pathname === "/forgot-password") {
      navigate("/sign-in");
    } else {
      setSendEmail(false);
      setSignInPage("sign-in");
    }
  };

  const navigateForgotPassword = () => {
    if (location.pathname === "/forgot-password") {
      navigate("/set-new-password");
    } else {
      setSignInPage("forgot-password");
      setSendEmail(false);
    }
  };

  useEffect(() => {
    if (searchParamsPage === "set-new-password" && searchParamsToken) {
      setSignInPage("set-new-password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsPage, searchParamsToken]);

  return (
    <div>
      <Card>
        {sendEmail ? (
          <>
            <h3>Check your email</h3>
            <h4>We sent a password reset link to your email.</h4>
            <div style={{ display: "flex" }}>
              <Typography>Didn’t receive the email? </Typography>
              <Link onClick={navigateForgotPassword}>Click to Resend</Link>
            </div>
            <div style={{ display: "flex" }} className="back">
              <Typography onClick={handleNavigate}>
                <img src={backImg} alt="backImg" />
                Back to log in
              </Typography>
            </div>
          </>
        ) : (
          <>
            <h3>Forgot password?</h3>
            <Typography>
              No worries, we’ll send you reset instructions.
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => handleChange(e)}
                inputRef={inputRef}
              />
              <Typography className="error">
                {apiCallError && apiCallError}
              </Typography>
              <button
                color="inherit"
                className="yBtn yBtn-2"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : "Send Email"}
              </button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}

ForgotPassword.propTypes = {
  setSignInPage: PropTypes.any,
};
export default ForgotPassword;
