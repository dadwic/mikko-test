import type { PaymentDate } from "../interfaces";
import * as React from "react";
import useSwr from "swr";
import moment from "moment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PaymentDates() {
  const { data, error } = useSwr<PaymentDate[]>("/api/payment-dates", fetcher);

  if (error) return <div>Failed to load data</div>;
  if (!data) return <LinearProgress sx={{ m: 2 }} />;

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Payment dates of 2022
        </Typography>
        <Button size="small" variant="outlined">
          Export
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month Name</TableCell>
            <TableCell>Salary payment date</TableCell>
            <TableCell>Bonus payment date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((p) => (
            <TableRow hover key={p.id}>
              <TableCell>{p.month}</TableCell>
              <TableCell>
                {moment.unix(p.salaryPaymentDate).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>
                {moment.unix(p.bonusPaymentDate).format("DD/MM/YYYY")}
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow hover>
              <TableCell colSpan={3} align="center" sx={{ py: 2 }}>
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
