import React, { useState } from "react";
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

import MyTimer from "../Timer";
import { idSplit } from "../../Action";
import BackArrow from "../../assets/images/back-w.svg";
import Crown from "../../assets/images/annoncementCrown.svg";
import crownlogosm from "../../assets/images/crownlogo-sm.png";
import crownlogolg from "../../assets/images/crownlogo-lg.png";
import winnerVideo from "../../assets/videos/compressed_announcement.mp4";

export default function CalendarEvents({
  calendarEvents,
  fetchCalendarEvents,
}) {
  const [getTime, setGetTime] = useState({
    getSeconds: 0,
    getMinutes: 0,
    getHours: 0,
    getdays: 0,
  });
  const [showAnnouncementVideo, setShowAnnouncementVideo] = useState(false);

  const navigate = useNavigate();

  const navigateAnnouncementVideo = () => {
    navigate("/announcement-video");
  };

  const timerComponent = (
    <MyTimer
      expiryTimestamp={new Date(calendarEvents && calendarEvents?.event_time)}
      onExpire={
        fetchCalendarEvents
        // () => {
        //   console.log("onExpire");
        // }
      }
      showZeroTimer={
        calendarEvents && calendarEvents?.event_status === "completed"
      }
    />
  );

  const videoComponent = (
    <video autoPlay muted loop>
      <source
        src={
          calendarEvents && calendarEvents?.video
            ? calendarEvents && calendarEvents?.video
            : winnerVideo
        }
        type="video/mp4"
      />
    </video>
  );

  return (
    <>
      {!calendarEvents.event_status && (
        <div className="announcementVideo">
          {timerComponent}
          {videoComponent}
        </div>
      )}
      {((calendarEvents && calendarEvents?.event_status === "in-progress") ||
        showAnnouncementVideo) && (
        <div className="announcementVideo">
          {timerComponent}
          {videoComponent}
          {showAnnouncementVideo &&
            calendarEvents &&
            calendarEvents?.winner_list?.length > 0 && (
              <Typography>
                <button onClick={() => setShowAnnouncementVideo(false)}>
                  View Winners
                </button>
              </Typography>
            )}
        </div>
      )}
      {calendarEvents &&
        calendarEvents?.event_status === "completed" &&
        !showAnnouncementVideo && (
          <div className="announcementTable">
            {timerComponent}
            {!getTime && (
              <div
                className="backArrow"
                onClick={() => navigate("/leaderboard")}
              >
                <img src={BackArrow} alt="" />
                Back
              </div>
            )}
            <div className={getTime ? "videoplay" : "previousWinners"}>
              <Card>
                <TableContainer>
                  <Table>
                    {!getTime && (
                      <TableHead>
                        <TableRow>
                          <TableCell>DECEMBER 22,2022</TableCell>
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
                      {calendarEvents &&
                        calendarEvents?.winner_list?.map((winner) => {
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
                  {getTime && (
                    <button onClick={() => setShowAnnouncementVideo(true)}>
                      Replay Video
                    </button>
                  )}
                </Typography>
              </Card>
            </div>
          </div>
        )}
      {calendarEvents && calendarEvents?.event_status === "upcoming" && (
        <div className="timer">
          <div>
            <img src={crownlogosm} alt="crown" />
            <h5>JACKPOT SIZE</h5>
            <h2>{calendarEvents?.prize_money?.toLocaleString()} USDC</h2>
          </div>
          <div>
            <img src={crownlogolg} alt="crown" />
            <h5>NEXT DRAWING</h5>
            {timerComponent}
          </div>
          <div>
            <img src={crownlogosm} alt="crown" />
            <h5>NUMBER OF WINNERS</h5>
            <h2>{calendarEvents?.no_of_winners}</h2>
          </div>
        </div>
      )}
    </>
  );
}
