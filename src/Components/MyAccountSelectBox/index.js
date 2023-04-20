import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export default function MyAccountSelectBox({ screen, tabValue, setTabValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOption, setMenuOption] = useState("Account Settings");

  const navigate = useNavigate();

  const option = [
    { value: "Account Settings", label: "Account Settings" },
    { value: "Billing & Subscription", label: "Billing & Subscription" },
  ];

  const handleChange = (e) => {
    if (tabValue) {
      setTabValue("");
    }

    setMenuOption(e.value);
  };

  const menuScreen = () => {
    switch (menuOption) {
      case "Account Settings":
        return screen[0];
      case "Billing & Subscription":
        return screen[1];
      default:
        break;
    }
  };

  useEffect(() => {
    if (tabValue === "Billing & Subscription") {
      setMenuOption("Billing & Subscription");
    }
  }, [tabValue]);

  useEffect(() => {
    if (menuOption === "Account Settings") {
      navigate("/my-account?tab=account-setting", { replace: true });
    } else if (menuOption === "Billing & Subscription") {
      navigate("/my-account?tab=billing-subscribtion", { replace: true });
    }
    menuScreen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOption]);

  return (
    <div className="hidden">
      <Select
        menuIsOpen={isOpen}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
        value={menuOption}
        placeholder={menuOption}
        options={option}
        className={isOpen ? "MyaccountDropdwn open" : "MyaccountDropdwn"}
        onChange={handleChange}
      />
      {menuScreen()}
    </div>
  );
}
