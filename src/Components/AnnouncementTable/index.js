import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TableBody,
  TableHead,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

import BackArrow from "../../assets/images/back-w.svg";
import Crown from "../../assets/images/annoncementCrown.svg";
import {
  getPreviousWinnerListApiCall,
  fetchCalendarEvents,
} from "../../ApiCalls/index";
import { idSplit } from "../../Action";
import LoadingOverlay from "../LoadingOverlay";
import AuthContext from "../Store/Auth-context";

function AnnouncementTable({ getTime }) {
  const { navigateServerErrorPage } = useContext(AuthContext);
  const [winnerList, setWinnerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const navigateAnnouncementVideo = () => {
    navigate("/announcement-video");
  };

  const WinnerList = (data) => {
    getPreviousWinnerListApiCall(
      data,
      (response) => {
        setWinnerList(response?.data);
        setLoading(false);
      },
      (error) => {
        navigateServerErrorPage(error?.response?.status);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    fetchCalendarEvents(
      (response) => {
        WinnerList(response?.data?.completed_event);
      },
      (error) => {
        navigateServerErrorPage(error?.response?.status);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <LoadingOverlay />}
      {!getTime && (
        <div className="backArrow" onClick={() => navigate("/leaderboard")}>
          <img src={BackArrow} alt="backArrow" />
          Back
        </div>
      )}
      {winnerList?.date && (
        <div className={getTime ? "videoplay" : "previousWinners"}>
          <Card>
            <TableContainer>
              <Table>
                {!getTime && (
                  <TableHead>
                    <TableRow>
                      <TableCell>{winnerList?.date?.toUpperCase()}</TableCell>
                      <TableCell colspan="2">
                        <Button
                          variant="contained"
                          onClick={navigateAnnouncementVideo}
                        >
                          Watch Announcement Video
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                )}
                <TableBody>
                  {winnerList?.winners?.map((winner) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>
                            <img src={Crown} alt="Jackpot" />
                            <b>{idSplit(winner?.name)}</b>
                            {winner?.code}
                          </TableCell>
                          <TableCell>{`${winner?.prize_amount?.toLocaleString()} USDC`}</TableCell>
                          <TableCell>
                            <a
                              href={winner?.etherscan_url}
                              // target="_blank"
                              rel="noreferrer"
                            >
                              Transaction
                            </a>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography>
              {getTime && <Link to="/">Replay Video</Link>}
            </Typography>
          </Card>
        </div>
      )}
    </>
  );
}

AnnouncementTable.propTypes = {
  getTime: PropTypes.any,
};
export default AnnouncementTable;
