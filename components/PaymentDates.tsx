import * as React from "react";
import { useRouter } from "next/router";
import useSwr from "swr";
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
import { fetcher } from "utils/index";

export default function PaymentDates() {
  const router = useRouter();
  const [year, setYear] = React.useState("2022");
  const { data, error } = useSwr<PaymentDate[]>(
    `/api/payment-dates?y=${year}`,
    fetcher
  );

  React.useEffect(() => {
    const y = router.query.year as string;
    // Check the query param is numeric and >= the unix epoch
    if (!isNaN(parseInt(y)) && parseInt(y) >= 1970) setYear(y);
  }, [router.query.year]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({
      pathname: "/",
      query: { year: event.target.value },
    });
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
            display: "flex",
            justifyContent: "space-between",
            width: { xs: "100%", md: 300 },
          }}
        >
          <Typography gutterBottom variant="h6" component="h2" color="primary">
            Payment dates of
          </Typography>
          <Box sx={{ minWidth: { xs: 100, md: 120 } }}>
            <NativeSelect
              value={year}
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
        <Button
          size="small"
          variant="outlined"
          href={`/api/payment-dates?y=${year}&export=true`}
        >
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
              <TableCell>{p.salaryPaymentDate}</TableCell>
              <TableCell>{p.bonusPaymentDate}</TableCell>
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
