import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Home from "../../Dashboard/Home";
import LeaderBoard from "../../Dashboard/Leaderboard";
import Pricing from "../../Dashboard/Pricing";
import MyAccount from "../../Dashboard/MyAccount";
import ChangePlan from "../../Dashboard/ChangePlan";
import SignUp from "../../Authentication/Sign up";
import ForgotPassword from "../../Authentication/Forgot password";
import NewPassword from "../../Authentication/Set New Password";
import AccountSetup from "../../Authentication/Sign up/AccountSetup";
import CommunityProfileSetting from "../../Authentication/Sign up/CommunityProfileSetting";
import ChangePaymentMethod from "../../Components/PaymentMethod";
import TermsOfUse from "../../Components/TermsOfUse";
import PrivacyPolicy from "../../Components/PrivacyPolicy";
import AdminDashboard from "../../AdminDashboard";
import AdminSignIn from "../../AdminDashboard/AdminSignin";
import AnnouncementTable from "../../Components/AnnouncementTable";
import AnnouncementVideo from "../../Components/AnnouncementVideo";
import UngradedMission from "../../AdminDashboard/UngradedMissions";
import GradedMission from "../../AdminDashboard/GradedMission";
import AddWinners from "../../AdminDashboard/JackpotCalendar/AddWinners";
import ChoosePaymentMethod from "../../Authentication/Sign up/ChoosePaymentMethod";
import JackpotRaffle from "../../AdminDashboard/JackpotCalendar/Jackpot Raffle";
import Success from "../../Dashboard/Pricing/Success";
import FailedView from "../../Components/PaymentMethod/FailedView";
import DemoLeaderBoard from "../../Dashboard/DemoLeaderBoard";
import SweepStakes from "../SweepStakes";
import AlphaHome from "../../AlphaDashboard/Home";
import AlphaLeaderBoard from "../../AlphaDashboard/Leaderboard";
import AlphaPricing from "../../AlphaDashboard/Pricing";
import AlphaSuccess from "../../AlphaDashboard/Pricing/Success";
import AlphaSetting from "../../AlphaDashboard/AlphaSettings";
import AlphaLandingPage from "../../AlphaDashboard/AlphaLanding";
import ServerError from "../ServerError";
import NotFound from "../NotFound/NotFound";
// import LazyLoading from "../Lazyloading";
import { HTTP } from "../../http-common";
import AlphaHomeTest from "../../HomeIosTest";

// const AlphaHome = React.lazy(() => import("../../AlphaDashboard/Home"));
// const AlphaLeaderBoard = React.lazy(() =>import("../../AlphaDashboard/Leaderboard"));
// const AlphaPricing = React.lazy(() => import("../../AlphaDashboard/Pricing"));
// const AlphaSuccess = React.lazy(() => import("../../AlphaDashboard/Pricing/Success"));
// const AlphaSetting = React.lazy(() => import("../../AlphaDashboard/AlphaSettings"));
// const AlphaLandingPage = React.lazy(() => import("../../AlphaDashboard/AlphaLanding"));
// const ServerError = React.lazy(() => import("../ServerError"));
// const NotFound = React.lazy(() => import("../NotFound/NotFound"));

export const is_alpha_path = process.env.REACT_APP_ALPHA === "true";

