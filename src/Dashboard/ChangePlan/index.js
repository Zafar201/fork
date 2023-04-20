import React, { useEffect, useState, useContext } from "react";
import Divider from "@mui/material/Divider";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Button,
  Card,
} from "@mui/material";

import "./changePlan.css";
import {
  choosePlanGetApiCall,
  choosePlanCommitmentLengthGetAPiCall,
} from "../../ApiCalls";
import { removeDecimal } from "../../Action";
import BackArrow from "../../assets/images/back-w.svg";
import AuthContext from "../../Components/Store/Auth-context";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
import LoadingOverlay from "../../Components/LoadingOverlay";

function ChangePlan({ setReferrelView, setChangePlanView, setViewPayment }) {
  //Values from AuthContext
  const { navigateServerErrorPage } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [initiaLoading, setInitialLoading] = useState(false);
  const [selectDisabled, setSelectDisabled] = useState(false);
  const [cardValues, setCardValues] = useState([]);
  const [commitmentLength, setCommitmentLength] = useState([]);
  const [subscriptionPlan, setSubscriptionPlan] = useState({
    planduration: "Yearly",
    name: "",
    price_plan_details: 0,
    price_plan: 0,
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const controller = new AbortController();
  const config = {
    signal: controller.signal,
  };
  // const userToken = localStorage.getItem("userAccess");
  // const header = {
  //   headers: {
  //     Authorization: `Bearer ${userToken}`,
  //     "Content-Type": "multipart/form-data",
  //   },
  // };

  const handleDurationChange = (e) => {
    setSubscriptionPlan({ planduration: e.target.value });
  };

  const handleSelect = (name) => {
    const selectPlan = cardValues?.filter((el) => el.pricing.name === name);
    if (selectPlan[0].pricing.name === subscriptionPlan.name) {
      setSelectDisabled((prevState) => !prevState);
      setSubscriptionPlan({
        planduration: subscriptionPlan.planduration,
        name: "",
        price_plan_details: 0,
        price_plan: 0,
      });
    } else if (selectPlan[0].pricing.name === name) {
      setSelectDisabled(true);
      setSubscriptionPlan({
        planduration: subscriptionPlan.planduration,
        name: selectPlan[0].pricing.name,
        price_plan_details: selectPlan[0].id,
        price_plan: selectPlan[0].pricing.id,
      });
    }
  };

  const handleContinue = () => {
    if (
      subscriptionPlan.planduration &&
      subscriptionPlan.price_plan_details &&
      subscriptionPlan.price_plan
    ) {
      localStorage.setItem("price_plan", subscriptionPlan?.price_plan);
      localStorage.setItem(
        "price_plan_details",
        subscriptionPlan?.price_plan_details
      );
      if (pathname === "/change-plan") {
        navigate("/change-payment-method");
      } else {
        navigate("/sign-up?tab=choose-payment-method", { replace: true });
        setViewPayment(true);
        localStorage.setItem("paymentMethod", true);
      }
    }
  };

  const navigatePreviousPage = () => {
    if (pathname === "/sign-up") {
      navigate("/sign-up?tab=referrelcode");
      localStorage.removeItem("paymentMethod");
      localStorage.removeItem("footerView");
      setChangePlanView(false);
      setReferrelView(true);
    } else if (pathname === "/change-plan") {
      navigate("/my-account?tab=billing-subscribtion", { replace: true });
      localStorage.removeItem("changePlan");
    }
  };

  const dynamicContent = (content) => {
    if (content) {
      const numberMatch = content.match(/\d+/);
      const splitValues = content.split(`${numberMatch} seats`);
      let number;
      if (numberMatch) {
        number = numberMatch[0];
      }
      return (
        <p>
          {splitValues[0]}
          <span>{`${number} seats`}</span>
          {splitValues[1]}
        </p>
      );
    }
  };

  useEffect(() => {
    setInitialLoading(true);
    choosePlanCommitmentLengthGetAPiCall(
      (res) => {
        setCommitmentLength(res?.data[0]?.pricing_details);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
      },
      config
    );
    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInitialLoading(true);
    choosePlanGetApiCall(
      subscriptionPlan.planduration,
      (res) => {
        setCardValues(res?.data);
        setInitialLoading(false);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        setInitialLoading(false);
      },
      config
    );
    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionPlan.planduration]);

  return (
    <>
      {initiaLoading && <LoadingOverlay />}
      <div className="backArrow" onClick={navigatePreviousPage}>
        <span>
          <img src={BackArrow} alt="backArrow" />
          Back
        </span>
      </div>
      <div className="changePlanBox">
        <div>
          <h1>{pathname === "/sign-up" ? "Choose Plan" : "Change Plan"}</h1>
          <Divider />
          <div>
            <h3>Commitment Length:</h3>
            <div className="YearSelection">
              <FormControl>
                <RadioGroup
                  row
                  value={subscriptionPlan.planduration}
                  onChange={handleDurationChange}
                  defaultValue="Yearly"
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="Yearly"
                    control={<Radio />}
                    label="Yearly"
                  />
                  {commitmentLength &&
                    commitmentLength[1]?.displayed_discount && (
                      <Chip
                        label={`Save ${removeDecimal(
                          commitmentLength[1]?.displayed_discount
                        )}%`}
                        style={{
                          opacity:
                            subscriptionPlan.planduration === "Yearly"
                              ? 1
                              : 0.5,
                        }}
                      />
                    )}
                  <FormControlLabel
                    value="6 Months"
                    control={<Radio />}
                    label="6 Months"
                  />
                  {commitmentLength &&
                    commitmentLength[3]?.displayed_discount && (
                      <Chip
                        label={`Save ${removeDecimal(
                          commitmentLength[3]?.displayed_discount
                        )}%`}
                        style={{
                          opacity:
                            subscriptionPlan.planduration === "6 Months"
                              ? 1
                              : 0.5,
                        }}
                      />
                    )}
                  <FormControlLabel
                    value="3 Months"
                    control={<Radio />}
                    label="3 Months"
                  />
                  {commitmentLength &&
                    commitmentLength[2]?.displayed_discount && (
                      <Chip
                        label={`Save ${removeDecimal(
                          commitmentLength[2]?.displayed_discount
                        )}%`}
                        style={{
                          opacity:
                            subscriptionPlan.planduration === "3 Months"
                              ? 1
                              : 0.5,
                        }}
                      />
                    )}
                  <FormControlLabel
                    value="Monthly"
                    control={<Radio />}
                    label="Monthly"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <Divider />
          <div>
            <h3>Subscription Plan:</h3>
            <div className="plans">
              {cardValues &&
                cardValues?.map((el) => (
                  <Card
                    className={
                      el.pricing.name === subscriptionPlan.name &&
                      selectDisabled
                        ? "selected"
                        : ""
                    }
                    key={el.pricing.name}
                  >
                    <h4>{el.pricing.name}</h4>
                    <h2>{`$ ${removeDecimal(el.price)} / mo`}</h2>
                    <p>{dynamicContent(el.pricing.description)}</p>
                    <Button
                      sx={{
                        textTransform: "none",
                        backgroundColor:
                          el.pricing.name === subscriptionPlan.type &&
                          selectDisabled
                            ? "gray"
                            : "black",
                      }}
                      onClick={() => handleSelect(el.pricing.name)}
                    >
                      {el.pricing.name === subscriptionPlan.name &&
                      selectDisabled
                        ? "Selected"
                        : "Select"}
                    </Button>
                  </Card>
                ))}
            </div>
          </div>
          {selectDisabled && subscriptionPlan.name && (
            <button
              color="inherit"
              className="yBtn"
              onClick={handleContinue}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Continue"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
export default ChangePlan;
