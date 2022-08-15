import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#C90C43",
    },
    secondary: {
      main: "#3D74B8",
    },
    error: {
      main: red.A400,
    },
  },
});

// Check day is weekend
export const isWeekend = (day: string) => ["Sunday", "Saturday"].includes(day);

// SWR fetcher
export const fetcher = (url: string) => fetch(url).then((res) => res.json());
