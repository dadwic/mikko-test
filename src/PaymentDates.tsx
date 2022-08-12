import type { PaymentDate } from "../interfaces";
import * as React from "react";
import useSwr from "swr";
import moment from "moment";
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
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Payment dates of 2022
      </Typography>
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
                {moment.unix(p.salaryPaymentDate).format("DD/MM/YYYY, hh:mm")}
              </TableCell>
              <TableCell>
                {moment.unix(p.bonusPaymentDate).format("DD/MM/YYYY, hh:mm")}
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
