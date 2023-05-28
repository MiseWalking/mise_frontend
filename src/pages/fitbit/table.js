import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fitbitService } from "./fitbitService";
import { useEffect, useState } from "react";

function createData(
  logId,
  activityName,
  activeDuration,
  calories,
  startTime,
  lastModified
) {
  return {
    logId,
    activityName,
    activeDuration,
    calories,
    startTime,
    lastModified,
  };
}

export default function ActivityTable() {
  const [logdata, setLogData] = useState({});
  let rows2 = [];
  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    const { activities } = await fitbitService.getLogList();

    const activity = activities.activities;
    for (let index in activity) {
      const data = activity[index];
      rows2.push(
        createData(
          data.logId,
          data.activityName,
          data.activeDuration,
          data.calories,
          data.startTime,
          data.lastModified
        )
      );
    }
    setLogData(activities);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>logId</TableCell>
            <TableCell align="right">activityName</TableCell>
            <TableCell align="right">activeDuration&nbsp;(s)</TableCell>
            <TableCell align="right">calories&nbsp;</TableCell>
            <TableCell align="right">durationTime&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <TableRow
              key={row.logId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.logId}
              </TableCell>
              <TableCell align="right">{row.activityName}</TableCell>
              <TableCell align="right">{row.activeDuration}</TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">
                {row.startTime}
                {row.lastModified}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