export const pathList = [
  {
    path: "/",
    element: <AlphaHome />,
    is_alpha_path: false,
    allowed_user_types: false,
    logout_user_types: ["User"],
    header: true,
    footer: true,
    header_allowed_tabs: [],
    footer_allowed_tabs: [],
  },
  {
    path: "/alpha-home-test",
    element: <AlphaHomeTest />,
    allowed_user_types: false,
    is_alpha_path: true,
    header: true,
    footer: true,
    header_allowed_tabs: [],
    footer_allowed_tabs: [],
  },
  {
    path: is_alpha_path ? "/test-leaderboard" : "/leaderboard",
    element: <LeaderBoard />,
    is_alpha_path: is_alpha_path ? true : false,
    allowed_user_types: false,
    logout_user_types: ["User"],
    header: true,
    footer: true,
  },
  {
    path: "/demo-leaderboard",
    element: <DemoLeaderBoard />,
    allowed_user_types: false,
    logout_user_types: ["User"],
    header: true,
    footer: true,
  },
  {
    path: "/pricing",
    element: <Pricing />,
    is_alpha_path: false,
    allowed_user_types: false,
    logout_user_types: ["User"],
    header: true,
    footer: true,
  },
  {
    path: "/pricing-success",
    element: <Success />,
    allowed_user_types: false,
    logout_user_types: ["User"],
    header: true,
    footer: true,
  },
  {
    path: "/my-account",
    element: <MyAccount />,
    allowed_user_types: ["User"],
    logout_user_types: ["User"],
    header: true,
    footer: true,
    header_allowed_tabs: ["?tab=billing-subscribtion", "?tab=account-setting"],
    footer_allowed_tabs: ["?tab=billing-subscribtion", "?tab=account-setting"],
  },
  {
    path: "/change-plan",
    element: <ChangePlan />,
    allowed_user_types: ["User"],
    logout_user_types: ["User"],
    header: true,
    footer: true,
  },
  {
    path: "/failed-view",
    element: <FailedView />,
    allowed_user_types: false,
    logout_user_types: ["User"],
    header: true,
    footer: true,
  },
  {
    path: "/change-payment-method",
    element: <ChangePaymentMethod />,
    allowed_user_types: false,
    logout_user_types: ["User"],
    header: true,
    footer: true,
    header_allowed_tabs: [
      "?tab=change-payment-method&status=failed",
      "?tab=change-payment-method&status=success",
    ],
    footer_allowed_tabs: [
      "?tab=change-payment-method&status=failed",
      "?tab=change-payment-method&status=success",
    ],
  },
  {
    path: "/account-setup",
    element: <AccountSetup />,
    allowed_user_types: false,
    logout_user_types: ["User"],
    header: true,
    footer: true,
  },
  {
    path: "/community-profile",
    element: <CommunityProfileSetting />,
    allowed_user_types: false,
    logout_user_types: ["User"],
    header: true,
    footer: true,
  },
  {
    path: "/select-winners",
    element: <AddWinners />,
    allowed_user_types: ["Admin"],
    logout_user_types: ["Admin"],
    header: true,
    footer: false,
    header_allowed_tabs: [],
    footer_allowed_tabs: [],
  },
  {
    path: "/jackpot-raffle",
    element: <JackpotRaffle />,
    allowed_user_types: ["Admin"],
    logout_user_types: ["Admin"],
    header: true,
    footer: false,
  },
  {
    path: "/ungraded-mission",
    element: <UngradedMission />,
    allowed_user_types: ["Admin"],
    logout_user_types: ["Admin"],
    header: true,
    footer: false,
  },
  {
    path: "/graded-mission",
    element: <GradedMission />,
    allowed_user_types: ["Admin"],
    logout_user_types: ["Admin"],
    header: true,
    footer: false,
  },
  {
    path: "/announcement-table",
    element: <AnnouncementTable />,
    allowed_user_types: false,
    logout_user_types: ["User"],
    header: true,
    footer: false,
  },
  {
    path: "/announcement-video",
    element: <AnnouncementVideo />,
    allowed_user_types: false,
    header: false,
    footer: false,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
    allowed_user_types: false,
    header: false,
    footer: false,
  },
  {
    path: "/terms-of-use",
    element: <TermsOfUse hideNavbar={true} />,
    allowed_user_types: false,
    header: false,
    footer: false,
  },
  {
    path: "/sweepstakes-terms",
    element: <SweepStakes />,
    allowed_user_types: false,
    header: false,
    footer: false,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    allowed_user_types: false,
    header: true,
    footer: false,
    header_allowed_tabs: [
      "?tab=sign-up&status=success",
      "?tab=sign-up&status=failed",
      "?tab=referrelcode",
      "?tab=choose-plan",
      "?tab=choose-payment-method",
    ],
    footer_allowed_tabs: [
      "?tab=sign-up&status=success",
      "?tab=sign-up&status=failed",
      "?tab=choose-plan",
      "?tab=choose-payment-method",
    ],
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    allowed_user_types: false,
    header: false,
    footer: false,
  },
  {
    path: "/set-new-password",
    element: <NewPassword />,
    allowed_user_types: false,
    header: true,
    footer: true,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
    allowed_user_types: ["Admin"],
    logout_user_types: ["Admin"],
    header: true,
    footer: false,
  },
  {
    path: "/admin-sign-in",
    element: <AdminSignIn />,
    allowed_user_types: false,
    header: true,
    footer: false,
  },
  {
    path: "/choose-payment-method",
    element: <ChoosePaymentMethod />,
    allowed_user_types: false,
    logout_user_types: ["User"],
    header: true,
    footer: true,
    header_allowed_tabs: [
      "?tab=change-payment-method&status=failed",
      "?tab=change-payment-method&status=success",
    ],
    footer_allowed_tabs: [
      "?tab=change-payment-method&status=failed",
      "?tab=change-payment-method&status=success",
    ],
  },
  {
    path: "/",
    element: <AlphaHome />,
    allowed_user_types: false,
    is_alpha_path: true,
    header: true,
    footer: true,
    header_allowed_tabs: [],
    footer_allowed_tabs: [],
  },
  {
    path: "/leaderboard",
    element: <AlphaLeaderBoard />,
    allowed_user_types: false,
    is_alpha_path: true,
    header: true,
    footer: true,
    header_allowed_tabs: [],
    footer_allowed_tabs: [],
  },
  {
    path: "/demo",
    element: <AlphaPricing />,
    allowed_user_types: false,
    is_alpha_path: true,
    header: true,
    footer: true,
  },
  {
    path: "/demo-success",
    element: <AlphaSuccess />,
    allowed_user_types: false,
    is_alpha_path: true,
    header: true,
    footer: true,
  },
  {
    path: "/alpha-setting",
    element: <AlphaSetting />,
    allowed_user_types: false,
    is_alpha_path: true,
    header: true,
    footer: false,
  },
  {
    path: "/alpha-landingpage",
    element: <AlphaLandingPage />,
    allowed_user_types: false,
    is_alpha_path: true,
    header: true,
    footer: true,
  },
  {
    path: "/server-error",
    element: <ServerError />,
    allowed_user_types: false,
    header: true,
    footer: true,
    header_allowed_tabs: [],
    footer_allowed_tabs: [],
  },
  {
    path: "*",
    element: <NotFound />,
    allowed_user_types: false,
    header: false,
    footer: false,
    header_allowed_tabs: [],
    footer_allowed_tabs: [],
  },
];

