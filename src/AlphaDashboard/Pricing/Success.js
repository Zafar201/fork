import React from "react";
import { useNavigate } from "react-router-dom";

import Icon1 from "../../assets/images/icon-1.svg";
import Icon2 from "../../assets/images/icon-2.svg";

function AlphaSuccess() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="pricingSucess">
        <h3>SUCCESS</h3>
        <h1>
          Thank you for requesting a demo. A member of
          <br />
          our team will be in touch shortly.
        </h1>
        <div>
          <button color="inherit" className="yBtn" onClick={handleNavigate}>
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
    </div>
  );
}

export default AlphaSuccess;
