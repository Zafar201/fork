import React, { useState, useRef, useEffect } from "react";

import { formValidations } from "../../Action";
import ShowPass from "../../assets/images/passHide.svg";
import HidePass from "../../assets/images/passShow.svg";
import CustomInputFeild from "../../Components/CustomInputField";

export default function UserManagement() {
  const [error, setError] = useState("");
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const inputRef = useRef({});

  const handleClickShowPassword = (e) => {
    const { name } = e.target;
    setShowPassword((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      password.oldPassword &&
      password.newPassword &&
      password.confirmPassword &&
      password.newPassword === password.confirmPassword
    ) {
      setPassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      formValidations(
        password,
        ["oldPassword", "newPassword", "confirmPassword"],
        inputRef
      );
      if (password.newPassword !== password.confirmPassword)
        setError("Please enter the same password.");
    }
  };

  useEffect(() => {
    if (password.newPassword === password.confirmPassword) setError("");
  }, [password]);

  const passwordSetting = (
    <div>
      <form onSubmit={handleSubmit}>
        <CustomInputFeild
          name="oldPassword"
          type={showPassword.oldPassword ? "text" : "password"}
          value={password.oldPassword}
          placeholder="Old Password"
          onChange={handleChange}
          inputRef={(ref) => (inputRef.current.oldPassword = ref)}
          inputProps={{
            endAdornment: (
              <>
                {showPassword.oldPassword ? (
                  <img
                    src={HidePass}
                    name="oldPassword"
                    onClick={handleClickShowPassword}
                  />
                ) : (
                  <img
                    src={ShowPass}
                    name="oldPassword"
                    onClick={handleClickShowPassword}
                  />
                )}
              </>
            ),
          }}
        />
        <CustomInputFeild
          name="newPassword"
          type={showPassword.newPassword ? "text" : "password"}
          value={password.newPassword}
          placeholder="New Password"
          onChange={handleChange}
          inputRef={(ref) => (inputRef.current.newPassword = ref)}
          inputProps={{
            endAdornment: (
              <>
                {showPassword.newPassword ? (
                  <img
                    src={HidePass}
                    name="newPassword"
                    onClick={handleClickShowPassword}
                  />
                ) : (
                  <img
                    src={ShowPass}
                    name="newPassword"
                    onClick={handleClickShowPassword}
                  />
                )}
              </>
            ),
          }}
        />
        <CustomInputFeild
          name="confirmPassword"
          type={showPassword.confirmPassword ? "text" : "password"}
          value={password.confirmPassword}
          placeholder="Confirm Password"
          onChange={handleChange}
          inputRef={(ref) => (inputRef.current.confirmPassword = ref)}
          errorText={error && error}
          inputProps={{
            endAdornment: (
              <>
                {showPassword.confirmPassword ? (
                  <img
                    src={HidePass}
                    name="confirmPassword"
                    onClick={handleClickShowPassword}
                  />
                ) : (
                  <img
                    src={ShowPass}
                    name="confirmPassword"
                    onClick={handleClickShowPassword}
                  />
                )}
              </>
            ),
          }}
        />
        <button color="inherit" className="yBtn">
          Change Password
        </button>
      </form>
    </div>
  );
  return <div>{passwordSetting}</div>;
}
