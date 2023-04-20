import React from "react";
import { Card, Grid, Typography } from "@mui/material";

import "./alphalanding.css";

export default function AlphaLandingPage({ values }) {
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
      : Math.sign(num) * Math.abs(num);
  };

  const navigateDiscordPage = () => {
    window.location.href = "https://discord.gg/kbNgQz8N2E";
  };

  const navigateWhitepaper = () => {
    window.location.href = "https://docs.getjackpot.xyz/whitepaper";
  };

  return (
    <div className="AlphalandingPage">
      <Card className="landingPageBox">
        <Grid container rowSpacing={3}>
          <Grid item xs={6}>
            <h1>JACKPOT ALPHA</h1>
            <Typography>
              Participate in our Alpha to have a chance at winning <br />
              the Jackpot Giveaway and other exclusive rewards <br />
              that are only available to Alpha testers.
            </Typography>
            <button className="whiteBtn" onClick={navigateDiscordPage}>
              Join Alpha in Discord
            </button>
            <button className="greyBtn" onClick={navigateWhitepaper}>
              Read Whitepaper
            </button>
          </Grid>
          <Grid item xs={3} className="landingPagesboxsection">
            <h3>
              {values[0] && values[0]
                ? "NEXT DRAWING AT:"
                : "COUNTDOWN TO ALPHA:"}
            </h3>
            <h3>
              {values[0] && values[0]
                ? "NEXT GIVEAWAY AMOUNT:"
                : "FIRST GIVEAWAY AMOUNT:"}
            </h3>
            <h3>ALPHA PARTICIPANTS:</h3>
          </Grid>
          <Grid
            item
            xs={3}
            className="landingPagesboxsection"
            style={{ marginRight: "0px !important" }}
          >
            <h4>
              {values[0]
                ? `${kFormatter(
                    values[0] && values[0]?.next_give_away
                  )} Followers`
                : "20:00:00:00"}
            </h4>
            <h4>
              {values[0]
                ? `${
                    values[0] &&
                    values[0]?.next_give_away_amount?.toLocaleString()
                  } USDC`
                : "1,000 USDC"}
            </h4>
            <h4>
              {values[0]
                ? values[0] && values[0]?.alpha_participants
                : "3 PEOPLE"}
            </h4>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
