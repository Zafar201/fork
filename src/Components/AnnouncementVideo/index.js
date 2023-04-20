import React from "react";

import winnerVideo from "../../assets/videos/compressed_announcement.mp4";

export default function AnnouncementVideo() {
  return (
    <>
      <video autoPlay muted loop>
        <source src={winnerVideo} type="video/mp4" />
      </video>
    </>
  );
}
