import React from "react";

import ChestNew from "../../assets/images/ChestNew.png";
import CrownLogo from "../../assets/images/crownlogo.png";
import MoreArrow from "../../assets/images/more-arrow.svg";

const details = [
  {
    heading: "Giveaway",
    text: " The Jackpot Giveaway is an on-chain sweepstakes that automatically distributes a large portion of our revenue to people on the leaderboard. Odds are determined based on tickets earned since the last giveaway. ",
  },
  {
    heading: "Airdrop",
    text: "The top 33% of participants in our Alpha will receive an airdrop related to Jackpot’s core functionality (more details will be released). Rarity of the airdrop is correlated with tickets earned during Alpha. ",
  },
  {
    heading: "Visibility",
    text: "Sitting atop the leaderboard shows people that you’re an asset for your community. As we grow, we’ll look to secure exclusive opportunities for those at the top.",
  },
  {
    heading: "Perks",
    text: "Many projects offer community-specific perks like Discord roles and merch for people who earn specific badges.",
  },
];
export default function AlphaMoreXP() {
  return (
    <>
      <div className="MoreXp alpha">
        <div>
          <h1>
            TICKETS = <span>REWARDS</span>
          </h1>
          <p>
            Earning tickets moves you up the leaderboard, increases your
            <br />
            odds of winning the Jackpot and unlocks other perks like
            <br />
            airdrops and more.
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
    </>
  );
}
