import React from "react";
import Icon1 from "../../assets/images/icon-1.svg";
import Icon2 from "../../assets/images/icon-2.svg";
import "./fnfpage.css";

function NotFound() {
  return (
    <div className="fnfpage">
      <h3>404 Page Not Found</h3>
      <h1>The page you are looking for may have been moved, deleted, or possibly never existed.</h1>
      <div>
          <button color="inherit" className="yBtn">
            Return Home
          </button>
          <img
            src={Icon1}
            alt="icon1"
            onClick={() =>
              (window.location.href = "https://discord.gg/kbNgQz8N2E")
            }
          />
          <img
            src={Icon2}
            alt="icon2"
            onClick={() =>
              (window.location.href = "https://twitter.com/jackpotxyz")
            }
          />
        </div>
    </div>
  );
}

export default NotFound;
