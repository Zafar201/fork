import React, { useState, useRef, useEffect, useContext } from "react";
import { TextField, IconButton, Typography, Card } from "@mui/material";
import PropTypes from "prop-types";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import ShowPass from "../../assets/images/passHide.svg";
import HidePass from "../../assets/images/passShow.svg";
import backImg from "../../assets/images/back.svg";
import { isPassword } from "../../Action";
import { resetPasswordApiCall } from "../../ApiCalls";
import AuthContext from "../../Components/Store/Auth-context";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";

function NewPassword({ setSignInPage, setModalOpen }) {
  const { navigateServerErrorPage } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsToken = searchParams.get("token");
  const paramsToken = localStorage.getItem("searchParamsToken");

  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState({
    confirmPasswordError: "",
  });

  const inputRef = useRef({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPasswordError({
      confirmPasswordError: "",
    });
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const focusPasswordFields = (value1, value2) => {
    if (value1 === "") {
      inputRef.current.newPassword.focus();
    } else if (value2 === "") {
      inputRef.current.confirmPassword.focus();
    } else if (value1 !== value2) {
      inputRef.current.confirmPassword.focus();
    }
  };

  const formValidation = () => {
    const { newPassword, confirmPassword } = password;

    if (newPassword === "") {
      focusPasswordFields(newPassword, confirmPassword);
      setPasswordError({
        confirmPasswordError: "Please enter the new password.",
      });
    } else if (confirmPassword === "") {
      focusPasswordFields(newPassword, confirmPassword);
      setPasswordError({
        confirmPasswordError: "Please enter the confirm password.",
      });
    } else if (newPassword !== confirmPassword) {
      focusPasswordFields(newPassword, confirmPassword);
      setPasswordError({
        confirmPasswordError: "Please enter the same password.",
      });
    } else if (newPassword.length <= 7) {
      setPasswordError({
        confirmPasswordError:
          "This password is too short. It must contain at least 8 characters.",
      });
    } else if (!isPassword(password.newPassword)) {
      setPasswordError({
        confirmPasswordError:
          "Enter alpha numeric value and one special character.",
      });
    } else {
      focusPasswordFields(newPassword, confirmPassword);
    }
  };

  const handleNewPasswordVerification = (errors) => {
    setPasswordError({
      confirmPasswordError: errors[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      password.newPassword &&
      password.newPassword.length > 7 &&
      isPassword(password.newPassword) &&
      password.confirmPassword &&
      password.newPassword === password.confirmPassword
    ) {
      const data = {
        token: paramsToken,
        password: password.confirmPassword,
      };
      setIsLoading(true);
      resetPasswordApiCall(
        searchParamsToken,
        data,
        (res) => {
          setIsLoading(false);
          setResetPassword(true);
          setPassword({
            newPassword: "",
            confirmPassword: "",
          });
          localStorage.removeItem("searchParamsToken");
        },
        (err) => {
          navigateServerErrorPage(err?.response?.status);
          setIsLoading(false);
          handleNewPasswordVerification(err.response.data.password);
        }
      );
    } else {
      formValidation();
    }
  };

  const handleLogin = () => {
    setResetPassword(false);
    setSignInPage("sign-in");
    setModalOpen(true);
    navigate("/my-account?tab=account-setting");
  };

  const handleNavigate = () => {
    if (location.pathname === "/set-new-password") {
      navigate("/sign-in");
    }
    setResetPassword(false);
    setSignInPage("sign-in");
  };

  useEffect(() => {
    if (password.newPassword === password.confirmPassword) {
      setPasswordError({
        confirmPasswordError: "",
      });
    }
  }, [password.newPassword, password.confirmPassword]);

  return (
    <div>
      <Card>
        {resetPassword ? (
          <div className="success">
            <h3>Success!</h3>
            <p>
              Your password has been successfully reset. Click the button below
              to log in.
            </p>
            <button color="inherit" className="yBtn" onClick={handleLogin}>
              Log in
            </button>
          </div>
        ) : (
          <div className="setPass">
            <h3>Set new password</h3>
            <h4>
              New password must be different than previously used passwords.
            </h4>
            <form onSubmit={handleSubmit}>
              <TextField
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                name="newPassword"
                value={password.newPassword}
                onChange={handleChange}
                inputRef={(ref) => (inputRef.current.newPassword = ref)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                    >
                      {showNewPassword ? (
                        <img src={HidePass} alt="hidePass" />
                      ) : (
                        <img src={ShowPass} alt="showPass" />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handleChange}
                inputRef={(ref) => (inputRef.current.confirmPassword = ref)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                    >
                      {showConfirmPassword ? (
                        <img src={HidePass} alt="hidePass" />
                      ) : (
                        <img src={ShowPass} alt="showPass" />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <p className="error">
                {passwordError["confirmPasswordError"] &&
                  passwordError["confirmPasswordError"]}
              </p>
              <button color="inherit" className="yBtn" disabled={isLoading}>
                {isLoading ? <LoadingSpinner /> : "Reset Password"}
              </button>
            </form>
            <div
              style={{ display: "flex", justifyContent: "center" }}
              className="back"
            >
              <Typography onClick={handleNavigate}>
                <img src={backImg} alt="backImg" />
                Back to log in
              </Typography>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

NewPassword.propTypes = {
  setSignInPage: PropTypes.any,
  setModalOpen: PropTypes.any,
};
export default NewPassword;
