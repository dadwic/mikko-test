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
import NativeSelect from "@mui/material/NativeSelect";
import LinearProgress from "@mui/material/LinearProgress";
import type { PaymentDate } from "interfaces";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PaymentDates() {
  const [year, setYear] = React.useState("2022");
  const { data, error } = useSwr<PaymentDate[]>(
    `/api/payment-dates?y=${year}`,
    fetcher
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value as string);
  };

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
        <Box
          sx={{
            width: 300,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Payment dates of
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <NativeSelect
              defaultValue={year}
              onChange={handleChange}
              inputProps={{
                name: "year",
              }}
            >
              {["2022", "2023", "2024", "2025"].map((y, i) => (
                <option value={y} key={i}>
                  {y}
                </option>
              ))}
            </NativeSelect>
          </Box>
        </Box>
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
