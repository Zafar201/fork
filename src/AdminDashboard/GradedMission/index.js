import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Card,
  Divider,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import "./grade.css";
import BackArrow from "../../assets/images/back-w.svg";
import maximize from "../../assets/images/maximize.svg";
import Ticket from "../../assets/images/1f39f1.png";
import {
  ungardeMissionAccessApiCall,
  ungrageMissionApiCallById,
} from "../../ApiCalls";
import AuthContext from "../../Components/Store/Auth-context";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
import LoadingOverlay from "../../Components/LoadingOverlay";

function GradedMission() {
  //Values from AuthContext
  const { adminData, handleUnAuthorizedError, navigateServerErrorPage } =
    useContext(AuthContext);

  const [view, setView] = useState(true);
  const [data, setData] = useState("");
  const [initialLoading, setInitialLoading] = useState(false);
  const [awardLoading, setAwardLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [response, setResponse] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const { id } = location.state;
  const inputRef = useRef({});

  const adminToken = adminData?.access;
  const header = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const navigate = useNavigate();
  const handleChange = () => {
    setView(false);
    setSuccess("");
    setErrorMessage("");
  };

  const handleStore = () => {
    if (data.details === "" || data.details === undefined) {
      inputRef.current.details.focus();
    } else {
      setData(data);
      apiCall();
    }
  };

  const handleNavigatePreviouspage = () => {
    if (view) {
      setErrorMessage("");
      navigate("/ungraded-mission");
    } else {
      setErrorMessage("");
      setView(true);
    }
  };

  useEffect(() => {
    setInitialLoading(true);
    ungrageMissionApiCallById(
      header,
      id,
      (res) => {
        setResponse(res.data.results);
        setInitialLoading(false);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        setInitialLoading(false);
        handleUnAuthorizedError(err);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apiCall = () => {
    setAwardLoading(true);
    setSuccess("");
    setErrorMessage("");
    ungardeMissionAccessApiCall(
      id,
      data.details,
      header,
      (res) => {
        setAwardLoading(false);
        setSuccess(res.data.mes);
        setTimeout(() => {
          navigate("/ungraded-mission");
        }, 1000);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        handleUnAuthorizedError(err);
        // if (err.response.status === 500) {
        //   setErrorMessage("Internal Server Error");
        // }
        setAwardLoading(false);
      }
    );
  };

  return (
    <>
      {initialLoading && <LoadingOverlay />}
      <div className="grade">
        <div className="backArrow" onClick={handleNavigatePreviouspage}>
          <span>
            <img src={BackArrow} alt="backArrow" />
            Back
          </span>
        </div>
        {view ? (
          <>
            <Card className="gradeBox">
              {response && (
                <>
                  <Typography variant="h4">Grade Quest</Typography>

                  <Divider />

                  <Typography variant="subtitle1">Quest Name:</Typography>
                  <Typography>{response.mission_name}</Typography>

                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">Submitted by:</Typography>

                      <Toolbar>
                        <Avatar src={response.member_pfp_link} />
                        <Typography title={response.user_id}>
                          {response.user_id}
                        </Typography>
                      </Toolbar>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">Community:</Typography>
                      <Toolbar>
                        <Avatar src={response.server_pfp_link} />
                        <Typography>{response.community}</Typography>
                      </Toolbar>
                    </Grid>
                  </Grid>

                  <Typography variant="subtitle1">
                    Submission Details:
                  </Typography>
                  <Typography>
                    {response.mission_discription}
                    <img src={maximize} alt="maximize" />
                  </Typography>
                  <Typography>{success && success}</Typography>
                  <p style={{ color: "red" }}>{errorMessage && errorMessage}</p>
                  <button
                    className="AwardBtn"
                    onClick={apiCall}
                    disabled={awardLoading}
                  >
                    {awardLoading ? (
                      <LoadingSpinner />
                    ) : (
                      `Award ${response.mission_xp} XP`
                    )}

                    {awardLoading ? "" : <img src={Ticket} alt="ticket" />}
                  </button>

                  <button
                    className="DenyBtn"
                    onClick={handleChange}
                    disabled={awardLoading}
                  >
                    Deny Submission
                  </button>
                </>
              )}
            </Card>
          </>
        ) : (
          <div className="DenyBox">
            <Card>
              <Typography variant="h4">Deny Submission</Typography>

              <Divider />

              <Typography>Reason for denial</Typography>
              <TextField
                label="Enter details"
                multiline
                rows={4}
                variant="outlined"
                name="details"
                type="text"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                inputRef={(el) => (inputRef.current.details = el)}
              />
              <Typography>{success && success}</Typography>
              <p style={{ color: "red" }}>{errorMessage && errorMessage}</p>
              <button
                className="DenyBtn"
                onClick={handleStore}
                disabled={awardLoading}
              >
                {awardLoading ? <LoadingSpinner /> : `Deny Submission`}
              </button>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
export default GradedMission;
