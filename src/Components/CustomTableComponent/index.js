import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Wrapper = ({ divClassName, children }) =>
  divClassName ? (
    <div className={divClassName}>{children}</div>
  ) : (
    <TableContainer>{children}</TableContainer>
  );

export default function CustomTableComponent({
  tableHead,
  tableBody,
  divClassName,
}) {
  return (
    <Wrapper divClassName={divClassName}>
      <Table>
        <TableHead>
          <TableRow>{tableHead}</TableRow>
        </TableHead>
        <TableBody>{tableBody}</TableBody>
      </Table>
    </Wrapper>
  );
}
