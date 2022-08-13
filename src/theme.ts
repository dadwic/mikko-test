import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
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

export default theme;
