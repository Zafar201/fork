import React from "react";
import { InputLabel, TextField } from "@mui/material";

export default function CustomInputFeild({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
  inputRef,
  disabled,
  inputProps,
  errorText,
}) {
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <TextField
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        inputRef={inputRef}
        disabled={disabled}
        InputProps={inputProps}
      />

      <span className="error">{errorText}</span>
    </div>
  );
}
