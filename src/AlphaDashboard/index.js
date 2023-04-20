import React, { useState } from "react";
import { Card } from "@mui/material";

import TabsComponent from "../Components/TabsComponent";
import "../AdminDashboard/adminDashboard.css";
import AlphaCalendar from "./AlphaCalendar";

function AlphaDashboard() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="adminDashboard">
      <Card>
        <TabsComponent
          tabPanels={[<AlphaCalendar />]}
          value={tabValue}
          onChange={handleTabChange}
        />
      </Card>
    </div>
  );
}
export default AlphaDashboard;
