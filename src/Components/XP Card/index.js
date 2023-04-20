import React from "react";
import { Card, Paper } from "@mui/material";

export default function XPCard({ heading, paragraph, listitem }) {
  return (
    <Card>
      <Paper>
        <h1>{heading}</h1>
        <div>
          <p>{paragraph}</p>
          <ul>
            {listitem.map((el) => (
              <li key={el}>{el}</li>
            ))}
          </ul>
        </div>
      </Paper>
    </Card>
  );
}
