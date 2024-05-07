import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({
  colums,
  rows,
  setterFun,
  fullDate,
  show,
  setShow,
  setRelation,
}) {
  console.log(fullDate);
  if (!show) {
    return null;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {colums?.map((columData) => (
              <TableCell style={{ fontWeight: "bold" }}>{columData}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover td": { backgroundColor: "#ddd" },
                td: { cursor: "pointer" },
              }}
              onClick={() => {
                setterFun(fullDate[idx]);
                setRelation("");
                setShow(false);
              }}
            >
              {row?.map((rowData) => (
                <TableCell align="left">{rowData}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
