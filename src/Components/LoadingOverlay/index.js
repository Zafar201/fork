import React from "react";

import Loader from "../../assets/images/apiloader.svg";
import "./loader.css";

function LoadingOverlay() {
  return (
    <div className="apiLoader">
      <img src={Loader} alt="loader" />
    </div>
  );
}

export default LoadingOverlay;
