import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./ungrade.css";
import CustomTableComponent from "../../Components/CustomTableComponent";
import loading from "../../assets/images/loader.svg";
import AuthContext from "../../Components/Store/Auth-context";
import { ungrageMissionApiCall } from "../../ApiCalls";

const tableData = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];

function UngradedMission() {
  //Values from AuthContext
  const { adminData, handleUnAuthorizedError, navigateServerErrorPage } =
    useContext(AuthContext);

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const navigate = useNavigate();

  const adminToken = adminData?.access;
  const header = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      "Content-Type": "multipart/form-data",
    },
  };
  useEffect(() => {
    setShowLoading(true);
    ungrageMissionApiCall(
      header,
      (res) => {
        setData(res.data.results);
        setShowLoading(false);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        handleUnAuthorizedError(err);
        setShowLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminData?.access]);

  return (
    <div className="ungrade">
      <Typography>
        <span>{`//`}</span>Ungraded Quests
      </Typography>
      <div className="UngradeTable">
        <CustomTableComponent
          tableHead={
            <>
              <TableCell>Submitted By:</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Community</TableCell>
            </>
          }
          tableBody={
            data.length > 0 ? (
              data.map((user, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Toolbar>
                        <IconButton>
                          <Avatar src={user.member_pfp_link} />
                        </IconButton>
                        {user.user_id}
                      </Toolbar>
                    </TableCell>
                    <TableCell className="pending-grade-btns">
                      <button className="pending">{user.mission_status}</button>
                      <button
                        className="grade"
                        onClick={() =>
                          navigate("/graded-mission", {
                            state: { id: user.mission_id },
                          })
                        }
                      >
                        Grade
                      </button>
                    </TableCell>
                    <TableCell>
                      <Toolbar>
                        <IconButton>
                          <Avatar src={user.server_pfp_link} />
                        </IconButton>
                        {user.community}
                      </Toolbar>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : showLoading ? (
              <>
                {tableData.map((el) => (
                  <TableRow>
                    <TableCell className="loaderCol">
                      <img src={loading} alt="loading" />
                    </TableCell>
                    <TableCell className="loaderCol">
                      <img src={loading} alt="loading" />
                    </TableCell>
                    <TableCell className="loaderCol">
                      <img src={loading} alt="loading" />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell><p className="noresult">No Results</p></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            )
          }
        />
      </div>
    </div>
  );
}
export default UngradedMission;
