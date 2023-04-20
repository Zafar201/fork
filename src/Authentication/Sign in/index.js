import React, { useRef, useState, useContext, useEffect } from "react";
import {
  TextField,
  Link,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
  Card,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { CookiesProvider, useCookies } from "react-cookie";

import "./signIn.css";
import ShowPass from "../../assets/images/passHide.svg";
import HidePass from "../../assets/images/passShow.svg";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
import AuthContext from "../../Components/Store/Auth-context";
import { formValidations } from "../../Action";

export default function SignIn({ setSignInPage, setModalOpen }) {
  //Values from AuthContext
  const { loginApiCall, isLoading, setIsLoading, navigateServerErrorPage } =
    useContext(AuthContext);

  const [cookies, setCookie, removeCookie] = useCookies(["email", "password"]);
  const [checkBoxValue, setCheckBoxvalue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const inputElement1 = useRef({});

  const handleChange = (e) => {
    setLoginError("");
    if (cookies?.email && cookies?.password) {
      removeCookie("email");
      removeCookie("password");
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    }
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formValidation = () => {
    formValidations(inputValues, ["email", "password"], inputElement1);
  };

  const handleRememberMe = ({ target }) => {
    setCheckBoxvalue(target.checked);
    if (target.checked) {
      setCookie("email", inputValues.email.trim());
      setCookie("password", inputValues.password);
    } else if (!target.checked) {
      removeCookie("email");
      removeCookie("password");
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (inputValues.email && inputValues.password) ||
      (cookies.email && cookies.password)
    ) {
      // login api calling import function.
      const data = {
        email: cookies?.email ? cookies.email : inputValues.email.trim(),
        password: cookies.password ? cookies.password : inputValues.password,
      };
      setIsLoading(true);
      loginApiCall(
        data,
        (response) => {
          localStorage.removeItem("userId");
          if (response?.data?.user_type === "User") {
            setIsLoading(false);
            setCheckBoxvalue(false);
            setInputValues({
              email: "",
              password: "",
            });
            setModalOpen(false);
            navigate("/my-account?tab=account-setting");
          } else if (response?.data?.user_type === "Admin") {
            setLoginError("Invalid Credentials");
            setIsLoading(false);
          }
        },
        (err) => {
          navigateServerErrorPage(err?.response?.status);
          setIsLoading(false);
          setLoginError(err.response.data.message);
          setCheckBoxvalue(false);
        }
      );
    } else {
      formValidation();
    }
  };

  useEffect(() => {
    if (cookies.email && cookies.password) {
      setCheckBoxvalue(true);
    } else {
      setCheckBoxvalue(false);
    }
  }, [cookies.email, cookies.password]);

  const handleNavigateForgotPassword = () => {
    setSignInPage("forgot-password");
  };

  const handleNavigateSignUp = () => {
    if (location.pathname !== "/sign-in") {
      setModalOpen(false);
    }
    navigate("/pricing");
  };

  return (
    <CookiesProvider>
      <div>
        <Card>
          <form onSubmit={handleSubmit}>
            <h2>Sign in:</h2>
            <TextField
              type="email"
              id="email"
              placeholder={inputValues.email === "" && "Email Address"}
              name="email"
              value={cookies.email !== "" ? cookies.email : inputValues.email}
              onChange={handleChange}
              inputRef={(ref) => (inputElement1.current.email = ref)}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder={inputValues.password === "" && "Password"}
              name="password"
              value={
                cookies.password !== ""
                  ? cookies.password
                  : inputValues.password
              }
              onChange={handleChange}
              inputRef={(ref) => (inputElement1.current.password = ref)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? (
                      <img src={HidePass} alt="hidePass" />
                    ) : (
                      <img src={ShowPass} alt="showPass" />
                    )}
                  </IconButton>
                ),
              }}
            />
            <div className="rember">
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleRememberMe}
                      checked={checkBoxValue}
                    />
                  }
                  label="Remember me"
                />
              </div>
              <div>
                <Link onClick={handleNavigateForgotPassword}>
                  Forgot password
                </Link>
              </div>
            </div>
            <p className="error">{loginError && loginError}</p>
            <button
              color="inherit"
              className="yBtn"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Sign in"}
            </button>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography>Don’t have an account?</Typography>
              <Link onClick={handleNavigateSignUp}> Sign up</Link>
            </div>
          </form>
        </Card>
      </div>
    </CookiesProvider>
  );
}

SignIn.propTypes = {
  setSignInPage: PropTypes.func,
  setModalOpen: PropTypes.func,
};
