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
import ModalComponent from "../../Components/MedalPop";
import SignIn from "../../Authentication/Sign in";
import ForgotPassword from "../../Authentication/Forgot password";
import NewPassword from "../../Authentication/Set New Password";
import { forgotPassworddTokenVerificationApiCall } from "../../ApiCalls";
import AuthContext from "../../Components/Store/Auth-context";

const menu = [
  "Home",
  "Leaderboard",
  "Whitepaper",
  "Pricing",
  "Sign in",
  "Add to Server",
];
export default function AlphaHeader() {
  //Values from AuthContext
  const { isUserLoggedIn, onLogout } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(false);
  const [menuClose, setMenuClose] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [focusMenu, setFocusMenu] = useState("Home");
  const [signInPage, setSignInPage] = useState("sign-in");

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsPage = searchParams.get("tab");
  const searchParamsToken = searchParams.get("token");

  const matches = useMediaQuery("(min-width:1023px)");
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = () => {
    setMenuClose(!menuClose);
    setAnchorEl(!anchorEl);
  };

  const handleMenuClose = () => {
    setAnchorEl(false);
    setMenuClose(false);
  };

  const handleModalClose = () => {
    setSignInPage("sign-in");
    switch (location.pathname) {
      case "/":
        setFocusMenu("Home");
        break;
      case "/alpha-landingpage":
        setFocusMenu("Alpha");
        break;
      case "/demo":
        setFocusMenu("Demo");
        break;
      case "/sign-in":
        setFocusMenu("Sign in");
        break;
      default:
        break;
    }
    setModalOpen(false);
  };

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
      case "Alpha":
        if (isUserLoggedIn) {
          setFocusMenu("Alpha");
          navigate("/alpha-landingpage");
        }
        break;
      case "Demo":
        if (isUserLoggedIn) {
          setFocusMenu("Demo");
          navigate("/demo");
        }
        break;
      case "Whitepaper":
        if (isUserLoggedIn) {
          setFocusMenu("Whitepaper");
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
      case "/alpha-landingpage":
        setFocusMenu("Alpha");
        break;
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
            // console.log(err);
          }
        );
      }
      navigate("/", { replace: true });
    }
  }, []);

  useEffect(() => {
    signInModal();
  }, [signInPage]);

  const navBarHideLocations = ![
    "/sign-up",
    "/choose-payment-method",
    "/signup-billing-address",
    "/account-setup",
    "/community-profile",
    "/select-server",
    "/demo-success",
    "/admin-sign-in",
    "/ungraded-mission",
    "/admin-dashboard",
    "/jackpot-raffle",
    "/select-winners",
    "/failed-view",
    "/change-payment-method",
  ].includes(location.pathname);

  const leaderBoardSelected = [
    "/alpha-landingpage",
    "/demo-leaderboard",
  ].includes(location.pathname);

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
              {navBarHideLocations && (
                <>
                  {isUserLoggedIn ? (
                    <ul>
                      <li className={leaderBoardSelected && "selected"}>
                        <Link to="/leaderboard">Alpha</Link>
                      </li>
                      <li>
                        <Link to="https://docs.getjackpot.xyz/whitepaper">
                          Whitepaper
                        </Link>
                      </li>
                      <li
                        className={
                          isUserLoggedIn
                            ? location.pathname === "/my-account" && "selected"
                            : location.pathname === "/pricing" && "selected"
                        }
                      >
                        <Link to={isUserLoggedIn ? "/my-account" : "/pricing"}>
                          {isUserLoggedIn ? "My Account" : "Pricing"}
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li className={leaderBoardSelected && "selected"}>
                        <Link to="/alpha-landingpage">Alpha</Link>
                      </li>
                      <li
                        className={location.pathname === "/demo" && "selected"}
                      >
                        <Link to={isUserLoggedIn ? "/my-account" : "/demo"}>
                          {isUserLoggedIn ? "Demo" : "Demo"}
                        </Link>
                      </li>
                      <li>
                        <Link to="https://docs.getjackpot.xyz/whitepaper">
                          Whitepaper
                        </Link>
                      </li>
                    </ul>
                  )}
                  <nav className="navBtns">
                    <a href="https://discord.gg/kbNgQz8N2E">
                      <img src={Icon1} />
                    </a>
                    <a href="https://twitter.com/jackpotxyz">
                      <img src={Icon2} />
                    </a>
                  </nav>
                </>
              )}
            </Toolbar>
          ) : (
            <Toolbar>
              <nav className="brand">
                <img src={LogoImg} alt="Jackpot" onClick={handleNavigateHome} />
              </nav>
              {navBarHideLocations && (
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
                    {menu.map((el) => (
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
                          : el.replace("Sign in", "Log out")}
                      </MenuItem>
                    ))}
                    <a href="https://discord.gg/kbNgQz8N2E">
                      <img src={Icon1} />
                    </a>
                    <a href="https://twitter.com/jackpotxyz">
                      <img src={Icon2} />
                    </a>
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
