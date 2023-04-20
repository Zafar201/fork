import React from "react";
import XPCard from "../../../Components/XP Card";

const card1 = {
  heading: "Discord Involvement",
  para: "Thoughtful discussion and frequent activity in Discord is a hallmark of a strong community.",
  ul: [
    "Sending messages (Diminishing Returns)",
    "Reacting to messages (Diminishing Returns)",
    "Other people replying to your messages",
    "Other people reacting to your messages",
    "Being among the first to interact with a new member",
    "Inviting new (human) people to the server",
    "Visiting the server daily",
  ],
};

const card2 = {
  heading: "Twitter Amplification",
  para: "In order for communities to grow, they need to reach new members. This is where Twitter comes into play.",
  ul: [
    "Retweeting a Raid Tweet",
    "Replying to a Raid Tweet",
    "Liking a Raid Tweet",
  ],
};

const card3 = {
  heading: "Quests",
  para: (
    <p>
      Quests are outside-the-box actions that
      <br /> align with a project’s brand. They’re often
      <br /> the most valuable things a member can do.
    </p>
  ),
  ul: [
    "Creating project-inspired memes",
    "Hosting community-led Twitter spaces",
    "Composing Twitter threads",
    "Creating project-inspired artwork",
    "Attending events",
    "Hosting in-person meetups",
    "Anything else your community leaders can think of",
  ],
};

function XP() {
  return (
    <>
      <div className="titleContent">
        <div className="title"></div>
        <h1>
          ARCHITECTED IN COLLABORATION WITH <span>100+ WEB3 VETERANS</span>
        </h1>
      </div>
      <div className="xp">
        <div className="XpContent">
          <h1>
            EARN <span>XP</span> FOR COMMUNITY CONTRIBUTIONS
          </h1>
          <p>
            Anyone can earn XP by doing things that strengthen their community.
            <br />
            &nbsp;Our metrics are designed so that bots won’t get very far.
          </p>
        </div>
        <div className="XpBox">
          <XPCard
            heading={card1.heading}
            paragraph={card1.para}
            listitem={card1.ul}
          />
          <XPCard
            heading={card2.heading}
            paragraph={card2.para}
            listitem={card2.ul}
          />
          <XPCard
            heading={card3.heading}
            paragraph={card3.para}
            listitem={card3.ul}
          />
        </div>
      </div>
    </>
  );
}
export default React.memo(XP);
