import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {`Copyright © ${new Date().getFullYear()}`}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          Made with ❤️ by{" "}
          <Link
            color="inherit"
            target="_blank"
            href="https://github.com/dadwic"
          >
            @dadwic
          </Link>
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}
