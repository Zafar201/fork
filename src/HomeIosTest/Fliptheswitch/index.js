import { Button, Card } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AlphaFlipTheSwitch() {
  const navigate = useNavigate();
  return (
    <div className="flipContent">
      <Card>
        <h1>
          IT'S TIME TO <span>FLIP THE SWITCH</span>
        </h1>
        <Button onClick={() => navigate("/pricing")}>Add to Server</Button>
      </Card>
    </div>
  );
}
