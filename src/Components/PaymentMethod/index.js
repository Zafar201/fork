import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import Select from "react-select";

import BackArrow from "../../assets/images/back-w.svg";
import ModalComponent from "../Modal";
import {
  // choosePlanEditApiCall,
  paymentMethodGetApiCall,
  paymentMethodPostApiCall,
  getSelectedPlanDetailApiCall,
} from "../../ApiCalls";
import AuthContext from "../Store/Auth-context";
// import Connect2Phantom from "../Connect2Phantom";
// import TransferSol from "../TransferSol";
import LoadingOverlay from "../LoadingOverlay";
import SolanaPayComponent from "../SolanaPayComponent";

const Buffer = require("buffer/").Buffer;

function ChangePaymentMethod({ setViewPayment, setChangePlanView }) {
  const { userData, isUserLoggedIn, navigateServerErrorPage } =
    useContext(AuthContext);
  // const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [connected, setConnected] = useState(false);
  // const [walletAvail, setWalletAvail] = useState(false);
  const [successView, setSuccessView] = useState(false);
  const [faildView, setFaildView] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuValues, setMenuValues] = useState([]);
  const [planValues, setPlanValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsPage = searchParams.get("tab");
  const searchParamsStatus = searchParams.get("status");

  const navigate = useNavigate();
  const location = useLocation();

  const paymentMethods = JSON.parse(localStorage.getItem("paymentMethod"));
  const payment = JSON.parse(localStorage.getItem("payment"));

  const controller = new AbortController();
  const config = {
    signal: controller.signal,
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // const changePlanUpdateApiCall = () => {
  //   const data = {
  //     user: isUserLoggedIn
  //       ? parseInt(userData.id)
  //       : parseInt(localStorage.getItem("userId")),
  //     price_plan_details: parseInt(localStorage.getItem("price_plan_details")),
  //     price_plan: parseInt(localStorage.getItem("price_plan")),
  //   };
  //   choosePlanEditApiCall(
  //     data,
  //     (res) => {
  //       console.log(res);
  //     },
  //     (err) => {
  //       navigateServerErrorPage(err?.response?.status);
  //     }
  //   );
  // };

  const handleClick = (id) => {
    const data = {
      user: isUserLoggedIn
        ? userData.id
        : parseInt(localStorage.getItem("userId")),
      payment_method: id,
      price_plan_details: parseInt(localStorage.getItem("price_plan_details")),
      price_plan: parseInt(localStorage.getItem("price_plan")),
    };
    if (id === 3) {
      setModalOpen(true);
      return;
    } else {
      setLoading(true);
      paymentMethodPostApiCall(
        data,
        (res) => {
          if (res) {
            window.location.href = res.data.url;
            setLoading(false);
          }
        },
        (err) => {
          navigateServerErrorPage(err?.response?.status);
          setLoading(false);
        }
      );
    }
  };

  const handleChange = (e) => {
    setTimeout(() => {
      handleClick(e.value);
    }, 5);
  };

  const handleRetry = () => {
    if (location.pathname === "/change-payment-method" && payment) {
      navigate("/change-payment-method", { replace: true });
      setFaildView(false);
    } else if (location.pathname === "/change-payment-method" && !payment) {
      navigate("/change-payment-method", { replace: true });
      setFaildView(false);
    } else if (location.pathname === "/sign-up") {
      navigate("/sign-up?tab=choose-payment-method", { replace: true });
      setFaildView(false);
    } else if (location.pathname === "/change-payment-method") {
      navigate("/change-payment-method", { replace: true });
    }
  };

  const handleNavigateAccountSetup = () => {
    if (searchParamsPage === "sign-up") {
      localStorage.removeItem("paymentMethod");
      localStorage.removeItem("footerView");
      setSuccessView(false);
      navigate("/account-setup");
    } else if (searchParamsPage === "change-payment-method" && !payment) {
      navigate("/my-account?tab=billing-subscribtion");
    } else if (payment) {
      localStorage.removeItem("payment");
      navigate("/my-account?tab=billing-subscribtion");
    } else if (location.pathname === "/change-payment-method") {
      navigate("/my-account?tab=billing-subscribtion");
    }
  };

  const handlePreviousPage = () => {
    if (paymentMethods) {
      navigate("/sign-up?tab=choose-plan", { replace: true });
      setViewPayment(false);
    } else if (location.pathname === "/change-payment-method" && !payment) {
      navigate("/change-plan");
    } else if (searchParamsPage === "sign-up") {
      navigate("/sign-up", { replace: true });
      setChangePlanView(true);
      setViewPayment(false);
    } else if (searchParamsPage === "change-payment-method" && !payment) {
      navigate("/change-plan");
    } else if (payment) {
      localStorage.removeItem("payment");
      navigate("/my-account?tab=billing-subscribtion");
    }
  };

  useEffect(() => {
    if (searchParamsPage === "sign-up" && searchParamsStatus === "failed") {
      setFaildView(true);
    } else if (
      searchParamsPage === "sign-up" &&
      searchParamsStatus === "success"
    ) {
      // changePlanUpdateApiCall();
      setSuccessView(true);
    } else if (
      searchParamsPage === "change-payment-method" &&
      searchParamsStatus === "failed"
    ) {
      setFaildView(true);
    } else if (
      searchParamsPage === "change-payment-method" &&
      searchParamsStatus === "success"
    ) {
      // changePlanUpdateApiCall();
      setSuccessView(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsPage, searchParamsStatus]);

  useEffect(() => {
    window.Buffer = Buffer;
    setLoading(true);
    paymentMethodGetApiCall(
      (res) => {
        let options = [];
        res?.data?.map((el) => options.push({ value: el.id, label: el.name }));
        setMenuValues(options);
        setLoading(false);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        setLoading(false);
      },
      config
    );
    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.pathname !== "/change-payment-method" && successView) {
      setLoading(true);
      const data = parseInt(localStorage.getItem("userId"));
      getSelectedPlanDetailApiCall(
        data,
        (response) => {
          setPlanValues(response.data);
          setLoading(false);
        },
        (error) => {
          navigateServerErrorPage(error?.response?.status);
          setLoading(false);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successView]);

  const paymentSuccessView = (
    <div className="SuccessPayBox">
      <Card>
        <h3>Success!</h3>
        <Divider />
        {searchParamsPage === "change-payment-method" ||
        location.pathname === "/change-payment-method" ? (
          <p>You have successfully changed your subscription.</p>
        ) : (
          <>
            <p>
              You have successfully subscribed to the {planValues?.name} plan
              and have unlocked <span>{planValues?.no_of_seats}</span> seats for
              your community.
            </p>
            <p>
              Let’s finish your account setup. This should take less
              <br /> than 5 minutes to complete.
            </p>
          </>
        )}
        <button
          color="inherit"
          className="yBtn"
          onClick={handleNavigateAccountSetup}
        >
          {searchParamsPage === "change-payment-method" ||
          location.pathname === "/change-payment-method"
            ? "Return to My Account"
            : "Complete Account Setup"}
        </button>
      </Card>
    </div>
  );

  const paymentFaildView = (
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
  );

  return (
    <>
      {loading && <LoadingOverlay />}
      {!successView && !faildView && (
        <div className="backArrow" onClick={handlePreviousPage}>
          <span>
            <img src={BackArrow} alt="backArrow" />
            Back
          </span>
        </div>
      )}
      {!successView && !faildView && (
        <div className="choosePayment">
          <Card>
            <CardContent>
              <Typography variant="h6">Choose Payment Method</Typography>

              <Typography>
                We offer a variety of payment options including ETH, SOL, BTC,
                ApeCoin, USDC, Credit/Debit Card, and more.
              </Typography>
              <Divider />
              <Select
                id="react-select"
                menuIsOpen={isOpen}
                onMenuOpen={() => setIsOpen(true)}
                onMenuClose={() => setIsOpen(false)}
                onChange={handleChange}
                options={menuValues}
                className={
                  isOpen ? "ChoosePaymentDropdwn open" : "ChoosePaymentDropdwn"
                }
                placeholder="Select"
              />
            </CardContent>
          </Card>
        </div>
      )}
      {successView && paymentSuccessView}
      {faildView && paymentFaildView}
      <ModalComponent
        modalOpen={modalOpen}
        handleClose={handleModalClose}
        modalValue={
          <>
            {/* <Connect2Phantom
              provider={provider}
              setProvider={setProvider}
              walletAvail={walletAvail}
              setWalletAvail={setWalletAvail}
              connected={connected}
              setConnected={setConnected}
            />
            {walletAvail && (
              <TransferSol
                provider={provider}
                setProvider={setProvider}
                connected={connected}
              />
            )} */}
            <SolanaPayComponent
              paymentSuccessView={paymentSuccessView}
              paymentFaildView={paymentFaildView}
            />
          </>
        }
        className={"signBox"}
      />
    </>
  );
}
export default ChangePaymentMethod;
