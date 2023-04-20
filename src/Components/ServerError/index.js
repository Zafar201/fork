import React from "react";
import { useNavigate } from "react-router-dom";

import Icon1 from "../../assets/images/icon-1.svg";
import Icon2 from "../../assets/images/icon-2.svg";

import "./fzz.css";

function ServerError() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="fzzpage">
      <h3>500 Server Error</h3>
      <h1>
        Please refresh the page and contact us at
        <br /> help@getjackpot.xyz if the error persists.
      </h1>
      <div>
        <button color="inherit" className="yBtn" onClick={handleNavigate}>
          Refresh Page
        </button>
        <a
          // target="_blank"
          href="https://discord.gg/kbNgQz8N2E"
          rel="noreferrer"
        >
          <img src={Icon1} alt="icon1" />
        </a>
        <a
          href="https://twitter.com/jackpotxyz"
          // target="_blank"
          rel="noreferrer"
        >
          <img src={Icon2} alt="icon2" />
        </a>
      </div>
    </div>
  );
}

export default ServerError;
