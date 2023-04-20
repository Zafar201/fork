import React from "react";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ResponsiveCalendar({
  calendarValue,
  setCalenderValue,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Expiry Date"
        value={calendarValue}
        onChange={(newValue) => {
          setCalenderValue(newValue);
        }}
        renderInput={
          calendarValue === null
            ? ({ inputRef, InputProps }) => (
                <Box ref={inputRef}>{InputProps?.endAdornment}</Box>
              )
            : (params) => <TextField {...params} />
        }
      />
    </LocalizationProvider>
  );
}
