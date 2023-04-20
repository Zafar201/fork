import React, { useContext, useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
  Link,
  useSearchParams,
} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import closeIcon from "../../assets/images/closeBTN.svg";
import LogoImg from "../../assets/images/logo.png";
import LogoImgSm from "../../assets/images/logo-sm.png";
import Icon1 from "../../assets/images/icon-1.svg";
import Icon2 from "../../assets/images/icon-2.svg";
import toggleButton from "../../assets/images/toggleBtn.svg";
import ModalComponent from "../Modal";
import SignIn from "../../Authentication/Sign in";
import ForgotPassword from "../../Authentication/Forgot password";
import NewPassword from "../../Authentication/Set New Password";
import { forgotPassworddTokenVerificationApiCall } from "../../ApiCalls";
import AuthContext, { is_alpha_path } from "../Store/Auth-context";

export default function Header() {
  //Values from AuthContext
  const { isUserLoggedIn, onLogout, isAdminLoggedIn, navigateServerErrorPage } =
    useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(false);
  const [menuClose, setMenuClose] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [focusMenu, setFocusMenu] = useState("Home");
  const [signInPage, setSignInPage] = useState("sign-in");
  const [keyPress, setKeyPress] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsPage = searchParams.get("tab");
  const searchParamsToken = searchParams.get("token");

  const matches = useMediaQuery("(min-width:1023px)");
  const navigate = useNavigate();
  const location = useLocation();

  const menu = ["Home", "Leaderboard", "Whitepaper", "Pricing", "Sign in"];
  const alphaMainMenu = ["Home", "Alpha", "Whitepaper", "Demo"];
  const AdminMenu = ["Settings", "Sign out"];
  const menus = is_alpha_path
    ? location.pathname === "/ungraded-mission"
      ? AdminMenu
      : alphaMainMenu
    : location.pathname === "/ungraded-mission"
    ? AdminMenu
    : menu;

  const handleMenuClick = () => {
    setMenuClose(!menuClose);
    setAnchorEl(!anchorEl);
  };

  const handleMenuClose = () => {
    setAnchorEl(false);
    setMenuClose(false);
  };

  const handleModalOpen = () => {
    if (!isUserLoggedIn) {
      localStorage.removeItem("paymentMethod");
      localStorage.removeItem("changePlan");
      setModalOpen(true);
    } else {
      onLogout();
      setModalOpen(true);
      setSignInPage("sign-in");
    }
  };

  const openSignInModal = () => {
    if (!keyPress) {
      handleModalOpen();
    } else {
      setModalOpen(false);
    }
    setKeyPress(false);
  };

  useEffect(() => {
    if (location.pathname !== "/change-payment-method") {
      localStorage.removeItem("payment");
    }
    if (location.pathname !== "/sign-up") {
      localStorage.removeItem("paymentMethod");
      localStorage.removeItem("footerView");
    }
    if (location.pathname !== "/leaderboard") {
      localStorage.removeItem("currPage");
      localStorage.removeItem("count");
      localStorage.removeItem("pageLength");
    }
    if (
      location.pathname !== "/change-payment-method" &&
      location.pathname !== "/sign-up" &&
      location.pathname !== "/change-plan"
    ) {
      localStorage.removeItem("price_plan");
      localStorage.removeItem("price_plan_details");
    }
  }, [location]);

  const handleModalClose = () => {
    switch (location.pathname) {
      case "/":
        setFocusMenu("Home");
        break;
      case "/leaderboard":
        setFocusMenu("Leaderboard");
        break;
      case "/pricing":
        setFocusMenu("Pricing");
        break;
      case "/sign-in":
        setFocusMenu("Sign in");
        break;
      default:
        break;
    }
    setModalOpen(false);
  };

  useEffect(() => {
    if (!modalOpen) {
      setTimeout(() => {
        setSignInPage("sign-in");
      }, 500);
    }
  }, [modalOpen]);

  const handleNavigateHome = () => {
    navigate("/");
    setFocusMenu("Home");
    setAnchorEl(false);
    setMenuClose(false);
  };

  const handleClick = (menu) => {
    switch (menu) {
      case "Home":
        setFocusMenu("Home");
        navigate("/");
        break;
      case "Leaderboard":
        setFocusMenu("Leaderboard");
        navigate("/leaderboard");
        break;
      case "Pricing":
        if (!isUserLoggedIn) {
          setFocusMenu("Pricing");
          navigate("/pricing");
        } else {
          setFocusMenu("Pricing");
          navigate("/my-account");
        }
        break;
      case "Demo":
        if (!isUserLoggedIn) {
          setFocusMenu("Demo");
          navigate("/demo");
        }
        break;
      case "Whitepaper":
        setFocusMenu("Whitepaper");
        window.location.href = "https://docs.getjackpot.xyz/whitepaper";
        break;
      case "Alpha":
        if (!isUserLoggedIn) {
          setFocusMenu("Alpha");
          navigate("/leaderboard");
        }
        break;
      case "Sign in":
        if (!isUserLoggedIn) {
          setFocusMenu("Sign in");
          setModalOpen(true);
        } else {
          onLogout();
        }
        break;
      case "Settings":
        navigate("/admin-dashboard");
        break;
      case "Sign out":
        navigate("/");
        break;
      case "Add to Server":
        setFocusMenu("Add to Server");
        break;
      default:
        break;
    }
    handleMenuClose();
    setMenuClose(false);
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setFocusMenu("Home");
        break;
      case "/leaderboard":
        if (!is_alpha_path) {
          setFocusMenu("Leaderboard");
        } else if (is_alpha_path) {
          setFocusMenu("Alpha");
        }
        break;
      case "/pricing":
        setFocusMenu("Pricing");
        break;
      case "/my-account":
        setFocusMenu("Pricing");
        break;
      // case "/":
      //   setFocusMenu("Home");
      //   break;
      // case "/leaderboard":
      //   setFocusMenu("Alpha");
      //   break;
      case "/demo":
        setFocusMenu("Demo");
        break;
      default:
        break;
    }
  }, [location.pathname]);

  const signInModal = () => {
    switch (signInPage) {
      case "sign-in":
        return (
          <SignIn setSignInPage={setSignInPage} setModalOpen={setModalOpen} />
        );
      case "forgot-password":
        return (
          <ForgotPassword
            setSignInPage={setSignInPage}
            setModalOpen={setModalOpen}
          />
        );
      case "set-new-password":
        return (
          <NewPassword
            setSignInPage={setSignInPage}
            setModalOpen={setModalOpen}
          />
        );
      default:
        return "";
    }
  };

  useEffect(() => {
    if (searchParamsPage === "set-new-password") {
      if (searchParamsToken) {
        if (searchParamsToken !== null) {
          localStorage.setItem("searchParamsToken", searchParamsToken);
        }
        const data = {
          token: searchParamsToken,
        };
        forgotPassworddTokenVerificationApiCall(
          searchParamsToken,
          data,
          (res) => {
            setModalOpen(true);
            setSignInPage("set-new-password");
          },
          (err) => {
            navigateServerErrorPage(err?.response?.status);
          }
        );
      }
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    signInModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInPage]);

  const myAccountButton = [
    "/change-plan",
    "/my-account",
    "/change-payment-method",
  ].includes(location.pathname);

  const desktopNavHideLocation = ![
    "/sign-up",
    "/choose-payment-method",
    "/signup-billing-address",
    "/account-setup",
    "/community-profile",
    "/select-server",
    "/demo-success",
    "/admin-sign-in",
    "/ungraded-mission",
    "/graded-mission",
    "/admin-dashboard",
    "/jackpot-raffle",
    "/select-winners",
    "/failed-view",
    "/alpha-setting",
    "/server-error",
  ].includes(location.pathname);

  const mobileNavHideLocation = ![
    "/sign-up",
    "/choose-payment-method",
    "/signup-billing-address",
    "/account-setup",
    "/community-profile",
    "/select-server",
    "/demo-success",
    "/admin-sign-in",
    "/graded-mission",
    "/admin-dashboard",
    "/jackpot-raffle",
    "/select-winners",
    "/failed-view",
    "/alpha-setting",
    "/server-error",
  ].includes(location.pathname);

  const adminSection = [
    "/admin-dashboard",
    "/ungraded-mission",
    "/jackpot-raffle",
    "/select-winners",
    "/alpha-setting",
  ].includes(location.pathname);

  const navBarHideSearch = ![
    "?tab=change-payment-method&status=failed",
  ].includes(location.search);

  const leaderBoardSelected = [
    "/leaderboard",
    "/demo-leaderboard",
    // "/leaderboard",
  ].includes(location.pathname);

  const logoutAdmin = () => {
    onLogout();
  };

  const navigateWhitePaperPage = () => {
    window.location.href = "https://docs.getjackpot.xyz/whitepaper";
  };

  const handleNavigateAdminDashBoard = () => {
    navigate("/admin-dashboard");
  };

  const desktopNavBarHide = desktopNavHideLocation && navBarHideSearch;
  const mobileNavBarHide = mobileNavHideLocation && navBarHideSearch;

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          {matches ? (
            <Toolbar>
              <nav className="brand" onClick={() => navigate("/")}>
                <img className="lg-logo" src={LogoImg} alt="Jackpot" />
                <img src={LogoImgSm} className="sm-logo" alt="Jackpot" />
              </nav>
              {desktopNavBarHide && (
                <>
                  {isUserLoggedIn ? (
                    <ul>
                      <li className={leaderBoardSelected && "selected"}>
                        <Link to={"/leaderboard"}>
                          {is_alpha_path ? "Alpha" : "Leaderboard"}
                        </Link>
                      </li>
                      <li>
                        <Link onClick={navigateWhitePaperPage}>Whitepaper</Link>
                      </li>
                      <li
                        className={
                          isUserLoggedIn
                            ? location.pathname === "/my-account" && "selected"
                            : !is_alpha_path
                            ? location.pathname === "/pricing" && "selected"
                            : location.pathname === "/demo" && "selected"
                        }
                      >
                        <Link
                          to={
                            isUserLoggedIn
                              ? "/my-account?tab=account-setting"
                              : !is_alpha_path
                              ? "/pricing"
                              : "/demo"
                          }
                        >
                          {isUserLoggedIn
                            ? "My Account"
                            : !is_alpha_path
                            ? "Pricing"
                            : "Demo"}
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li className={leaderBoardSelected && "selected"}>
                        <Link to={"/leaderboard"}>
                          {is_alpha_path ? "Alpha" : "Leaderboard"}
                        </Link>
                      </li>
                      <li
                        className={
                          (location.pathname === "/pricing" && "selected") ||
                          (location.pathname === "/demo" && "selected")
                        }
                      >
                        <Link
                          to={
                            isUserLoggedIn
                              ? "/my-account"
                              : !is_alpha_path
                              ? "/pricing"
                              : "/demo"
                          }
                        >
                          {isUserLoggedIn
                            ? "My Account"
                            : !is_alpha_path
                            ? "Pricing"
                            : "Demo"}
                        </Link>
                      </li>
                      <li>
                        <Link onClick={navigateWhitePaperPage}>Whitepaper</Link>
                      </li>
                    </ul>
                  )}
                  <nav className="navBtns">
                    <a
                      // target="_blank"
                      href="https://discord.gg/kbNgQz8N2E"
                      rel="noreferrer"
                    >
                      <img src={Icon1} alt="icon1" />
                    </a>
                    <a
                      // target="_blank"
                      href="https://twitter.com/jackpotxyz"
                      rel="noreferrer"
                    >
                      <img src={Icon2} alt="icon1" />
                    </a>
                    {!is_alpha_path && (
                      <>
                        {myAccountButton ? (
                          <button
                            color="inherit"
                            className={isUserLoggedIn ? "MyactBtn" : "darkBtn"}
                            onClick={openSignInModal}
                            onKeyDown={() => setKeyPress(true)}
                          >
                            {!isUserLoggedIn ? "Sign in" : "Sign out"}
                          </button>
                        ) : (
                          <button
                            color="inherit"
                            className={isUserLoggedIn ? "darkBtn" : "whiteBtn"}
                            onClick={openSignInModal}
                            onKeyDown={() => setKeyPress(true)}
                          >
                            {!isUserLoggedIn ? "Sign in" : "Sign out"}
                          </button>
                        )}
                      </>
                    )}

                    {!is_alpha_path && !isUserLoggedIn ? (
                      <Link to="/pricing" className="yellowBtn">
                        Add to Server
                      </Link>
                    ) : (
                      ""
                    )}
                  </nav>
                </>
              )}
              {location.pathname === "/ungraded-mission" && (
                <>
                  {adminSection && isAdminLoggedIn && (
                    <nav className="navBtns">
                      <button
                        color="inherit"
                        className={isAdminLoggedIn ? "SettingBtn" : "whiteBtn"}
                        onClick={handleNavigateAdminDashBoard}
                      >
                        Settings
                      </button>
                      <button
                        color="inherit"
                        className={isAdminLoggedIn ? "MyactBtn" : "whiteBtn"}
                        onClick={logoutAdmin}
                      >
                        Sign out
                      </button>
                    </nav>
                  )}
                </>
              )}
            </Toolbar>
          ) : (
            <Toolbar>
              <nav className="brand">
                <img src={LogoImg} alt="Jackpot" onClick={handleNavigateHome} />
              </nav>
              {mobileNavBarHide && (
                <>
                  <IconButton onClick={handleMenuClick}>
                    <img
                      src={menuClose ? closeIcon : toggleButton}
                      alt="toggle"
                    />
                  </IconButton>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    className="menuPop"
                    anchorEl={anchorEl}
                    open={anchorEl}
                    onClose={handleMenuClose}
                    defaultValue={"Leaderboard"}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    {menus.map((el) => (
                      <MenuItem
                        key={el}
                        onClick={() => handleClick(el)}
                        value={el}
                        style={{
                          color: focusMenu === el ? "#FFD705" : "white",
                        }}
                      >
                        {!isUserLoggedIn
                          ? el
                          : el
                              .replace("Sign in", "Log out")
                              .replace("Pricing", "My Account")}
                      </MenuItem>
                    ))}
                    {!matches &&
                      location.pathname !== "/ungraded-mission" &&
                      !is_alpha_path &&
                      !isUserLoggedIn && (
                        <MenuItem>
                          <Link
                            to="/pricing"
                            onClick={handleMenuClose}
                            className="yellowBtn"
                          >
                            Add to Server
                          </Link>
                        </MenuItem>
                      )}
                    {location.pathname !== "/ungraded-mission" && (
                      <>
                        <a
                          // target="_blank"
                          href="https://discord.gg/kbNgQz8N2E"
                          rel="noreferrer"
                        >
                          <img src={Icon1} alt="icon1" />
                        </a>
                        <a
                          // target="_blank"
                          href="https://twitter.com/jackpotxyz"
                          rel="noreferrer"
                        >
                          <img src={Icon2} alt="icon2" />
                        </a>
                      </>
                    )}
                  </Menu>
                </>
              )}
            </Toolbar>
          )}
        </AppBar>
      </Box>
      <ModalComponent
        modalOpen={modalOpen}
        handleClose={handleModalClose}
        modalValue={signInModal()}
        className={"signBox"}
      />
    </>
  );
}
