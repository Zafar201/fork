import React from "react";
import { useLocation } from "react-router-dom";
import { AppBar, Tabs, Tab } from "@mui/material";

import "./index.css";
import TabPanel from "../TabPanel";
import { is_alpha_path } from "../Store/Auth-context";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsComponent({ tabPanels, value, onChange }) {
  const { pathname } = useLocation();

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={onChange}
          aria-label="simple tabs example"
        >
          <Tab
            label={
              !["/admin-dashboard"].includes(pathname)
                ? "Account Settings"
                : "Jackpot Calendar"
            }
            style={{ textTransform: "none" }}
            {...a11yProps(0)}
          />
          {["/admin-dashboard"].includes(pathname) && is_alpha_path && (
            <Tab
              label={"Alpha Settings"}
              style={{ textTransform: "none" }}
              {...a11yProps(1)}
            />
          )}
          {!["/admin-dashboard"].includes(pathname) && !is_alpha_path && (
            <Tab
              label={"Billing & Subscription"}
              style={{ textTransform: "none" }}
              {...a11yProps(1)}
            />
          )}
        </Tabs>
      </AppBar>
      {tabPanels.map((each, index) => (
        <TabPanel value={value} index={index}>
          {each}
        </TabPanel>
      ))}
    </>
  );
}
