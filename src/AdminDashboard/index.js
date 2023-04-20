import React, { useState } from "react";
import { Card } from "@mui/material";

import TabsComponent from "../Components/TabsComponent";
import JackpotCalendar from "./JackpotCalendar";
import AlphaCalendar from "../AlphaDashboard/AlphaCalendar";
import BackArrow from "../assets/images/back-w.svg";
import { useNavigate } from "react-router-dom";
import "./adminDashboard.css";

function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="backArrow" onClick={() => navigate("/ungraded-mission")}>
        <span>
          <img src={BackArrow} alt="backArrow" />
          Back
        </span>
      </div>

      <div className="adminDashboard">
        <Card>
          <TabsComponent
            tabPanels={[<JackpotCalendar />, <AlphaCalendar />]}
            value={tabValue}
            onChange={handleTabChange}
          />
        </Card>
      </div>
    </>
  );
}
export default AdminDashboard;
