import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  IconButton,
  InputLabel,
} from "@mui/material";
import InputMask from "react-input-mask";

import "./signUp.css";
import ShowPass from "../../assets/images/passHide.svg";
import HidePass from "../../assets/images/passShow.svg";
import BackArrow from "../../assets/images/back-w.svg";
import ChangePlan from "../../Dashboard/ChangePlan";
import { formValidations, isPassword } from "../../Action";
import ModalComponent from "../../Components/Modal";
import SignIn from "../../Authentication/Sign in";
import ForgotPassword from "../Forgot password";
import NewPassword from "../../Authentication/Set New Password";
import ChangePaymentMethod from "../../Components/PaymentMethod";
import { signUpApiCall, referralCodeApiCall } from "../../ApiCalls";
import AuthContext from "../../Components/Store/Auth-context";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";

export default function SignUp() {
  //Values from AuthContext
  const { setIsLoading, isLoading, navigateServerErrorPage } =
    useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [signInPage, setSignInPage] = useState("sign-in");
  const [viewPayment, setViewPayment] = useState(false);
  const [CheckboxError, setCheckBoxError] = useState(false);
  const [passwordView, setPasswordView] = useState(false);
  const [referrelView, setReferrelView] = useState(false);
  const [changePlanView, setChangePlanView] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiCallError, setApiCallError] = useState(false);
  const [signUpDetail, setSignUpDetail] = useState({
    email: "",
    password: "",
    agree: false,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsPage = searchParams.get("tab");
  const searchParamsStatus = searchParams.get("status");

  const inputRef = useRef({});
  const navigate = useNavigate();
  const location = useLocation();

  const previousPage = JSON.parse(localStorage.getItem("paymentMethod"));

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleSignUp = (e) => {
    setApiError("");
    setCheckBoxError(false);
    setSignUpDetail({ ...signUpDetail, [e.target.name]: e.target.value });
  };

  const handleCheckBox = (e) => {
    setApiError("");
    setSignUpDetail({
      ...signUpDetail,
      [e.target.name]: e.target.checked,
    });
    if (e.target.name === "agree" && e.target.checked === true) {
      setCheckBoxError(false);
    }
  };

  const handleChange = (e) => {
    setApiError("");
    setCheckBoxError(false);
    setReferralCode(e.target.value);
    setApiCallError(false);
  };

  const formValidation = () => {
    if (signUpDetail.email !== "" && signUpDetail.password === "") {
      setApiError("");
    } else if (signUpDetail.email !== "" && signUpDetail.password.length <= 7) {
      setApiError("Enter minimum 8 character.");
    } else if (
      signUpDetail.email !== "" &&
      !isPassword(signUpDetail.password)
    ) {
      setApiError("Enter alpha numeric value and one special character.");
    } else if (
      signUpDetail.email &&
      signUpDetail.password &&
      signUpDetail.agree !== true
    ) {
      setCheckBoxError(true);
    }
    formValidations(signUpDetail, ["email", "password"], inputRef);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      isEmail(signUpDetail.email) &&
      isPassword(signUpDetail.password) &&
      signUpDetail.password.length > 7 &&
      signUpDetail.agree
    ) {
      const data = {
        email: signUpDetail.email.trim(),
        password: signUpDetail.password,
        agree: signUpDetail.agree,
      };
      setIsLoading(true);
      signUpApiCall(
        data,
        (response) => {
          localStorage.setItem("userId", response.data.id);
          setIsLoading(false);
          setApiError("");
          setSignUpDetail({
            email: "",
            password: "",
            agree: false,
          });
          if (location.pathname === "/sign-up") {
            navigate("/sign-up?tab=referrelcode");
            setReferrelView(true);
          }
        },
        (error) => {
          navigateServerErrorPage(error?.response?.status);
          setIsLoading(false);
          if (error.response.data?.message) {
            setApiError(error.response.data?.message);
          }
          if (error.response.data?.email) {
            setApiError(error.response.data?.email[0]);
          }
          if (error.response.data?.username) {
            setApiError(error.response.data?.username[0]);
          }
          if (error.response.data?.password) {
            setApiError(error.response.data?.password[0]);
          }
        }
      );
    } else {
      formValidation();
    }
  };

  const handleReferrelSubmit = (e) => {
    e.preventDefault();
    setApiCallError(false);
    if (referralCode) {
      const data = referralCode;
      setIsLoading(true);
      referralCodeApiCall(
        data,
        (res) => {
          setIsLoading(false);
          if (res.data.mes === "guild has been invited") {
            if (location.pathname === "/sign-up") {
              navigate("/sign-up?tab=choose-plan", { replace: true });
              setChangePlanView(true);
              localStorage.setItem("footerView", true);
              setReferrelView(false);
              setReferralCode("");
            }
          } else if (res.data.mes === "error: code invalid") {
            setApiCallError(true);
            formValidations(
              referralCode,
              ["referralCode"],
              inputRef,
              res.data.msg
            );
          }
        },
        (err) => {
          navigateServerErrorPage(err?.response?.status);
          setIsLoading(false);
          setApiCallError(true);
          formValidations(
            referralCode,
            ["referralCode"],
            inputRef,
            err.response.data.msg
          );
        }
      );
    } else {
      if (location.pathname === "/sign-up") {
        navigate("/sign-up?tab=choose-plan", { replace: true });
        setChangePlanView(true);
        localStorage.setItem("footerView", true);
        setReferrelView(false);
      }
      setReferralCode("");
    }
  };

  const handlePreviousPage = () => {
    navigate("/sign-up", { replace: true });
    setReferrelView(false);
  };

  const signInModal = () => {
    switch (signInPage) {
      case "sign-in":
        return (
          <SignIn setSignInPage={setSignInPage} setModalOpen={setModalOpen} />
        );
      case "forgot-password":
        return (
          <ForgotPassword
            setSignInPage={setSignInPage}
            setModalOpen={setModalOpen}
          />
        );
      case "set-new-password":
        return (
          <NewPassword
            setSignInPage={setSignInPage}
            setModalOpen={setModalOpen}
          />
        );
      default:
        return "";
    }
  };

  useEffect(() => {
    if (searchParamsPage && searchParamsStatus) setViewPayment(true);
  }, [searchParamsPage, searchParamsStatus]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (!modalOpen) {
      setTimeout(() => {
        setSignInPage("sign-in");
      }, 500);
    }
  }, [modalOpen]);

  useEffect(() => {
    if (previousPage) {
      setChangePlanView(true);
    }
  }, [previousPage]);

  const referralCodeForm = (
    <div className="refrralCode">
      <Card>
        <h6>Referral Code</h6>
        <form
          onSubmit={handleReferrelSubmit}
          className={apiCallError ? "invalid" : ""}
        >
          <InputMask
            mask="****-***-***"
            name="referralCode"
            value={referralCode}
            onChange={handleChange}
            placeholder="Referral Code [optional]"
            inputRef={(ref) => (inputRef.current.referralCode = ref)}
          />
          {/* <TextField
            type="text"
            variant="outlined"
            name="referralCode"
            value={referralCode}
            label="Referral Code [optional]"
            onChange={(e)=>handleInputChange(e)}
            inputRef={(ref) => (inputRef.current.referralCode = ref)}
          /> */}
          <button
            className={isLoading ? "yBtn loading" : "yBtn"}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner></LoadingSpinner>
            ) : apiCallError ? (
              "Invalid Referral Code"
            ) : (
              "Continue"
            )}
          </button>
        </form>
      </Card>
    </div>
  );

  return (
    <>
      {viewPayment ? (
        <ChangePaymentMethod
          setViewPayment={setViewPayment}
          setChangePlanView={setChangePlanView}
        />
      ) : changePlanView ? (
        <ChangePlan
          setReferrelView={setReferrelView}
          setChangePlanView={setChangePlanView}
          setViewPayment={setViewPayment}
        />
      ) : (
        <>
          {referrelView && (
            <div className="backArrow" onClick={handlePreviousPage}>
              <span>
                <img src={BackArrow} alt="/" />
                Back
              </span>
            </div>
          )}
          {referrelView ? (
            referralCodeForm
          ) : (
            <div className="signUpBox">
              <Card>
                <CardContent>
                  <Typography variant="h6">Create your account:</Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      variant="outlined"
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={signUpDetail.email}
                      onChange={handleSignUp}
                      inputRef={(ref) => (inputRef.current.email = ref)}
                    />
                    <TextField
                      variant="outlined"
                      type={passwordView ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={signUpDetail.password}
                      onChange={handleSignUp}
                      inputRef={(ref) => (inputRef.current.password = ref)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => setPasswordView(!passwordView)}
                          >
                            {passwordView ? (
                              <img src={HidePass} alt="/" />
                            ) : (
                              <img src={ShowPass} alt="/" />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                    <div className="agree">
                      <FormControlLabel
                        control={<Checkbox />}
                        name="agree"
                        checked={signUpDetail.agree}
                        onChange={handleCheckBox}
                      />
                      <InputLabel>
                        I agree to the
                        <Link to="/terms-of-use">Terms of Use</Link>
                        and
                        <Link to="/privacy-policy">Privacy Policy.</Link>
                      </InputLabel>
                    </div>
                    {CheckboxError ? (
                      <Typography className="error">
                        Please agree to the terms and conditions
                      </Typography>
                    ) : (
                      <></>
                    )}
                    <Typography className="error">
                      {apiError && apiError}
                    </Typography>
                    <button className="yBtn" type="submit" disabled={isLoading}>
                      {isLoading ? <LoadingSpinner /> : "Create account"}
                    </button>
                  </form>
                  <Typography>
                    Already have an account?{" "}
                    <u onClick={handleModalOpen}> Sign in</u>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
      <ModalComponent
        modalOpen={modalOpen}
        handleClose={handleModalClose}
        modalValue={signInModal()}
        className={"signBox"}
      />
    </>
  );
}
