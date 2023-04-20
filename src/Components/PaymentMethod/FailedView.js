import React from "react";
import { Card, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

function FailedView() {
  const navigate = useNavigate();
  const handleRetry = () => {
    navigate("/change-payment-method");
  };

  return (
    <div>
      <div className="paymentFailed">
        <Card>
          <h6>Payment Failed</h6>
          <Divider />
          <p>
            We were not able to process your payment. Please
            <br /> click the button below to try again.
          </p>
          <button className="yBtn" onClick={handleRetry}>
            Retry
          </button>
        </Card>
      </div>
    </div>
  );
}

export default FailedView;