const AuthContext = React.createContext({
  isUserLoggedIn: null,
  isAdminLoggedIn: null,
  userData: {},
  isLoading: null,
  setIsLoading: () => {},
  onLogout: () => {},
  onLogin: (data) => {},
  onLoginError: (error) => {},
  onUserInput: (id, value) => {},
  onUserInputBlur: (id) => {},
  updateToken: () => {},
  handleUnAuthorizedError: () => {},
  navigateServerErrorPage: () => {},
});

const updateTokenRestrictedPaths = [
  "/sign-in",
  "/admin-sign-in",
  "/sign-up",
  "/alpha-home",
  "/demo",
  "/leaderboard",
  "/demo-success",
  "/alpha-setting",
  "/alpha-landingpage",
];
const intervalTime = 1000 * 3595;

export const AuthContextProvider = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isUserLogoutPath = pathList
    .filter(
      (each) =>
        each.logout_user_types && each.logout_user_types.includes("User")
    )
    .map((each) => each.path)
    .includes(location.pathname);
  const isAdminAllowedPath = pathList
    .filter(
      (each) =>
        each.allowed_user_types && each.allowed_user_types.includes("Admin")
    )
    .map((each) => each.path)
    .includes(location.pathname);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(null);

  const [userData, setUserData] = useState({});
  const [adminData, setAdminData] = useState({});
  const [triggerUseEffect, setTriggerUseEffect] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleStorageDetection = () => {
    const AdminEmail = localStorage.getItem("AdminEmail");
    const AdminIds = localStorage.getItem("AdminIds");
    const AdminAccess = localStorage.getItem("AdminAccess");
    const AdminRefresh = localStorage.getItem("AdminRefresh");

    const userEmail = localStorage.getItem("userEmail");
    const userIds = localStorage.getItem("userIds");
    const userAccess = localStorage.getItem("userAccess");
    const userRefresh = localStorage.getItem("userRefresh");

    setAdminData((prevData) => ({
      ...prevData,
      email: AdminEmail,
      id: AdminIds,
      access: AdminAccess,
      refresh: AdminRefresh,
    }));
    setUserData((prevData) => ({
      ...prevData,
      email: userEmail,
      id: userIds,
      access: userAccess,
      refresh: userRefresh,
    }));

    const userStatus = userAccess ? true : false;
    const adminStatus = AdminAccess ? true : false;
    setIsUserLoggedIn(userStatus);
    setIsAdminLoggedIn(adminStatus);
  };

  const logoutHandler = () => {
    const keys = Object.keys(localStorage);
    if (isUserLogoutPath && keys.includes("userAccess")) {
      localStorage.removeItem("userAccess");
      localStorage.removeItem("userRefresh");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userIds");
      localStorage.removeItem("currPage");
      localStorage.removeItem("footerView");
      setUserData({});
      setIsUserLoggedIn(false);
      navigate("/");
      return;
    }
    if (isAdminAllowedPath && keys.includes("AdminAccess")) {
      localStorage.removeItem("AdminAccess");
      localStorage.removeItem("AdminRefresh");
      localStorage.removeItem("AdminEmail");
      localStorage.removeItem("AdminIds");
      setAdminData({});
      setIsAdminLoggedIn(false);
      navigate("/admin-sign-in");
    }
  };

  const loginHandler = (data) => {
    const { email, id, refresh, access, user_type } = data;

    if (user_type === "Admin" && location.pathname === "/admin-sign-in") {
      localStorage.setItem("AdminAccess", access);
      localStorage.setItem("AdminRefresh", refresh);
      localStorage.setItem("AdminEmail", email);
      localStorage.setItem("AdminIds", id);
      setAdminData({
        email,
        id,
        access,
        refresh,
        user_type,
      });
      setIsAdminLoggedIn(true);
    } else if (user_type === "User" && location.pathname !== "/admin-sign-in") {
      localStorage.setItem("userAccess", access);
      localStorage.setItem("userRefresh", refresh);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userIds", id);
      setUserData({
        email,
        id,
        access,
        refresh,
        user_type,
      });
      setIsUserLoggedIn(true);
    }
  };

  const loginApiCall = (data, callback, errorcallback) => {
    setIsLoading(true);
    HTTP.post("users/login/", data)
      .then((response) => {
        const { user_type } = response.data;
        const { pathname } = location;
        if (pathname !== "/admin-sign-in" && user_type === "User") {
          loginHandler(response.data);
        }
        if (pathname === "/admin-sign-in" && user_type === "Admin") {
          loginHandler(response.data);
        }
        if (callback) callback(response);
        setIsLoading(false);
      })
      .catch((err) => {
        if (errorcallback) errorcallback(err);
        setIsLoading(false);
      });
  };

  const toggleTriggerUseEffect = () => {
    setTriggerUseEffect((prevState) => !prevState);
  };

  const updateToken = async () => {
    const refresh = localStorage.getItem(
      isAdminAllowedPath ? "AdminRefresh" : "userRefresh"
    );
    if (refresh) {
      const refreshToken = {
        refresh,
      };
      const response = await HTTP.post("users/api/token/refresh/", refreshToken)
        .then((res) => res)
        .catch((err) => err);

      if (response && response.status === 200) {
        localStorage.setItem(
          isAdminAllowedPath ? "AdminAccess" : "userAccess",
          response.data.access
        );
        if (isAdminAllowedPath)
          setAdminData((prevData) => ({
            ...prevData,
            access: response.data.access,
          }));
        else
          setUserData((prevData) => ({
            ...prevData,
            access: response.data.access,
          }));

        toggleTriggerUseEffect();
      } else {
        if (!updateTokenRestrictedPaths.includes(location.pathname))
          logoutHandler();
      }
    } else {
      logoutHandler();
    }
  };

  const handleUnAuthorizedError = (err) => {
    if (err.response.status === 401) {
      updateToken();
    }
  };

  const navigateServerErrorPage = (status) => {
    if (status === 500) {
      navigate("/server-error");
    }
  };

  useEffect(() => {
    if (userData.refresh || adminData.refresh) {
      if (!updateTokenRestrictedPaths.includes(location.pathname)) {
        let interval = setInterval(() => {
          if (userData.refresh || adminData.refresh) {
            updateToken();
          }
        }, intervalTime);

        return () => clearInterval(interval);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.refresh, location.pathname, adminData.refresh]);

  useEffect(() => {
    handleStorageDetection();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        isAdminLoggedIn,
        userData,
        adminData,
        isLoading,
        setIsLoading,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        loginApiCall,
        updateToken,
        handleUnAuthorizedError,
        triggerUseEffect,
        navigateServerErrorPage,
      }}
    >
      {(Object.keys(userData).length > 0 ||
        Object.keys(adminData).length > 0) &&
        props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
