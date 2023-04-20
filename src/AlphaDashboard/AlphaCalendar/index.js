import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

export default function AlphaCalendar() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/alpha-setting");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
