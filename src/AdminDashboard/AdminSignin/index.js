import React, { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Card } from "@mui/material";

import "./adminSignIn.css";
import CustomInputFeild from "../../Components/CustomInputField";
import ShowPass from "../../assets/images/passHide.svg";
import HidePass from "../../assets/images/passShow.svg";
import { formValidations } from "../../Action";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
import AuthContext from "../../Components/Store/Auth-context";

function AdminSignIn() {
  //Values from AuthContext
  const {
    loginApiCall,
    isLoading,
    setIsLoading,
    adminData,
    navigateServerErrorPage,
  } = useContext(AuthContext);

  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const inputRef = useRef({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginError("");
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formValidation = () => {
    formValidations(inputValues, ["email", "password"], inputRef);
  };

  useEffect(() => {
    if (adminData.access) {
      navigate("/ungraded-mission");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValues.email && inputValues.password) {
      const data = {
        email: inputValues.email.trim(),
        password: inputValues.password,
      };
      // login api calling import function.
      setIsLoading(true);
      loginApiCall(
        data,
        (response) => {
          setIsLoading(false);
          if (response?.data?.user_type === "Admin") {
            setIsLoading(false);
            setInputValues({
              email: "",
              password: "",
            });
            navigate("/ungraded-mission");
          } else if (response?.data?.user_type === "User") {
            setLoginError("Invalid Credentials");
            setIsLoading(false);
          }
        },
        (err) => {
          navigateServerErrorPage(err?.response?.status);
          setIsLoading(false);
          setLoginError(err.response.data.message);
        }
      );
    } else {
      formValidation();
    }
  };

  return (
    <div className="adminSignIn">
      <Card>
        <form onSubmit={handleSubmit}>
          <h3>Sign in:</h3>
          <CustomInputFeild
            name="email"
            type="text"
            value={inputValues.email}
            placeholder="Email"
            onChange={handleChange}
            inputRef={(ref) => (inputRef.current.email = ref)}
          />
          <CustomInputFeild
            name="password"
            type={showPassword ? "text" : "password"}
            value={inputValues.password}
            placeholder="Password"
            onChange={handleChange}
            inputRef={(ref) => (inputRef.current.password = ref)}
            inputProps={{
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
          <p className="error">{loginError && loginError}</p>
          <button color="inherit" className="yBtn" disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Sign in"}
          </button>
        </form>
      </Card>
    </div>
  );
}
export default AdminSignIn;
