import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  CardActions,
  Stack,
  Typography,
  Button,
  Box,
  Paper,
  MobileStepper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import "./server.css";
import BackArrow from "../../../assets/images/back-w.svg";

const server = [
  {
    server_name: "Harkness",
    server_img: "",
  },
  {
    server_name: "XLR8",
    server_img: "",
  },
  {
    server_name: "cryptobreaky's server",
    server_img: "",
  },
];
export default function SelectServer() {
  const [filterView, setFilterView] = useState(false);
  const [serverName, setServerName] = useState("");
  const [activeStep, setActiveStep] = React.useState(0);

  const theme = useTheme();
  const maxSteps = server.length;
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:768px)");

  const handleClick = (name) => {
    setFilterView(true);
    setServerName(name);
  };

  const handleNavigateMyAccount = () => {
    navigate("/my-account");
  };

  const handleNavigatePreviouspage = () => {
    if (filterView === false) {
      navigate("/account-setup");
    } else {
      setFilterView(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const serverSlider = (
    <div>
      {filterView ? (
        <div className="serverBox1">
          <Box>
            <Typography variant="h5">Please confirm your selection.</Typography>
            <Typography>
              After confirming, you will not be able to
              <br /> change your selection.
            </Typography>
            <Avatar src="Harkness" alt="Harkness" />
            <Typography>{serverName}</Typography>
            <Typography>Owner</Typography>

            <Button variant="contained" onClick={handleNavigateMyAccount}>
              Confirm Selection
            </Button>
          </Box>
        </div>
      ) : (
        <div className="serverBox">
          <Typography variant="h5">Select a Server</Typography>
          <Paper elevation={0} className="serverSlider">
            <Avatar src={server[activeStep].server_img} />
            <Typography>{server[activeStep].server_name}</Typography>
            <Typography>Owner</Typography>
            <button
              color="inherit"
              className="yBtn"
              onClick={() => handleClick(server[activeStep].server_name)}
            >
              Select
            </button>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                </Button>
              }
            />
          </Paper>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="backArrow" onClick={handleNavigatePreviouspage}>
        <img src={BackArrow} />
        Back
      </div>
      {!matches ? (
        serverSlider
      ) : (
        <>
          {filterView ? (
            <div className="serverBox1">
              <Box>
                <Typography variant="h5">
                  Please confirm your selection.
                </Typography>
                <Typography>
                  After confirming, you will not be able to
                  <br /> change your selection.
                </Typography>
                <Avatar src="Harkness" alt="Harkness" />
                <Typography>{serverName}</Typography>
                <Typography>Owner</Typography>

                <Button variant="contained" onClick={handleNavigateMyAccount}>
                  Confirm Selection
                </Button>
              </Box>
            </div>
          ) : (
            <div className="serverBox">
              <Typography variant="h5">Select a Server</Typography>
              <Stack direction="row">
                {server.map((detail) => {
                  return (
                    <div className="serverList">
                      <Avatar src={detail.server_img} />
                      <CardActions>
                        <Typography variant="h6">
                          {detail.server_name}
                        </Typography>
                      </CardActions>
                      <CardActions>
                        <Typography>Owner</Typography>
                      </CardActions>
                      <CardActions>
                        <Button onClick={() => handleClick(detail.server_name)}>
                          Select
                        </Button>
                      </CardActions>
                    </div>
                  );
                })}
              </Stack>
            </div>
          )}
        </>
      )}
    </>
  );
}
