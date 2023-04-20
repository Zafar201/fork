import React, { useState, useRef, useContext } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./CommunityPro.css";
import BackArrow from "../../../assets/images/back-w.svg";
import { communityProfileApiCall } from "../../../ApiCalls";
import AuthContext from "../../../Components/Store/Auth-context";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";

function CommunityProfileSetting() {
  const { navigateServerErrorPage } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [communityTwitterUrl, setCommunityTwitterUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState(true);
  const [imageError, setImageError] = useState(true);
  const [apiError, setApiError] = useState("");
  const [storeImg, setStoreImg] = useState("");
  const [view, setView] = useState(true);

  const inpRef = useRef({});
  const navigate = useNavigate();

  const twitterURL = new RegExp(
    /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
  );

  const uploadImg = (e) => {
    setImageError(true);
    setApiError("");
    setStoreImg(e.target.files[0]);
  };

  const editCommunityName = (e) => {
    setCommunityName(e.target.value);
  };

  const editTwitterUrl = (e) => {
    setCommunityTwitterUrl(e.target.value);
    setErrorMsg(true);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (storeImg === "") {
      setImageError(false);
    } else if (communityName === "") {
      inpRef.current.communityName.focus();
    } else if (
      communityTwitterUrl === "" ||
      twitterURL.test(communityTwitterUrl) === false
    ) {
      inpRef.current.communityTwitterUrl.focus();
      setErrorMsg(false);
    } else {
      let form_data = new FormData();
      form_data.append("profile", storeImg, storeImg.name);
      form_data.append("name", communityName);
      form_data.append("twitter_url", communityTwitterUrl);
      setIsLoading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      communityProfileApiCall(
        form_data,
        config,
        (response) => {
          setView(false);
          setIsLoading(false);
        },
        (error) => {
          navigateServerErrorPage(error?.response?.status);
          setApiError(error?.response?.data?.profile[0]);
          setIsLoading(false);
        }
      );
    }
  };

  const handleConnectToDiscard = () => {
    window.location.href =
      "https://discord.com/login?redirect_to=%2Foauth2%2Fauthorize%3Fclient_id%3D1037629320203616266%26permissions%3D8%26scope%3Dbot%2520applications.commands";
  };

  const handleNavigatePreviouspage = () => {
    if (view === true) {
      navigate("/account-setup");
    } else {
      setView(true);
    }
  };

  return (
    <div>
      <div className="backArrow" onClick={handleNavigatePreviouspage}>
        <span>
          <img src={BackArrow} alt="backArrow" />
          Back
        </span>
      </div>
      {view ? (
        <div className="CommunityProfile">
          <Card>
            <Box>
              <Typography variant="h3">Community Profile</Typography>
              <Typography variant="h6">
                This information will be displayed on the leaderboard.
              </Typography>
              <Divider />
              <Typography>
                Community Profile Picture:<span>*</span>
              </Typography>
              <Toolbar>
                <Avatar
                  alt="smile"
                  children=""
                  src={storeImg && URL.createObjectURL(storeImg)}
                />
                <Button variant="contained" component="label">
                  Upload File
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="file"
                    onChange={uploadImg}
                    inputRef={(ref) => (inpRef.current.image = ref)}
                    hidden
                  />
                </Button>

                {imageError ? (
                  ""
                ) : (
                  <Typography className="error">
                    Please add image <span>*</span>
                  </Typography>
                )}
                <Typography className="error">
                  {apiError && apiError}
                </Typography>
              </Toolbar>

              <form onSubmit={submitForm}>
                <Typography>
                  Community Name:<span>*</span>
                </Typography>
                <TextField
                  placeholder="Community Name"
                  name="communityName"
                  value={communityName}
                  onChange={(e) => editCommunityName(e)}
                  inputRef={(ref) => (inpRef.current.communityName = ref)}
                />
                <Typography>
                  Community Twitter URL: <span>*</span>
                </Typography>
                <TextField
                  placeholder="twitter.com/example/"
                  name="communityTwitterUrl"
                  value={communityTwitterUrl}
                  onChange={(e) => editTwitterUrl(e)}
                  inputRef={(ref) => (inpRef.current.communityTwitterUrl = ref)}
                />

                {errorMsg ? (
                  " "
                ) : (
                  <Typography className="error">
                    Must be a Twitter URL
                  </Typography>
                )}
                <button type="submit" className="yBtn" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner /> : "Continue"}
                </button>
              </form>
            </Box>
          </Card>
        </div>
      ) : (
        <div className="CommunityProfileFinish">
          <Card>
            <Box>
              <Typography variant="h3">Let's finish this up.</Typography>
              <Divider />
              <Typography variant="h6">
                It's time to add Jackpot to your Discord server. This
                <br /> should only take a minute.
              </Typography>
              <button className="yBtn" onClick={handleConnectToDiscard}>
                Connect to Discord
              </button>
            </Box>
          </Card>
        </div>
      )}
    </div>
  );
}
export default CommunityProfileSetting;
