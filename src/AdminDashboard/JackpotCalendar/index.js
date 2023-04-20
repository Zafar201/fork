import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import { calendarSheduleListApiCall } from "../../ApiCalls";
import AuthContext from "../../Components/Store/Auth-context";
import WarningDiv from "../../Components/WarningDiv";
import ModalComponent from "../../Components/CalendarAddPop";
import LoadingOverlay from "../../Components/LoadingOverlay";

export default function JackpotCalendar() {
  //Values from AuthContext
  const { updateToken, triggerUseEffect, navigateServerErrorPage } =
    useContext(AuthContext);

  const [calendarOpen, setCalendarOpen] = useState(true);
  const [formView, setFormView] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [convertedDate, setConvertedDate] = useState([]);
  const [resultDates, setResultDates] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loaderTime, setLoaderTime] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const adminToken = localStorage.getItem("AdminAccess");
  const controller = new AbortController();

  const config = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      "Content-Type": "multipart/form-data",
    },
    signal: controller.signal,
  };

  useEffect(() => {
    setLoaderTime((prevstate) => prevstate + 1);
    if (loaderTime === 0) {
      setLoading(true);
    }
    calendarSheduleListApiCall(
      config,
      (res) => {
        let dates = res.data.map((event) => event.date);
        let convertedDates = dates.map((date) =>
          new Date(date + "T00:00:00+05:30").toString()
        );
        setConvertedDate(convertedDates);
        setResultDates(dates);
        setLoading(false);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        setLoading(false);
        if (err.response.status === 401) updateToken();
      }
    );

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerUseEffect]);

  const handleSelect = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let PastDay = false;
    if (date < today) {
      PastDay = true;
    }

    let monthNumber = date.getMonth() + 1;
    let formattedMonth = monthNumber.toLocaleString("en-us", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    let day = date.getDate();
    let formatedDay = day.toLocaleString("en-us", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const formatedDate = `${date.getFullYear()}-${formattedMonth}-${formatedDay}`;
    // selecyed date in words
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[date.getDay()];
    const monthName = date.toLocaleString("default", { month: "long" });
    const dateInWords = `${dayName} ${monthName} ${getOrdinalNum(
      date.getDate()
    )}, ${date.getFullYear()}`;
    if (!resultDates.includes(formatedDate) && PastDay === true) {
      setShowPopup(true);
    } else {
      navigate("/jackpot-raffle", {
        state: { date: formatedDate, day: dateInWords },
      });
    }
  };

  function getOrdinalNum(n) {
    return (
      n +
      (n > 0
        ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
        : "")
    );
  }

  const isHighlighted = (date) => {
    const newDate = date.toString();
    if (convertedDate.includes(newDate)) {
      return convertedDate.includes(newDate);
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      {!formView ? (
        <DatePicker
          dayClassName={(date) =>
            isHighlighted(date) ? "highlighted" : "okkkkkkkk"
          }
          open={calendarOpen}
          onSelect={(date) => handleSelect(date)}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          customInput={<Card />}
        />
      ) : (
        ""
      )}
      <>
        <ModalComponent
          modalOpen={showPopup}
          handleClose={() => setShowPopup(false)}
          modalValue={
            <WarningDiv
              warningIcon={true}
              header="Invalid date"
              description={
                <>
                  <button onClick={() => setShowPopup(false)} className="yBtn">
                    OK
                  </button>
                </>
              }
            />
          }
        />
      </>
    </>
  );
}
