import React from "react";

import Loader from "../../assets/images/apiloader.svg";

function LoadingSpinner() {
  return (
    <div>
      <img src={Loader} alt="loader" />
    </div>
  );
}

export default LoadingSpinner;
