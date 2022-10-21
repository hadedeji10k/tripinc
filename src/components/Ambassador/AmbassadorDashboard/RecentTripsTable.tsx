import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IAdminDashboard } from "../../../api/interfaces";
import { formatDateToMonthAndDay } from "../../../utils/helpers";
import "./Dashboard.css";

const RecentTripsTable = ({
  props,
}: {
  props: IAdminDashboard["recentTrips"];
}) => {
  return (
    <TableContainer className="dashboard_trips_table" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell align="left">User</TableCell>
            <TableCell align="left">Destination</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.map((prop, index) => (
            <TableRow key={index + 1}>
              <TableCell component="th" scope="row" className="small_title">
                {index + 1}
              </TableCell>
              <TableCell align="left" className="small_title">
                {prop.userFullName}
              </TableCell>
              <TableCell align="left" className="small_title">
                {prop.startDestination}
              </TableCell>
              <TableCell align="left" className="small_title">
                {formatDateToMonthAndDay(prop.startDate)} -{" "}
                {formatDateToMonthAndDay(prop.endDate)}
              </TableCell>
              <TableCell align="left" className="small_title">
                {prop.isBooked === true ? "Booked" : "Unbooked"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecentTripsTable;
