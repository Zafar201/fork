import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import ChestNew from "../../../assets/images/ChestNew.png";
import CrownLogo from "../../../assets/images/crownlogo.png";
import Ticket from "../../../assets/images/ticket.png";
import MoreArrow from "../../../assets/images/more-arrow.svg";

const details = [
  {
    heading: "Jackpot Raffle Tickets",
    text: "Every few weeks, we give away thousands of dollars in USDC to a few people on the leaderboard. The more XP you have, the greater your odds of winning. ",
  },
  {
    heading: "Visibility & Recognition",
    text: "As you earn XP, you’ll move up the community-specific and global leaderboards, gaining visibility and recognition for your community contributions. ",
  },
  {
    heading: "WL Opportunites",
    text: "Projects are constantly seeking members who will add value to their communities. Rising up the leaderboard helps get your name out there, opening up whitelist opportunites.",
  },
  {
    heading: "Community Perks",
    text: "We encourage projects to offer additional community-specific perks like Discord roles and merch for people who prove their value by sitting atop the leaderboard.",
  },
];
function MoreXP() {
  const matches = useMediaQuery("(min-width:1023px)");
  return (
    <>
      <div className="titleContent">
        <div className="title"></div>
        {matches ? (
          <h1>
            Stack XP to <span>INCREASE YOUR ODDS </span>
            OF HITTING THE JACKPOT
          </h1>
        ) : (
          <h1>
            A BALANCE OF <span>INTRINSIC</span> AND
            <br /> <span>EXTRINSIC</span> MOTIVATORS
          </h1>
        )}
      </div>
      <div className="MoreXp">
        <div>
          <h1>
            MORE XP = <span>GREATER REWARDS</span>
          </h1>
          <p>
            Jackpot rewards are directly tied to XP. The more XP you have,
            <br />
            the greater your rewards will be.
            <br />
            <a href="/">
              Learn More <img src={MoreArrow} alt="moreArrow" />
            </a>
          </p>
          <img src={ChestNew} alt="box" />
        </div>
        <div>
          {details.map((el) => (
            <div className="MoreXPbox">
              <img src={CrownLogo} alt="img" />
              <h1>{el.heading}</h1>
              <p>{el.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="jackpotRaffle">
        <h1>
          THE JACKPOT <span>RAFFLE</span>
        </h1>
        <p>
          Every few weeks, we give away <span>thousands of dollars</span> to
          community
          <br /> members on our leaderboard via an on-chain raffle.
        </p>
        <img src={Ticket} alt="img" />
      </div>
    </>
  );
}
export default React.memo(MoreXP);
